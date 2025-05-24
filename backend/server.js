require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const residencesRouter = require('./routes/residences');

const app = express();
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
app.use('/api', authRoutes);
app.use('/api/residences', residencesRouter);

// Connexion à MongoDB Atlas
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://alimejri:ali135@cluster0.ls1okaa.mongodb.net/recycle?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGODB_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => {
    console.log('MongoDB Atlas connected successfully');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  }); 