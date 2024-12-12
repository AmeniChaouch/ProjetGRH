const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    name: { type: String},
    profession: { type: String}, // Selected profession
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    salary: { type: Number },
    username: {type:String,required:true},
    gender: {type:String,required:true},

     email: {type:String,required:true,unique:true},
    password: {type:String,required:true},
    role: {type:String }
}, { timestamps: true });

module.exports = mongoose.model("Employee", employeeSchema);
