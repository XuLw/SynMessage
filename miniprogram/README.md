# SynMessage
更方便的管理通知

## 2018.6.9 Concern的修改与effect关联 李伟港
modifyMessageConcern函数添加了修改对应的message的effect的功能,对于publisher与message的concern会反映到effect,而personal和receiver则不会影响message的effect字段.
## BmobServer 初始化方法 李伟港
1. 配置BmobServer中的bmobkey
2. 引入bmobServer
```javascript
var bmobServer = require("../../BmobServer/bmobServer.js");
```
3. 传入回调函数接受用户信息

实例:
```javascript 
//初始化
const BmobServer = require('./BmobServer/bmobServer.js')
BmobServer.initialize(null,null);
```

## BmobServer 使用方式 李伟港
对于需要调用BmobServer内函数的需要一下操作
```javascript
var bmobServer = require("../../BmobServer/bmobServer.js");
var bmobConfig = require("../../BmobServer/bmobServerConfig.js");
var relation = bmobConfig.relation;
```

## 2018.6.8 user与message的concern 李伟港
数据库 myRelationTable添加concern字段
concern字段表示user对message的关注状态(true为关注,false为不关注)

如果user与message是relation.AsPublisher关系,则这个user对于message的不关注意味着message失效
(对于这种情况尚未对myMessageTable中的effect进行修改).

```javascript
//修改user与messag之间的关注
// bmobServer.modifyMessageConcern("5",5,true,null,null);
```
对于之前的函数亦有修改:
```javaScript
//原来的创建Relation的方法
bmobServer.addRelationInfo("2", 3, relation.AsPersonal,callback,null);
//修改后的创建Relation的方法(增加concern参数)
bmobServer.addRelationInfo("2", 3, relation.AsPersonal,true,callback,null);
```
## 2018.6.8 BmobDate转Date 李伟港
```javascript
    var date = new Date(2020,2,3,10,0,0);
    var bmobDate = bmobServer.translateDateToBmobDate(date);
    //将BmobDate转换成Date
    var dateR = bmobServer.translateBmobDateToDate(bmobDate);
```

## 2018.6.7 李伟港
添加一个通过userId查询message的有限制的函数
var getMessageByUserIdWithLimit = function (userId, relation,messageLimit, callback)
和 getMessageByUserId 的差别在于messageLimit

messageLimit可以通过bmobServer.makeMessageLimit(messageCountLimit,messageDateLimit)创建
messageCountLimit为数值类型,messageDateLimit为BmobDate类型

实例:
```javascript
    // 添加限制的查询messager
    // var dateLimit = new Date(2020,2,3,10,0,0);
    // var messageDateLimit =bmobServer.makeBmobDate(dateLimit);
    // var limit=bmobServer.makeMessageLimit(10, messageDateLimit);
    // bmobServer.getMessageByUserIdWithLimit("5", relation.AsPublisher, limit, null)
```
## 2018.6.7 解决Date无法提交问题 李伟港
解决Date无法提交问题
1. 正常使用BmobServer内的函数
2. 对于Date数据,需要将js中的Date类型转换成BmobDate类型
实例: 
```javascript
var date = new Date();//js中的Date类型
var bmobDate = bmobServer.makeBmobDate(date);//Bmob数据库中需要的Date类型
//再将这个bmobDate用到需要BmobDate的地方即可
```

## 2018.6.7 BmobServer使用方法 李伟港
BmobServer使用方法

### 使用方法:
1. 导入Bmob-1.4.4.min.js,并初始化Bmob
2. 需要使用Bmob服务的页面,导入bmobServer.js和bmobServerConfig.js
3. 调用BmobServer中的函数
具体的函数调用方法和解释,参考page/bmobDemo.js 
(关于messageTable中的Date的设置失败尚未解决)
 