//app.js
const Bmob = require('./utils/Bmob-1.4.4.min.js')
Bmob.initialize("ab7b1e4fb4e1b719ef52172960a8c6d5", "7b487f647c82ffaa4970f122d9e9d89f");

App({
  onLaunch: function () {

  },
  globalData: {
    userInfo: null
  },
  userId: "5"
})