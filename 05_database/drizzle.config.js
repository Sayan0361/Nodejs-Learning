const { defineConfig } = require("drizzle-kit");

const config = defineConfig({
    dialect: "postgresql", // which db u are using 
    out:"./drizzle",   // where to keep the migrated db
    schema:"./drizzle/schema.js" ,// where are ur schema files
    dbCredentials: {
        url:"postgres://postgres:admin@localhost:5433/mydb",
    },
})

module.exports = config;