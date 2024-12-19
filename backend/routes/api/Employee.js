const express = require("express");
const router = express.Router();
const Employee = require("../../models/Employee");
const mongoose = require("mongoose");

// Create Employee
router.post("/", async (req, res) => {
    try {
        const { name, profession, department, salary } = req.body;

        // Validate department is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(department)) {
            return res.status(400).json({ error: "Invalid department ID" });
        }

        const newEmployee = new Employee({
            name,
            profession,
            department, // This is an ObjectId
            salary
        });

        const savedEmployee = await newEmployee.save();
        res.status(201).json(savedEmployee);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to add employee" });
    }
});

// Get all Employees
router.get("/", async (req, res) => {
    try {
        const employees =
        
         await Employee.find()
            .populate({ path: 'department', select: 'departmentName' }); // Adjusted populate syntax
        res.status(200).json(employees);
    } catch (err) {
        console.error("Error fetching employees:", err);
        res.status(500).json({ error: err.message });
    }
});



// Update Employee
router.put("/:id", async (req, res) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEmployee) return res.status(404).json({ message: "Employee not found" });
        res.status(200).json(updatedEmployee);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete Employee
router.delete("/:id", async (req, res) => {
    try {
        const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
        if (!deletedEmployee) return res.status(404).json({ message: "Employee not found" });
        res.status(200).json({ message: "Employee deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.get('/totalEmployees', async (req, res) => {
    try {
      // Compter le nombre total d'employés
      const totalEmployees = await Employees.countDocuments();
  
      res.status(200).json({ totalEmployees });
    } catch (err) {
      console.error('Erreur lors de la récupération du nombre total d\'employés :', err);
      res.status(500).json({ message: 'Erreur lors de la récupération du nombre total d\'employés.' });
    }
  });

router.get('/employees-by-department', async (req, res) => {
    try {
      const employeeCountByDepartment = await Employee.aggregate([
        {
          $group: {
            _id: "$department",
            departmentName: { $first: "$department" }, // Grouper par département
            count: { $sum: 1 }, // Calculer le nombre d'employés
          },
        },
      ]);
  
      res.status(200).json(employeeCountByDepartment);
    } catch (err) {
      console.error('Erreur lors de la récupération des employés par département :', err);
      res.status(500).json({ message: 'Erreur lors de la récupération des employés par département.' });
    }
  });

  router.get('/employees-department', async (req, res) => {
    try {
      const employeeCountByDepartment = await Employee.aggregate([
        {
          $group: {
            _id: $department, // Grouper par l'identifiant du département
            count: { $sum: 1 }, // Compter les employés
          },
        },
         
      ]);
  
      res.status(200).json(employeeCountByDepartment);
    } catch (err) {
      res.status(500).json({ message: 'Erreur lors de la récupération des employés par département.' });
    }
  });
  
  
  
  
module.exports = router;
