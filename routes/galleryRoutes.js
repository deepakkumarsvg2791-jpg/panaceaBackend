const express = require("express");
const router = express.Router();
const {
  getGalleryItems,
  getAllGalleryItems,
  getGalleryItemById,
  uploadImage,
  uploadVideo,
  updateGalleryItem,
  deleteGalleryItem,
} = require("../controllers/galleryController");
const { protect } = require("../middleware/authMiddleware");
const { uploadImage: multerUploadImage, uploadVideo: multerUploadVideo } = require("../middleware/upload");

// Multer error handler middleware
const handleMulterError = (err, req, res, next) => {
  if (err) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ message: "File too large" });
    }
    if (err.message) {
      return res.status(400).json({ message: err.message });
    }
    return res.status(400).json({ message: "File upload error" });
  }
  next();
};

// Public routes
router.get("/", getGalleryItems);
router.get("/admin", protect, getAllGalleryItems);
router.get("/:id", getGalleryItemById);

// Protected routes (Admin only)
router.post("/image", protect, multerUploadImage, handleMulterError, uploadImage);
router.post("/video", protect, multerUploadVideo, handleMulterError, uploadVideo);
router.put("/:id", protect, updateGalleryItem);
router.delete("/:id", protect, deleteGalleryItem);

module.exports = router;

