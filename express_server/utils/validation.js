// 验证相关
/**
 * 验证邮箱是否合法
 * @param {String} str 
 */
function isEmail(str) {
  const reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
  return reg.test(str)
}

module.exports = {
  isEmail
}