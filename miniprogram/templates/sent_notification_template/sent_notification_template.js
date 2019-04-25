const SentNotification = {
  tapOnSentDetail: function (e) {
    wx.navigateTo({
      url: "/pages/sentNotificationDetail/sentNotificationDetail" + "?id=" + e.currentTarget.dataset.id,
    })
  }

}

module.exports = SentNotification;
