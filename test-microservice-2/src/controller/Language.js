import { database } from "../database/connection.js";
class Language {
  constructor() {
    this.database = database;
  }
  async getAllLanguages(request, response) {
    try {
      let languages =await database.lang.findAll();
     
      response.status(200).json({ languages: languages });
    } catch (error) {
        console.log('The error',error)
      response.status(500).json({ error: error.message });
    }
  }
}
export const languageControllrer = new Language();