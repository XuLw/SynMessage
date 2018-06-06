// pages/newNotification/newNotification.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curDate: '',
    curTime: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  }
})