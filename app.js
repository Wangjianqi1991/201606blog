var express = require('express');
//处理路径的 join 连接路径  resolve从当前路径出发得到绝对路径
var path = require('path');
//收藏夹图标
var favicon = require('serve-favicon');
//记录请求日志的  请求的URL 请求的方法 响应的时间 响应体大小
var logger = require('morgan');
//解析cookie的 req.cookie
var cookieParser = require('cookie-parser');
var session=require('express-session');
// 解析请求体的 req.body 它会把请求头中cookie取出来
var bodyParser = require('body-parser');
require('./db');
var routes = require('./routes/index');
var user = require('./routes/user');
var article=require('./routes/article');
var app = express();

// view engine setup 设置模板引擎
//设置模板的存放目录
app.set('views', path.join(__dirname, 'views'));
//设置模板引擎
app.set('view engine', 'html');
app.engine('html',require('ejs').__express);

// uncomment after placing your favicon in /public

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//dev 是格式的一种 请求的方法 请求的路径 响应状态吗 响应的时间 响应体的大小
app.use(logger('dev'));
//解析json格式的请求体
app.use(bodyParser.json());
//解析查询字符串格式的请求
app.use(bodyParser.urlencoded({ extended: false }));
// 解析cookie
app.use(cookieParser());
//静态文件中间件 当前请求到来的时候 先去public目录下去找 找到就返回 找不到则继续next
app.use(session({
  resave:true,//每次请求都要重新保存session
  saveUninitialized:true,//保存初始化的session
  secret:'wang'//密钥
}));
app.use(express.static(path.join(__dirname, 'public')));
//第一个参数表示以这个路径开头
app.use('/', routes);
app.use('/article', article);
app.use('/user', user);

// catch 404 and forward to error handler
//捕获404错误 并转到错误处理中间件
//如果走到这里 意味着静态文件中间件 路由都没有匹配上
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;//设置错误状态吗
  next(err);//next
});

// error handlers

// development error handler 开发时候的错误处理
// will print stacktrace 将打印详细错误
if (app.get('env') === 'development') {
  //没有调用next方法 所以不会向下执行
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler 生产环境的错误处理
// no stacktraces leaked to user 不向终端用户泄露错误信息
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
