const env = process.env.NODE_ENV   // 环境参数

// 配置
let MONGODB_CONF

// 开发环境
if (env === 'dev') {
  MONGODB_CONF = {
    host: 'localhost',
    port: '27017',
    database: 'juejin'
  }
}

// 生产环境配置
if (env === 'production') {
  MONGODB_CONF = {
    host: '127.0.0.1',
    port: '27017',
    database: 'juejin'
  }
}

module.exports = {
  MONGODB_CONF
}
