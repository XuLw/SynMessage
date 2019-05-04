// 全局数据， 和通知排序函数

var globalData = {
  sentMessage: [],
  receivedMessage: [],
  overdueMessage: [],
}

function compare(property) {
  return function(a, b) {
    var value1 = a[property];
    var value2 = b[property];
    return value1 - value2;
  }
}

module.exports = {
  globalData: globalData,
  compare: compare
}