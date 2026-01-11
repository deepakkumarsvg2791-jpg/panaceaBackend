const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Admin = require("../models/Admin");

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected");

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: "admin@panaceamedicare.com" });
    
    if (existingAdmin) {
      console.log("Admin already exists!");
      console.log("Email: admin@panaceamedicare.com");
      console.log("Password: admin123");
      process.exit(0);
    }

    // Create default admin
    const admin = await Admin.create({
      name: "Admin",
      email: "admin@panaceamedicare.com",
      password: "admin123",
    });

    console.log("✅ Default Admin Created Successfully!");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("📧 Email: admin@panaceamedicare.com");
    console.log("🔑 Password: admin123");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("⚠️  Please change the password after first login!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding admin:", error);
    process.exit(1);
  }
};

seedAdmin();

