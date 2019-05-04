// 一些工具函数

const getDate = function(datetime) {
  return datetime.getFullYear() + '-' + (("0" + (datetime.getMonth() + 1)).slice(-2)) + '-' + (("0" + datetime.getDate()).slice(-2))
}

const getTime = function(datetime) {
  return ("0" + datetime.getHours()).slice(-2) + ':' + ("0" + datetime.getMinutes()).slice(-2)
}

var showLoadingToast = function(title) {
  wx.showToast({
    title: title,
    duration: 5000,
    icon: "loading"
  })
}

module.exports = {
  showLoadingToast: showLoadingToast,
  getDate: getDate,
  getTime: getTime
}