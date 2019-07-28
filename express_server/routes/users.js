const express = require('express');
const router = express.Router();
const {  
  register,
  login,
  logout,
  updateUser,
  changePassword
} = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../models/resModel')
const gravatar = require('gravatar')
const loginCheck = require('../middleware/loginCheck')

// 注册
router.post('/register', (req, res, next) => {
  // 获取头像
  req.body.avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'})
  return register(req.body).then(val => {
    if (val === true) { 
      res.send(new SuccessModel('注册成功！'))
      return 
    }
    res.send(new ErrorModel(val))
  })
});

// 登录
router.post('/login', (req, res, next) => {
  const { username, password } = req.body
  const result = login(username, password)
  return result.then(data => {
    if (data.username) {
      req.session.userid = data._id
      req.session.username = data.username
      req.session.email = data.email
      res.send(new SuccessModel('登录成功! '))
      return 
    }
    res.send(new ErrorModel('登录失败！'))
  })
})

// 修改密码
router.post('/changePwd', loginCheck, (req, res, next) => {
  const password = req.body.password
  const password2 = req.body.password2
  changePassword(req.session.userid, password, password2).then(val => {
    if (val === true) {
      res.send(new SuccessModel('密码修改成功! '))
      return
    }
    res.send(new ErrorModel('密码错误!'))
  })
})

// 更新用户信息
router.post('/update', loginCheck, (req, res, next) => {
  updateUser(req.session.userid, req.body).then(val => {
    if (val) {
      res.send(new SuccessModel('用户信息成功! '))
      return
    }
    res.send(new ErrorModel('用户信息失败！'))
  })
})

// 注销账户
router.delete('/delete',loginCheck, (req, res, next) => {
  logout(req.session.userid).then(val => {
    if (val) {
      res.send(new SuccessModel('账户注销成功! '))
      return
    }
    res.send(new ErrorModel('账户注销失败！'))
  })
})

// // 测试登录
// router.get('/login-test',loginCheck, (req, res, next) => {
//   console.log(req.session)
//   res.send(req.session)
// })

module.exports = router;
