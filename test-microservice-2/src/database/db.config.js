const dbConfig = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "<your password>",
    DB: "test",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}
export const databseConfig = dbConfig