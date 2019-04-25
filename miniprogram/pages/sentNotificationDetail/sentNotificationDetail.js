var app = getApp();
var globalData = require("../../utils/data.js").globalData;
var dbUtils = require("../../utils/databaseUtil.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mMessage: {},
    indexOfMessage: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    console.log(options)

    this.setData({
      indexOfMessage: options.id,
      mMessage: globalData.sentMessage[options.id]
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      mMessage: globalData.sentMessage[this.data.indexOfMessage]
    })
    console.log(this.data.mMessage);

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
    var that = this;
    if (res.from === 'button') {
      console.log(res.target)
    }
    return {
      title: '你接收到一个通知',
      path: '/pages/sharePage/sharePage?id=' + that.data.mMessage.messageId
    }
  },
  editNotification: function(e) {
    wx.navigateTo({
      url: '../editNotification/editNotification' + '?id=' + this.data.indexOfMessage,
    })
  },
  cancelNotification: function(e) {
    //通过修改Message信息删除通知
    wx.showToast({
      title: '删除中',
      icon: 'loading',
      duration: 3000
    })

    dbUtils.deleteMessage(this.data.mMessage._id).then(res => {

      console.log("删除成功")
      //更新本地
      globalData.overdueMessage.unshift(globalData.sentMessage.splice(this.data.indexOfMessage, 1)[0]);
      wx.hideToast()

      wx.showToast({
        title: '删除成功',
        icon: "success",
        duration: 1000,
        complete: function() {
          wx.navigateBack({})
        }
      })

    }).catch(res => {
      console.log("删除失败")
      console.log(res)
    })
    // bmobServer.modifyMessage(this.data.mMessage.messageId, null, false, null, null, null, this.cancelNotificationCallback, this.cancelNotificationErrCallback)
  },
  cancelNotificationCallback(message) {

    //更新本地
    globalData.overdueMessage.unshift(globalData.sentMessage.splice(this.data.indexOfMessage, 1)[0]);

    wx.hideToast();
    wx.showToast({
      title: '删除成功',
      icon: "success",
      duration: 1500,
      complete: function() {
        wx.navigateBack({})
      }
    })


  },
  cancelNotificationErrCallback(message) {
    console.log(message);
    wx.hideToast();
    wx.showToast({
      title: '网络出错',
      icon: 'none',
      duration: 1000
    })
  }
})