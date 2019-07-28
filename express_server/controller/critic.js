const { Critic } = require('../db/mongodb')

const getList = blogid => {
  return Critic.find({blogid: blogid}).sort({createOn: -1}).then(docs => {
    if (docs) {
      return docs
    }
    return []
  })
}
/**
 * 文章添加评论
 * @param {*} username 
 * @param {*} criticData 
 */
const criticAdd = (username, blogid, content) => {
  const critic = new Critic({
    blogid,
    content,
    critics: username
  })
  return critic.save().then(doc => {
    if (doc) return doc
    return false
  })
} 

/**
 * 回复评论
 * @param {*} username 
 * @param {*} criticid 
 * @param {*} content 
 */
const replyAdd = (username, criticid, content) => {
  return Critic.findByIdAndUpdate(criticid, {respondent: username, reply: content}).then(doc => {
    if (doc) return doc
    return false
  })
}

/**
 * 点赞评论
 * @param {*} criticid 
 */
const replyStar = (criticid) => {
  return Critic.findById(criticid).then(doc => {
    if (!doc) {
      return false
    }
    let star = doc.star + 1
    return Critic.findByIdAndUpdate(criticid, { star: star })
  }).then(doc => {
    if (doc) return doc
    return false
  })
}


module.exports = {
  getList,
  criticAdd,
  replyAdd,
  replyStar
}