const AllNotification = {
  tapOnAllDetail: function (e) {
    wx.navigateTo({
      url: "/pages/notificationDetail/notificationDetail" + "?id=" + e.currentTarget.dataset.id,
    })
  }

}

module.exports = AllNotification;
