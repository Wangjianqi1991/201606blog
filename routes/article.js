var express = require('express');
// router 是一个路由容器
var router = express.Router();

router.get('/add', function(req, res, next) {
    res.send('增加文章');
});


module.exports = router;