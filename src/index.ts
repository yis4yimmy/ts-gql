import { initApp } from "./app";

(async () => {
  const app = initApp();

  const host = process.env.HOST || "http://localhost";
  const port = process.env.PORT || 4000;

  app.listen(port, () => {
    console.log(`Server running at ${host}:${port}`);
  });
})();
