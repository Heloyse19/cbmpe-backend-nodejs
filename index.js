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


app.get('/occurrences', async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      query = { codigoOcorrencia: { $regex: search, $options: 'i' } };
    }

    const occurrences = await Occurrence.find(query).sort({ dataOcorrencia: -1 });
    res.json(occurrences);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar ocorrências' });
  }
});

app.delete('/occurrences/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Occurrence.findByIdAndDelete(id);
    res.json({ message: 'Ocorrência deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar ocorrência' });
  }
});

app.put('/occurrences/:id', upload.single('photo'), async (req, res) => {
  try {
    const { id } = req.params;
    const occurrenceData = JSON.parse(req.body.data);
    
    let updateData = {
      ...occurrenceData
    };

    if (req.file) {
      updateData.photo = req.file.path;
    }

    const updatedOccurrence = await Occurrence.findByIdAndUpdate(id, updateData, { new: true });
    res.json(updatedOccurrence);
  } catch (error) {
    console.error("Erro PUT:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/occurrences', upload.single('photo'), async (req, res) => {
  try {
    const occurrenceData = JSON.parse(req.body.data);
    const photo = req.file ? req.file.path : null;
    
    const occurrence = new Occurrence({
      ...occurrenceData,
      photo
    });
    
    await occurrence.save();
    res.json(occurrence);
  } catch (error) {
    console.error("Erro POST:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log('Backend bombeiros listening on port 3000'));