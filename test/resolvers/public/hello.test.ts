import { Application } from "express";
import request from "supertest";

import { initApp } from "../../../src/app";

describe("routes", () => {
  let app: Application | undefined;

  beforeAll(async () => {
    app = await initApp();
  });

  describe("#hello", () => {
    it("returns the correct message", async () => {
      const response = await request(app)
        .post("/graphql")
        .set("Content-Type", "application/json")
        .send({ query: "query { hello }" });

      expect(response.status).toEqual(200);

      expect(response.body).toEqual({ data: { hello: "It's me" } });
    });
  });
});
