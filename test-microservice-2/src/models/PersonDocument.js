export const PersonDocumentModel = (sequelize, Sequelize) => {
  const personDocument = sequelize.define(
    "person_documents",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      personId: {
        type: Sequelize.INTEGER
      },
      documentId: {
        type: Sequelize.INTEGER
      },
    },
    {
      freezeTableName: true,
    }
  );
//   personDocument.associate = function(models){
//     personDocument.belongsToMany(models.person,{foreignKey:'person_id',sourceKey:'id'})
//   }
  return personDocument;
};


