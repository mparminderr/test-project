import express from "express";
import pino from "pino";
import cors from "cors";
import { database } from "./database/connection.js";
import {Document} from './routes/Document.js';
import {Languages} from './routes/Languages.js'
const app = express();
(async () => {
  const logger = pino();
  const f = new Document();
  const languageRoutes = new Languages()
  app.use(cors());
  app.use(express.json())
  app.get("/health", (request, response) => {
    response.status(200).json({ message: "Document service running" });
  });
  app.use('/',f.configureRoutes());
  app.use('/',languageRoutes.configureRoutes())
  try {
    await database.sequelize.sync();
  } catch (error) {
    console.log(error);
    logger.error("Database service error", error.message);
  }

  app.listen(4001, () => logger.info("Document server started"));
})();
