// 用户集合设计
const mongoose = require('mongoose')
const {  isEmail } = require('../utils/validation')

const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: isEmail,
      message: '`{PATH}`必须是正确的邮箱格式！'
    }
  },
  password: {
    type: String,
    required: true
  }, 
  avatar: String,
  positiion: String, 
  company: String, 
  introduce: String, 
  createOn: {
    type: Date,
    default: Date.now
  }, 
  follow_num: {
    type: Number,
    default: 0
  },
  state: {
    type: Number,
    enum: [0, 1],
    default: 1
  }
})

module.exports = mongoose.model('User', UserSchema)