const express =require('express');
const mongoose =require ("mongoose");
const config =require ("config");
const app =express();
const mongo_url = config.get("mongo_url");
const bcryptjs=require("bcryptjs");
const cors =require ("cors");
app.use(express.json())
app.use(cors());

mongoose.set("strictQuery", true);
mongoose
    .connect(mongo_url)
    .then (()=> console.log("mongodb connected"))
    .catch((err)=> console.log(err))


const users=require("./routes/api/users");
app.use("/api/users",users);





///////
const departmentRoutes = require("./routes/api/Departments");
app.use("/api/departments", departmentRoutes);
////////
const absencesRoutes = require("./routes/api/Absences");
app.use("/api/absences", absencesRoutes);

const port =process.env.port || 3001;
app.listen(port, () => console.log (`server running on port ${port}`));
