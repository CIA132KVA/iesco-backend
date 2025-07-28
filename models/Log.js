
const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  erp: String,
  paraType: String,
  fileName: String,
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Log', logSchema);
