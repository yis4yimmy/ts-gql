import { Application } from "express";
import request from "supertest";

import { initApp } from "../src/app";

describe("routes", () => {
  let app: Application | undefined;

  beforeAll(async () => {
    app = await initApp();
  });

  describe("GET /", () => {
    it("returns the correct message", async () => {
      const response = await request(app).get("/");

      expect(response.status).toEqual(200);

      expect(response.text).toEqual("Try /graphql");
    });
  });
});
