
export const countryModel = (sequelize, Sequelize) => {
    const Country = sequelize.define("country", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        country_name: {
            type: Sequelize.STRING
        }
    },{
        freezeTableName:true
    });

    return Country;
};