const Doctor = require("../models/Doctor");

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Public
const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().sort({ createdAt: -1 });
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get doctor by ID
// @route   GET /api/doctors/:id
// @access  Public
const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (doctor) {
      res.json(doctor);
    } else {
      res.status(404).json({ message: "Doctor not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get doctor by doctorId
// @route   GET /api/doctors/doctorId/:doctorId
// @access  Public
const getDoctorByDoctorId = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ doctorId: req.params.doctorId });
    if (doctor) {
      res.json(doctor);
    } else {
      res.status(404).json({ message: "Doctor not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new doctor
// @route   POST /api/doctors
// @access  Private
const createDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);
    res.status(201).json(doctor);
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: errors.join(", ") });
    }
    if (error.code === 11000) {
      return res.status(400).json({ message: "Doctor with this email already exists" });
    }
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update doctor
// @route   PUT /api/doctors/:id
// @access  Private
const updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (doctor) {
      Object.keys(req.body).forEach((key) => {
        doctor[key] = req.body[key];
      });
      const updatedDoctor = await doctor.save();
      res.json(updatedDoctor);
    } else {
      res.status(404).json({ message: "Doctor not found" });
    }
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: errors.join(", ") });
    }
    if (error.code === 11000) {
      return res.status(400).json({ message: "Doctor with this email already exists" });
    }
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete doctor
// @route   DELETE /api/doctors/:id
// @access  Private
const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (doctor) {
      await doctor.deleteOne();
      res.json({ message: "Doctor removed" });
    } else {
      res.status(404).json({ message: "Doctor not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDoctors,
  getDoctorById,
  getDoctorByDoctorId,
  createDoctor,
  updateDoctor,
  deleteDoctor,
};

