// pages/notificationDetail/notificationDetail.js
var bmobServer = require("../../BmobServer/bmobServer.js");
var bmobConfig = require("../../BmobServer/bmobServerConfig.js");
var relation = bmobConfig.relation;

var app = getApp();
var globalData = require("../../utils/data.js").globalData;


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
  onLoad: function (options) {
    this.setData({
      indexOfMessage: options.id,
      mMessage: globalData.receivedMessage[options.id]
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  },
  cancelMessage: function () {
    //通过修改关系表concern
    wx.showToast({
      title: '删除中',
      icon: 'loading',
      duration: 5000
    })

    if (this.data.mMessage.state === relation.AsReceiver)
      //如果只是接收者，则修改关注状态
      bmobServer.modifyMessageConcern(app.userId, this.data.mMessage.messageId, false, this.cancelMessageCallback, this.cancelMessageErrCallback)
    else if (this.data.mMessage.state === relation.AsPersonal) {
      //如果是个人通知，则修改通知状态
      console.log("修改")
      bmobServer.modifyMessage(this.data.mMessage.messageId, null, false, null, null, null, this.cancelMessageCallback, this.cancelMessageErrCallback)
    }

  },
  cancelMessageCallback(message) {

    //更新本地
    globalData.overdueMessage.unshift(globalData.receivedMessage.splice(this.data.indexOfMessage, 1)[0]);

    wx.hideToast();
    wx.showToast({
      title: '删除成功',
      icon: "success",
      duration: 1000
    })

    wx.navigateBack({
    })

  },
  cancelMessageErrCallback(message) {
    wx.hideToast();
    wx.showToast({
      title: '网络出错',
      icon: 'none',
      duration: 1000
    })
  }
})