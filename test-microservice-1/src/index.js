import express from "express";
import { Person } from "./routes/Person.js";
import { Country } from "./routes/Country.js";
const app = express();
import pino from "pino";
import cors from "cors";
import { database } from "./database/connection.js";
(() => {
  const logger = pino();
  // app.use(logger);

  database.sequelize
    .sync()
    .then(() => {
      logger.info("Database synced");
    })
    .catch((err) => {
      logger.error("Error syncing");
    });
  app.use(cors());
  app.use(express.json({}));

  app.use("/", new Person().configureRoutes());
  app.use("/", new Country().configureRoutes());
  app.listen(4000, () => console.log("Listening network"));
})();
