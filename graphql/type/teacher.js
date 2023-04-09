const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const definitions = `
type Teacher {
  idTeacher: ID!
  firstName: String!
  lastName: String!
  course: [Course]
}
`;

const query = `
teachers: [Teacher]
teacher(idTeacher: ID!): Teacher
`;

const mutation = `
addTeacher(firstName: String!, lastName: String!): Teacher
updateTeacher(firstName: String!, lastName: String!, idTeacher: ID!): Teacher
deleteTeacher(idTeacher: Int!): Teacher
`;

const resolvers = {
  teacher: ({ idTeacher }) => {
    return prisma.teacher.findUnique({
      where: {
        idTeacher: parseInt(idTeacher),
      },
      include:{
        course: true
      }
    });
  },
  teachers: () => {
    return prisma.teacher.findMany({
      include:{
        course: true
      }
    });
  },
  addTeacher: ({ firstName, lastName }) => {
    return prisma.teacher.create({
      data: {
        firstName: firstName,
        lastName: lastName,
      },
    });
  },
  updateTeacher: ({ firstName, lastName, idTeacher }) => {
    return prisma.teacher.update({
      where: { idTeacher: parseInt(idTeacher) },
      data: {
        firstName: firstName,
        lastName: lastName,
      },
    });
  },
  deleteTeacher: ({ idTeacher }) => {
    return prisma.teacher.delete({
      where: {
        idTeacher: parseInt(idTeacher),
      },
    });
  },
};

module.exports = {
  definitions,
  query,
  mutation,
  resolvers,
};
