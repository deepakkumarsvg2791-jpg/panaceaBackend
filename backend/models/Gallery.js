const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, "Type is required"],
      enum: {
        values: ["image", "video"],
        message: "Type must be either 'image' or 'video'",
      },
    },
    title: {
      type: String,
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    // For images: file path, For videos: YouTube URL or file path
    url: {
      type: String,
      required: [true, "URL is required"],
    },
    // For videos: YouTube video ID (if YouTube video)
    youtubeId: {
      type: String,
      trim: true,
    },
    // Thumbnail URL (for videos or custom thumbnails)
    thumbnail: {
      type: String,
    },
    // File path on server (for uploaded files)
    filePath: {
      type: String,
    },
    // File size in bytes
    fileSize: {
      type: Number,
    },
    // MIME type
    mimeType: {
      type: String,
    },
    // Display order
    order: {
      type: Number,
      default: 0,
    },
    // Active status
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
gallerySchema.index({ type: 1, active: 1 });
gallerySchema.index({ order: 1 });

module.exports = mongoose.model("Gallery", gallerySchema);

