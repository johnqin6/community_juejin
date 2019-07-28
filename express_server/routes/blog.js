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

/* GET home page. */
router.get('/list', (req, res, next) => {
  getList(req.query).then(data => {
    res.send(new SuccessModel(data))
  })
});

router.get('/detail', (req, res, next) => {
  getDetail(req.query.id).then(data => {
    res.send(new SuccessModel(data))
  })
})

router.post('/new', loginCheck, (req, res, next) => {
  newBlog(req.body).then(data => {
    let id = data._id
    res.send(new SuccessModel({id: id}))
  })
})

router.post('/update', loginCheck, (req, res, next) => {
  const id = req.body.id.trim()
  editBlog(id, req.body).then(data => {
    let id = data._id
    res.send(new SuccessModel({id: id}))
  })
})

router.delete('/delete', loginCheck, (req, res, next) => {
  const id = req.query.id.trim()
  deleteBlog(id).then(val => {
    if (val) {
      res.send(new SuccessModel('删除成功！'))
    }
    res.send(new ErrorModel('删除失败！'))
  })
})

router.get('/updateReady', loginCheck, (req, res, next) => {
  const id = req.query.id.trim()
  updateReady(id).then(val => {
    if (val) {
      res.send(new SuccessModel('阅读量更新成功!'))
    }
    res.send(new ErrorModel('阅读量更新失败!'))
  })
})

router.get('/updateStar', loginCheck, (req, res, next) => {
  const id = req.query.id.trim()
  updateStar(id).then(val => {
    if (val) {
      res.send(new SuccessModel('点赞成功！'))
    }
    res.send(new ErrorModel('点赞失败！'))
  })
})

router.get('/updateFollow', loginCheck, (req, res, next) => {
  const id = req.body.id.trim()
  updateFollow(id).then(val => {
    if (val) {
      res.send(new SuccessModel('关注成功！'))
    }
    res.send(new ErrorModel('关注失败！'))
  })
})

module.exports = router;
