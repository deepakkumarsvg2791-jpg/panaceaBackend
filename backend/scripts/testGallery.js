require("dotenv").config();
const mongoose = require("mongoose");
const Gallery = require("../models/Gallery");

const testGallery = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected");

    // Test creating a gallery item
    const testItem = await Gallery.create({
      type: "video",
      title: "Test Video",
      description: "This is a test video",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      youtubeId: "dQw4w9WgXcQ",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
      order: 0,
      active: true,
    });

    console.log("✅ Gallery item created successfully:", testItem);

    // Count documents
    const count = await Gallery.countDocuments();
    console.log(`✅ Total gallery items in database: ${count}`);

    // Clean up - delete test item
    await Gallery.deleteOne({ _id: testItem._id });
    console.log("✅ Test item deleted");

    await mongoose.connection.close();
    console.log("✅ Database connection closed");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    console.error(error);
    process.exit(1);
  }
};

testGallery();

