const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const average = (ratings) => {
  const lenght = ratings.length;
  let sum = 0;
  ratings.forEach((r) => {
    sum += parseFloat(r.ratingValue);
  });
  return sum / lenght;
};

const definitions = `
type Rating {
  idRating: ID!
  ratingValue: Float!
  idStudent: ID!
  idCourse: ID!
  student: Student
  course: Course
}
`;

const query = `
ratings: [Rating]
rating( idRating: ID!): Rating
studentAverageGrades(idStudent: ID!) : Float
courseAverageGrades(idCourse: ID!) : Float
`;

const mutation = `
addRating(ratingValue: Float!, idStudent: ID!,idCourse: ID! ): Rating
updateRating(ratingValue: Float!, idStudent: ID!,idCourse: ID!, idRating: ID!): Rating
deleteRating(idRating: Int!): Rating
`;

const resolvers = {
  rating: ({ idRating }) => {
    return prisma.rating.findUnique({
      where: {
        idRating: parseInt(idRating),
      },
      include: {
        student: true,
        course: true,
      },
    });
  },
  ratings: () => {
    return prisma.rating.findMany({
      include: {
        student: true,
        course: true,
      },
    });
  },
  addRating: ({ ratingValue, idStudent, idCourse }) => {
    return prisma.rating.create({
      data: {
        ratingValue: parseFloat(ratingValue),
        idStudent: parseInt(idStudent),
        idCourse: parseInt(idCourse),
      },
    });
  },
  updateRating: ({ ratingValue, idStudent, idCourse }) => {
    return prisma.rating.update({
      where: { idRating: parseInt(idRating) },
      data: {
        ratingValue: parseFloat(ratingValue),
        idStudent: parseInt(idStudent),
        idCourse: parseInt(idCourse),
      },
    });
  },
  deleteRating: ({ idRating }) => {
    return prisma.rating.delete({
      where: {
        idRating: parseInt(idRating),
      },
    });
  },
  studentAverageGrades: async ({ idStudent }) => {
    const result = await prisma.student.findFirst({
      where: {
        idStudent: parseInt(idStudent),
      },
      include: {
        rating: true,
      },
    });
    if (result.rating?.length > 0) {
      return average(result.rating);
    } else {
      return 0;
    }
  },
  courseAverageGrades: async ({ idCourse }) => {
    const result = await prisma.course.findUnique({
      where: {
        idCourse: parseInt(idCourse),
      },
      include: {
        rating: true
      },
    });
    if (result.rating?.length > 0) {
      return average(result.rating);
    } else {
      return 0;
    }
  },
};

module.exports = {
  definitions,
  query,
  mutation,
  resolvers,
};
