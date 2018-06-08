# SynMessage
更方便的管理通知



# BmobServer 使用方式 李伟港
```javascript
var bmobServer = require("../../BmobServer/bmobServer.js");
var bmobConfig = require("../../BmobServer/bmobServerConfig.js");
var relation = bmobConfig.relation;
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
 