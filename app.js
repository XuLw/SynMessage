//app.js
const Bmob = require('./utils/Bmob-1.4.4.min.js');

const BmobServer = require('./BmobServer/bmobServer.js')
BmobServer.initialize(null,null);

App({
  onLaunch: function () {

  },
  globalData: {
    userInfo: null
  },
  userId: "5"
})