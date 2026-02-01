const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

// CORS configuration - Allow all origins in production, specific in development
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
  : ['http://localhost:5173', 'http://localhost:3000'];

// Add Netlify domains if not already included
const netlifyDomains = [
  'https://pnecia.netlify.app',
  'https://*.netlify.app',
  'http://localhost:5173',
  'http://localhost:3000'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if origin is in allowed list
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    // Allow Netlify domains
    if (origin.includes('.netlify.app')) {
      return callback(null, true);
    }
    
    // In development, allow all
    if (process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    
    // In production, only allow specified origins
    callback(null, true); // For now, allow all - update this for stricter security
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Database connection check middleware
const checkDBConnection = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ 
      message: "Database connection not available. Please try again later.",
      error: "Database disconnected"
    });
  }
  next();
};

// Health check endpoint
app.get("/api/health", (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? "connected" : "disconnected";
  res.json({ 
    status: "ok", 
    message: "Server is running",
    database: dbStatus,
    timestamp: new Date().toISOString()
  });
});

// Apply database check to all API routes except health check
app.use("/api/admin", checkDBConnection, require("./routes/adminRoutes"));
app.use("/api/appointments", checkDBConnection, require("./routes/appointmentRoutes"));
app.use("/api/contact", checkDBConnection, require("./routes/contactRoutes"));
app.use("/api/doctors", checkDBConnection, require("./routes/doctorRoutes"));
app.use("/api/patients", checkDBConnection, require("./routes/patientRoutes"));
app.use("/api/gallery", checkDBConnection, require("./routes/galleryRoutes"));

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 404 handler for unmatched API routes
app.use((req, res, next) => {
  if (req.path.startsWith("/api")) {
    return res.status(404).json({ message: `API endpoint not found: ${req.method} ${req.path}` });
  }
  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start server after database connection
const startServer = async () => {
  try {
    // Check if MONGODB_URI is set
    if (!process.env.MONGODB_URI) {
      console.error("ERROR: MONGODB_URI environment variable is not set!");
      console.error("Please set MONGODB_URI in your .env file or environment variables.");
      process.exit(1);
    }

    // Check if JWT_SECRET is set
    if (!process.env.JWT_SECRET) {
      console.error("ERROR: JWT_SECRET environment variable is not set!");
      console.error("Please set JWT_SECRET in your .env file or environment variables.");
      process.exit(1);
    }

    // Connect to database
    await connectDB();
    
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
      console.log(`✅ Database: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);
      console.log("📋 API endpoints available:");
      console.log("  POST /api/admin/login");
      console.log("  POST /api/admin/register");
      console.log("  GET  /api/health");
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

// Handle database disconnection
mongoose.connection.on('disconnected', () => {
  console.error('⚠️  MongoDB disconnected!');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
});

// Start the server
startServer();
