const db = require("./db/index.js");
const {usersTable} = require("./drizzle/schema.js")

async function getAllUsers() {
    const users = await db.select().from(usersTable);
    console.log(`Users in DB are`,users)
    return users;
}

async function createUser({id,name,email}) {
    await db.insert(usersTable).values({
        id,
        name,
        email
    })
}

// createUser({id:101,name:"Sayan",email:"sayan@gmail.com"})
// createUser({id:102,name:"Sayani",email:"sayani@gmail.com"})
getAllUsers();