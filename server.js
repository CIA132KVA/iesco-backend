
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const uploadRoutes = require('./routes/upload');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api/upload', uploadRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(5000, () => console.log('Server running on http://localhost:5000'));
})
.catch(err => console.error(err));
