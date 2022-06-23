require('dotenv').config()

module.exports = {
    "type": "postgres",
    "host": process.env.POSTGRES_HOST,
    "port": process.env.POSTGRES_PORT,
    "username": process.env.POSTGRES_USERNAME,
    "password": process.env.POSTGRES_PASSWORD,
    "database": process.env.POSTGRES_DATABASE,
    "entities": ["dist/**/*.entity.js"],
    "synchronize": true,
    "ssl": false,
    "migrations": [
        "dist/shared/migrations/*.js"
    ],
    migrationsRun: false,
    cli: {
        "migrationsDir": "src/shared/migrations"
    },
    logging: true,
    logger: "file"
}