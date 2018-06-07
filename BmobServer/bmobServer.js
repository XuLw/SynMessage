
var Bmob = require('../utils/Bmob-1.4.4.min.js');

var userTable = Bmob.Query('myUserTable');
var messageTable = Bmob.Query('myMessageTable');
var relationTable = Bmob.Query('myRelationTable');

var getAllUserInfo =function(callback)
{
  userTable.find().then(res=>{
    console.log(res);
    callback(res);//回掉函数
  }).catch(err=>{
    console.log(err);
  })
}
var getAllMessageInfo = function(callback)
{
  messageTable.find().then(res => {
    console.log(res);
    callback(res);//回掉函数
  }).catch(err => {
    console.log(err);
  })
}
var getUserInfoById =function(userId,callback)
{
  userTable.equalTo('userId','==',userId);
    userTable.find().then(res=>{
        console.log(res);
        callBack(res);//回掉函数
    }
    ).catch(err=>{
        console.log(err);
    });
}
var getMessageInfoById = function(messageId,callback)
{
  messageTable.equalTo('messageId', '==', messageId)
    messageTable.find().then(res=>{
      console.log(res);
      callback(res);//回掉函数
    }).catch(err => {
      console.log(err);
    });
}
//如果报错,说明已经存在这名用户的信息存在数据库中
var addUserInfo = function (userId,name,callback)
{
    userTable.set("userId", userId);
    userTable.set("name",name);
    userTable.save().then(res=>{
      console.log(res);
      callback(res);//回掉函数
    }).catch(err=>{
      console.log(err);
    })
}
// 添加MessageInfo不涉及关联用户,可通过callback另行连接
var addMessageInfo = function (title, effect,time,content,author,callback)
{
    messageTable.set("title", title);
    messageTable.set("effect", effect);
    messageTable.set("content", content);
    messageTable.set("author", author);
    messageTable.set("time",time);
    messageTable.save().then(res=>{
      console.log(res);
      callback(res);//回掉函数
    }).catch(err=>{
      console.log(err);
    })
}
// 连接user和message,关系为relation
var addRelationInfo=function(userId,messageId,relation,callback)
{
  relationTable.set("userId",userId);
  relationTable.set("messageId",messageId);
  relationTable.set("relation",relation);
  relationTable.save().then(res=>{
    console.log(res);
    callback(res);//回掉函数
  }).catch(err=>{
    console.log(err);
  })
}
// 通过userId得到与其特定relation的message数组
var getMessageByUserId=function(userId,relation,callback)
{
  relationTable.equalTo("userId","==",userId);
  relationTable.equalTo("relation","==", relation);
  relationTable.find().then(res=>{
    console.log(res);
    var messageIdArray = res.map(a => a.messageId);
    console.log(messageIdArray);
    messageTable.containedIn("messageId",messageIdArray);
    messageTable.find().then(res=>{
        console.log(res);
        callback(res);//回掉函数
    }).catch(err=>{
        console.log(err);
    })
  }).catch(err=>{
      console.log(err);
  })
}
// 通过messageId得到与其特点relation的user数组
var getUserbyMessageId=function(messageId,relation,callback){
  relationTable.equalTo("messageId", "==", messageId);
  relationTable.equalTo("relation", "==", relation);
  relationTable.find().then(res => {
    console.log(res);
    var userIdArray = res.map(a=>a.userId);
    console.log(userIdArray);
    userTable.containedIn("userId",userIdArray);
    userTable.find().then(res=>{
      console.log(res);
      callback(res);//回掉函数
    }).catch(err=>{
      console.log(err);
    })
  }).catch(err => {
    console.log(err);
  })
}
//修改指定messageId的message,不修改的选项填写null
var modifyMessage = function (messageId, title,effect, time, content, author, callback)
{
    messageTable.equalTo("messageId", "==", messageId);
    messageTable.find().then(res=>{
      console.log(res);
      if(title!=null)
      res.set("title",title);
      if(effect!=null)
      res.set("effect", effect);
      if(content!=null)
      res.set("content", content);
      if(author!=null)
      res.set("author", author);
      if(time!=null) 
      res.set("time",time);
      res.saveAll().then(res=>{
        console.log(res);
        if(callback!=null)
          callback(res);//回掉函数
      }).catch(err=>{
        console.log(err);
      })
    }).catch(err=>{
      console.log(err);
    })
}
// 传入js中的Date,返回BmobDate
var makeBmobDate=function(date)
{
  return  {
    "__type": "Date",
    "iso": formatDate(date)
  }
}
// 将js的Date格式化为BmodDate格式
var formatDate = function (date) {
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  var minute = date.getMinutes();
  minute = minute < 10 ? ('0' + minute) : minute;
  var second = date.getSeconds();
  second = minute < 10 ? ('0' + second) : second;
  return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
};

exports.makeBmobDate = makeBmobDate;
exports.modifyMessage = modifyMessage;
exports.getUserbyMessageId = getUserbyMessageId;
exports.getMessageByUserId = getMessageByUserId;
exports.addRelationInfo = addRelationInfo;
exports.getAllMessageInfo = getAllMessageInfo;
exports.getAllUserInfo = getAllUserInfo;
exports.getUserInfoById = getUserInfoById;
exports.getMessageInfoById = getMessageInfoById;
exports.addUserInfo = addUserInfo;
exports.addMessageInfo = addMessageInfo;
