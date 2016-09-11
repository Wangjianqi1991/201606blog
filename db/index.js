//定义model和schema

var mongoose=require('mongoose');
mongoose.Promise=Promise;
mongoose.connect('mongodb://localhost/201606blog');
var UserSchema=mongoose.Schema({
   username:{type:String,require:true},
    password:{type:String,require:true},
    email:{type:String},
    avatar:{type:String}
});

mongoose.model('User',UserSchema);
global.Model=function(modelName){
    return mongoose.model(modelName);
};



















