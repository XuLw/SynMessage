//app.js
const Bmob = require('./utils/Bmob-1.4.4.min.js');
const BmobServer = require('./BmobServer/bmobServer.js')


var util = require("/utils/util.js")

App({
  userId: "2",
  onLaunch: function () {
    BmobServer.initialize(this.UserInfoCallback, null);
  },
  onShow: function () {
  },
  globalData: {
    userInfo: null
  },
  UserInfoCallback(message) {
    this.userId = ""
  }
})