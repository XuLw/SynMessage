// pages/main/main.js

var sentNotification = require("../../templates/sent_notification_template/sent_notification_template.js");
var allNotification = require("../../templates/all_notification_template/all_notification_template.js");
var overdueNotification = require("../../templates/overdue_notification_template/overdue_notification_template.js");

var bmobServer = require("../../BmobServer/bmobServer.js");
var bmobConfig = require("../../BmobServer/bmobServerConfig.js");
var relation = bmobConfig.relation;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    moreDetail: false,
    currentTap: 1,
    allMessage: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //模板加载js文件
    this.tapOnSentDetail = sentNotification.tapOnSentDetail;
    this.tapOnAllDetail = allNotification.tapOnAllDetail;
    this.tapOnOverdueDetail = overdueNotification.tapOnOverdueDetail;

    bmobServer.getAllMessageInfo(this.getAllMessageInfoCallback);
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
  // 展开信息
  tapOnNewNotification: function () {
    wx.navigateTo({
      url: '/pages/newNotification/newNotification',
    })
  },
  extendNotification: function (e) {
    wx.navigateTo({
      url: "/pages/notificationDetail/notificationDetail",
    })
  },
  slideOnSwiper: function (e) {
    this.setData({
      currentTap: e.detail.current
    })
  },
  switchTitle: function (e) {

    if (this.data.currentTap === e.currentTarget.dataset.current) {
      return false;
    } else {
      this.setData({
        currentTap: e.currentTarget.dataset.current
      })
    }
  },
  getAllMessageInfoCallback(message) {

    var temp = [];
    var eachMeassge = {};
    for (var i = 0; i < message.length; i++) {
      eachMeassge.title = message[i].title;
      eachMeassge.content = message[i].content;
      eachMeassge.author = message[i].author;

      eachMeassge.date = message[i].time.iso.substr(0, 8);
      eachMeassge.time = message[i].time.iso.substr(9, 8);

      temp.push(eachMeassge);
      
    }


    this.setData({
      allMessage: temp
    });

    console.log(temp);
  }
})