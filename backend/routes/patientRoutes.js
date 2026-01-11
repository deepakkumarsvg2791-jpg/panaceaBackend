const express = require("express");
const router = express.Router();
const {
  getPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
} = require("../controllers/patientController");
const { protect } = require("../middleware/authMiddleware");

// All routes are protected (Admin only)
router.get("/", protect, getPatients);
router.get("/:id", protect, getPatientById);
router.post("/", protect, createPatient);
router.put("/:id", protect, updatePatient);
router.delete("/:id", protect, deletePatient);

module.exports = router;

