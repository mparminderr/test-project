import { databseConfig } from "./db.config.js";
import Sequelize from "sequelize";
import { documentModel } from "../models/Document.js";
import { PersonDocumentModel } from "../models/PersonDocument.js";
import {personModel} from '../models/Person.js';
import {language} from '../models/Language.js';

const sequelize = new Sequelize(
  databseConfig.DB,
  databseConfig.USER,
  databseConfig.PASSWORD,
  {
    host: databseConfig.HOST,
    dialect: databseConfig.dialect,
    operatorsAliases: "0",
    logging: false,
    pool: {
      max: databseConfig.pool.max,
      min: databseConfig.pool.min,
      acquire: databseConfig.pool.acquire,
      idle: databseConfig.pool.idle,
    },
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.document = documentModel(sequelize, Sequelize);
db.personDocument = PersonDocumentModel(sequelize, Sequelize);
db.person = personModel(sequelize,Sequelize);
db.lang = language(sequelize, Sequelize);
db.person.belongsToMany(db.document,{through:db.personDocument});
db.document.belongsToMany(db.person,{through:db.personDocument});
db.document.belongsTo(db.lang,{foreignKey:'language'});
db.lang.hasOne(db.document,{foreignKey:'language'})
export const database = db;
