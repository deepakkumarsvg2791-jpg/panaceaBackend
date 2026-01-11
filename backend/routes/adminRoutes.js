const express = require("express");
const router = express.Router();
const {
  registerAdmin,
  loginAdmin,
  getAdminProfile,
  changePassword,
  updateProfile,
} = require("../controllers/adminController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/profile", protect, getAdminProfile);
router.put("/profile", protect, updateProfile);
router.put("/change-password", protect, changePassword);

module.exports = router;

