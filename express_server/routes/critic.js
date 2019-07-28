const express = require('express');
const router = express.Router();
const {  
  getList,
  criticAdd,
  replyAdd,
  replyStar
} = require('../controller/critic')
const { SuccessModel, ErrorModel } = require('../models/resModel')
const loginCheck = require('../middleware/loginCheck')

// 获取文章评论列表
router.get('/list', loginCheck, (req, res) => {
  getList(req.query.id).then(data => {
    res.send(new SuccessModel(data))
  })
})

// 新增文章评论
router.post('/new',loginCheck, (req, res) => {
  const blogid = req.body.id
  const username = req.session.username
  const content = req.body.content
  criticAdd(username, blogid,  content).then(data => {
    if (data) {
      let id = data._id
      res.send(new SuccessModel({id: id}))
      return
    }
    res.send(new ErrorModel('评论失败！'))
  })
})

// 回复评论
router.post('/reply', loginCheck, (req, res) => {
  const username = req.session.username
  const criticid = req.body.id
  const content = req.body.content
  replyAdd(username, criticid, content).then(data => {
    if (data) {
      let id = data._id
      res.send(new SuccessModel({id: id}))
      return
    }
    res.send(new ErrorModel('评论失败！'))
  })
})

// 点赞评论
router.get('/criticStar', loginCheck, (req, res, next) => {
  replyStar(req.query.id).then(data => {
    if (data) {
      res.send(new SuccessModel({ star: data.star }))
      return
    }
    res.send(new ErrorModel('点赞失败！'))
  })
})

module.exports = router;