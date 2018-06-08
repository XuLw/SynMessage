// pages/newNotification/newNotification.js

var bmobServer = require("../../BmobServer/bmobServer.js");
var bmobConfig = require("../../BmobServer/bmobServerConfig.js");
var relation = bmobConfig.relation;

var utils = require("../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    curDate: '',
    curTime: '',
    shareStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.from)
    if (options.from == 0) {
      this.setData({
        shareStatus: true
      })
    }
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
    var d = new Date();
    this.setData({
      curDate: `${d.getUTCFullYear()}-${("0" + (d.getMonth() + 1)).slice(-2)}-${d.getUTCDate()}`,
      curTime: `${("0" + (d.getHours())).slice(-2)}:${("0" + (d.getMinutes())).slice(-2)}`,
    });
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
    var content = v.content;
    var deadlineDate = v.deadlineDate;
    var deadlineTime = v.deadlineTime;
    var dateTime = new Date(deadlineDate + " " + deadlineTime);
    var bmobDate = utils.dateToBDate(dateTime);
    var name = v.name;

    wx.showToast({
      title: '上传中',
      icon: 'loading',
      mask: true,
      duration: 5000
    })
    bmobServer.addMessageInfo(title, true, bmobDate, content, name, this.addMessageInfoCallback, null);

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
  changeShareStatus: function (e) {
    this.setData({
      shareStatus: e.detail.value
    })
  },
  addMessageInfoCallback(message) {
    console.log("上传通知成功！")
    console.log(message[0].messageId);
    var mRelation = this.data.shareStatus ? relation.AsPublisher : relation.AsPersonal;
    bmobServer.addRelationInfo("2", message[0].messageId, mRelation, true, this.addRelationInfoCallback, this.addRelationInfoErrCallback);
  },
  addRelationInfoCallback(message) {
    console.log(message);
    console.log("上传关系成功！");
    wx.hideToast();
    wx.showToast({
      title: '上传成功！',
      duration: 1000,
      icon: "success"
    })
    
  },
  addRelationInfoErrCallback(message) {
    console.log(message);
  }
})