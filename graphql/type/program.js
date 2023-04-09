const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const definitions = `
type Program {
  idProgram: ID!
  nameProgram: String!
  isApprendiceship: Boolean!
  idProgramType: Int!
  programgroup: [ProgramGroup]
}
`;

const query = `
programs: [Program]
program(idProgram: ID!): Program
`;

const mutation = `
addProgram(nameProgram: String!, isApprendiceship: Boolean, idProgramType: Int!): Program
updateProgram(idProgram: Int!, isApprendiceship: Boolean, idProgramType:Int!, nameProgram: String): Program
deleteProgram(idProgram: Int!): Program
`;

const resolvers = {
  program: ({idProgram}) => {
    return prisma.program.findUnique({
      where: {
        idProgram: parseInt(idProgram),
      },
      include: {
        programgroup: true,
        programtype: true,
      }
    });
  },
  programs: () => {
    return prisma.program.findMany(
      {
        include: {
          programgroup: true,
          programtype: true,
        }
      }
    );
  },
  addProgram: ({ nameProgram, isApprendiceship, idProgramType }) => {
    return prisma.program.create({
      data: {
        nameProgram: nameProgram,
        isApprendiceship: isApprendiceship,
        idProgramType: parseInt(idProgramType),
      },
    });
  },
  updateProgram: ({
    idProgram,
    nameProgram,
    isApprendiceship,
    idProgramType,
  }) => {
    return prisma.program.update({
      where: {
        idProgram: parseInt(idProgram),
      },
      data: {
        nameProgram: nameProgram,
        isApprendiceship: isApprendiceship,
        idProgramType: idProgramType,
      },
    });
  },
  deleteProgram: ({ idProgram }) => {
    return prisma.program.delete({
      where: {
        idProgram: parseInt(idProgram),
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
