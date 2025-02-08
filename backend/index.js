import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import userRoutes from './routes/User.route.js';
import genreRoutes from './routes/Genre.route.js';
import movieRoutes from './routes/movies.route.js';
import uploadRoutes from './routes/upload.route.js';

// Load environment variables early
dotenv.config();

const app = express();
const FRONTEND_URL = process.env.URL;

// Parse JSON and URL-encoded bodies, and cookies
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Enable CORS with credentials
app.use(cors({
  origin: FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// Additional middleware to handle preflight requests
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", FRONTEND_URL);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  
  // Respond quickly to OPTIONS requests
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  
  next();
});

// API routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/genre', genreRoutes);
app.use('/api/v1/movies', movieRoutes);
app.use('/api/v1/upload', uploadRoutes);

// Serve static files from the 'uploads' directory
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to database
connectDB();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
