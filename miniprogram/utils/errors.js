// 错误处理函数


function systemError(info) {
  // TODO : handle system error
  console.log("systemError: " + info)
}

function databaseError(info) {
  // TODO : handle error
  console.log("databaseError: " + info)

  wx.showToast({
    title: '网络错误！',
    duration: 1000
  })
}



module.exports = {
  systemError: systemError,
  databaseError: databaseError
}