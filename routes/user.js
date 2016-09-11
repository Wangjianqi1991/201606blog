var express = require('express');
var util=require('../util');
// router 是一个路由容器
var router = express.Router();

/* GET users listing. */
//注册
router.get('/reg', function(req, res, next) {
  //res.send('用户注册');
  //相对views路径
  res.render('user/reg',{title:'用户注册'})
});
router.post('/reg', function(req, res, next) {
  var user=req.body;
  if (user.password != user.repassword){
    return res.redirect('back');
  }
  user.password=util.md5(user.password);
  user.avatar = `https://secure.gravatar.com/avatar/${util.md5(user.email)}?s=30`;
  Model('User').findOne({username:user.username}).then(function(userDb){
    if (userDb){
      return res.redirect('back');
    }else {
      return Model('User').create(user);
    }
  }).then(function(doc){
    req.session.user=doc;//给当前
    //写入session
    //返回客户端
    res.redirect('/')
  });

});
//登录
router.get('/login', function(req, res, next) {
  //res.send('用户登录');
  res.render('user/login',{title:'用户登录'})
});
//登出
router.get('/logout', function(req, res, next) {
  //res.send('用户登出');
  res.redirect('/')
});

module.exports = router;
