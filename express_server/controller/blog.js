const { Blog } = require('../db/mongodb') 

/**
 * 获取博客列表
 */
const getList = ({type, keyword}) => {
  let searchObj = {}
  if (type) {
    searchObj.type = type
  }
  if (keyword) {
    searchObj.title = new RegExp(keyword);
  }

  return Blog.find(searchObj).sort({ createOn: -1}).then(docs => {
    if (docs) {
      return docs
    }
    return []
  })
}

/**
 * 获取博客详情
 * @param {*} id 
 */
const getDetail = id => {
  return Blog.findById(id).then(doc => {
    if (doc) return doc
    return null
  })
}

/**
 * 新增一篇博客
 * @param {*} blogData 
 */
const newBlog = (blogData = {}) => {
  const blog = new Blog({
    ...blogData
  })
  return blog.save().then(doc => {
    if (doc) return doc
  }).catch(err => {
    console.log(err)
    return false
  })
}

/**
 * 编辑博客
 * @param {*} id 
 * @param {*} blogData 
 */
const editBlog = (id, blogData = {}) => {
  console.log(id, blogData)
  return Blog.findByIdAndUpdate(id, blogData).then(doc => {
    if (doc) return doc
    return false
  })
}

/**
 * 删除一篇博客
 * @param {*} id 
 */
const deleteBlog = id => {
  return Blog.findByIdAndDelete(id).then(doc => {
    if (doc) return true
    return false
  })
}

/**
 * 更新阅读量
 * @param {*} id 
 */
const updateReady = id => {
  return Blog.findById(id).then(doc => {
    if (!doc) {
      return false
    }
    let ready_num = doc.ready_num + 1
    return Blog.findByIdAndUpdate(id, { ready_num: ready_num })
  }).then(doc => {
    if (doc) return true
    return false
  })
}

/**
 * 更新点赞量
 * @param {*} id 
 */
const updateStar = id => {
  return Blog.findById(id).then(doc => {
    if (!doc) {
      return false
    }
    let star = doc.star + 1
    return Blog.findByIdAndUpdate(id, { star: star })
  }).then(doc => {
    if (doc) return true
    return false
  })
}

/**
 * 更新关注量
 * @param {*} id 
 */
const updateFollow = id => {
  return Blog.findById(id).then(doc => {
    if (!doc) {
      return false
    }
    let follow_num = doc.follow_num + 1
    return Blog.findByIdAndUpdate(id, { follow_num: follow_num })
  }).then(doc => {
    if (doc) return true
    return false
  })
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  editBlog,
  deleteBlog,
  updateReady,
  updateStar,
  updateFollow
}

