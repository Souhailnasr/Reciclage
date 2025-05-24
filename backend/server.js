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

app.use('/api', authRoutes);
app.use('/api/residences', residencesRouter);

// Connexion à MongoDB Atlas avec la base de données 'recycle'
mongoose.connect('mongodb+srv://alimejri:ali135@cluster0.ls1okaa.mongodb.net/recycle?retryWrites=true&w=majority&appName=Cluster0', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => {
    console.log('MongoDB Atlas connected successfully to recycle database');
    const PORT = 5000;
    app.listen(PORT, 'localhost', () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  }); 