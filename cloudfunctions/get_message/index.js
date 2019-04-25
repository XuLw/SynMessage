// 云函数入口文件

/**
 * 根据relation表中的数据，获取用户所有有效的信息，并加入自己relation中的_id
 * 
 * 返回
 */
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const wxContext = cloud.getWXContext()

function getRelation() {
  return new Promise((resolve, reject) => {
    db.collection('_relation').where({
      _openid: wxContext._openid,
      concern: true
    }).get().then(res => {
      resolve(res.data)
    }).then(res => {
      reject(res)
    })
  })
}

// 云函数入口函数
exports.main = async(event, context) => {

  relations = await getRelation()
  var messageIds = []
  var m = new Map()
  for (var i = 0; i < relations.length; i++) {
    messageIds.push(relations[i].messageId)
    m.set(relations[i].messageId, relations[i]._id)
  }

  const _ = db.command
  const today = new Date().getTime()

  try {

    result = await db.collection('_message').where({
      _id: _.in(messageIds)
    }).orderBy('deadline', 'desc').get()

    result = result.data

    count = result.length
    for (var i = 0; i < count; i++) {

      if (wxContext._openid != result[i]._openid && result[i].isDeleted) {
        // 不是自己发的而且消息已经被删除, 则不返回
        result.splice(i, 1)
        count = count - 1
        continue
      }

      console.log(today)



      result[i].relationId = m.get(result[i]._id)

    }

    return result

  } catch (e) {
    console.error(e)
    return e
  }

}