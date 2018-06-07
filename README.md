# SynMessage
更方便的管理通知

## 2018.6.7 李伟港
解决Date无法提交问题
1. 正常使用BmobServer内的函数
2. 对于Date数据,需要将js中的Date类型转换成BmobDate类型
实例: 
```javascript
var date = new Date();//js中的Date类型
var bmobDate = bmobServer.makeBmobDate(date);//Bmob数据库中需要的Date类型
//再将这个bmobDate用到需要BmobDate的地方即可
```

## 2018.6.7 李伟港
对Bmob的功能进行封装

### 使用方法:
1. 导入Bmob-1.4.4.min.js,并初始化Bmob
2. 需要使用Bmob服务的页面,导入bmobServer.js和bmobServerConfig.js
3. 调用BmobServer中的函数
具体的函数调用方法和解释,参考page/bmobDemo.js 
(关于messageTable中的Date的设置失败尚未解决)
