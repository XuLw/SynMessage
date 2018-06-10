// pages/main/main.js

var sentNotification = require("../../templates/sent_notification_template/sent_notification_template.js");
var allNotification = require("../../templates/all_notification_template/all_notification_template.js");
var overdueNotification = require("../../templates/overdue_notification_template/overdue_notification_template.js");

var globalData = require("../../utils/data.js").globalData;

var bmobServer = require("../../BmobServer/bmobServer.js");
var bmobConfig = require("../../BmobServer/bmobServerConfig.js");
var relation = bmobConfig.relation;

var today = new Date();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    moreDetail: false,
    currentTap: 1,
    _sentNotification: [],
    _receivedNotification: [],
    _overDueNotification: []
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    globalData.sentMessage = [];
    globalData.overdueMessage = [];
    globalData.receivedMessage = [];
    //模板加载js文件
    this.tapOnSentDetail = sentNotification.tapOnSentDetail;
    this.tapOnAllDetail = allNotification.tapOnAllDetail;
    this.tapOnOverdueDetail = overdueNotification.tapOnOverdueDetail;

    wx.hideToast();

    let that = this;
    wx.showToast({
      title: '加载中',
      duration: 5000,
      icon: "loading"
    })


    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              //获取用户名
              console.log("已授权")
              getApp().userName = res.userInfo.nickName
              bmobServer.initialize(that.UserInfoCallback, that.UserInfoErrCallback);
            }
          })
        } else {
          wx.hideToast();
          wx.redirectTo({
            url: '/pages/index/index',
            fail: function (res) {
              console.log(res)
            }
          })
        }
      }
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
    this.setData({
      _sentNotification: globalData.sentMessage,
      _receivedNotification: globalData.receivedMessage,
      _overdueNotification: globalData.overdueMessage,
    })
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
  onShareAppMessage: function (res) {

  },

  tapOnNewNotification: function () {
    var that = this;
    wx.navigateTo({
      url: '/pages/newNotification/newNotification' + '?from=' + that.data.currentTap
    })
  },
  // 展开信息
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
  UserInfoCallback(message) {
    //  console.log(message)
    getApp().userId = message.authData.weapp.openid;
    // console.log(getApp().userId)
    bmobServer.getMessageByUserId(getApp().userId, relation.AsPublisher, true, this.publicMessageCallback, this.errCallback);

  },
  publicMessageCallback(message) {
    today.setSeconds(0);
    for (var i = 0; i < message.length; i++) {
      //转换为js里面的Date
      var date = bmobServer.translateBmobDateToDate(message[i].time);
      if (date > today && message[i].effect === true) {
        //消息有效
        message[i].date = message[i].time.iso.substr(0, 10);
        message[i].time = message[i].time.iso.substr(11, 5);
        message[i].state = relation.AsPublisher;
        globalData.sentMessage.unshift(message[i]);
      } else {
        message[i].date = message[i].time.iso.substr(0, 10);
        message[i].time = message[i].time.iso.substr(11, 5);
        message[i].state = relation.AsPublisher;
        globalData.overdueMessage.unshift(message[i]);
      }
    }
    bmobServer.getMessageByUserId(getApp().userId, relation.AsReceiver, true, this.receivedMessageCallback, this.errCallback);
  },
  receivedMessageCallback: function (message) {

    for (var i = 0; i < message.length; i++) {
      //转换为js里面的Date
      var date = bmobServer.translateBmobDateToDate(message[i].time);
      if (date > today && message[i].effect === true) {
        //消息有效
        message[i].date = message[i].time.iso.substr(0, 10);
        message[i].time = message[i].time.iso.substr(11, 5);
        message[i].state = relation.AsReceiver;
        globalData.receivedMessage.unshift(message[i]);
      } else {
        message[i].date = message[i].time.iso.substr(0, 10);
        message[i].time = message[i].time.iso.substr(11, 5);
        message[i].state = relation.AsReceiver;
        globalData.overdueMessage.unshift(message[i]);
      }
    }

    bmobServer.getMessageByUserId(getApp().userId, relation.AsReceiver, false, this.receivedMessageCallback1, this.errCallback);

  },
  receivedMessageCallback1(message) {
    //不再关注 都为无效
    globalData.overdueMessage = globalData.overdueMessage.concat(message);

    bmobServer.getMessageByUserId(getApp().userId, relation.AsPersonal, true, this.personalMessageCallback, this.errCallback);
  },
  personalMessageCallback(message) {

    for (var i = 0; i < message.length; i++) {
      //转换为js里面的Date
      var date = bmobServer.translateBmobDateToDate(message[i].time);
      if (date > today && message[i].effect === true) {
        //消息有效
        message[i].date = message[i].time.iso.substr(0, 10);
        message[i].time = message[i].time.iso.substr(11, 5);
        message[i].state = relation.AsPersonal;
        globalData.receivedMessage.unshift(message[i]);
      } else {
        message[i].date = message[i].time.iso.substr(0, 10);
        message[i].time = message[i].time.iso.substr(11, 5);
        message[i].state = relation.AsPersonal;
        globalData.overdueMessage.unshift(message[i]);
      }
    }

    this.setData({
      _sentNotification: globalData.sentMessage,
      _receivedNotification: globalData.receivedMessage,
      _overdueNotification: globalData.overdueMessage,
    })

    wx.hideToast();

  },
  errCallback(message) {
    console.log(message)
  },

  UserInfoErrCallback(message) {
    console.log(message)
  }
})