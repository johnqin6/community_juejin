# 仿掘金社区

## 社区项目介绍
### 目标
- 开发一个仿掘金社区，具有社区的大部分功能
- 技术栈：
  + 前端：vue全家桶(vue + vue-router +  vuex + axios)
  + 后端：node.js(express,koa2,原生) + mongodb(mongoose)   

### 需求
- 首页  
  + 无需登录
  + 文章分类（标签管理）
  + 侧边栏  
  + 博客列表
  + 关键词搜索
- 注册页  
- 登录页
- 博客详情页
  + 评论功能
  + 点赞功能
  + 收藏功能  
  + 关注功能  
- 博客新增页
  + markdown 
    * 代码高亮
    * 分屏预览 
  + 选择文章标签发布  
- 博客编辑页
- 我的主页
- 个人资料页
- 修改密码

### 技术方案
- 数据库设计
  + 用户表(users)
    * 用户数据表涉及的字段:  
      username(用户名称)，email(邮箱), password(密码), avatar(头像), positiion(职位), company(公司), introduce(介绍), createOn(注册时间), follow_num(关注数)
  + 博客表(blogs)
    * 博客数据表涉及的字段:  
      标题(title), author(作者), type(文章类型), content(内容), createOn(发布时间), 最近修改时间(lastUpdateTime), star(点赞数), ready_num(阅读数), follow_num(关注数)
  + 评论表(critics)
    * 评论数据表涉及的字段: 
      critics(评论人), blogid(博客id), content(评论内容), createOn(评论时间), star(点赞数), reply(回复),respondent(评论回复者)

### 接口设计

| 描述| 接口 | 方法 | url参数 | 备注 |   
|-----|-----|------|---------|------|    
|用户注册|/api/user/register| post| email(邮箱)，username(用户名), password(密码)|邮箱不能重复 |    
|用户登录|/api/user/login| post| email/username, password| email或username与密码同时匹配 |    
|用户注销|/api/user/delete| delete|     | 注销的用户（软删除）|   
|更新用户信息|/api/user/update| post|      |  |    
|更新用户密码|/api/user/changePwd| post|   |  需用户登录 |   
|更新用户头像|/api/user/avatar| post|     | 需用户登录 |   
|获取博客列表|/api/blog/list| get|  type/keyword | 默认返回推荐内容，时间倒序|   
|获取博客详情|/api/blog/detail| get| id  |          |     
|新增博客详情|/api/blog/new| post|       | 需用户登录 |   
|更新博客|/api/blog/update|post|         | 需用户登录 |   
|删除博客|/api/blog/delete| delete|id    | 需用户登录 |   
|新增博客评论|/api/critic/new/:blogid| post| 需用户登录 |   
|回复评论|/api/critic/reply/:criticid| post| 需用户登录 |   
|点赞评论|/api/critic/criticStar/:criticid|get| 需用户登录 |      
|点赞|/api/blog/updateStar|get| blogid| 需用户登录 |  
|关注|/api/blog/updateFollow|get| blogid| 需用户登录 |  
|更新阅读数|/api/blog/updateReady|get| blogid| 需用户登录 |  




