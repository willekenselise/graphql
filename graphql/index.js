let { buildSchema } = require("graphql");

const absence = require("./type/absence.js");
const course = require("./type/course.js");
const program = require("./type/program.js");
const programGroup = require("./type/programGroup.js");
const programType = require("./type/programType.js");
const rating = require("./type/rating.js");
const schedule = require("./type/schedule.js");
const student = require("./type/student.js");
const teacher = require("./type/teacher.js");

const schema = buildSchema(`

    scalar Date,
    scalar Time,
    scalar DateTime,

    ${absence.definitions}
    ${course.definitions}
    ${program.definitions}
    ${programGroup.definitions}
    ${programType.definitions}
    ${rating.definitions}
    ${schedule.definitions}
    ${student.definitions}
    ${teacher.definitions}

    type Query {
        ${absence.query}
        ${course.query}
        ${program.query}
        ${programGroup.query}
        ${programType.query}
        ${rating.query}
        ${schedule.query}
        ${student.query}
        ${teacher.query}
    }

    type Mutation {
        ${absence.mutation}
        ${course.mutation}
        ${program.mutation}
        ${programGroup.mutation}
        ${programType.mutation}
        ${rating.mutation}
        ${schedule.mutation}
        ${student.mutation}
        ${teacher.mutation}
    }
`);

const resolvers = {
  ...absence.resolvers,
  ...course.resolvers,
  ...program.resolvers,
  ...programGroup.resolvers,
  ...programType.resolvers,
  ...rating.resolvers,
  ...schedule.resolvers,
  ...student.resolvers,
  ...teacher.resolvers,
};

module.exports = { schema, resolvers };
