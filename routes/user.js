var express = require('express');
// router 是一个路由容器
var router = express.Router();

/* GET users listing. */
//注册
router.get('/reg', function(req, res, next) {
  res.send('用户注册');
});
//登录
router.get('/login', function(req, res, next) {
  res.send('用户登录');
});
//登出
router.get('/logout', function(req, res, next) {
  res.send('用户登出');
});

module.exports = router;
