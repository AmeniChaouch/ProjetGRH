const express =require('express');
const mongoose =require ("mongoose");
const config =require ("config");
const app =express();
const mongo_url = config.get("mongo_url");
const bcryptjs=require("bcryptjs");
const cors =require ("cors");
const users=require("./routes/api/users");
app.use(express.json())
app.use(cors());

mongoose.set("strictQuery", true);
mongoose
    .connect(mongo_url)
    .then (()=> console.log("mongodb connected"))
    .catch((err)=> console.log(err))
app.use("/api/users",users);



// Routes
const employeeRoutes = require("./routes/api/Employee");
app.use("/api/employees", employeeRoutes);

const port =process.env.port || 3001;
app.listen(port, () => console.log (`server running on port ${port}`));
