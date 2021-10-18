import request from "supertest";

import { initApp } from "../src/app";

describe("routes", () => {
  const app = initApp();

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
});
