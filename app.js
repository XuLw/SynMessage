//app.js
const Bmob = require('./utils/Bmob-1.4.4.min.js');
const BmobServer = require('./BmobServer/bmobServer.js')
const BmobConfig = require('./BmobServer/bmobServerConfig.js');


var util = require("/utils/util.js")

App({
  userId: "2",
  userName: "",
  onLaunch: function () {
    Bmob.initialize(BmobConfig.bmobKey.AppId, BmobConfig.bmobKey.RestKey);
    var that = this;

    wx.showToast({
      title: '加载中',
      duration: 5000,
      icon: "loading"
    })


    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              //获取用户名
              that.userName = res.userInfo.nickName
            }
          })
        } else {
          wx.hideToast();
          wx.navigateTo({
            url: '/pages/index/index',
          })
        }
      }
    })

  },
  onShow: function () {
  }
})