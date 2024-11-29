const mongoose = require("mongoose");

const absencesSchema = new mongoose.Schema({
    employeeId: {
    type: mongoose.Schema.Types.ObjectId, // References an employee by their ID
    ref: 'Employee', // Assumes you have an Employee model
    required: true
  },
    date: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model("absences", absencesSchema);