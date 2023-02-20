// Require Mongoose
const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  active: { type: Number, min: 0, max: 1, default: 1 },
  age: { type: Number, min: 18, max: 65, required: true },
});

module.exports = { Employee: mongoose.model("Employee", employeeSchema) };
