require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar no MongoDB:', err));

const Occurrence = require('./models/Occurrence');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Rotas para ocorrências
app.get('/occurrences', async (req, res) => {
  const occurrences = await Occurrence.find().sort({ dataOcorrencia: -1 });
  res.json(occurrences);
});

app.post('/occurrences', upload.single('photo'), async (req, res) => {
  try {
    const occurrenceData = JSON.parse(req.body.data);
    const photo = req.file ? req.file.path : null;
    
    const occurrence = new Occurrence({
      ...occurrenceData,
      photo,
      latitude: req.body.latitude,
      longitude: req.body.longitude
    });
    
    await occurrence.save();
    res.json(occurrence);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log('Backend bombeiros listening on port 3000'));