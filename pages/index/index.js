//index.js
const BmobServer = require('../../BmobServer/bmobServer.js')

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {

  },
  bindGetUserInfo: function (e) {
    console.log(e.detail.userInfo)
    if (e.detail.userInfo) {
      //用户按了允许授权按钮  将信息存到本地

      wx.showToast({
        title: '加载中',
        duration: 5000,
        icon: "loading"
      })

      getApp().userName = e.detail.userInfo.nickName;

      BmobServer.initialize(this.userInfoCallback, null);

    } else {
      //用户按了拒绝按钮
      wx.showToast({
        title: '授权才能使用噢~',
        icon: "none",
        duration: 1000
      })
    }
  },
  userInfoCallback(message) {
    //已有用户不进行重复床关键
    getApp().userId = message.authData.weapp.openid;
    BmobServer.getUserInfoById(getApp().userId, this.checkCallback, this.checkErrCallback)
  },
  checkCallback(message) {
    wx.hideToast();
    wx.redirectTo({
      url: '../main/main',
    })
    console.log(message)
  },
  checkErrCallback(message) {
    //没有则进行注册
    // console.log(message)
    BmobServer.addUserInfo(message.authData.weapp.openid, getApp().userName, this.addUserCallback, null);
  },
  addUserCallback(message) {
    wx.redirectTo({
      url: '../main/main',
    })
  }
})
