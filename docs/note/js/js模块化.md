#### js模块化发展

渐渐js开始发展到服务器端，而作为服务端语言，所必备的一个条件就是模块化，于是各个社区开始指定js相关的模块规范。而到es6的时候，es官方也给出了模块机制。

###### 模块化演变

全局function模式==>namespace模式==>IIFE模式==>IIFE模式增强==>模块模式

* 全局function模式

```javascript
function m1(){
  //...
}
```

问题：污染全局命名空间, 容易引起命名冲突或数据不安全，而且模块成员之间看不出直接关系

* namespace模式

```javascript
let myModule = {
  data: 'www.baidu.com',
  foo() {
    console.log(`foo() ${this.data}`)
  },
  bar() {
    console.log(`bar() ${this.data}`)
  }
}
myModule.data = 'other data' //能直接修改模块内部的数据
myModule.foo() // foo() other data
```

 问题: 数据不安全(外部可以直接修改模块内部的数据) 

* IIFE模式：匿名函数自调用(闭包)

```html
// module.js文件
(function(window) {
  let data = 'www.baidu.com'
  //操作数据的函数
  function foo() {
    //用于暴露有函数
    console.log(`foo() ${data}`)
  }
  function bar() {
    //用于暴露有函数
    console.log(`bar() ${data}`)
    otherFun() //内部调用
  }
  function otherFun() {
    //内部私有的函数
    console.log('otherFun()')
  }
  //暴露行为
  window.myModule = { foo, bar } //ES6写法
})(window)


// index.html文件
<script type="text/javascript" src="module.js"></script>
<script type="text/javascript">
    myModule.foo()
    myModule.bar()
    console.log(myModule.data) //undefined 不能访问模块内部数据
    myModule.data = 'xxxx' //不是修改的模块内部的data
    myModule.foo() //没有改变
</script>
```

 问题:无法在该模块引入另外一个模块

* IIFE模式增强 : 引入依赖

```html
// module.js文件
(function(window, $) {
  let data = 'www.baidu.com'
  //操作数据的函数
  function foo() {
    //用于暴露有函数
    console.log(`foo() ${data}`)
    $('body').css('background', 'red')
  }
  function bar() {
    //用于暴露有函数
    console.log(`bar() ${data}`)
    otherFun() //内部调用
  }
  function otherFun() {
    //内部私有的函数
    console.log('otherFun()')
  }
  //暴露行为
  window.myModule = { foo, bar }
})(window, jQuery)

// index.html文件
<!-- 引入的js必须有一定顺序 -->
<script type="text/javascript" src="jquery-1.10.1.js"></script>
<script type="text/javascript" src="module.js"></script>
<script type="text/javascript">
  myModule.foo()
</script>
```

问题：过多的script标签导致请求过多、依赖模糊（不清楚谁依赖谁）、  难以维护 。所以在此基础上，js便开始了产生了模块化的规范。

###### 常见的模块规范

AMD（require.js库使用）非同步

```javascript
//定义没有依赖的模块
define(function(){
   return 模块
})

//定义有依赖的模块
define(['module1', 'module2'], function(m1, m2){
   return 模块
})

//引入使用模块
require(['module1', 'module2'], function(m1, m2){
   //使用m1/m2
})
```

CMD（sea.js库使用）异步

```javascript
//定义没有依赖的模块
define(function(require, exports, module){
  exports.xxx = value
  module.exports = value
})

//定义有依赖的模块
define(function(require, exports, module){
  //引入依赖模块(同步)
  var module2 = require('./module2')
    //引入依赖模块(异步)
    require.async('./module3', function (m3) {
    })
  //暴露模块
  exports.xxx = value
})

//引入使用模块
define(function (require) {
  var m1 = require('./module1')
  var m4 = require('./module4')
  m1.show()
  m4.show()
})
```

CommonJs （node.js中使用）同步

```javascript
//一个一个 导出
module.exports.foo = function(){}
module.exports.age = 1
exports.a = 'hello' //使用exports导出后不能修改此变量，作为静态变量
 
//整体导出，不能使用exports导出
module.exports = { age: 1, a: 'hello', foo:function(){} }


//导入
const foo = require('./foo.js');
```

es6 module （react等框架）异步

```javascript
//导出
export { name1, name2, …, nameN }; // 与之前声明的变量名绑定 命名导出
export default expression; // 默认导出
                                 
//导入                            
import defaultExport from 'module';     
//与commonjs的区别
//1、CommonJs导出的是变量的一份拷贝，ES6 Module导出的是变量的绑定（引用）；
//2、CommonJs是单个值导出，ES6 Module可以导出多个；
//3、CommonJs是动态语法可以写在判断里，ES6 Module静态语法只能写在顶层；
//4、CommonJs的 this 是当前模块，ES6 Module的 this 是 undefined。
```

###### 以及组合型的模块规范

UMD通用模块 （ 就是AMD+CommonJs+全局变量的组合规范 ）

```javascript
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.libName = factory());//在原生js情况下，此处的global就是指的window对象
}(this, (function () { 'use strict';})));
```

在实际的情况中，各个类库基本都是将某个规范细微改动后使用，例如node也是将commonjs的模块机制调动后使用的。react也是将自行编译了es6的模块机制。

| 语法       | commonJS                             | ES6                                     | AMD                                                          | CMD                                                          |
| ---------- | ------------------------------------ | --------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 导出       | module.exports = {}<br/>exports = {} | export default {}<br/>export var a = 10 | define(id?: String, dependencies?: String[], factory: Function(Object); | define(function(require, exports, module) {});               |
| 导入       | require(‘module’)                    | import module from ‘module’             | require([‘myModule’], function(myModule) {});                | var a = require(‘./a’);<br/>require.async(‘./b’, function(b) {}); |
| 加载       | 动态 – 同步                          | 静态                                    | 动态-异步                                                    | 动态-同步或异步                                              |
| 导出的对象 | 副本                                 | 引用                                    |                                                              |                                                              |
| 多次导出   | 同一个对象                           |                                         |                                                              |                                                              |
| 模块作用域 | 文件                                 | 文件                                    | 文件                                                         |                                                              |
| 循环加载时 | 加载已执行的部分                     |                                         |                                                              |                                                              |
| 浏览器支持 | 是                                   | 否                                      | 是                                                           | 是                                                           |
| node支持   | 是                                   | 否                                      |                                                              | 是                                                           |
| 典型环境   | nodejs                               | babel，vue                              | requirejs                                                    | seajs                                                        |
| 引用目录时 | 找package.json定义的main,或index     |                                         |                                                              |                                                              |





