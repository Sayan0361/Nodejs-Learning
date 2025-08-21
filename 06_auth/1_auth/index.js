// This authentication is based on 1 Security Guard = 1 Diary (Tokens)
// not scalable

import express from 'express';

const app = express();
const PORT = 8000;

app.use(express.json())

// DB
const DIARY = {}
const EMAILS = new Set();

app.get("/",(req,res)=>{
    res.send("Server working fine")
})

// hey, here is my car. pls park it and give me a token
app.post("/signup",(req,res)=>{
    const {name,email,password} = req.body;
    if(!name || !email || !password){
        // if any of the field is missing
        return res.status(400).json({
            error:"Bad Request: Missing required fields"
        });
    }
    if(EMAILS.has(email)){
        return res.status(400).json({
            error:"Bad Request: Email already taken"
        })
    }
    // create a token for ur user
    const token = `${Date.now()}`
    // insert the token in the diary
    DIARY[token] = {name,email,password};
    EMAILS.add(email);

    return res.json({status:"success",token})
});

app.get("/me",(req,res)=>{
    const {token} = req.body;
    if(!token){
        return res.status(400).json({error:"Bad Request: Missing token"})
    }
    if(!(token in DIARY)){
        return res.status(400).json({error:"Bad Request: Invalid token"})
    }
    const entry = DIARY[token];
    return res.json({data:entry});
})

app.post("/private-data",(req,res)=>{
    const { token } = req.body;
    if(!token){
        return res.status(400).json({error:"Bad Request: Missing token"})
    }
    if(!(token in DIARY)){
        return res.status(400).json({error:"Bad Request: Invalid token"})
    }
    const entry = DIARY[token];
    return res.json({data:{privateData:"Access Granted"}});
})

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})