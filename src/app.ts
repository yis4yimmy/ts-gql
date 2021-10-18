import "reflect-metadata";
import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";

export const initApp = async () => {
  const app = express();

  app.get("/", (_req, res) => res.send("Try /hello"));

  app.get("/hello", (_req, res) => res.send("It's me"));

  const schema = buildSchema(`
    type Query {
      hello: String
    }
  `);

  const rootValue = {
    hello: () => "It's me",
  };

  app.use("/graphql", graphqlHTTP({ schema, rootValue, graphiql: true }));

  return app;
};
