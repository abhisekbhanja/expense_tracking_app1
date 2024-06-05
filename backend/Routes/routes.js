const express = require("express");
const user_expense = require("../model/user_expense");
const User = require("../model/user");
const router = express.Router();
const verify=require('./verifytoken');
const bcrypt=require('bcrypt');
const jwt=require("jsonwebtoken");


router.get("/",verify, async(req, res) => {
   try {
      //console.log(req.loginuser);
      const result=await User.findOne({email:req.loginuser.email})
      const expense_user_data=await user_expense.find({email:req.loginuser.email})
      if(expense_user_data){
        res.status(200).json({data:expense_user_data,user:result})
        //console.log(expense_user_data)
      }
     } catch (error) {
      res.send(error)
      console.log(error);
     }
});

router.get("/test", async(req, res) => {
  try {
     //console.log(req.loginuser);
     //const result=await User.findOne({email:"Raja12@gmail.com"})
     const expense_user_data=await user_expense.aggregate(
      [
        {
          '$match': {
            'email': 'Raja12@gmail.com'
          }
        }, {
          '$group': {
            '_id': '$expense_type', 
            'user_expense': {
              '$sum': '$expense_amount'
            }
          }
        }
      ]
     )
     if(expense_user_data){
       res.status(200).json({data:expense_user_data})
       //console.log(expense_user_data)
     }
    } catch (error) {
     res.send(error)
     console.log(error);
    }
});

router.post("/register", (req, res) => {
   const { name,firstname, lastname, email } = req.body;
   const userpassword=req.body.password;
   //hashing password
    let password = bcrypt.hashSync(userpassword, 10);
   const date = new Date();
   const user = new User({ name,firstname, lastname, email,password,date});
   User.findOne({ email: req.body.email })
     .then((userexist) => {
       if (userexist) {
         return res.status(422).send("email already exist");
       }
       user
         .save()
         .then(() => {
           res.status(200).send("signup");
         })
         .catch(() => {
           res.status(500).send("error");
         });
     })
     .catch((err) => {
      res.status(500).send({error:err});
     });
 });
 
 router.post("/login",(req,res)=>{
   //console.log(req.body);
   User.findOne({email:req.body.email}).
   then((loginuser)=>{
     if(bcrypt.compareSync(req.body.password, loginuser.password))
     {
       const showdetails={email:loginuser.email}
       const token=jwt.sign(showdetails,"jddbjdsjbdsjkb");
       res.header("login-token",token);
       return res.status(200).json({token:token})}
     else{
       res.status(401).send("invalid credentials")
       //console.log("login failed");
     }
 
   })
   .catch((err)=>{
    res.status(401).send("invalid credentials")}
     )
 })

router.post("/add_expense",async(req,res)=>{
    console.log("hi");
  const expense_type=req.body.expense_type
  const expense_amount=req.body.expense_amount
  const email=req.body.email
  const date=new Date()
  const today_date=date.toLocaleDateString()
 try {
    const user_expense_data=new user_expense({email:email,expense_type:expense_type,expense_amount:expense_amount,
    date:today_date})
    await user_expense_data.save()
    res.status(200).send("expense added")
    console.log(expense_type,expense_amount,email);
 } catch (error) {
    console.log(error);
 }
});












module.exports = router;
