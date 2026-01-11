const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // Connection options for better reliability
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    });
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`   Database: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    
    if (error.message.includes('MONGODB_URI')) {
      console.error("   Please set MONGODB_URI in your .env file");
    } else if (error.message.includes('authentication')) {
      console.error("   Check your MongoDB username and password");
    } else if (error.message.includes('ECONNREFUSED')) {
      console.error("   Make sure MongoDB is running and accessible");
    } else if (error.message.includes('timeout')) {
      console.error("   MongoDB server is not responding. Check your connection string.");
    }
    
    throw error; // Re-throw to let server.js handle it
  }
};

module.exports = connectDB;

