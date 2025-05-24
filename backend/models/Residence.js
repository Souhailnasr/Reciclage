const mongoose = require('mongoose');

const residenceSchema = new mongoose.Schema({
  nom_residance: {
    type: String,
    required: true
  },
  rue: {
    type: String,
    required: true
  },
  adresse: {
    type: String,
    required: true
  },
  blocs: [{
    nom_bloc: {
      type: String,
      required: true
    },
    appartements: [{
      type: Number,
      required: true
    }]
  }]
}, {
  timestamps: true,
  collection: 'residance'
});

module.exports = mongoose.model('Residence', residenceSchema); 