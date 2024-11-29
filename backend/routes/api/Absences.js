const express = require("express");
const router = express.Router();
const Absences = require("../../models/Absences");

  router.get("/", async (req, res) => {
    try {
      // Récupérer toutes les absences et peupler l'employeeId avec l'ID de l'employé
      const absences = await Absences.find().populate('employeeId', '_id'); 
  
      // Retourner les absences sous forme de JSON
      res.status(200).json(absences);
    } catch (err) {
      // En cas d'erreur
      res.status(500).json({ error: err.message });
    }
  });
router.post("/save-date", async (req, res) => {
    const { date, employeeId } = req.body;
  
    if (!date || !employeeId) {
      return res.status(400).json({ message: "Date et ID employé requis." });
    }
  
    try {
      // Créer une absence dans MongoDB
      const newAbsence = new Absences({ date, employeeId });
      await newAbsence.save();
  
      res.status(201).json({ message: "Date enregistrée avec succès." });
    } catch (error) {
      console.error("Erreur lors de l'enregistrement dans MongoDB :", error);
      res.status(500).json({ message: "Erreur serveur." });
    }
  });
  
  module.exports = router;