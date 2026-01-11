const express = require("express");
const router = express.Router();
const {
  getDoctors,
  getDoctorById,
  getDoctorByDoctorId,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} = require("../controllers/doctorController");
const { protect } = require("../middleware/authMiddleware");

// Public routes - specific routes must come before parameterized routes
router.get("/", getDoctors);
router.get("/doctorId/:doctorId", getDoctorByDoctorId);
router.get("/:id", getDoctorById);

// Protected routes (Admin only)
router.post("/", protect, createDoctor);
router.put("/:id", protect, updateDoctor);
router.delete("/:id", protect, deleteDoctor);

module.exports = router;

