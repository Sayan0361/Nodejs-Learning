import 'dotenv/config'
import express from "express"
import userRouter from "./routes/user.routes.js"
import jwt from "jsonwebtoken"

const app = express()
const PORT = process.env.PORT || 8000;

app.use(express.json())

// middleware
app.use(async(req,res,next)=>{
    try{
        const tokenHeader = req.headers["authorization"];
        // Header Authorization: Bearer <token>
        if(!tokenHeader){
            return next();
        }
        if(!tokenHeader.startsWith("Bearer")){
            return res.status(400).json({
                error:"Authorization Header must start with Bearer"
            })
        }

        const token = tokenHeader.split(" ")[1];  // bcoz tokenHeader = Bearer token
        // when we split by " ", the token = ["Bearer","nswbdejdhes.bdvencbedn.sbxhjdbend"]..so token = tokenHeader[1]
        const decoded = jwt.verify(token,process.env.JWT_SECRET); // verifies if the token is correct, and hasnt been tampered

        req.user = decoded; // set the request on header
        next();
    }catch(error){
        next();
    }
})

app.get("/",(req,res)=>{
    res.send("Server is okay")
})

app.use("/user",userRouter);

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})