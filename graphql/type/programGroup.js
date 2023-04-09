const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const definitions = `
type ProgramGroup {
    idProgramGroup: ID!
    levelProgramGroup: Int
    nameProgramGroup: String!
    idProgram: Int
    program: Program
    course: [Course]
    student: [Student]
}
`;

const query = `
programGroups: [ProgramGroup]
programGroup(idProgramGroup: ID!) : ProgramGroup
programGroupsByLevel(levelProgramGroup: Int!) : [ProgramGroup]

`;

const mutation = `
addprogramGroup(nameProgramGroup: String!, levelProgramGroup: Int!, idProgram: Int!): ProgramGroup
updateprogramGroup( idProgramGroup: ID!,nameProgramGroup: String!, levelProgramGroup: Int!, idProgram: Int!): ProgramGroup
deleteprogramGroup(idProgramGroup: Int!): ProgramGroup
`;

const resolvers = {
  programGroup: ({ idProgramGroup }) => {
    return prisma.programgroup.findUnique({
      where: {
        idProgramGroup: parseInt(idProgramGroup),
      },
      include: {
        course: {
          include: {
            schedule: true,
          },
        },
        student: true,
      },
    });
  },
  programGroups: () => {
    return prisma.programgroup.findMany({
      include: {
        course: {
          include: {
            schedule: true,
          },
        },
        student: true,
      },
    });
  },
  programGroupsByLevel: ({ levelProgramGroup }) => {
    return prisma.programgroup.findMany({
      where: {
        levelProgramGroup: parseInt(levelProgramGroup),
      },
      include: {
        course: {
          include: {
            schedule: true,
          },
        },
        student: true,
      },
    });
  },
  addprogramGroup: ({ nameProgramGroup, levelProgramGroup, idProgram }) => {
    return prisma.programgroup.create({
      data: {
        nameProgramGroup: nameProgramGroup,
        levelProgramGroup: levelProgramGroup,
        idProgram: parseInt(idProgram),
      },
    });
  },
  updateprogramGroup: ({
    idProgramGroup,
    nameProgramGroup,
    levelProgramGroup,
    idProgram,
  }) => {
    return prisma.programgroup.update({
      where: { idProgramGroup: parseInt(idProgramGroup) },
      data: {
        nameProgramGroup: nameProgramGroup,
        levelProgramGroup: levelProgramGroup,
        idProgram: parseInt(idProgram),
      },
    });
  },
  deleteprogramGroup: ({ idProgramGroup }) => {
    return prisma.programgroup.delete({
      where: {
        idProgramGroup: parseInt(idProgramGroup),
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
