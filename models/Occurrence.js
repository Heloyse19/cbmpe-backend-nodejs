const mongoose = require('mongoose');

const OccurrenceSchema = new mongoose.Schema({
  // Dados do Formulário 1
  grupo: String,
  codigoOcorrencia: String,
  associadoDesastre: Boolean,
  codigoDesastre: String,
  eventos: [String],
  outrosDesastres: String,
  numeroVitimas: Number,
  
  // Dados do Formulário 2
  localMergulho: String,
  visibilidadeAgua: String,
  ambiente: String,
  tipoFundo: String,
  correnteza: Boolean,
  coordenadasLat: Number,
  coordenadasLong: Number,
  numeroMergulhadores: Number,
  
  // Dados gerais
  photo: String,
  latitude: Number,
  longitude: Number,
  dataOcorrencia: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Occurrence', OccurrenceSchema);