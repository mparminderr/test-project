import { Router } from "express";
import { documentSchema } from "../utility/documentValidation.js";
import { documentControllrer } from "../controller/Document.js";
import { PersonSchema } from "../utility/PersonValidation.js";
export class Document {
  constructor() {
    this.router = Router();
  }
  configureRoutes() {
    this.router
      .route("/document/create")
      .post(this.documentValidation, documentControllrer.addDocument);
    this.router
      .route("/documents")
      .post(this.personValidation, documentControllrer.getAllDocumentsByPerson);
    return this.router;
  }
  documentValidation(request, response, next) {
    try {
      const validations = documentSchema.validate(request.body);

      if (validations.error) {
        response.status(500).json({ error: validations.error.message });
      } else {
        next();
      }
    } catch (err) {
      throw err;

      // response.status(500).json({message:"Error"});
    }
  }
  personValidation(request, response, next) {
    try {
      const validations = PersonSchema.validate(request.body);
      if (validations.error) {
        response.status(500).json({ error: validations.error.message });
      } else {
        next();
      }
    } catch (error) {
      throw err;
    }
  }
}
