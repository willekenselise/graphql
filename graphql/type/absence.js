const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const definitions = `
type Absence {
  idAbsence: ID!
  dateAbsence: DateTime!
  idStudent: ID!
  idCourse: ID!
  student: Student
  course: Course
}
`;

const query = `
absences: [Absence]
absence(idAbsence: ID!): Absence
countAbsence(idStudent: ID!): Int
`;

const mutation = `
addAbsence(dateAbsence: DateTime!, idStudent: ID!,idCourse: ID! ): Absence
updateAbsence(dateAbsence: DateTime!, idStudent: ID!,idCourse: ID!, idAbsence: ID!): Absence
deleteAbsence(idAbsence: Int!): Absence
`;

const resolvers = {
  absence: ({ idAbsence }) => {
    return prisma.absence.findUnique({
      where: {
        idAbsence: parseInt(idAbsence),
      },
      include: {
        course: true,
        student: true,
      },
    });
  },
  absences: () => {
    return prisma.absence.findMany({
      include: {
        course: true,
        student: true,
      },
    });
  },
  addAbsence: ({ dateAbsence, idStudent, idCourse }) => {
    return prisma.absence.create({
      data: {
        dateAbsence: new Date(dateAbsence),
        idStudent: parseInt(idStudent),
        idCourse: parseInt(idCourse),
      },
    });
  },
  updateAbsence: ({ dateAbsence, idStudent, idCourse, idAbsence }) => {
    return prisma.absence.update({
      where: { idAbsence: parseInt(idAbsence) },
      data: {
        dateAbsence: new Date(dateAbsence),
        idStudent: parseInt(idStudent),
        idCourse: parseInt(idCourse),
      },
    });
  },
  deleteAbsence: ({ idAbsence }) => {
    return prisma.absence.delete({
      where: {
        idAbsence: parseInt(idAbsence),
      },
    });
  },
  countAbsence: async ({ idStudent }) => {
    const result = await prisma.student.findUnique({
      where: {
        idStudent: parseInt(idStudent),
      },
      include: {
        absence: true,
      },
    });
    return result?.absence ? result.absence.length : 0;
  },
};

module.exports = {
  definitions,
  query,
  mutation,
  resolvers,
};
