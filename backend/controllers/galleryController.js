const Gallery = require("../models/Gallery");
const fs = require("fs");
const path = require("path");

// @desc    Get all gallery items
// @route   GET /api/gallery
// @access  Public
const getGalleryItems = async (req, res) => {
  try {
    const { type } = req.query;
    const query = { active: true };
    if (type && (type === "image" || type === "video")) {
      query.type = type;
    }

    const items = await Gallery.find(query).sort({ order: 1, createdAt: -1 });
    console.log(`📥 Fetched ${items.length} gallery items (type: ${type || "all"})`);
    res.json(items);
  } catch (error) {
    console.error("❌ Error fetching gallery items:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all gallery items (Admin - includes inactive)
// @route   GET /api/gallery/admin
// @access  Private
const getAllGalleryItems = async (req, res) => {
  try {
    const { type } = req.query;
    const query = {};
    if (type && (type === "image" || type === "video")) {
      query.type = type;
    }

    const items = await Gallery.find(query).sort({ order: 1, createdAt: -1 });
    console.log(`📥 Fetched ${items.length} gallery items (admin, type: ${type || "all"})`);
    res.json(items);
  } catch (error) {
    console.error("❌ Error fetching gallery items (admin):", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get gallery item by ID
// @route   GET /api/gallery/:id
// @access  Public
const getGalleryItemById = async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: "Gallery item not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Upload image
// @route   POST /api/gallery/image
// @access  Private
const uploadImage = async (req, res) => {
  try {
    console.log("📤 Upload image request received");
    console.log("File:", req.file ? "Present" : "Missing");
    console.log("Body:", req.body);

    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }

    // Parse form data fields
    const { title, description, order } = req.body;
    const fileUrl = `/uploads/images/${req.file.filename}`;

    console.log("Creating gallery item...");
    const galleryItem = await Gallery.create({
      type: "image",
      title: title || req.file.originalname,
      description: description || "",
      url: fileUrl,
      filePath: req.file.path,
      fileSize: req.file.size,
      mimeType: req.file.mimetype,
      order: order ? parseInt(order) : 0,
      active: true,
    });

    console.log("✅ Gallery item created:", galleryItem._id);
    res.status(201).json(galleryItem);
  } catch (error) {
    console.error("❌ Error uploading image:", error);
    // Delete uploaded file if database save fails
    if (req.file && req.file.path) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (unlinkError) {
        console.error("Error deleting file:", unlinkError);
      }
    }
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: errors.join(", ") });
    }
    res.status(500).json({ message: error.message });
  }
};

// @desc    Upload video
// @route   POST /api/gallery/video
// @access  Private
const uploadVideo = async (req, res) => {
  try {
    console.log("📤 Upload video request received");
    console.log("File:", req.file ? "Present" : "Missing");
    console.log("Body:", req.body);

    // Parse form data - multer handles file, but we need to parse other fields
    const { title, description, youtubeUrl, youtubeId, thumbnail, order } = req.body;

    // Check if YouTube URL or file upload
    if (youtubeUrl || youtubeId) {
      // YouTube video
      const videoId = youtubeId || extractYouTubeId(youtubeUrl);
      if (!videoId) {
        return res.status(400).json({ message: "Invalid YouTube URL or ID" });
      }

      console.log("Creating YouTube video gallery item...");
      const galleryItem = await Gallery.create({
        type: "video",
        title: title || "Untitled Video",
        description: description || "",
        url: youtubeUrl || `https://www.youtube.com/watch?v=${videoId}`,
        youtubeId: videoId,
        // Use hqdefault as default since it's more reliable than maxresdefault
        thumbnail: thumbnail || `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        order: order ? parseInt(order) : 0,
        active: true,
      });

      console.log("✅ Gallery item created:", galleryItem._id);
      res.status(201).json(galleryItem);
    } else if (req.file) {
      // File upload
      const fileUrl = `/uploads/videos/${req.file.filename}`;

      console.log("Creating video file gallery item...");
      const galleryItem = await Gallery.create({
        type: "video",
        title: title || req.file.originalname,
        description: description || "",
        url: fileUrl,
        filePath: req.file.path,
        fileSize: req.file.size,
        mimeType: req.file.mimetype,
        thumbnail: thumbnail || "",
        order: order ? parseInt(order) : 0,
        active: true,
      });

      console.log("✅ Gallery item created:", galleryItem._id);
      res.status(201).json(galleryItem);
    } else {
      return res.status(400).json({ message: "Please provide YouTube URL or upload a video file" });
    }
  } catch (error) {
    console.error("❌ Error uploading video:", error);
    // Delete uploaded file if database save fails
    if (req.file && req.file.path) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (unlinkError) {
        console.error("Error deleting file:", unlinkError);
      }
    }
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: errors.join(", ") });
    }
    res.status(500).json({ message: error.message });
  }
};

// Helper function to extract YouTube ID from URL
const extractYouTubeId = (url) => {
  if (!url) return null;
  
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/.*[?&]v=([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  // If it's already just an ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) {
    return url;
  }

  return null;
};

// @desc    Update gallery item
// @route   PUT /api/gallery/:id
// @access  Private
const updateGalleryItem = async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Gallery item not found" });
    }

    const { title, description, order, active, thumbnail } = req.body;

    if (title !== undefined) item.title = title;
    if (description !== undefined) item.description = description;
    if (order !== undefined) item.order = parseInt(order);
    if (active !== undefined) item.active = active;
    if (thumbnail !== undefined) item.thumbnail = thumbnail;

    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: errors.join(", ") });
    }
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete gallery item
// @route   DELETE /api/gallery/:id
// @access  Private
const deleteGalleryItem = async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Gallery item not found" });
    }

    // Delete file from server if it exists
    if (item.filePath && fs.existsSync(item.filePath)) {
      try {
        fs.unlinkSync(item.filePath);
      } catch (fileError) {
        console.error("Error deleting file:", fileError);
      }
    }

    await item.deleteOne();
    res.json({ message: "Gallery item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getGalleryItems,
  getAllGalleryItems,
  getGalleryItemById,
  uploadImage,
  uploadVideo,
  updateGalleryItem,
  deleteGalleryItem,
};

