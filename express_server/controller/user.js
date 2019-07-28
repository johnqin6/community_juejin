const { User } = require('../db/mongodb')
const { genPassword } = require('../utils/crypto')

/**
 * 用户注册
 * @param {*} userData 
 */
const register = (userData = {}) => {
  const email = userData.email
  const username = userData.username
  const password = genPassword(userData.password)
  const avatar = userData.avatar

  return User.findOne({ email: email}).then(docs => {
    if (docs !== null) {
      return {
        message: '该邮箱已注册！'
      }
    }
    const user = new User({
      email,
      username,
      password,
      avatar
    })
    return user.save().then(doc => {
      if (doc) return true
    }).catch(err => {
      console.log(err)
    })
  })
}

/**
 * 登录
 * @param {*} username 
 * @param {*} password 
 */
const login = (username, password) => {
  // 密码加密
  password = genPassword(password)
  return User.findOne({ 
    $or: [{ email: username }, { username: username }],
    password: password,
    state: 1
  }).then(doc => {
    if (doc) return doc
  }).catch(err => {
    console.log(err)
    return false
  })
}

/**
 * 更新用户数据
 * @param {*} id 
 * @param {*} userData 
 */
const updateUser = (id, userData = {}) => {
  return User.findByIdAndUpdate(id, userData).then(doc => {
    if (doc) return true
    return false
  })
}

const changePassword = (id, password, password2) => {
  // 密码加密
  password = genPassword(password)
  password2 = genPassword(password2)
  return User.findById(id).then(doc => {
    if (password !== doc.password) {
      return false
    }
    return User.findByIdAndUpdate(id, { password: password2 })
  }).then(doc => {
    if (doc) {
      return true
    } 
    return false
  })
}

/**
 * 注销用户
 * @param {*} id 
 */
const logout = id => {
  return User.findByIdAndUpdate(id, { state: 0}).then(() => {
    return true
  }).catch(err => {
    console.log(err)
    return false
  })
}

module.exports = {
  register,
  login,
  logout,
  updateUser,
  changePassword
}

