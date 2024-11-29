const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    position: { type: String, required: true },
    department: { type: String },
    salary: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Employee", employeeSchema);
