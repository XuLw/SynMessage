const {
  regeneratorRuntime
} = global

const RELATION = '_relation'
const MESSAGE = '_message'

function init() {
  // some init code
}

// 获取所有关系
function _getAllRelation() {
  const db = wx.cloud.database()

  return new Promise((resolve, reject) => {
    db.collection(RELATION).where({
      _openid: getApp().globalData.openid,
      concern: true
    }).get().then(res => {
      console.log(res.data)
      resolve()
    }).then(res => {
      console.log(res)
      reject()
    })
  })
}

// 获取所有消息
function getAllMessage() {
  return wx.cloud.callFunction({
    name: 'get_message'
  })
}

// 创建消息
function _createMessage(title, content, author, deadline, isPrivate) {
  const db = wx.cloud.database()

  return new Promise((resolve, reject) => {
    db.collection(MESSAGE).add({
      data: {
        title: title,
        content: content,
        author: author,
        isPrivate: isPrivate,
        isDeleted: false,
        createDate: new Date().getTime(),
        updateDate: new Date().getTime(),
        deadline: deadline,
      }
    }).then(res => {
      resolve(res._id)
    }).catch(res => {
      console.log(res)
      reject(res)
    })
  })
}

// 添加消息
function addMessage(messageId) {
  const db = wx.cloud.database()

  return db.collection(RELATION).add({
    data: {
      messageId: messageId,
      concern: true,
      createDate: new Date().getTime(),
      updateDate: new Date().getTime()
    }
  })
}

// 修改消息
function modifyMessage(message) {
  const db = wx.cloud.database()

  return db.collection(MESSAGE).doc(message._id).update({
    data: {
      title: message.title,
      content: message.content,
      author: message.author,
      updateDate: new Date().getTime,
      deadline: message.deadline
    }
  })
}


// 不再关注消息
function deleteRelation(relationId) {
  const db = wx.cloud.database()

  return db.collection(RELATION).doc(relationId).update({
    data: {
      concern: false
    }
  })
}

// 删除消息
function deleteMessage(messageId) {
  const db = wx.cloud.database()

  return db.collection(MESSAGE).doc(messageId).update({
    data: {
      isDeleted: true
    }
  })
}

// 创建消息并添加关联
async function createMessage(title, content, author, deadline, isPrivate, successF, failF) {
  messageId = await _createMessage(title, content, author, deadline, isPrivate)

  addMessage(messageId).then(res => {
    successF({
      _id: messageId,
      relationId: res._id,
      title: title,
      content: content,
      author: author,
      deadline: deadline,
      isPrivate: isPrivate
    })
  }).catch(res => {
    failF(res)
  })

}

// 判断是否已经添加
function hasAddMessage(messageId) {
  const db = wx.cloud.database()

}

module.exports = {
  init: init,
  createMessage: createMessage,
  addMessage: addMessage,
  deleteMessage: deleteMessage,
  deleteRelation: deleteRelation,
  getAllMessage: getAllMessage,
  modifyMessage: modifyMessage
}