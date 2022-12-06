import { Router } from "express";

import { countryControllrer } from "../controllers/Country.js";
export class Country {
  constructor() {
    this.router = Router();
  }
  configureRoutes() {
   
    this.router
      .route("/countries/all")
      .get(countryControllrer.getAllLanguages);
    return this.router;
  }
}
