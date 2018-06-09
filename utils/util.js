var bmobServer = require("../BmobServer/bmobServer.js");
var bmobConfig = require("../BmobServer/bmobServerConfig.js");
var relation = bmobConfig.relation;


const dateToBDate = function (dateTime) {
  return {
    "__type": "Date",
    "iso": dateTime
  }
}

var showLoadingToast = function (title) {
  wx.showToast({
    title: title,
    duration: 5000,
    icon: "loading"
  })
}

// const userId = "2";

// var that;


// const initData = {
//   startInit: function (e) {
//     wx.showToast({
//       title: '加载中',
//       duration: 5000,
//       icon: "loading"
//     })
//     console.log(data)
//     that = this;

//     bmobServer.getMessageByUserId(userId, relation.AsPublisher, true, that.publicMessageCallback, that.errCallback);
//   },
//   publicMessageCallback(message) {
//     var today = new Date();
//     today.setSeconds(0);

//     for (var i = 0; i < message.length; i++) {
//       //转换为js里面的Date
//       var date = bmobServer.translateBmobDateToDate(message[i].time);
//       if (date > today && message[i].effect === true) {
//         //消息有效
//         message[i].date = message[i].time.iso.substr(0, 10);
//         message[i].time = message[i].time.iso.substr(11, 5);
//         message[i].state = relation.AsPublisher;
//         data.sentMessage.unshift(message[i]);
//       } else {
//         message[i].date = message[i].time.iso.substr(0, 10);
//         message[i].time = message[i].time.iso.substr(11, 5);
//         message[i].state = relation.AsPublisher;
//         data.overdueMessage.unshift(message[i]);
//       }
//     }
//     bmobServer.getMessageByUserId(userId, relation.AsReceiver, true, that.receivedMessageCallback, that.errCallback);
//   },
//   receivedMessageCallback: function (message) {

//     var today = new Date();
//     today.setSeconds(0);

//     for (var i = 0; i < message.length; i++) {
//       //转换为js里面的Date
//       var date = bmobServer.translateBmobDateToDate(message[i].time);
//       if (date > today && message[i].effect === true) {
//         //消息有效
//         message[i].date = message[i].time.iso.substr(0, 10);
//         message[i].time = message[i].time.iso.substr(11, 5);
//         message[i].state = relation.AsReceiver;
//         data.receivedMessage.unshift(message[i]);
//       } else {
//         message[i].date = message[i].time.iso.substr(0, 10);
//         message[i].time = message[i].time.iso.substr(11, 5);
//         message[i].state = relation.AsReceiver;
//         data.overdueMessage.unshift(message[i]);
//       }
//     }

//     bmobServer.getMessageByUserId(userId, relation.AsReceiver, false, that.receivedMessageCallback1, that.errCallback);

//   },
//   receivedMessageCallback1(message) {
//     //不再关注 都为无效
//     data.overdueMessage = data.overdueMessage.concat(message);

//     bmobServer.getMessageByUserId(userId, relation.AsPersonal, true, that.personalMessageCallback, that.errCallback);
//   },
//   personalMessageCallback(message) {

//     var today = new Date();
//     today.setSeconds(0);

//     for (var i = 0; i < message.length; i++) {
//       //转换为js里面的Date
//       var date = bmobServer.translateBmobDateToDate(message[i].time);
//       if (date > today && message[i].effect === true) {
//         //消息有效
//         message[i].date = message[i].time.iso.substr(0, 10);
//         message[i].time = message[i].time.iso.substr(11, 5);
//         message[i].state = relation.AsPersonal;
//         data.receivedMessage.unshift(message[i]);
//       } else {
//         message[i].date = message[i].time.iso.substr(0, 10);
//         message[i].time = message[i].time.iso.substr(11, 5);
//         message[i].state = relation.AsPersonal;
//         data.overdueMessage.unshift(message[i]);
//       }
//     }

//     wx.hideToast();

//   },
//   errCallback(message) {
//     console.log(message)
//   }
// }

exports.dateToBDate = dateToBDate;
exports.showLoadingToast = showLoadingToast;
// exports.initData = initData;