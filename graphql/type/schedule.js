const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const definitions = `
type Schedule {
  idSchedule: ID!
  scheduleDay: Date!
  scheduleStartTime: Time!
  scheduleEndTime: Time!
  idCourse: ID!
  course: Course
}
`;

const query = `
schedules: [Schedule]
schedule(idSchedule: ID!): Schedule
scheduleByProgramGroup(idProgramGroup: ID!): [Schedule]
`;

const mutation = `
addSchedule(scheduleDay: Date!, scheduleStartTime: Time!, scheduleEndTime: Time!, idCourse: ID!): Schedule
updateSchedule(idSchedule: ID!, scheduleDay: Date!, scheduleStartTime: Time!, scheduleEndTime: Time!, idCourse: ID!): Schedule
deleteSchedule(idSchedule: Int!): Schedule
`;

const resolvers = {
  schedule: ({ idSchedule }) => {
    return prisma.schedule.findUnique({
      where: {
        idSchedule: parseInt(idSchedule),
      },
      include: {
        course: true,
      },
    });
  },
  schedules: () => {
    return prisma.schedule.findMany({
      include: {
        course: true,
      },
    });
  },
  addSchedule: ({
    scheduleDay,
    scheduleStartTime,
    scheduleEndTime,
    idCourse,
  }) => {
    return prisma.schedule.create({
      data: {
        scheduleStartTime: new Date(scheduleStartTime),
        scheduleEndTime: new Date(scheduleEndTime),
        scheduleDay: new Date(scheduleDay),
        idCourse: parseInt(idCourse),
      },
    });
  },
  updateSchedule: ({
    scheduleDay,
    scheduleStartTime,
    scheduleEndTime,
    idCourse,
    idSchedule,
  }) => {
    return prisma.schedule.update({
      where: { idSchedule: parseInt(idSchedule) },
      data: {
        scheduleDay: new Date(scheduleDay),
        scheduleStartTime: new Date(scheduleStartTime),
        scheduleEndTime: new Date(scheduleEndTime),
        idCourse: parseInt(idCourse),
      },
    });
  },
  deleteSchedule: ({ idSchedule }) => {
    return prisma.schedule.delete({
      where: {
        idSchedule: parseInt(idSchedule),
      },
    });
  },
  scheduleByProgramGroup: async ({ idProgramGroup }) => {
    const result = await prisma.programgroup.findFirst({
      where: {
        idProgramGroup: parseInt(idProgramGroup),
      },
      include: {
        course: {
          include: {
            schedule: true,
          },
        },
      },
    });
    const schedules = [];
    result.course.forEach((course) => {
      if (course) {
        course.schedule.forEach((sch) => {
          schedules.push(sch);
        });
      }
    });
    return schedules;
  },
};

module.exports = {
  definitions,
  query,
  mutation,
  resolvers,
};
