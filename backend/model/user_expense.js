const mongoose = require("mongoose");

const userexpenseSchema = new mongoose.Schema({
  email:{type:String},
  expense_type: { type: String },
  expense_amount: { type: Number },
  date: {type:String},
});

const user_expense = mongoose.model("user_expense", userexpenseSchema);
module.exports = user_expense;
