const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGINS || '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['*']
}));
app.use(express.json({ limit: '10mb' }));

// MongoDB Connection
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb+srv://arun:Arun2582558s@resume.vzvzlhi.mongodb.net/?appName=resume';
const DB_NAME = process.env.DB_NAME || 'resume_builder';

mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));


// Resume Schema
const resumeSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: () => uuidv4()
  },
  personalInfo: {
    fullName: String,
    email: String,
    phone: String,
    location: String,
    linkedin: String,
    website: String,
    profilePhoto: String
  },
  summary: String,
  workExperience: [{
    id: String,
    position: String,
    company: String,
    location: String,
    startDate: String,
    endDate: String,
    current: Boolean,
    description: String
  }],
  education: [{
    id: String,
    degree: String,
    institution: String,
    location: String,
    graduationDate: String,
    gpa: String
  }],
  skills: [String],
  projects: [{
    id: String,
    name: String,
    description: String,
    technologies: String,
    link: String
  }],
  certifications: [{
    id: String,
    name: String,
    issuer: String,
    date: String
  }],
  languages: [{
    id: String,
    name: String,
    proficiency: String
  }],
  achievements: String,
  interests: String,
  selectedTemplate: {
    type: String,
    default: 'modern'
  },
  lastDownloadSessionId: {
    type: String
  },
  lastDownloadedAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  versionKey: false
});

const Resume = mongoose.model('Resume', resumeSchema);

// API Routes
const apiRouter = express.Router();

// Test route
apiRouter.get('/', (req, res) => {
  res.json({ message: 'Resume Builder API is running' });
});

// Save resume
apiRouter.post('/resume', async (req, res) => {
  try {
    const resumeData = req.body;
    
    // If resume with userId exists, update it
    if (resumeData.userId) {
      const updatedResume = await Resume.findOneAndUpdate(
        { userId: resumeData.userId },
        { ...resumeData, updatedAt: Date.now() },
        { new: true, upsert: true }
      );
      res.json(updatedResume);
    } else {
      // Create new resume
      const newResume = new Resume(resumeData);
      await newResume.save();
      res.status(201).json(newResume);
    }
  } catch (error) {
    console.error('Error saving resume:', error);
    res.status(500).json({ error: 'Failed to save resume' });
  }
});

// Get resume by userId
apiRouter.get('/resume/:userId', async (req, res) => {
  try {
    const resume = await Resume.findOne({ userId: req.params.userId });
    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }
    res.json(resume);
  } catch (error) {
    console.error('Error fetching resume:', error);
    res.status(500).json({ error: 'Failed to fetch resume' });
  }
});

// Save resume download session with session ID
apiRouter.post('/resume/download-session', async (req, res) => {
  try {
    const { resumeData, sessionId } = req.body;
    
    // Generate session ID if not provided
    const finalSessionId = sessionId || uuidv4();
    
    // Save or update the resume with session ID
    const userId = resumeData.userId || uuidv4();
    
    const updatedResume = await Resume.findOneAndUpdate(
      { userId: userId },
      { 
        ...resumeData, 
        userId: userId,
        updatedAt: Date.now(),
        lastDownloadSessionId: finalSessionId,
        lastDownloadedAt: Date.now()
      },
      { new: true, upsert: true }
    );
    
    console.log(`✅ Resume saved with session ID: ${finalSessionId}`);
    
    res.json({
      success: true,
      sessionId: finalSessionId,
      userId: userId,
      resume: updatedResume
    });
  } catch (error) {
    console.error('Error saving download session:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to save download session' 
    });
  }
});

// Mount API router
app.use('/api', apiRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

// Handle graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed');
  process.exit(0);
});