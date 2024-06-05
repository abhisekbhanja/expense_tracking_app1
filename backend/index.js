const express=require("express");
const app=express();
const cors=require("cors");
const mongoose=require("mongoose");
const route=require("./Routes/routes")
require('dotenv').config()

app.use(express.json())
mongoose.set('strictQuery', false)
mongoose.connect(process.env.DB_URL,
{
    useNewUrlParser: true,
   
    useUnifiedTopology: true,
  }
,(err)=>{
  
    if(err){console.log("database not connected!!"+err)}
    else{console.log("database connected")
  
  }
})

app.use(cors());
app.use("/",route);
//for port
const port=process.env.PORT || 7000


app.listen(port,()=>{
  const date = new Date();
    console.log("server started at: "+port+ " at "+date.toLocaleTimeString()+" "+date.toLocaleDateString())
    console.log("loading....");
  


})
