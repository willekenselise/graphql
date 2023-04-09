const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const definitions = `
type Course {
  idCourse: ID!
  nameCourse: String!
  idTeacher: ID!
  idProgramGroup: ID!
  teacher : Teacher
  programgroup : ProgramGroup
  rating : Rating
  schedule : Schedule
}
`;

const query = `
courses: [Course]
course(idCourse: ID!): Course
coursesByProgramGroup(idProgramGroup: ID!): [Schedule]
`;

const mutation = `
addCourse(nameCourse: String!, idTeacher: ID!, idProgramGroup: ID!): Course
updateCourse(nameCourse: String!, idTeacher: ID!, idProgramGroup: ID!, idCourse: ID!): Course
deleteCourse(idCourse: Int!): Course
`;

const resolvers = {
  course: ({ idCourse }) => {
    return prisma.course.findUnique({
      where: {
        idCourse: parseInt(idCourse),
      },
      include: {
        rating: true,
        schedule: true,
        teacher: true,
        programgroup: true,
      },
    });
  },
  courses: () => {
    return prisma.course.findMany({
      include: {
        rating: true,
        schedule: true,
        teacher: true,
        programgroup: true,
      },
    });
  },
  addCourse: ({ nameCourse, idTeacher, idProgramGroup }) => {
    return prisma.course.create({
      data: {
        nameCourse: nameCourse,
        idTeacher: parseInt(idTeacher),
        idProgramGroup: parseInt(idProgramGroup),
      },
    });
  },
  updateCourse: ({ nameCourse, idTeacher, idProgramGroup, idCourse }) => {
    return prisma.course.update({
      where: { idCourse: parseInt(idCourse) },
      data: {
        nameCourse: nameCourse,
        idTeacher: parseInt(idTeacher),
        idProgramGroup: parseInt(idProgramGroup),
      },
    });
  },
  deleteCourse: ({ idCourse }) => {
    return prisma.course.delete({
      where: {
        idCourse: parseInt(idCourse),
      },
    });
  },
  coursesByProgramGroup: async ({ idProgramGroup }) => {
    let schedules = [];
    const result = await prisma.programgroup.findUnique({
      where: {
        idProgramGroup: parseInt(idProgramGroup),
      },
      include: {
        course: true,
      },
    });
    if (result && result.course) {
      for (const c of result.course) {
        const resultSchedule = await prisma.schedule.findMany({
          where: {
            idCourse: parseInt(c.idCourse),
          },
        });
        schedules = schedules.concat(resultSchedule);
      }
    }
    schedules.sort((a, b) => new Date(a.scheduleDay) - new Date(b.scheduleDay));
    return schedules;
  },
};

module.exports = {
  definitions,
  query,
  mutation,
  resolvers,
};
