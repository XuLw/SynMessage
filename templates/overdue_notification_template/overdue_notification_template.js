const OverdueNotification = {
  tapOnOverdueDetail: function (e) {
    wx.navigateTo({
      url: "/pages/overdueNotificationDetail/overdueNotificationDetail",
    })
  }

}

module.exports = OverdueNotification;
