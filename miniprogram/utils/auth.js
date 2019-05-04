const {
  regeneratorRuntime
} = global

function _auth_info(){
  wx.getSetting({
    success(res) {
      if (res.authSetting['scope.userInfo']) {
        // 用户已经授权
        wx.getUserInfo({
          success: function (res) {
            getApp().globalData.userInfo = res.userInfo
          }
        })
      } else {
        //未授权，跳转至授权页面
        wx.redirectTo({
          url: '/pages/index/index',
          fail: errors.systemError
        })
      }
    }
  })
}

async function auth_info(){
  
}
