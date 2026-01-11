const Appointment = require("../models/Appointment");
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");

// @desc    Create a new appointment
// @route   POST /api/appointments
// @access  Public
const createAppointment = async (req, res) => {
  try {
    const {
      patientName,
      email,
      phone,
      whatsappNumber,
      gender,
      age,
      address,
      aadharNumber,
      doctorName,
      appointmentDate,
      appointmentTime,
      reason,
      notes,
    } = req.body;

    // Create or find patient
    let patient = await Patient.findOne({ email });
    if (!patient) {
      patient = await Patient.create({
        name: patientName,
        email,
        phone,
        whatsappNumber: whatsappNumber || phone,
        age: parseInt(age),
        gender,
        address,
        aadharNumber,
        medicalHistory: notes,
      });
    } else {
      // Update patient info if exists
      patient.name = patientName;
      patient.phone = phone;
      if (whatsappNumber) {
        patient.whatsappNumber = whatsappNumber;
      }
      patient.age = parseInt(age);
      patient.gender = gender;
      patient.address = address;
      if (aadharNumber) {
        patient.aadharNumber = aadharNumber;
      }
      if (notes) {
        patient.medicalHistory = notes;
      }
      await patient.save();
    }

    // Find or create doctor by name
    let doctor = await Doctor.findOne({ name: doctorName });
    if (!doctor) {
      // Create a basic doctor entry if not found
      doctor = await Doctor.create({
        name: doctorName,
        email: `${doctorName.toLowerCase().replace(/\s+/g, '.')}@panaceamedicare.com`,
        specialization: doctorName,
        phone: '+91 00000 00000',
      });
    }

    // Create appointment
    const appointment = await Appointment.create({
      patient: patient._id,
      doctor: doctor._id,
      appointmentDate,
      appointmentTime,
      reason,
      notes,
    });

    const populatedAppointment = await Appointment.findById(
      appointment._id
    ).populate("patient doctor");

    res.status(201).json(populatedAppointment);
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: errors.join(", ") });
    }
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Private
const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patient doctor")
      .sort({ appointmentDate: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get appointment by ID
// @route   GET /api/appointments/:id
// @access  Private
const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id).populate(
      "patient doctor"
    );

    if (appointment) {
      res.json(appointment);
    } else {
      res.status(404).json({ message: "Appointment not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update appointment
// @route   PUT /api/appointments/:id
// @access  Private
const updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (appointment) {
      appointment.patient = req.body.patient || appointment.patient;
      appointment.doctor = req.body.doctor || appointment.doctor;
      appointment.appointmentDate =
        req.body.appointmentDate || appointment.appointmentDate;
      appointment.appointmentTime =
        req.body.appointmentTime || appointment.appointmentTime;
      appointment.status = req.body.status || appointment.status;
      appointment.reason = req.body.reason || appointment.reason;
      appointment.notes = req.body.notes || appointment.notes;

      const updatedAppointment = await appointment.save();
      const populatedAppointment = await Appointment.findById(
        updatedAppointment._id
      ).populate("patient doctor");

      res.json(populatedAppointment);
    } else {
      res.status(404).json({ message: "Appointment not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete appointment
// @route   DELETE /api/appointments/:id
// @access  Private
const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (appointment) {
      await appointment.deleteOne();
      res.json({ message: "Appointment removed" });
    } else {
      res.status(404).json({ message: "Appointment not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
};

