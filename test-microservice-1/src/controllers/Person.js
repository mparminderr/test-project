import { database } from "../database/connection.js";

class Person {
  constructor() {}
  async addPerson(request, response, next) {
    const personModel = database.person;
    try {
      const data = request.body;
      const result = await personModel.create({
        fname: data.first_name,
        lname: data.last_name,
        birthdate: data.birthdate,
        telephone: data.telephone,
        language_id: Number(data.language),
        country_id: Number(data.country),
      });
      if (result) {
        //Person created microservice(PersonCreated event) can be called form here to send event
        //Using route middlewares instead
        response.locals.data = "person created";
        next();
      }
    } catch (e) {
      response.status(500).json({ message: "Error creating- " + e.message });
    }
  }
  personCreated(request, response, next) {
    if (response.locals.data) {
      response.status(204).json({ message: "Created" });
    }
  }
  async getAllPerson(request, response) {
    try {
      const personModel = database.person;
      const languageModel = database.lang;
      const countryModel = database.country;
      const items = await personModel.findAll({
        include: [{ model: languageModel }, { model: countryModel }],
      });
      let persons = items.map((item) => {
        return {
          id: item.id,
          name: item.fname + " " + item.lname,
          telephone: item.telephone,
          birthdate: item.birthdate,
          country: item.country.country_name,
          language: item.lang.language_name,
          language_id: item.language_id,
          country_id: item.country_id,
        };
      });
      response.status(200).json({ items: persons });
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }
}
export const personControllrer = new Person();
