
const express = require('express');
const multer = require('multer');
const path = require('path');
const Log = require('../models/Log');
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + '-' + file.fieldname + ext);
  },
});

const upload = multer({ storage });

router.post('/', upload.single('file'), async (req, res) => {
  const { erp, paraType } = req.body;

  if (!req.file || !erp || !paraType) {
    return res.status(400).json({ error: 'Missing data' });
  }

  const log = new Log({
    erp,
    paraType,
    fileName: req.file.filename,
  });

  await log.save();
  res.status(200).json({ message: 'Upload successful', file: req.file.filename });
});

module.exports = router;
