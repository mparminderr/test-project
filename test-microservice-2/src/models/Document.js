

export const documentModel = (sequelize, Sequelize) => {
    const Document = sequelize.define("document", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        document_name: {
            type: Sequelize.STRING,
            unique:true
        },
        language:{
            type:Sequelize.INTEGER,
            references: {
                model: 'lang',
                key: 'id'
              }
        }
    },{
        freezeTableName:true
    });
   
    return Document;
};