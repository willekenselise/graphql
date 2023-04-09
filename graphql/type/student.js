const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// add moyenne

const definitions = `
type Student {
  idStudent: ID!
  firstName: String!
  lastName: String!
  idProgramGroup: Int
  programgroup: ProgramGroup
  absence: [Absence]
  rating: [Rating]
}
`;

const query = `
students: [Student]
student(idStudent: ID!): Student
countStudentsByGroup(idProgramGroup: ID!): Int
countStudentsByProgramType(idProgramType: ID!): Int
countStudentsByProgram(idProgram: ID!): Int
`;

const mutation = `
addStudent(firstName: String!, lastName: String!, idProgramGroup: Int!): Student
updateStudent(firstName: String!, lastName: String!, idProgramGroup: Int!, idStudent: ID!): Student
deleteStudent(idStudent: Int!): Student
`;

const resolvers = {
  student: ({ idStudent }) => {
    return prisma.student.findUnique({
      where: {
        idStudent: parseInt(idStudent),
      },
      include: {
        absence: true,
        rating: true,
        programgroup: true,
      },
    });
  },
  students: () => {
    return prisma.student.findMany({
      include: {
        absence: true,
        rating: true,
        programgroup: true,
      },
    });
  },
  addStudent: ({ firstName, lastName, idProgramGroup }) => {
    return prisma.student.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        idProgramGroup: parseInt(idProgramGroup),
      },
    });
  },
  updateStudent: ({ firstName, lastName, idProgramGroup, idStudent }) => {
    return prisma.student.update({
      where: { idStudent: parseInt(idStudent) },
      data: {
        firstName: firstName,
        lastName: lastName,
        idProgramGroup: parseInt(idProgramGroup),
      },
    });
  },
  deleteStudent: ({ idStudent }) => {
    return prisma.student.delete({
      where: {
        idStudent: parseInt(idStudent),
      },
    });
  },
  countStudentsByGroup: async ({ idProgramGroup }) => {
    const result = await prisma.student.findMany({
      where: { idProgramGroup: parseInt(idProgramGroup) },
    });
    return result.length;
  },
  countStudentsByProgramType: async ({ idProgramType }) => {
    const result = await prisma.programtype.findUnique({
      where: { idProgramType: parseInt(idProgramType) },
      include: {
        program: {
          include: {
            programgroup: {
              include: {
                student: true,
              },
            },
          },
        },
      },
    });
    return result.program.reduce((acc, pr) => {
      return (
        acc +
        pr.programgroup.reduce((acc2, prg) => {
          return acc2 + (prg.student ? prg.student.length : 0);
        }, 0)
      );
    }, 0);
  },
  countStudentsByProgram: async ({ idProgram }) => {
    const result = await prisma.program.findUnique({
      where: { idProgram: parseInt(idProgram) },
      include: {
        programgroup: {
          include: {
            student: true,
          },
        },
      },
    });
    return result.programgroup.reduce((acc, prg) => {
      return acc + (prg.student ? prg.student.length : 0);
    }, 0);
  },
};

module.exports = {
  definitions,
  query,
  mutation,
  resolvers,
};
