const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

const schema = buildSchema(`
  type RootQuery {
    events: [String!]!
  }

  type RootMutation {
    createEvent(name: String): String
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);

app.use(bodyParser.json());

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: {
      events: () => {
        return ['Event 1', 'Event 2', 'Event 3'];
      },
      createEvent: (args) => {
        const eventName = args.name;
        return eventName;
      }
    },
    graphiql: true
  })
);

app.listen(3000);
