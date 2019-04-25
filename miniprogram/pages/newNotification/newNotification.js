// pages/newNotification/newNotification.js

var utils = require("../../utils/util.js");
var dbUtils = require("../../utils/databaseUtil.js")
var globalData = require("../../utils/data.js").globalData;

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    curDate: '',
    curTime: '',
    name: "",
    shareStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options.from)

    this.setData({
      name: getApp().globalData.userInfo.nickName
    })

    if (options.from == 0) {
      this.setData({
        shareStatus: true
      })
    }
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
    var d = new Date();
    this.setData({
      curDate: `${d.getUTCFullYear()}-${("0" + (d.getMonth() + 1)).slice(-2)}-${d.getUTCDate()}`,
      curTime: `${("0" + (d.getHours())).slice(-2)}:${("0" + (d.getMinutes())).slice(-2)}`,
    });
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
  onShareAppMessage: function() {

  },
  submit: function(e) {

    var v = e.detail.value;
    var title = v.title;
    var content = v.content;
    var deadlineDate = v.deadlineDate;
    var deadlineTime = v.deadlineTime;
    var dateTime = new Date(deadlineDate + " " + deadlineTime);
    var name = v.name;

    // TODO 添加错误处理
    let that = this

    wx.showToast({
      title: '上传中',
      icon: 'loading',
      mask: true,
      duration: 3000
    })

    // 上传成功回调函数
    var sf = function(message) {
      const deadline = new Date(message.deadline)
      message.date = utils.getDate(deadline)
      message.time = utils.getTime(deadline)
      message._openid = getApp().globalData.openid

      // 添加到本地
      if (that.data.shareStatus) {
        globalData.sentMessage.unshift(message)
      } else {
        globalData.receivedMessage.unshift(message)
      }

      wx.hideToast()
      wx.navigateBack({})
    }

    // 上传失败回调函数
    var ff = function(res) {
      console.log(res)
    }

    // 上传通知
    dbUtils.createMessage(title, content, name, dateTime.getTime(), !this.data.shareStatus, sf, ff)

  },
  selectDate: function(e) {
    this.setData({
      curDate: e.detail.value
    });
  },
  selectTime: function(e) {
    this.setData({
      curTime: e.detail.value
    });
  },
  changeShareStatus: function(e) {
    this.setData({
      shareStatus: e.detail.value
    })
  }
})