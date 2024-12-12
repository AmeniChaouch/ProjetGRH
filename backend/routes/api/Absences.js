const express = require("express");
const router = express.Router();
const Absences = require("../../models/Absences");

router.get("/", async (req, res) => {
  try {
    // Récupérer toutes les absences et peupler employeeId avec les détails de l'employé
    const absences = await Absences.find().populate({
      path: 'employeeId', // Le nom de la clé étrangère dans le schéma Absences
      select: 'name _id', // Sélectionnez les champs nécessaires
    });

    // Retourner les absences sous forme de JSON
    res.status(200).json(absences);
  } catch (err) {
    // En cas d'erreur
    res.status(500).json({ error: err.message });
  }
});
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await Absences.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.status(200).json({ message: 'Absence supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur', error });
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
 router.get('/absences', async (req, res) => {
  try {
    // Récupérer et trier toutes les absences
    const absences = await Absences.find().sort({ date: 1 }); // 1 pour tri croissant, -1 pour décroissant

    if (absences.length === 0) {
      return res.status(404).json({ message: 'Aucune absence trouvée.' });
    }

    res.status(200).json(absences);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors de la récupération des absences.' });
  }
});
router.get('/absences1', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // Vérifiez si les dates sont valides
    const start = startDate ? new Date(startDate) : new Date('1970-01-01');
    const end = endDate ? new Date(endDate) : new Date();

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ message: 'Dates invalides.' });
    }

    // Filtrer par intervalle et trier
    const absences = await Absences.find({
      date: { $gte: start, $lte: end },
    }).sort({ date: 1 });

    if (absences.length === 0) {
      return res.status(404).json({ message: 'Aucune absence trouvée pour cet intervalle.' });
    }

    res.status(200).json(absences);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors de la récupération des absences.' });
  }
});
router.get('/countByActiveDays', async (req, res) => {
  try {
    // Étape 1 : Grouper par date et compter les absences
    const absencesPerDay = await Absences.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } }, // Grouper par date
          count: { $sum: 1 }, // Compter les absences par jour
        },
      },
    ]);

    // Étape 2 : Calculer la somme des absences (total des valeurs "count")
    const totalAbsences = absencesPerDay.reduce((sum, day) => sum + day.count, 0);

    res.status(200).json({
      daysWithAbsences: absencesPerDay.length, // Nombre de jours avec des absences
      totalAbsences, // Nombre total d'absences
      details: absencesPerDay, // Détails des absences par jour
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors du calcul des absences.' });
  }
});


  module.exports = router;