var dbUtil = require("./utils/databaseUtil.js")
const constants = require('./utils/constants.js')

global.regeneratorRuntime = require('./libs/regenerator/runtime-module')

const {
  regeneratorRuntime
} = global


function cloudInit() {

  if (!wx.cloud) {
    console.error('请使用 2.2.3 或以上的基础库以使用云能力')
  } else {
    wx.cloud.init({
      traceUser: true,
    })
  }

  dbUtil.init()
}

function testAddMessage() {
  var sf = function(res) {
    console.log(res)
  }
  var ff = function(res) {
    console.log(res)
  }
  dbUtil.createMessage('title', 'content', 'author', Date(), false, sf, ff)
}

function testDeleteMessage() {
  dbUtil.deleteMessage().then(res => {
    console.log(res)
  }).catch(res => {
    console.log(res)
  })
}

function testDeleteRelation() {
  dbUtil.deleteRelation('988c1b1b5cc05f9e060519654f9f1a90').then(res => {
    console.log(res)
  }).catch(res => {
    console.log(res)
  })
}

function testGetAllMessage() {
  dbUtil.getAllMessage().then(res => {
    console.log(res.result)
    // 获取到所有消息， 进行处理

  }).catch(res => {
    console.log(res)
  })
}

function testHasAddMessage() {
  dbUtil.hasAddMessage("9c4488c75cc071b20614bb437ae6c93").then(res => {
    console.log(res)
  })
}


App({
  globalData: {
    openid: null,
    userInfo: null
  },
  onLaunch: function(res) {
    //   getApp().globalData.userInfo = {}
    //   getApp().globalData.openid = ""

    cloudInit()

    this.init()

    // testAddMessage()
    // testGetAllMessage()
    // testDeleteMessage()
    // testDeleteRelation()

  },

  onShow: function(res) {

  },
  init: function() {
    let that = this
    // 获取openid
    wx.getStorage({
      key: constants.open_id,
      success: function(res) {
        // 已经有openid
        that.globalData.openid = res.data
        // console.log(res)
        console.log("success")

        // testHasAddMessage()
      },
      fail: function(res) {
        console.log("failed")
        // 本地没有openid， 调用云函数获取
        wx.cloud.callFunction({
          name: "get_openid"
        }).then(res => {
          // console.log(res.result.openid)
          that.globalData.openid = res.result.openid
          // 储存到本地
          wx.setStorage({
            key: constants.open_id,
            data: res.result.openid,
          })
        }).catch(res => {
          console.log(res)
        })
      }
    })
  }
})