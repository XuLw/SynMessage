// pages/notificationDetail/notificationDetail.js

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
    this.setData({
      indexOfMessage: options.id,
      mMessage: globalData.receivedMessage[options.id]
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
  onShareAppMessage: function() {},
  cancelMessage: function() {
    //通过修改关系表concern
    wx.showToast({
      title: '删除中',
      icon: 'loading',
      duration: 3000
    })

    if (getApp().globalData.openid === this.data.mMessage._openid) {
      // 个人通知
      dbUtils.deleteMessage(this.data.mMessage._id).then(res => {
        console.log("删除成功")

        //更新本地
        globalData.overdueMessage.unshift(globalData.receivedMessage.splice(this.data.indexOfMessage, 1)[0]);
        wx.hideToast()
        wx.navigateBack({})

      }).catch(res => {
        console.log(res)
      })
    } else {
      // 收到的通知
      dbUtils.deleteRelation(this.data.mMessage.relationId).then(res => {
        console.log("删除成功")
        // 删除本地
        globalData.receivedMessage.splice(this.data.indexOfMessage, 1)[0]
        wx.hideToast()
        wx.navigateBack({})
      }).catch(res => {
        console.log(res)
      })
    }

  }

})