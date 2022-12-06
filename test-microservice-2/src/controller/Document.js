import { database } from "../database/connection.js";

class Document {
  constructor() {}
  async addDocument(request, response) {
    const documentModel = database.document;
    const personDocument = database.personDocument;
    try {
      const data = request.body;
      const documentInsertResult = await documentModel.create({
        document_name: data.document_name,
        language: parseInt(Number(data.language)),
      });

      if (documentInsertResult?.dataValues?.id) {
        await personDocument.create({
          personId: parseInt(Number(data.person)),
          documentId: documentInsertResult?.dataValues?.id,
        });
        response.status(204).json({ message: "Created" });
      }
    } catch (e) {
      response.status(500).json({ message: "Error creating- " + e.message });
    }
  }
  async getAllDocumentsByPerson(request, response) {
    try {
      const documentModel = database.document;
      const Person = database.person;
      const language = database.lang;
      //   let documents =await Person.findAll({include:[{model:personDocument}],where:{person_id:8}})
      
      let documents = await documentModel.findAll({
        include: [
          { model: Person, where: { id: `${request.body.person}` } },
          { model: language },
        ],
      });
      let result = documents.map((doc) => {
        return {
          id: doc.id,
          name: doc.name,
          tag:
            `<${doc.lang.language_name}>` +
            doc.document_name +
            `</${doc.lang.language_name}>`,
          person: {
            id: doc.people[0].id,
            name: doc.people[0].fname + " " + doc.people[0].lname,
          },
        };
      });
      response.status(200).json({ items: result });
    } catch (error) {
      response
        .status(500)
        .json({ message: "Error creating- " + error.message });
    }
  }
}
export const documentControllrer = new Document();
