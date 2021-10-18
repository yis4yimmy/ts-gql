import { Application } from "express";
import request from "supertest";

import { initApp } from "../src/app";

describe("routes", () => {
  let app: Application | undefined;

  beforeAll(async () => {
    app = await initApp();
  });

  describe("GET /", () => {
    it("returns the correct message", (done) => {
      request(app)
        .get("/")
        .expect(200)
        .then((res) => {
          expect(res.text).toEqual("Try /hello");
          done();
        });
    });
  });

  describe("GET /hello", () => {
    it("returns the correct message", (done) => {
      request(app)
        .get("/hello")
        .expect(200)
        .then((res) => {
          expect(res.text).toEqual("It's me");
          done();
        });
    });
  });

  describe("GET /graphql", () => {
    it("returns hello", (done) => {
      request(app)
        .get("/graphql")
        .query({ query: "query{hello}" })
        .expect(200)
        .then((res) => {
          expect(res.body).toMatchObject({ data: { hello: "It's me" } });
          done();
        });
    });
  });

  describe("POST /graphql", () => {
    it("returns hello", (done) => {
      request(app)
        .post("/graphql")
        .send({ query: "query { hello }" })
        .expect(200)
        .then((res) => {
          expect(res.body).toMatchObject({ data: { hello: "It's me" } });
          done();
        });
    });
  });
});
