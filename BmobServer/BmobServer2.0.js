
var Bmob = require('../utils/Bmob-1.6.0.min.js');
var BmobConfig = require('./bmobServerConfig.js');
var userTable = Bmob.Query('_User');
var messageTable = Bmob.Query('myMessageTable');
var relationTable = Bmob.Query('myRelationTable');

var userPointer = Bmob.Pointer("_User");
var messagePointer = Bmob.Pointer("myMessageTable");



// 初始化BmobServer 并通过callback返回用户信息
var initialize = function (callback, errCallback) {

  Bmob.User.auth().then(res => {
    if(IsDebug)
    console.log('一键登陆成功')
    if (callback != null) callback(res);;
  }).catch(err => {
    
    if (errCallback != null) errCallback(err);
  });
}

// 得到所有用户信息

var getAllUserInfo = function (callback, errCallback) {
  userTable.find().then(res => {
    
    if (callback != null) callback(res);;//回掉函数
  }).catch(err => {
    
    if (errCallback != null) errCallback(err);//错误回调函数
  })
}

// 得到所有消息信息
var getAllMessageInfo = function (callback, errCallback) {
  messageTable.find().then(res => {

    if (callback != null) callback(res);;//回掉函数
  }).catch(err => {

    if (errCallback != null) errCallback(err);//错误回调函数
  })
}
// 得到特定objectId的用户
var getUserInfoById = function (userId, callback, errCallback) {
  userTable.equalTo('objectId', '==', userId);
  userTable.find().then(res => {

    if (callback != null) callback(res);;//回掉函数
  }
  ).catch(err => {

    if (errCallback != null) errCallback(err);//错误回调函数
  });
}

// 得到特定objectId的消息
var getMessageInfoById = function (messageId, callback, errCallback) {
  messageTable.equalTo('objectId', '==', messageId)
  messageTable.find().then(res => {
    console.log(res); console.log("fdsf")
    callback(res);;//回掉函数
  }).catch(err => {

    if (errCallback != null) errCallback(err);//错误回调函数
  });
}
//如果报错,说明已经存在这名用户的信息存在数据库中

// 添加MessageInfo不涉及关联用户,可通过callback另行连接
// callback 回调函数传入 objectId
var addMessageInfo = function (title, effect, time, content, author, callback, errCallback) {
  messageTable.set("title", title);
  messageTable.set("effect", effect);
  messageTable.set("content", content);
  messageTable.set("author", author);
  messageTable.set("time", time);
  messageTable.save().then(res => {
    if(callback!=null) callback(res.objectId); 
  }).catch(err => {

    if (errCallback != null) errCallback(err);//错误回调函数
  })
}
//传入的userId和messageId分别为user和message在_User,myMessageTable中的objectId
var addRelationInfo = function (userId, messageId, relation, concern, callback, errCallback) {
   
  var  userIdPointer = userPointer.set(userId);
  var  messageIdPointer = messagePointer.set(messageId);
  
  relationTable.set("user",userIdPointer);
  relationTable.set("message",messageIdPointer);
  relationTable.set("relation", relation);
  relationTable.set("concern", concern);
  relationTable.save().then(res => {

      if(callback!=null) callback(res);
    
  }).catch(err => {

    if (errCallback != null) errCallback(err);//错误回调函数
  })
}
// 通过userId得到与其特定relation的message数组
// 不只是message的Id
var getMessageByUserId = function (userId, relation, concern, callback, errCallback) {
  
  relationTable.statTo("where",{"user":{"$inQuery":{"where":{"objectId":userId},"className":"_User"}}});
  relationTable.equalTo("relation", "==", relation);
  relationTable.equalTo("concern", "==", concern);
  relationTable.find().then(res => {
    console.log(res);
    var messageIdArray = res.map(a => a.message.objectId);
    console.log(messageIdArray);
    messageTable.containedIn("objectId",messageIdArray);
    messageTable.find().then(res=>{
        console.log(res);
    })

    if(callback!=null) callback(messageArray);
  }).catch(err => {

    if (errCallback != null) errCallback(err);//错误回调函数
  })
}
// 通过userId得到与其特定relation的且满足messageLimit的message数组(不只是Id)
var getMessageByUserIdWithLimit = function (userId, relation, concern, messageLimit, callback, errCallback) {
  relationTable.statTo("where",{"user":{"$inQuery":{"where":{"objectId":userId},"className":"_User"}}});
  
  relationTable.equalTo("relation", "==", relation);
  relationTable.equalTo("concern", "==", concern);
  relationTable.find().then(res => {
    console.log(res);
    var messageIdArray = res.map(a => a.message.objectId);
    console.log(messageIdArray);
    messageTable.containedIn("objectId",messageIdArray);
    messageTable.order("time");
    messageTable.limit(messageLimit.countLimit);
    messageTable.equalTo("time", ">", messageLimit.dateLimit);
    messageTable.find().then(res => {

      if (callback != null) callback(res);;//回掉函数
    }).catch(err => {

      if (errCallback != null) errCallback(err);//错误回调函数
    })
  }).catch(err => {

    if (errCallback != null) errCallback(err);//错误回调函数
  })
}
// 创建messageLimit,传入messageCountLimit为数量限制,messageDateLimit为BmobDate类型的时间限制
var makeMessageLimit = function (messageCountLimit, messageDateLimit) {
  return {
    countLimit: messageCountLimit,
    dateLimit: messageDateLimit
  }
}
// 通过messageId得到与其特点relation的user数组
var getUserbyMessageId = function (messageId, relation, callback, errCallback) {
  relationTable.statTo("where",{"message":{"$inQuery":{"where":{"objectId":messageId},"className":"myMessageTable"}}});
  
  relationTable.equalTo("relation", "==", relation);
  relationTable.find().then(res => {

    var userIdArray = res.map(a => a.user.objectId);
    console.log("userIdArray");
    console.log(userIdArray);
    userTable.containedIn("objectId", userIdArray);
    userTable.find().then(res => {
        console.log(res);
      if (callback != null) callback(res);;//回掉函数
    }).catch(err => {

      if (errCallback != null) errCallback(err);//错误回调函数
    })
  }).catch(err => {

    if (errCallback != null) errCallback(err);//错误回调函数
  })
}
//通过messageId得到user数组
var getAllUserbyMessageId = function (messageId, callback, errCallback) {
  relationTable.statTo("where",{"message":{"$inQuery":{"where":{"objectId":messageId},"className":"myMessageTable"}}});
  relationTable.find().then(res => {
    console.log(res)
    var userIdArray = res.map(a => a.user.objectId);
    console.log(userIdArray);

    userTable.containedIn("objectId", userIdArray);
    userTable.find().then(res => {
    console.log(res);
    if (callback != null) callback(res);;//回掉函数
  }).catch(err=>{
    if(errCallback!=null) errCallback(err);//错误回掉
  });

  }).catch(err=>{
    if(errCallback!=null) errCallback(err);//错误回掉
  })
}

//修改指定messageId的message,不修改的选项填写null
var modifyMessage = function (messageId, title, effect, time, content, author, callback, errCallback) {
  messageTable.equalTo("objectId", "==", messageId);
  messageTable.find().then(res => {

    if (title != null)
      res.set("title", title);
    if (effect != null)
      res.set("effect", effect);
    if (content != null)
      res.set("content", content);
    if (author != null)
      res.set("author", author);
    if (time != null)
      res.set("time", time);
    res.saveAll().then(res => {

      if (callback != null)
        if (callback != null) callback(res);;//回掉函数
    }).catch(err => {

      if (errCallback != null) errCallback(err);//错误回调函数
    })
  }).catch(err => {

    if (errCallback != null) errCallback(err);//错误回调函数
  })
}
// 传入js中的Date,返回BmobDate
var translateDateToBmobDate = function (date) {
  return {
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
// 传入BmobDate转换成Date
var translateBmobDateToDate = function (BmobDate) {
  return convertDateFromString(BmobDate.iso);
}
// 将BmobDate中的日期格式转换成Date日期格式
function convertDateFromString(dateString) {
  if (dateString) {
    var arr1 = dateString.split(" ");
    var sdate = arr1[0].split('-');
    var date = new Date(sdate[0], sdate[1] - 1, sdate[2]);
    return date;
  }
}
// 修改relation中user对message的concern状态(同时,如果是publisher则会修改messageTable中的effect)
var modifyMessageConcern = function (userId, messageId, concern, callback, errCallback) {
  relationTable.statTo("where",{"user":{"$inQuery":{"where":{"objectId":userId},"className":"_User"}}});
  relationTable.statTo("where",{"message":{"$inQuery":{"where":{"objectId":messageId},"className":"myMessageTable"}}});
  
  relationTable.find().then(res => {
    //发布者不关注,则设置message为无效.
    if(res.relation == BmobConfig.relation.AsPublisher) 
    modifyMessage(messageId, null, concern, null, null, null, null, null);

    res.set("concern", concern);
    res.saveAll().then(res => {

      if (callback != null) callback(res);;
    }).catch(err => {

      if (errCallback != null) errCallback(err);
    })
  }).catch(err => {

    if (errCallback != null) errCallback(err);
  })
}

exports.initialize = initialize;
exports.modifyMessageConcern = modifyMessageConcern;
exports.translateBmobDateToDate = translateBmobDateToDate;
exports.makeMessageLimit = makeMessageLimit;
exports.getMessageByUserIdWithLimit = getMessageByUserIdWithLimit;
exports.translateDateToBmobDate = translateDateToBmobDate;
exports.modifyMessage = modifyMessage;
exports.getUserbyMessageId = getUserbyMessageId;
exports.getMessageByUserId = getMessageByUserId;
exports.addRelationInfo = addRelationInfo;
exports.getAllMessageInfo = getAllMessageInfo;
exports.getAllUserInfo = getAllUserInfo;
exports.getUserInfoById = getUserInfoById;
exports.getMessageInfoById = getMessageInfoById;
exports.addMessageInfo = addMessageInfo;
exports.getAllUserbyMessageId = getAllUserbyMessageId
