import { createConnection } from "typeorm";

import { initApp } from "./app";

(async () => {
  const pgConnection = await createConnection("default");

  console.log(
    "Is the database connected?",
    pgConnection.isConnected ? "Yiss" : "NOPE!"
  );

  const app = await initApp();

  const host = process.env.HOST || "http://localhost";
  const port = process.env.PORT || 4000;

  app.listen(port, () => {
    console.log(`Server running at ${host}:${port}`);
  });
})();
