const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Patient name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      match: [/^[\d\s\+\-\(\)]+$/, "Please enter a valid phone number"],
    },
    whatsappNumber: {
      type: String,
      trim: true,
      match: [/^[\d\s\+\-\(\)]+$/, "Please enter a valid WhatsApp number"],
    },
    age: {
      type: Number,
      min: [1, "Age must be at least 1"],
      max: [120, "Age cannot exceed 120"],
    },
    gender: {
      type: String,
      enum: {
        values: ["Male", "Female", "Other"],
        message: "Gender must be Male, Female, or Other",
      },
    },
    address: {
      type: String,
      trim: true,
      maxlength: [500, "Address cannot exceed 500 characters"],
    },
    aadharNumber: {
      type: String,
      trim: true,
      match: [/^\d{4}\s?\d{4}\s?\d{4}$/, "Aadhar number must be 12 digits"],
      validate: {
        validator: function (v) {
          if (!v) return true; // Optional field
          const cleaned = v.replace(/\s/g, "");
          return cleaned.length === 12 && /^\d+$/.test(cleaned);
        },
        message: "Aadhar number must be exactly 12 digits",
      },
    },
    medicalHistory: {
      type: String,
      trim: true,
      maxlength: [1000, "Medical history cannot exceed 1000 characters"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Patient", patientSchema);

