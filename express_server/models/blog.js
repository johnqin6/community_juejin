// 博客集合设计
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const BlogSchema = new Schema({
  title: {
    type: String,
    required: true
  }, 
  author: {
    type: String,
    required: true
  }, 
  type: {
    type: String,
    required: true
  }, 
  content: {
    type: String
  }, 
  createOn: {
    type: Date,
    default: Date.now
  },
  lastUpdateTime: {
    type: Date,
    default: Date.now
  }, 
  star: {
    type: Number,
    default: 0
  }, 
  ready_num: {
    type: Number,
    default: 0
  }, 
  follow_num: {
    type: Number,
    default: 0
  }
})

module.exports = mongoose.model('Blog', BlogSchema)