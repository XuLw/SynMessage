//index.js 

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  onLoad: function() {

  },
  bindGetUserInfo: function(e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮  将信息存到本地
      wx.showToast({
        title: '已授权！',
        icon: "none",
        duration: 500
      })
      getApp().globalData.userInfo = e.detail.userInfo

    } else {
      //用户按了拒绝按钮
      wx.showToast({
        title: '授权才能使用噢~',
        icon: "none",
        duration: 1000
      })
    }
  },
})