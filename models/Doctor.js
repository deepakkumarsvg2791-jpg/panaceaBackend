const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    doctorId: {
      type: String,
      unique: true,
      sparse: true,
    },
    name: {
      type: String,
      required: [true, "Doctor name is required"],
      trim: true,
    },
    title: {
      type: String,
      trim: true,
    },
    specialty: {
      type: String,
      required: [true, "Specialty is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },
    phone: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      default: "",
    },
    qualifications: {
      type: [String],
      default: [],
    },
    timetable: {
      days: {
        type: String,
        default: "",
      },
      hours: {
        type: String,
        default: "",
      },
    },
    hospital: {
      type: String,
      default: "Panacea Medicare",
    },
    about: {
      type: String,
      default: "",
    },
    experience: {
      type: String,
      default: "",
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Doctor", doctorSchema);

