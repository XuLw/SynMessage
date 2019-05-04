// pages/sharePage/sharePage.js
const dbUtils = require("../../utils/databaseUtil.js")

var now = new Date().getTime();

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
  onLoad: function(options) {
    this.setData({
      messageId: options.id
    })

    //加载消息

    dbUtils.getMessageById(this.data.messageId).then(res => {
      if (!res.data.isDeleted && (now - res.data.deadline < 864000000))
        // 消息还有效
        this.setData({
          mMessage: res.data
        })
      else {
        wx.showToast({
          title: '通知已过期',
          icon: 'none',
          duration: 1000
        })
        wx.redirectTo({
          url: "/pages/main/main"
        })
      }
    }).catch(res => {
      console.log(res)
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
  ignoreNoti: function() {
    wx.reLaunch({
      url: '/pages/main/main',
    })
  },
  catchNoti: function() {
    //获取通知
    wx.showToast({
      title: '获取中',
      icon: "loading",
      duration: 3000
    })

    // 进行获取
    dbUtils.hasAddMessage(this.data._id).then(res => {
      if (res) {
        // 已经添加了
        wx.hideToast()
        wx.showToast({
          title: '已添加！',
          icon: 'success',
          duration: 3000,
          complete: function() {
            wx.redirectTo({
              url: "/pages/main/main"
            })
          }
        })

      } else {
        // 未添加 
        dbUtils.addMessage(this.data._id).then(res => {
          wx.hideToast()
          wx.showToast({
            title: '添加成功！',
            icon: 'none',
            duration: 1000
          })
          wx.redirectTo({
            url: "/pages/main/main"
          })

        }).catch(res => {
          console.log(res)
          wx.showToast({
            title: '出现问题了..',
            icon: 'none',
            duration: 1000
          })
          wx.redirectTo({
            url: "/pages/main/main"
          })
        })
      }
    }).catch(res => {
      console.log(res)
    })
  }
})