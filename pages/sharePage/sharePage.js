// pages/sharePage/sharePage.js
var bmobServer = require("../../BmobServer/bmobServer.js");
var bmobConfig = require("../../BmobServer/bmobServerConfig.js");
var relation = bmobConfig.relation;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    messageId: 0,
    mMessage: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      messageId: options.id
    })

    bmobServer.initialize(that.UserInfoCallback, that.UserInfoErrCallback);

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
  ignoreNoti: function () {
    wx.reLaunch({
      url: '/pages/main/main',
    })
  },
  catchNoti: function () {
    //获取通知
    wx.showToast({
      title: '上传中',
      icon: "loading",
      duration: 3000
    })
    console.log(getApp().userId)
    console.log(this.data.messageId)
    bmobServer.addRelationInfo(getApp().userId, this.data.messageId - 0, relation.AsReceiver, true, this.addRelationInfoCallback, this.addRelationInfoErrCallback);
    // bmobServer.addRelationInfo("1", 68, relation.AsReceiver, true, this.addRelationInfoCallback, this.addRelationInfoErrCallback);
  },

  addRelationInfoCallback(res) {

    wx.hideToast();
    wx.reLaunch({
      url: '/pages/main/main',
    })

  },
  addRelationInfoErrCallback(res) {
    console.log(res)
    wx.showToast({
      title: '出现问题了..',
      icon: 'none',
      duration: 1000
    })
  },
  UserInfoCallback(message) {
    //  console.log(message)
    getApp().userId = message.authData.weapp.openid;
    // console.log("appid")
    console.log(getApp().userId)
    //查询是否自己发送的通知
    // getApp().userId = '10';
    bmobServer.getAllUserbyMessageId(this.data.messageId - 0, this.getAllUserCallback, this.getAllUserErrCallback);

  },
  getAllUserCallback(res) {
    //已经添加 或者 是自己发送的
    if (res.indexOf(getApp().userId) != -1) {
      wx.reLaunch({
        url: '/pages/main/main',
      })
    } else {
      //否则查询通知信息
      bmobServer.getMessageInfoById(this.data.messageId - 0, this.queryCallback, this.queryErrCallback)
    }
  },
  queryCallback(res) {
    console.log(this.data.messageId)
    console.log(res)
    //初始化页面通知
    var tMessage = res[0];
    tMessage.date = tMessage.time.iso.substr(0, 10);
    tMessage.time = tMessage.time.iso.substr(11, 5);
    tMessage.state = relation.AsReceiver;
    this.setData({
      mMessage: tMessage
    })

  },
  queryErrCallback(res) {
    wx.showToast({
      title: '通知已经不存在',
      icon: 'none',
      duration: 1000
    })
  },
  getAllUserErrCallback(res) { },
})