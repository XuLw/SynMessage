// pages/newNotification/newNotification.js

var bmobServer = require("../../BmobServer/bmobServer.js");
var bmobConfig = require("../../BmobServer/bmobServerConfig.js");
var relation = bmobConfig.relation;

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
    var content = v.content;
    var deadlineDate = v.deadlineDate;
    var deadlineTime = v.deadlineTime;
    var dateTime = new Date(deadlineDate + " " + deadlineTime);
    dateTime.setSeconds(1);
    var bmobDate = bmobServer.makeBmobDate(dateTime);
    var name = v.name;
    var isShare = v.isShare;

    bmobServer.addMessageInfo(title, true, bmobDate, content, name, this.addMessageInfoCallback);

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
    console.log(message);

    // bmobServer.addRelationInfo("2", 3, relation.AsPersonal, this.addRelationInfo, );
  },
  addRelationInfoCallback(message) {
    console.log(message);
  }
})