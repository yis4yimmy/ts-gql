module.exports = [
  {
    name: "default",
    type: "postgres",
    url: process.env.DB_URL_DEV,
    entities: ["./dist/entities/**/*.js"],
    migrations: ["./dist/migrations/**/*.js"],
  },
  {
    name: "test",
    type: "postgres",
    url: process.env.DB_URL_TEST,
    entities: ["./src/entities/**/*.ts"],
    migrations: ["./src/migrations/**/*.ts"],
  },
];
