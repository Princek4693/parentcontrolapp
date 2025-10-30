const mongoose = require('mongoose');
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
  fullName: {
    type : String
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['parent', 'child'], default: 'child' },
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpire: {
  type: Date
  },
}, { timestamps: true });



module.exports = mongoose.model('User', userSchema);
