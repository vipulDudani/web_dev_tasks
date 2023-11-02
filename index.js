const express=require("express");
const app=express();

const user=require("./routes/user");
app.use('/api/v1',user);

app.use(express.json());

require('dotenv').config();

app.get('/',(req,res)=>{
    res.send("hello jee kaise ho saare");
})

const PORT=process.env.PORT || 4000;


const dbConnect=require("./config/database");
dbConnect();



app.listen(PORT,(req,res)=>{
    console.log("port is running successfully");
})

