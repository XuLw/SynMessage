// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  // try {
  //   return await db.collection('_message').add({
  //     data: {
  //       title: event.title,
  //       content: event.content,
  //       author: event.author,
  //       isPrivate: event.isPrivate,
  //       isDeleted: event.isDeleted,
  //       createDate: event.createDate,
  //       updateDate: event.createDate,
  //       deadline: event.deadline,
  //     }
  //   })
  // } catch (e) {
  //   console.log(e)
  // }
  
  return {
    message: 3
  }
}