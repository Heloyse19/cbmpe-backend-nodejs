const mongoose = require('mongoose');

const OccurrenceSchema = new mongoose.Schema({

  grupo: String,
  codigoOcorrencia: String,

  tipoSalvamento: String, 
  localOcorrencia: String, 
  grauAfogamento: String, 
  cadaverLocalizado: Boolean, 
  
 
  resgateAnimal: Boolean,
  tipoAnimal: String,
  estadoAnimal: String,
  
 
  postoComandante: String,
  nomeGuerra: String,


  associadoDesastre: Boolean,
  codigoDesastre: String,
  eventos: [String],
  outrosDesastres: String,
  numeroVitimas: Number,
  
 
  houveMergulho: Boolean, 
  
  localMergulho: String,
  profundidade: Number, 
  visibilidadeAgua: String, 
  ambiente: String,
  tipoFundo: String, 
  correnteza: Boolean,
  numeroMergulhadores: Number,
  
  coordenadasLat: Number, 
  coordenadasLong: Number,

  photo: String,
  latitude: Number, 
  longitude: Number, 
  dataOcorrencia: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Occurrence', OccurrenceSchema);