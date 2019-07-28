const { MONGODB_CONF } = require('../config/db')
const mongoose = require('mongoose')
const User = require('../models/user')
const Blog = require('../models/blog')
const Critic = require('../models/critic')

// mongodb数据库服务器地址
const dbUrl = `mongodb://${MONGODB_CONF.host}:${MONGODB_CONF.port}/${MONGODB_CONF.database}`

mongoose.connect(dbUrl, {
  useNewUrlParser: true
}).then(() => console.log('成功连接数据库'))
.catch(err => console.log(err));

// 防止findOneAndUpdate()内部会使用findAndModify驱动，驱动即将被废弃，弹出警告
mongoose.set('useFindAndModify', false)

module.exports = {
  User,
  Blog,
  Critic
}
