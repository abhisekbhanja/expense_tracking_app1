const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password:{type:String},
  date: {type:String},
});

const user = mongoose.model("user_expense_detais", userSchema);
module.exports = user;
