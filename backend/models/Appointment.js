const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: [true, "Patient is required"],
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: [true, "Doctor is required"],
    },
    appointmentDate: {
      type: Date,
      required: [true, "Appointment date is required"],
      validate: {
        validator: function (v) {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return v >= today;
        },
        message: "Appointment date cannot be in the past",
      },
    },
    appointmentTime: {
      type: String,
      required: [true, "Appointment time is required"],
      trim: true,
      match: [
        /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]\s?(AM|PM)$/i,
        "Please enter a valid time format (e.g., 09:00 AM)",
      ],
    },
    status: {
      type: String,
      enum: {
        values: ["Pending", "Confirmed", "Cancelled", "Completed"],
        message: "Status must be Pending, Confirmed, Cancelled, or Completed",
      },
      default: "Pending",
    },
    reason: {
      type: String,
      trim: true,
      maxlength: [200, "Reason cannot exceed 200 characters"],
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [1000, "Notes cannot exceed 1000 characters"],
    },
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
appointmentSchema.index({ appointmentDate: 1, appointmentTime: 1 });
appointmentSchema.index({ patient: 1 });
appointmentSchema.index({ doctor: 1 });

module.exports = mongoose.model("Appointment", appointmentSchema);

