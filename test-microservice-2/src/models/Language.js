
const languageModel = (sequelize, Sequelize) => {
    const Language = sequelize.define("lang", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        language_name: {
            type: Sequelize.STRING
        }
    },{
        freezeTableName:true
    });

    return Language;
};
export const language = languageModel;