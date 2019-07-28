// 用户集合设计
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CriticSchema = new Schema({
  critics: {
    type: String,
    required: true
  }, 
  content: {
    type: String,
    required: true
  }, 
  createOn: {
    type: Date,
    default: Date.now
  }, 
  star: {
    type: Number,
    default: 0
  }, 
  reply: String
})

module.exports = mongoose.model('Critic', CriticSchema)