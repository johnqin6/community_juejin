// 密码加密文件
const crypto = require('crypto')  // nodejs内置的加密方法

// 密钥 自定义
const SECRET_KEY = 'Who112938#adj_sds'

// md5加密
function md5(content) {
  let md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex')
}

// 加密函数
function genPassword(pwd) {
  const str = `password=${pwd}&key=${SECRET_KEY}`
  return md5(str)
}

module.exports = {
  genPassword
}