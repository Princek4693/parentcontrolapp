const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {
    type : String
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['parent', 'child'], default: 'child' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
