const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require("mongoose");

const app = express();

const events = [];

const schema = buildSchema(`
type Event {
    _id: ID!
    title: String!
    description: String!
    price: Float!
    date: String!
  }

  input EventInput {
    title: String!
    description: String!
    price: Float!
    date: String!
  }

  type RootQuery {
    events: [Event!]!
  }

  type RootMutation {
    createEvent(eventInput: EventInput): Event
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
        return events;
      },
      createEvent: (args) => {
        const event = {
          _id: Math.random().toString(),
          title: args.eventInput.title,
          description: args.description,
          price: +args.eventInput.price,
          date: args.eventInput.date
        };

        events.push(event);

        return event;
      }
    },
    graphiql: true
  })
);

mongoose
  .connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.gczs3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
  .then(() => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });

