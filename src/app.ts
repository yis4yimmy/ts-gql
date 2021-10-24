import "reflect-metadata";
import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "type-graphql";

import { Public } from "./resolvers/public/hello";
import { Register } from "./resolvers/auth/register";

export const initApp = async () => {
  const app = express();

  app.get("/", (_req, res) => res.send("Try /graphql"));

  const schema = await buildSchema({ resolvers: [Public, Register] });

  app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

  return app;
};
