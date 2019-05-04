// pages/newNotification/newNotification.js

var app = getApp();

var utils = require("../../utils/util.js");
var dbUtils = require("../../utils/databaseUtil.js")
var globalData = require("../../utils/data.js").globalData;
var errors = require("../../utils/errors.js")


var tMessage = {};

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mDate: "",
    mTime: "",
    mMessage: {},
    indexOfMessage: 0,
    systemNote: "新功能持续完善中！"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      indexOfMessage: options.id,
      mMessage: globalData.sentMessage[options.id]
    })

    this.setData({
      mDate: this.data.mMessage.date,
      mTime: this.data.mMessage.time
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
  onShareAppMessage: function() {
    return {
      title: "管理你的通知把！",
      url: "/pages/main/main"
    }
  },
  submit: function(e) {

    var v = e.detail.value;

    if (v.title === undefined || v.title === "") {
      this.setData({
        systemNote: "标题不能为空!"
      })
      return
    } else if (v.content === undefined || v.content === "") {
      this.setData({
        systemNote: "内容不能为空!"
      })
      return
    } else if (v.name === undefined || v.name === "") {
      this.setData({
        systemNote: "最好署上名字噢!"
      })
      return
    } else if (v.dateTime.getTime() < now) {
      this.setData({
        systemNote: "通知的时间已经过期咯！"
      })
      return
    }

    this.data.mMessage.title = v.title
    this.data.mMessage.content = v.content
    this.data.mMessage.date = v.deadlineDate
    this.data.mMessage.time = v.deadlineTime
    this.data.mMessage.author = v.name
    this.data.mMessage.deadline = new Date(v.deadlineDate + " " + v.deadlineTime).getTime()

    wx.showToast({
      title: '上传中',
      icon: 'loading',
      mask: true,
      duration: 5000
    })

    dbUtils.modifyMessage(this.data.mMessage).then(res => {
      console.log("修改成功")
      console.log(res)
      // 更新本地数据
      globalData.sentMessage.splice(this.data.indexOfMessage, 1, this.data.mMessage);
      wx.hideToast()
      wx.showToast({
        title: '修改成功！',
        duration: 1500,
        icon: "success",
        complete: function(e) {
          wx.navigateBack({})
        }
      })

    }).catch(res => {
      errors.databaseError(res)
    })


  },
  submitCallback() {

    //本地更新
    globalData.sentMessage.splice(this.data.indexOfMessage, 1, mMessage);

    wx.hideToast();
    wx.showToast({
      title: '修改成功！',
      duration: 1500,
      icon: "success",
      complete: function(e) {
        wx.navigateBack({})
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
  selectDate: function(e) {
    console.log(e)
    this.setData({
      mDate: e.detail.value
    });
  },
  selectTime: function(e) {
    this.setData({
      mTime: e.detail.value
    });
  },

})