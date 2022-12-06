import { database } from "../database/connection.js";
class Country {
  constructor() {
    this.database = database;
  }
  async getAllLanguages(request, response) {
    try {
      let countries = await database.country.findAll();

      response.status(200).json({ countries: countries });
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }
}
export const countryControllrer = new Country();
