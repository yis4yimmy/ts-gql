import { createConnection } from "typeorm";

(async () => {
  console.log("--- Starting DB teardown ---");

  const connection = await createConnection("test");

  await connection.dropDatabase();

  await connection.close();

  console.log("--- DB teardown complete ---");
})();
