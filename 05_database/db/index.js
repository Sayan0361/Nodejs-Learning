const { drizzle } = require('drizzle-orm/node-postgres')


// postgres://<username>:<password>@<host>:<port>/<db_name>
// store this in .env
const db = drizzle("postgres://postgres:admin@localhost:5433/mydb")

module.exports = db;


// no need to learn how to setup: https://orm.drizzle.team/docs/get-started/postgresql-new
// const db = drizzle(process.env.DATABASE_URL); u will .env file in real world applications
// drizzle-orm is used to send & receive data from db
// and drizzle-kit is used send your schema, or ui for DB; anything extra features not related to data