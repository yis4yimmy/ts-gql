import request from "supertest";
import { Application } from "express";
import { Connection, getConnection } from "typeorm";

import { initApp } from "../../../src/app";
import { User } from "../../../src/entities/User";

jest.setTimeout(10000);

describe("#register", () => {
  let app: Application | undefined;
  let dbConnection: Connection | undefined;

  beforeAll(async () => {
    app = await initApp();
    dbConnection = getConnection("test");
  });

  describe("when the values provided are not valid", () => {
    it("returns an error", async () => {
      const response = await request(app)
        .post("/graphql")
        .set("Content-Type", "application/json")
        .send({
          query: `mutation { register(user: {username: "testuser", email: "testuser@gmail.com", password: "bad"}) }`,
        });

      expect(response.status).toEqual(500);
    });
  });

  describe("when the user cannot be saved", () => {
    beforeEach(async () => {
      if (dbConnection) {
        const user = dbConnection.manager.create(User, {
          username: "testuser",
          email: "testuser@gmail.com",
          password: "password123",
        });

        await dbConnection.manager.save(user);
      }
    });

    afterEach(async () => {
      if (dbConnection) {
        await dbConnection.manager.delete(User, {
          username: "testuser",
        });
      }
    });

    it("returns an error", async () => {
      const response = await request(app)
        .post("/graphql")
        .set("Content-Type", "application/json")
        .send({
          query: `mutation { register(user: {username: "testuser", email: "testuser@gmail.com", password: "goodpassword123"}) }`,
        });

      expect(response.status).toEqual(500);

      expect(response.body.errors[0].message).toMatch(
        /duplicate key value violates unique constraint/
      );
    });
  });

  describe("when the user is successfully created", () => {
    afterEach(async () => {
      if (dbConnection) {
        await dbConnection.manager.delete(User, {
          username: "testuser",
        });
      }
    });

    it("returns true", async () => {
      const response = await request(app)
        .post("/graphql")
        .set("Content-Type", "application/json")
        .send({
          query: `mutation { register(user: {username: "testuser", email: "testuser@gmail.com", password: "goodpass123"}) }`,
        });

      expect(response.status).toEqual(200);

      expect(response.body).toEqual({ data: { register: true } });
    });
  });
});
