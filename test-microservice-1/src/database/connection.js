import { dbConfig } from "./db.config.js";
import Sequelize from "sequelize";
import { languageModel } from "../models/Language.js";
import { countryModel } from "../models/Country.js";
import { personModel } from "../models/Person.js";
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: "0",
  logging: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.lang = languageModel(sequelize, Sequelize);
db.country = countryModel(sequelize, Sequelize);
db.person = personModel(sequelize, Sequelize);
db.person.belongsTo(db.lang, { foreignKey: "language_id" });
db.person.belongsTo(db.country, { foreignKey: "country_id" });
db.lang.hasOne(db.person, { foreignKey: "language_id" });
db.country.hasOne(db.person, { foreignKey: "country_id" });
export const database = db;
