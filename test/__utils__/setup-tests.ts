import { BaseEntity, Connection, createConnection } from "typeorm";

let connection: Connection;

beforeAll(async () => {
  connection = await createConnection("test");

  if (connection.isConnected) {
    BaseEntity.useConnection(connection);
  } else {
    throw new Error("Unable to establish database connection");
  }
});

afterAll(async () => {
  await connection.close();
});
