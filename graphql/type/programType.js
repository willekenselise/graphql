const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const definitions = `
    type ProgramType {
        idProgramType: ID!
        nameProgramType: String!
        program: [Program]
    }
`;

const query = `
programTypes: [ProgramType]
programType(idProgramType: ID!): ProgramType
`;

const mutation = `
addProgramType(nameProgramType: String!): ProgramType
updateProgramType(idProgramType: Int!, nameProgramType: String!): ProgramType
deleteProgramType(idProgramType: Int!): ProgramType
`;

const resolvers = {
  programType: ({idProgramType}) => {
    return prisma.programtype.findUnique({
      where: {
        idProgramType: parseInt(idProgramType),
      },
      include: { program: true },
    });
  },
  programTypes: () => {
    return prisma.programtype.findMany({
      include: { program: true },
    });
  },
  addProgramType: ({ nameProgramType }) => {
    return prisma.programtype.create({
      data: {
        nameProgramType: nameProgramType,
      },
    });
  },
  updateProgramType: ({ idProgramType, nameProgramType }) => {
    return prisma.programtype.update({
      where: { idProgramType: parseInt(idProgramType) },
      data: { nameProgramType: nameProgramType },
    });
  },
  deleteProgramType: ({ idProgramType }) => {
    return prisma.programtype.delete({
      where: {
        idProgramType: parseInt(idProgramType),
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
