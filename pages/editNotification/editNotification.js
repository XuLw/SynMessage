// pages/newNotification/newNotification.js

var bmobServer = require("../../BmobServer/bmobServer.js");
var bmobConfig = require("../../BmobServer/bmobServerConfig.js");
var relation = bmobConfig.relation;

var app = getApp();

var utils = require("../../utils/util.js");

var tMessage = {};
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
      mMessage: app.sentMessage[options.id]
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
  submit: function (e) {

    var v = e.detail.value;
    var title = v.title;
    if (title === "")
      wx.showToast({
        title: '标题不能为空！',
        icon: "none",
        duration: 1000
      });

    tMessage.createAt = this.data.createAt;
    tMessage.objectId = this.data.objectId;
    tMessage.updateAt = this.data.updateAt;
    tMessage.messageId = this.data.messageId;
    tMessage.effect = this.data.effect;

    tMessage.title = title;
    tMessage.content = v.content;

    var dateTime = new Date(v.deadlineDate + " " + v.deadlineTime);
    var bmobDate = utils.dateToBDate(dateTime);
    tMessage.date = v.deadlineDate;
    tMessage.time = v.deadlineTime;
    tMessage.name = v.name;

    wx.showToast({
      title: '上传中',
      icon: 'loading',
      mask: true,
      duration: 5000
    })

    bmobServer.modifyMessage(this.data.mMessage.messageId, tMessage.title, null, bmobDate, tMessage.content, tMessage.name, this.submitCallback, this.submitErrCallback)

  },
  submitCallback() {

    //本地更新
    app.sentMessage.splice(this.data.indexOfMessage, 1, tMessage);

    wx.hideToast();
    wx.showToast({
      title: '修改成功！',
      duration: 1500,
      icon: "success",
      complete: function (e) {
        wx.navigateBack({
        })
      }
    })


  },
  submitErrCallback() {
    wx.hideToast();
    wx.showToast({
      title: "网络故障!",
      icon: 'none',
      duration: 1000
    })
  },
  selectDate: function (e) {
    this.setData({
      curDate: e.detail.value
    });
  },
  selectTime: function (e) {
    this.setData({
      curTime: e.detail.value
    });
  },

})