var express = require('express');
var router = express.Router();
const {
  getList,
  getDetail,
  newBlog,
  editBlog,
  deleteBlog,
  updateReady,
  updateStar,
  updateFollow
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../models/resModel')
const loginCheck = require('../middleware/loginCheck')

// 获得博客列表
router.get('/list', (req, res, next) => {
  getList(req.query).then(data => {
    res.send(new SuccessModel(data))
  })
});

// 获得博客详情
router.get('/detail', (req, res, next) => {
  getDetail(req.query.id).then(data => {
    res.send(new SuccessModel(data))
  })
})

// 新增博客详情
router.post('/new', loginCheck, (req, res, next) => {
  newBlog(req.body).then(data => {
    let id = data._id
    res.send(new SuccessModel({id: id}))
  })
})

// 更新博客详情
router.post('/update', loginCheck, (req, res, next) => {
  const id = req.body.id.trim()
  editBlog(id, req.body).then(data => {
    let id = data._id
    res.send(new SuccessModel({id: id}))
  })
})

// 删除一篇博客
router.delete('/delete', loginCheck, (req, res, next) => {
  const id = req.query.id.trim()
  deleteBlog(id).then(val => {
    if (val) {
      res.send(new SuccessModel('删除成功！'))
      return
    }
    res.send(new ErrorModel('删除失败！'))
  })
})

// 更新阅读量
router.get('/updateReady', loginCheck, (req, res, next) => {
  const id = req.query.id.trim()
  updateReady(id).then(data => {
    if (data) {
      res.send(new SuccessModel({ ready_num: data.ready_num }))
      return
    }
    res.send(new ErrorModel('阅读量更新失败!'))
  })
})

// 更新点赞量
router.get('/updateStar', loginCheck, (req, res, next) => {
  const id = req.query.id.trim()
  updateStar(id).then(data => {
    if (data) {
      res.send(new SuccessModel({ star: data.star }))
      return
    }
    res.send(new ErrorModel('点赞失败！'))
  })
})

// 更新关注量
router.get('/updateFollow', loginCheck, (req, res, next) => {
  const id = req.query.id.trim()
  updateFollow(id).then(data => {
    if (data) {
      res.send(new SuccessModel({ follow_num: data.follow_num }))
      return
    }
    res.send(new ErrorModel('关注失败！'))
  })
})

module.exports = router;
