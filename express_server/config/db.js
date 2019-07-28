const env = process.env.NODE_ENV   // 环境参数

// 配置
let MONGODB_CONF
let REDIS_CONF

// 开发环境
if (env === 'dev') {
  MONGODB_CONF = {
    host: 'localhost',
    port: '27017',
    database: 'juejin'
  }

  // redis
  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
  }
}

// 生产环境配置
if (env === 'production') {
  MONGODB_CONF = {
    host: '127.0.0.1',
    port: '27017',
    database: 'juejin'
  }

  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
  }
}

module.exports = {
  MONGODB_CONF,
  REDIS_CONF
}
