
export const personModel = (sequelize, Sequelize) => {
    const Person = sequelize.define("person", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        country_id: {
            type: Sequelize.INTEGER
        },
        fname: {
            type: Sequelize.STRING
        },
        lname: {
            type: Sequelize.STRING
        },
        birthdate: {
            type: Sequelize.STRING,

        },
        telephone:{
            type:Sequelize.STRING,


        },
        language_id:{
            type:Sequelize.INTEGER,
            references: {
                model: 'lang',
                key: 'id'
              }
        }
    },{
        freezeTableName:true,
        indexes:[{
            name:'person_index',
            fields:[{
                name:'fname',
                order:'desc'
            },{
                name:'lname',

            },{
                name:'telephone'
            }]
        }]
    });

    return Person;
};