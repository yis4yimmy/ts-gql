import express from "express";

export const initApp = () => {
  const app = express();

  app.get("/", (_req, res) => res.send("Try /hello"));

  app.get("/hello", (_req, res) => res.send("It's me"));

  return app;
};
