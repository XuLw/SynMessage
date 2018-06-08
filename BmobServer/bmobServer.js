
var Bmob = require('../utils/Bmob-1.4.4.min.js');
var BmobConfig = require('./bmobServerConfig.js');
var userTable = Bmob.Query('myUserTable');
var messageTable = Bmob.Query('myMessageTable');
var relationTable = Bmob.Query('myRelationTable');

// 初始化BmobServer 并通过callback返回用户信息
var initialize = function(callback,errCallback){
  Bmob.initialize(BmobConfig.bmobKey.AppId, BmobConfig.bmobKey.RestKey);
  Bmob.User.auth().then(res => {
     
    console.log('一键登陆成功')
    if(callback!=null) callback(res);;
  }).catch(err => {
    
    if(errCallback!=null) errCallback(err);
  });
}

// 得到所有用户信息
var getAllUserInfo =function(callback,errCallback)
{
  userTable.find().then(res=>{
      
    if(callback!=null) callback(res);;//回掉函数
  }).catch(err => {
    
    if(errCallback!=null) errCallback(err);//错误回调函数
  })
}

// 得到所有消息信息
var getAllMessageInfo = function (callback, errCallback) {
  messageTable.find().then(res => {
      
    if(callback!=null) callback(res);;//回掉函数
  }).catch(err => {
    
    if(errCallback!=null) errCallback(err);//错误回调函数
  })
}
var getUserInfoById = function (userId, callback, errCallback) {
  userTable.equalTo('userId', '==', userId);
  userTable.find().then(res => {
      
    if(callback!=null) callback(res);;//回掉函数
  }
  ).catch(err => {
    
    if(errCallback!=null) errCallback(err);//错误回调函数
  });
}
var getMessageInfoById = function (messageId, callback, errCallback) {
  messageTable.equalTo('messageId', '==', messageId)
  messageTable.find().then(res => {
      
    if(callback!=null) callback(res);;//回掉函数
  }).catch(err => {
    
    if(errCallback!=null) errCallback(err);//错误回调函数
  });
}
//如果报错,说明已经存在这名用户的信息存在数据库中
var addUserInfo = function (userId, name, callback, errCallback) {
  userTable.set("userId", userId);
  userTable.set("name", name);
  userTable.save().then(res => {
      
    if(callback!=null) callback(res);;//回掉函数
  }).catch(err => {
    
    if(errCallback!=null) errCallback(err);//错误回调函数
  })
}
// 添加MessageInfo不涉及关联用户,可通过callback另行连接
var addMessageInfo = function (title, effect, time, content, author, callback, errCallback) {
  messageTable.set("title", title);
  messageTable.set("effect", effect);
  messageTable.set("content", content);
  messageTable.set("author", author);
  messageTable.set("time", time);
  messageTable.save().then(res => {
      
    if(callback!=null) callback(res);;//回掉函数
  }).catch(err => {
    
    if(errCallback!=null) errCallback(err);//错误回调函数
  })
}

var addMessageInfo = function (title, effect, time, content, author, callback, errCallback) {
  messageTable.set("title", title);
  messageTable.set("effect", effect);
  messageTable.set("content", content);
  messageTable.set("author", author);
  messageTable.set("time", time);
  messageTable.save().then(res => {
      
    messageTable.equalTo("objectId", "==", res.objectId);
    messageTable.find().then(res => {
        
      if(callback!=null) callback(res);;
    }).catch(err => {
      
      if(errCallback!=null) errCallback(err);
    })
  }).catch(err => {
    
    if(errCallback!=null) errCallback(err);//错误回调函数
  })
}

var addRelationInfo = function (userId, messageId, relation, concern, callback, errCallback) {
  relationTable.set("userId", userId);
  relationTable.set("messageId", messageId);
  relationTable.set("relation", relation);
  relationTable.set("concern", concern);
  relationTable.save().then(res => {
      
    if(callback!=null) callback(res);;//回掉函数
  }).catch(err => {
    
    if(errCallback!=null) errCallback(err);//错误回调函数
  })
}
// 通过userId得到与其特定relation的message数组
var getMessageByUserId = function (userId, relation, callback, errCallback) {
  relationTable.equalTo("userId", "==", userId);
  relationTable.equalTo("relation", "==", relation);
  relationTable.find().then(res => {
      
    var messageIdArray = res.map(a => a.messageId);
    console.log(messageIdArray);
    messageTable.containedIn("messageId", messageIdArray);
    messageTable.order("time");
    messageTable.find().then(res => {
        
      if(callback!=null) callback(res);;//回掉函数
    }).catch(err => {
      
      if(errCallback!=null) errCallback(err);//错误回调函数
    })
  }).catch(err => {
    
    if(errCallback!=null) errCallback(err);//错误回调函数
  })
}
// 通过userId得到与其特定relation的且满足messageLimit的message数组
var getMessageByUserIdWithLimit = function (userId, relation, messageLimit, callback, errCallback) {
  relationTable.equalTo("userId", "==", userId);
  relationTable.equalTo("relation", "==", relation);
  relationTable.find().then(res => {
      
    var messageIdArray = res.map(a => a.messageId);
    console.log(messageIdArray);
    messageTable.containedIn("messageId", messageIdArray);
    messageTable.order("time");
    messageTable.limit(messageLimit.countLimit);
    messageTable.equalTo("time", ">", messageLimit.dateLimit);
    messageTable.find().then(res => {
        
      if(callback!=null) callback(res);;//回掉函数
    }).catch(err => {
      
      if(errCallback!=null) errCallback(err);//错误回调函数
    })
  }).catch(err => {
    
    if(errCallback!=null) errCallback(err);//错误回调函数
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
  relationTable.equalTo("messageId", "==", messageId);
  relationTable.equalTo("relation", "==", relation);
  relationTable.find().then(res => {
      
    var userIdArray = res.map(a => a.userId);
    console.log(userIdArray);
    userTable.containedIn("userId", userIdArray);
    userTable.find().then(res => {
        
      if(callback!=null) callback(res);;//回掉函数
    }).catch(err => {
      
      if(errCallback!=null) errCallback(err);//错误回调函数
    })
  }).catch(err => {
    
    if(errCallback!=null) errCallback(err);//错误回调函数
  })
}
//修改指定messageId的message,不修改的选项填写null
var modifyMessage = function (messageId, title, effect, time, content, author, callback, errCallback) {
  messageTable.equalTo("messageId", "==", messageId);
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
        if(callback!=null) callback(res);;//回掉函数
    }).catch(err => {
      
      if(errCallback!=null) errCallback(err);//错误回调函数
    })
  }).catch(err => {
    
    if(errCallback!=null) errCallback(err);//错误回调函数
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
// 修改relation中user对message的concern状态
var modifyMessageConcern = function (userId, messageId, concern, callback, errCallback) {
  relationTable.equalTo("userId", "==", userId);
  relationTable.equalTo("messageId", "==", messageId);
  relationTable.find().then(res => {
      
    res.set("concern", concern);
    res.saveAll().then(res => {
        
      if(callback!=null) callback(res);;
    }).catch(err => {
      
      if(errCallback!=null) errCallback(err);
    })
  }).catch(err => {
    
    if(errCallback!=null) errCallback(err);
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
exports.addUserInfo = addUserInfo;
exports.addMessageInfo = addMessageInfo;
