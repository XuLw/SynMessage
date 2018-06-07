// pages/bmobDemo/bmobDemo.js

var bmobServer = require("../../BmobServer/bmobServer.js");
var bmobConfig = require("../../BmobServer/bmobServerConfig.js");
var relation = bmobConfig.relation;
var d3 = new Date(79, 5, 24, 11, 33, 0)
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //得到全部的 user 信息
    //参数:callback
    //bmobServer.getAllUserInfo(null);

    //得到全部的 Message 消息
    //参数:callback
    //bmobServer.getAllMessageInfo(null);

    //得到指定userId的user信息
    //参数:userId ,callback
    //bmobServer.getUserInfoById("1",null);

    //得到指定messageId的message信息
    //参数:messageId ,callback
    //bmobServer.getMessageInfoById(1,null);

    //添加user
    //参数:userId,name,callback
    //bmobServer.addUserInfo("5","yang",null);

    //添加message
    //参数:title,effect,time,content,author,callback
    //bmobServer.addMessageInfo("title", true,null, "新添加的通知的内容", "李维刚", callback);

    //添加user和message关系
    //参数:userId,messageId,relation,callback
    //relation为bmobServerConfig.js中定义类型
    //relation.AsPersonal:个人消息
    //relation.AsReceiver:接受消息
    //relation.AsPublisher:发布消息
    //bmobServer.addRelationInfo("2", 3, relation.AsPersonal,callback);
    //bmobServer.addRelationInfo("2", 1, relation.AsReceiver,callback);
    //bmobServer.addRelationInfo("5", 2, relation.AsReceiver,callback);
    //bmobServer.addRelationInfo("5", 1, relation.AsPublisher,callback);

    //通过userId和relation查找对应的message
    //通过messageId和relation查找对应的message
    //同时执行下面两条语句,下面那一条会查不到数据
    //bmobServer.getMessageByUserId("5",relation.AsPublisher,callback);
    //bmobServer.getUserbyMessageId(2, relation.AsPublisher,callback);

    //修改message
    //参数messageId,title,effect,time,content,author,callback
    //不修改的部分赋值Null
    //bmobServer.modifyMessage(2,"被修改的title",false,null,"修改过后的内容","依然是我",callback);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})