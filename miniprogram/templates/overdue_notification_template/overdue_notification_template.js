const OverdueNotification = {
  tapOnOverdueDetail: function (e) {
    wx.navigateTo({
      url: "/pages/overdueNotificationDetail/overdueNotificationDetail" + "?id=" + e.currentTarget.dataset.id,
    })
  }

}

module.exports = OverdueNotification;
