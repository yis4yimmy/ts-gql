import { createConnection, getConnection } from "typeorm";
import { createDatabase } from "pg-god";

const createDbAndConnect = async () => {
  try {
    console.log("--- Attempting to connect to the test database ---");

    const pgConnection = await createConnection("test");

    return pgConnection;
  } catch (error: any) {
    if (error.code === "3D000") {
      console.log("--- Attempting to create a database ---");

      await createDatabase(
        {
          databaseName: "tsgqltest",
        },
        {
          user: "postgres",
          port: 5432,
          host: process.env.PG_TEST_HOST,
          password: process.env.PG_TEST_PASSWORD,
        }
      );

      const connection = getConnection("test");

      return connection;
    }

    throw error;
  }
};

(async () => {
  console.log("--- Starting DB setup ---");

  const connection = await createDbAndConnect();

  if (!connection.isConnected) {
    await connection.connect();
  }

  await connection.runMigrations();

  await connection.close();

  console.log("--- DB setup complete ---");
})();
