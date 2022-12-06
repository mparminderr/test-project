import { Router } from "express";

import { languageControllrer } from "../controller/Language.js";

export class Languages {
  constructor() {
    this.router = Router();
  }
  configureRoutes() {
    this.router
      .route("/languages/all")
      .get(languageControllrer.getAllLanguages);
    return this.router;
  }
}
