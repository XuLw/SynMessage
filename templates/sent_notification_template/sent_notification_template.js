const SentNotification = {
  tapOnSentDetail: function (e) {
    wx.navigateTo({
      url: "/pages/sentNotificationDetail/sentNotificationDetail",
    })
  }

}

module.exports = SentNotification;
