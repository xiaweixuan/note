[[toc]]

# nodejs笔记

 本笔记根据河北师范大学软件学院王顶老师授课内容及网络资料编写，如果侵权，联系删除~ 

如有错误欢迎联系更正~

### nodejs简介，及常见名词解释

（此处的简介可以在后面文章中遇到疑问再返回此处查看）

###### nodejs是什么

Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。
Node.js 使用了一个事件驱动、非阻塞式 I/O 的模型。
Node 是一个让 JavaScript 运行在服务端的开发平台。
实质是对Chrome V8引擎进行了封装，使用C++实现。

###### node主要特征

1、单线程
    在Java、PHP或者.net等服务器端语言中，会为每一个客户端连接创建一个新的线程。而每个线程需要耗费大约2MB内存。也就是说，理论上，一个8GB内存的服务器可以同时连接的最大用户数为4000个左右。要让Web应用程序支持更多的用户，就需要增加服务器的数量，而Web应用程序的硬件成本当然就上升了。
    Node.js不为每个客户连接创建一个新的线程，而仅仅使用一个线程。当有用户连接了，就触发一个内部事件，通过非阻塞I/O、事件驱动机制，让Node.js程序宏观上也是并行的。使用Node.js，一个8GB内存的服务器，可以同时处理超过4万用户的连接。另外，单线程的带来的好处，还有操作系统完全不再有线程创建、销毁的时间开销。坏处，就是一个用户造成了线程的崩溃，整个服务都崩溃了，其他人也崩溃了。
2、异步I/O
    例如，当在访问数据库取得数据的时候，需要一段时间。在传统的单线程处理机制中，在执行了访问数据库代码之后，整个线程都将暂停下来，等待数据库返回结果，才能执行后面的代码。也就是说，I/O阻塞了代码的执行，极大地降低了程序的执行效率。
    由于Node.js中采用了非阻塞型I/O机制，因此在执行了访问数据库的代码之后，将立即转而执行其后面的代码，把数据库返回结果的处理代码放在回调函数中，从而提高了程序的执行效率。
    当某个I/O执行完毕时，将以事件的形式通知执行I/O操作的线程，线程执行这个事件的回调函数。为了处理异步I/O，线程必须有事件循环，不断的检查有没有未处理的事件，依次予以处理。
    阻塞模式下，一个线程只能处理一项任务，要想提高吞吐量必须通过多线程。而非阻塞模式下，一个线程永远在执行计算操作，这个线程的CPU核心利用率永远是100%。
3、事件驱动
     在Node中，客户端请求建立连接，提交数据等行为，会触发相应的事件。在Node中，在一个时刻，只能执行一个事件回调函数，但是在执行一个事件回调函数的中途，可以转而处理其他事件（比如，又有新用户连接了），然后返回继续执行原事件的回调函数，这种处理机制，称为“事件环”机制。
     Node.js底层是C++（V8也是C++写的）。底层代码中，近半数都用于事件队列、回调函数队列的构建。

###### 运行 node.js 脚本文件时要省略 node 命令，如何操作

在脚本代码前面加入#!/usr/bin/node，并对脚本文件增加可执行权限
增加 linux 文件的可执行权限 chmod u+x file-name  



###### node的单线程

		在开启电脑后，会运行浏览器，微信，视频等软件，然而cpu数量很少，所以使用的时并发的方式，即cpu给不同的进程分配时间片。打开视频，不仅可以有画面，还有音频播放等等，其实是这些进程内的线程在起作用。 一个进程至少要有一个线程。
		node和浏览器中的JavaScript都是单线程的。 但是，我们要理解node的单线程到底是什么意思？实际上， 这里所说的单线程是指我们所编写的代码运行在单线程上，实际上node不是真正的单线程。比如我们执行 node app.js 时启动了一个进程，但是这个进程并不是只有一个线程，而是同时创建了很多歌线程（比如：异步IO需要的一些IO线程）。 但是，仍然只有一个线程会运行我们编写的代码。 这就是node中单线程的含义。

但是node单线程会导致下面的问题：

无法利用多核CPU（只能获得一个CPU的时间分片）。
错误就会引起整个应用退出（整个应用就一个进程，挂了就挂了）。
大量计算长时间占用CPU，导致阻塞线程内的其他操作（异步IO发不出调用，已完成的异步IO回调不能及时执行）。



###### http请求协议

http介绍

 根据HTTP标准，HTTP请求可以使用多种请求方法。例如：HTTP1.1支持7种请求方法：GET、POST、HEAD、OPTIONS、PUT、DELETE和TARCE。在Internet应用中，最常用的方法是GET和POST。  

http请求头

1. 起始行：HTTP请求方法 URL HTTP版本
2. 请求头：请求头的形式通过一个键值对进行渲染
3. 请求体：get方法的请求体是没有内容的（放在了url里） post方法的请求体包含请求的内容

```http
/*起始行*/
GET /sample.jsp HTTP/1.1
/*请求头*/
Accept:image/gif.image/jpeg,*/*
Accept-Language:zh-cn
Connection:Keep-Alive
Host:localhost
User-Agent:Mozila/4.0(compatible;MSIE5.01;Window NT5.0)
Accept-Encoding:gzip,deflate 
/*请求体*/
username=jinqiao&password=123412345678
```

http响应头

1. 起始行：HTTP协议版本 响应状态码 响应状态信息
2. 响应头(Response Header) ：通过键值对的形式进行表示
3. 响应体： 网页代码 HTML、CSS、JS代码文件

```http
HTTP/1.1 200 OK
Server:Apache Tomcat/5.0.12
Date:Mon,6Oct2003 13:23:42 GMT
Content-Length:112

<html>
    <head>
        <title>HTTP响应示例<title>
    </head>
    <body>
        Hello HTTP!
    </body>
</html>
```

http应答码

HTTP应答码也称为状态码，它反映了Web服务器处理HTTP请求状态。**HTTP应答码由3位数字构成，其中首位数字定义了应答码的类型**： 

- 1XX－信息类(Information),表示收到Web浏览器请求，正在进一步的处理中 
- 2XX－成功类（Successful）,表示用户请求被正确接收，理解和处理例如：200 OK 
- 3XX - 重定向类(Redirection),表示请求没有成功，客户必须采取进一步的动作。 
- 4XX - 客户端错误(Client Error)，表示客户端提交的请求有错误 例如：404 NOT Found，意味着请求中所引用的文档不存在。 
- 5XX - 服务器错误(Server Error)表示服务器不能完成对请求的处理：如 500 



curl测试http协议

```
curl http://sample.wangding.in/web/one-div.html     显示出响应体
curl http://sample.wangding.in/web/one-div.html -v  显示所有响应内容、请求内容
```

###### 跨域问题及代理

浏览器由于同源策略的原因，不同域名之间发送ajax请求，响应的数据不会被浏览器加载。而服务器向服务器发送请求则没有同源策略的限制 

解决跨域问题的方法

1、jsonp

2、cors

3、配置代理服务器。

###### 常用模块

见[此博客]( https://blog.csdn.net/just_a_bad_guy/article/details/103052891 )

### nodejs基础&全局api

###### 全局api注意点

1.不需要require引入，可以直接使用

###### 路径变量

__filename：展示当前的文件名称，从主目录开始的绝对路径

__dirname：展示当前文件所在的文件目录的名称，从主目录开始的绝对路径

```
//写在app.js文件中
console.log(__dirname);//C:\学习\大三\nodejs\nodejsTest
console.log(__filename);//C:\学习\大三\nodejs\nodejsTest\app.js
```

###### 控制台变量

| 方法              | 描述                                                         |
| ----------------- | ------------------------------------------------------------ |
| `console.log()`   | 向标准输出流打印字符并以换行符结束                           |
| `console.info()`  | 向标准输出流打印信息性消息。输出文字外，会显示一个蓝色的惊叹号。 |
| `console.warn()`  | 向标准输出流打印警告性消息。输出文字外，会显示一个黄色的惊叹号。 |
| `console.error()` | 向标准输出流打印错误性消息。输出文字外，会显示一个红色的叉子。 |
| `console.time()`  | 可通过此方法对方法进行时间采样                               |

输出变量的三种方式

```javascript
const user = {
  name:"xiaweixuan",
  age:21,
  qq:"1977541709"
};

//method1
log("name: %s",user.name); // string类型
log("age: %d",user.age); // number类型
log("user: %j",user);// json字符串

//method2
log("qq: " + user.qq);// 字符串拼接 通过+进行连接

//method3
log(`qq: ${user.qq}`);
```

console.time时间采样

```
function longTask(){
  var n = 0;
  for(var i = 0;i<1000;i++){
    for(var j = 0;j<1000;j++){
      n = n + i*j;
    }
  }
}
console.time("test");// 确定任务开始
longTask();
console.timeEnd("test");// 确定任务结束 两个console的参数必须是一样的
## 输出结果
test：91.867ms // 每次测试的结果是不同的
```

###### 进程对象

| 属性或方法                        | 描述                                                         |
| --------------------------------- | ------------------------------------------------------------ |
| `process.arch`                    | CPU 架构信息                                                 |
| `process.platform`                | 操作系统版本信息                                             |
| `process.pid`                     | 打印进程 id 信息。                                           |
| `process.execPath`                | Node.js 可执行文件的绝对路径信息                             |
| `process.stdin.pause()`           | 在脚本中让程序暂停执行                                       |
| `process.version`                 | nodejs版本信息                                               |
| `process.getuid()`                | 当前用户id                                                   |
| `process.getgid()`                | 当前用户组id                                                 |
| `process.cwd()`                   | 当前脚本路径信息                                             |
| `process.memoryUsage().rss`       | 系统的常驻内存大小                                           |
| `process.memoryUsage().heapTotal` | v8动态分配的总内存大小                                       |
| `process.memoryUsage().heapUsed`  | v8动态分配的已用内存大小                                     |
| `process.memoryUsage().external`  | 查看 v8 管理的绑定到 JS 对象上的 C++ 对象的内存              |
| `process.env`                     | 查看环境变量                                                 |
| `process.argv`                    | 是一个字符串数组 头两个字符串 第一个字符串是node 第二个参数是运行的脚本的绝对路径，之后为命令行参数 |
| `process.exit(n)`                 | 设置退出码                                                   |
| `process.stdin.on()`              | 用于标准输入输出流                                           |
| `process.on()`                    | 用于自定义接受信号                                           |
| `process.kill(pid,sig);`          | 结束指定进程                                                 |

退出码
退出码实质上是给程序看的，在Linux程序中，有时候子进程会输出退出码，父进程通过查看子进程输出的退出码来判断是否正确
在退出码中，0表示的是成功，1表示的是错误

```javascript
var code = process.argv[2];
if(typeof code === 'number'){
  console.log("命令行参数类型不符合！");
  process.exit(1);
}
if(process.argv.length <3){
  console.error("请给出命令行参数！");
  process.exit(1);
}
process.exit(code);

// process.exit(code:number) ?表示可以有也可以表示没有
// 获取退出码 echo $?
```

标准输入输出流
读取用户键盘输入信息，保存到对象中
用户键盘输入结束后，打印完整的对象信息

```javascript
#!/usr/bin/node

const msg = ['name','email','qq','mobile'];

var i = 0,
  me = {};
console.log(msg[i] + ':');
process.stdin.on('data',(data)=>{
  me[msg[i]] = data.slice(0,data.length-1).toString('utf-8');// slice 是将回车进行去掉
  i++;
  if(i == msg.length){
    console.log(me);
    process.exit();
  }
  console.log(msg[i] + ':');
});

```

自定义接受信号
第一个参数为监听的时间名字，后面为回调函数
接收信号量，并对信号（SIGINT 和 SIGTSTP）进行处理

```javascript
process.stdin.resume();

process.on('SIGINT',()=>{
  console.log('you have pressed Ctrl+C');
  process.exit();
})

process.on('SIGTSTP',()=>{
  console.log('you have pressed Ctrl+Z');
})

实现my-kill程序
​```javascript

const pid = process.argv[2];
const sig = process.argv[3];

process.kill(pid,sig);
```

###### 定时器

setTimeout（func(),0）setImmediate(func())代表主线程完成后立即执行，其执行结果是不确定的，可能是setTimeout回调函数执行结果在前，也可能是setImmediate回调函数执行结果在前，但setTimeout回调函数执行结果在前的概率更大些，这是因为他们采用的观察者不同，setTimeout采用的是类似IO观察者，setImmediate采用的是check观察者，而process.nextTick()采用的是idle观察者。

###### buffer

什么是buffer
数据在计算机中是以二进制存储的，不论是图片、视频哪怕只是简单的字符串都是要先转化为二进制数字去存储的，而具体的转化方式就叫做编码。如将字符转化为二进制，用多少位数字来表示一个字符，这就叫做==字符编码==。
在编程中，我们常常会需要将一系列二进制数据从一处传到另一处，我们传输数据往往是为了处理它，或者读它，或者基于这些数据做处理等。而且每次处理量是固定的，例如我可能一次就要处理1000个二进制数据。
但是，在每次传输过程中，有一个数据量的问题。因此当数据到达的时间比数据理出的时间快的时候，这个时候我们处理数据就需要等待了。
如果处理数据的时间比到达的时间快，这一时刻仅仅到达了一小部分数据，那这小部分数据需要等待剩下的数据填满，凑够了1000个二进制数据，然后再送过去统一处理。这个”等待区域”就是buffer。它是你电脑上的一个很小的物理地址，一般在RAM中，在这里数据暂时的存储、等待，最后在流(stream)中，发送过去并处理。
buffer虽然作为缓冲区，在stream中，Node.js会自动帮你创建buffer之外，你可以创建自己的buffer并操作它。

```javascript
//buffer基本操作
var buf1 = new Buffer(256);//实例化一个 buffer 对象 buf1，缓冲区的大小是 256 字节
console.log(buf1)//<Buffer 00 00 00 00 00 ...>
console.log(buf1.length)//256
var buf2 = buf1.slice(246,257);//对 buf1 做切片操作，取出后 10 个字节，存放到 buf2 中
buf1.fill(1)//<Buffer 01 01 01 01 01 ...>
var arr = ['a',0xBA,0xDF,0x00,0x00,255,10];
var buf3 = new Buffer(arr,'utf-8');
buf2.copy(buf3);//复制buf3的内容到buf2中

```

字符串的编码有字符编码如ASCII，而文件编码在计算机中，有两种方式，一种方式是通过文本文件进行编码（例如：utf-8 ascii utf16le），另一种方式是通过二进制文件进行编码的（例如：base64 lantin1(二进制) hex）

对编码的理解：不论是字符串还是图片、音频等，在计算机中都是以二进制的形式去存储，不同的编码不过是把二进制翻译成字符串的规则不同而已。比如有的编码是8个二进制数表示一个字符，有的是16个二进制数表示一个字符。也即是说同样是存储‘abc’这个字符串，各种编码把他们转化成的二进制不相同，所以在解析二进制代码的时候，也一定要用相对应的编码方式去解码。此外，本文文件编码多指对字符串、文件的编码，二进制文本编码多指对图片、音频的编码。



在buffer的原型中存在着对应的编码的方法

```javascript
//buffer编码

var str = 'xiaweixuan';
var buf = new Buffer(str);
console.log(buf.toString('base64'));//eGlhd2VpeHVhbg==

//buffer解码

var str = 'eGlhd2VpeHVhbg==';
var buf = new Buffer(str,"base64");
console.log(buf.toString('utf-8'));//xiaweixuan

```






###### 模块管理

JS 模块化的两种方案分别是：AMD 和 CommonJS
AMD 规范的主要内容：AMD是异步模块加载机制。从它的规范描述页面看，AMD很短也很简单，但它却完整描述了模块的定义，依赖关系，引用关系以及加载机制。define和require这两个定义模块、调用模块的方法,合称为AMD模式
CommonJS规范的主要内容：模块必须通过 module.exports 导出对外的变量或接口，通过 require() 来导入其他模块的输出到当前模块作用域中。

将模块发布到npm

```
1、npm init //初始化环境
2、npm login
3、npm publish
```

npm init后
产生 package.json文件，记录当前环境配置。其中需要注意"devDependencies" 和"dependencies" ，其中前者是开发时以来的npm模块，后者是自己所写的打包成的应用程序所需要的npm模块

上传git时注意
创建.gitignore文件书写，里面指定的文件不会上传到git上

```
/node_modules
```

此外在模块中，使用```module.exports = circle```导出，通过```var circle = require('./02-export-function')```导入

使用全局对象 global

```javascript
// 03-global.js
global.pi = Math.PI;

global.circle = (radius)=>{
  return {
    circumference:function(){return 2*Math.PI*radius;},
    area:function(){return Math.PI*radius*radius;}
  }
}

global.circleobj = {
  circumference:function(radius){return 2*Math.PI.radius},
  area:function(radius){return Math.PI*radius*radius}
}
```

```javascript
// 03-main.js
require('./03-global.js');
console.log(global.pi);
console.log(global.circle(20).circumference());
console.log(global.circleobj.area(20));

```





###### 事件

Node.js 所有的异步 I/O 操作在完成时都会发送一个事件到事件队列。

events 模块只提供了一个对象： events.EventEmitter。EventEmitter 的核心就是事件触发与事件监听器功能的封装。可以通过require("events");来访问该模块。

```javascript
// 引入 events 模块
var events = require('events').EventEmitter;
// 创建 eventEmitter 对象
var eventEmitter = new events();
```

| 方法          | 描述     |
| ------------- | -------- |
| ` evt.on()`   | 监听事件 |
| ` evt.emit()` | 发出事件 |


```javascript
var EventEmitter = require('events').EventEmitter;
var evt = new EventEmitter();

evt.on('hello',()=>{
  console.log('hello');
});
/*一个事件可以有多个执行函数（订阅者）*/
evt.on('hello',()=>{
  console.log('HELLO');
})

evt.on('bye',()=>{
  console.log('bye');
  process.exit();
});

global.setInterval(()=>{
  evt.emit('hello');
},500);// 在触发hello事件的时候，有两个执行的函数，两个执行的函数会依次执行
global.setTimeout(()=>{
  evt.emit('bye');
},3000);
```

继承EventEmitter对象
1、在构造函数中EventEmitter.bind(this)
2、ClassName.prototype = EventEmitter.prototype
之后ClassName实例出来的对象便继承了on方法

利用util设置继承

```javascript
util = new require('util');
util.inherits(ClassName,EventEmitter);
```

###### 流

什么是流
比如说我们将水从一个杯子倒入另一个杯子中，相当于水的位置发生了改变，即从一个杯子到了另一个杯子中，这实质上是每个水分子一个一个发生了位移中，而我们通常把流动着的水成为水流。
同理，数据在计算中，如果想从内存的一处移动到另一处，我们可以想成是每个字符在移动，这便成为`字符流`
此外，流是一种机制，我们不能说流有哪些方法，我们要理解为很多方法的实现基于流

标准输入流
敲键盘的时候，就可以把每个字符依次连起来，看成字符流。这个流是从键盘输入到应用程序，这就是标准输入流（stdin）。

标准输出流
如果应用程序把字符一个一个输出到显示器上，这就是标准输出流（stdout）。

为什么需要流？
在node中读取文件的方式有来两种，一个是利用fs模块，一个是利用流来读取。如果读取小文件，我们可以使用fs读取，fs读取文件的时候，是将文件一次性读取到本地内存。而如果读取一个大文件，一次性读取会占用大量内存，效率很低，这个时候需要用流来读取。流是将数据分割段，一段一段的读取，效率很高。

| process中基于流的方法     | 描述       |
| ------------------------- | ---------- |
| `process.stdin.on() `     | 监听数据流 |
| ` process.stdout.write()` | 写入输出流 |

```javascript
//将输入的字符串转换为大写输出
process.stdin.resume();
process.stdin.setEncoding('utf-8');

process.stdin.on('data',(data)=>{
  process.stdout.write(data.toUpperCase());
});
process.stdin.on('end',()=>{
  process.exit();
})
```

| fs中基于流的方法                 | 描述                 |
| -------------------------------- | -------------------- |
| `fs.redFileSync(file).pipe(res)` | 将文件数据写入输出流 |

```javascript
//基于res.end的静态服务文件
const http = require('http'),
      path = require('path'),
      fs = require('fs');

http.createServer((req,res)=>{
  // console.log(req);
  // console.log(req.headers); 显示头
  // console.log(req.url); 显示请求的url地址
  var file = path.join(__dirname,req.url);
  try{
  	res.end(fs.readFileSync(file).toString('utf-8'));
  }catch(err){
  	res.end(err.message);
  }
}).listen(8080);
//基于流的静态服务文件
const http = require('http'),
      path = require('path'),
      fs = require('fs');

http.createServer((req,res)=>{
  var file = path.join(__dirname,req.url);
  fs.readFileSync(file).pipe(res);// 对于流来说 是异步的 是不能使用try catch的
})
```

流的分类
Readable Stream :可读数据流， 数据的产生者，譬如 process.stdin 
Writeable Stream ：可写数据流， 数据的消费者，譬如 process.stdout 或者 process.stderr 
Duplex Stream ：双向数据流，可以同时读和写
Transform Stream： 转换数据流，可读可写， 数据的转化者 



对流的理解
stream对象让我们可以直接生成流。 Stream 本身提供了一套接口规范，很多 Node.js 中的内建模块都遵循了该规范，譬如著名的 `fs`模块，即是使用 Stream 接口来进行文件读写；同样的，每个 HTTP 请求是可读流，而 HTTP 响应则是可写流。 

 ![img](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91c2VyLWdvbGQtY2RuLnhpdHUuaW8vMjAxOC85LzkvMTY1YmUzN2VjOWE3YjQyZA?x-oss-process=image/format,png) 



可读流
可读流有两种模式：flowing和paused
在流动模式下，可读流自动从系统底层读取数据，并通过EventEmitter接口的事件尽快将数据提供给应用。
在暂停模式下，必须显示调用stream.read()方法来从流中读取数据片段。





当我们创建某个可读流时，其还并未开始进行数据流动；添加了 data 的事件监听器，它才会变成流动态的。在这之后，它就会读取一小块数据，然后传到我们的回调函数里面。 `data` 事件的触发频次同样是由实现者决定，譬如在进行文件读取时，可能每行都会触发一次；而在 HTTP 请求处理时，可能数 KB 的数据才会触发一次。

```javascript
const stream = require('stream'); 
const fs = require('fs');
const readableStream = fs.createReadStream(process.argv[2], {  encoding: 'utf8' }); 
// 手动设置流数据编码 
// readableStream.setEncoding('utf8'); 
let wordCount = 0; readableStream.on('data', function(data) {  
    wordCount += data.split(/\s{1,}/).length; 
}); 
readableStream.on('end', function(){  
    // Don't count the end of the file.  	
    console.log('%d %s', --wordCount, process.argv[2]); 
});
```



 Readable Stream 还包括如下常用的方法： 

| 可读流名字        | 描述                                                         |
| ----------------- | ------------------------------------------------------------ |
| Readable.resume() | 这个方法会暂停流的流动。换句话说就是它不会再触发 data 事件。 |
| Readable.pause()  | 这个方法和上面的相反，会让暂停流恢复流动。                   |
| Readable.unpipe() | 这个方法会把目的地移除。如果有参数传入，它会让可读流停止流向某个特定的目的地，否则，它会移除所有目的地。 |



当然我们也可以直接为他制定一个输出流让其输出（例如下面的可读流）

```javascript
//可读流
const Readable = require('stream').Readable;
var src = new Readable();

src.push('Hello');
src.push('World');
src.push(null);         // 代表推送结束

src.pipe(process.stdout);  //pipe方法指定输出位置 此处指定流到process的输出流
						   // process.stdout是一个指向标准输出流(stdout)的 可写的流(Writable Stream)


```

对于可读流而言，来源可以直接通过push方法向流中加入字符流，去向可以通过指向可写流输出，也可以直接指向process.stdout（本质相同，process.stdout也是一个可写流）





可写流

```javascript
//可写流
const { Writable } = require('stream');
var a=new Writable({
  write(chunk, encoding, callback) {
    console.log(chunk.toString());
    callback();
  }
});
process.stdin.pipe(a);         //process.stdin一个指向 标准输入流(stdin) 的可读流(Readable Stream)，将其指向可写流，这样就可以在用户写完新数据后立刻传入可写流并写出。

//src.pipe(a)  可以直接将刚刚的可读流直接指向可写流写出
```

通常情况下，可写流是向流中加入内容，而可写流是将内容写出，故可写流有一下几样事件，通过以下事件的监听，而输出东西。



| 可写流方法 | 描述                                   |
| ---------- | -------------------------------------- |
| error      | 在写入或链接发生错误时触发             |
| pipe       | 当可读流链接到可写流时，这个事件会触发 |
| unpipe     | 在可读流调用 unpipe 时会触发           |

对于可写流而言，来源可以是由可读流直接指向的，也可以由输入流指向的，去向则是将数据输出。





###### 文件系统

在linux中，我们常常会使用到很多操控文件或目录的命令，其实在nodejs中也提供了相应的方法。



fs方法分类
从操作方式上进行分类：底层文件操作、高级文件操作、流文件操作

从操作对象上进行分类：文件、目录、链接、属性

从操作的方式上进行分类：同步（同步的方法一般加上sync）和异步

说明：当文件比较大的时候，一般会用异步的方式（流）进行操作，当文件比较小的时候，会用同步的方式进行建议大家使用异步方法，比起同步，异步方法性能更高，速度更快，而且没有阻塞。

 [外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-Dp2aVTYR-1573636223460)(https://github.com/fuziwang/node.js/raw/master/nodejs-course/images/21.png)] 



处理异常

 ![img](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRodWIuY29tL2Z1eml3YW5nL25vZGUuanMvcmF3L21hc3Rlci9ub2RlanMtY291cnNlL2ltYWdlcy8yMi5wbmc?x-oss-process=image/format,png) 





```javascript
/*
1. 同步代码
try{
  console.log(fs.readFileSync(file).toString('utf-8'));
}catch(err){
  console.log(err.message,err.name);
  process.exit(-1);
}
2. 异步处理
fs.readFile(file,(err,data)=>{
  if(err) {
    console.log('Sorry,Something Woring!');
    process.exit(100);
  }else{
    console.log(data.toString('utf-8'));
  }
})
3. 事件机制
src.on('error',(err)=>{
  console.log(err.message);
  process.exit(1);
})
*/
```



文件操作



打印文件内容

```javascript
#!/usr/bin/node

//异步     fs.readFile(file)
const fs = require('fs');
var file = process.argv[2] || __filename;
fs.readFile(file,(err,data)=>{
  if(err){
  	console.log(err.message);
    process.exit(1);
  }else{
  	console.log(data.toString('utf-8'));
  }
})





//同步    fs.readFileSync(file)
const fs = require('fs');
var file = process.argv[2] || __filename;

try{
  console.log(fs.readFileSync(file).toString('utf-8'));
}catch(err){
  console.log(err.message);
  process.exit(1);
}
/*fs.readFileSync(path[, options])
如果指定了 encoding 选项，则该函数返回一个字符串，否则返回一个 buffer。*/





//使用流    fs.createReadStream(file)
const fs = require('fs');
var file = process.argv[2] || __filename;
var readStream = fs.createReadStream(file);//这个api的作用是打开一个可读的文件流并且返回一个fs.ReadStream对象
readStream.on('error',(err)=>{console.log(err.message);process.exit(-1);});
readStream.on('open',function(){this.pipe(process.stdout)});





//使用底层方法
const fs = require('fs');
var file = process.argv[2] || __filename;
var fid = fs.openSync(file,'r');
var len = fs.statSync(file).size;
var buf = new Buffer(len);
fs.readSync(fid,buf,0,len);
console.log(buf.toString('utf-8'));
fs.closeSync(fid)
/*
打开文件的操作：
fs.open(path, flags[, mode], callback)
fs.openSync(path, flags[, mode]) // 异常处理需要使用try catch
flags 可以是：
r读 w写 a追加
'r' - 以读取模式打开文件。如果文件不存在则发生异常。
'r+' - 以读写模式打开文件。如果文件不存在则发生异常。
'rs+' - 以同步读写模式打开文件。命令操作系统绕过本地文件系统缓存。
mode 可设置文件模式（权限和 sticky 位），但只有当文件被创建时才有效。默认为 0o666，可读写。

获取文件信息操作：
fs.stat(path, callback)  获取文件信息 path - 文件路径。callback - 回调函数，带有两个参数如：(err, stats), stats 是 fs.Stats 对象

返回读取字节的数量：
fs.readSync(fd, buffer, offset, length, position) 返回读取字节的数量

关闭文件的操作：
fs.close(fd, callback)：callback <Function>：err <Error>异步的 close(2)。 完成回调只有一个可能的异常参数。
*/





//混合打印
const fs = require('fs');
var file = process.arv[2] || __filename;
var fd = fs.openSync(file,'r');
fs.writeSync(1,fs.readFileSync(file).toString('utf-8'));
fs.closeSync(fd);
```



复制文件  fs.writeFileSync(dst，src)

```javascript
#!/usr/bin/node

const fs = require('fs');

var src = process.argv[2],
    dst = process.argv[3];

fs.writeFileSync(dst,fs.readFileSync(src));
```



移动文件   fs.renameSync(src,dst)

```javascript
#!/usr/bin/node

const fs = require('fs');

var src = process.argv[2],
    dst = process.argv[3];

fs.renameSync(src,dst);// 移动的过程中可以进行重命名
```



删除文件  fs.unlinkSync（file）

```javascript
#!/usr/bin/node

const fs = require('fs');

var file = process.argv[2];

fs.unlinkSync(file);// rm == unlike
```



创建空文件     fs.appendFileSync(file)

```javascript
#!/usr/bin/node

const fs = require('fs');

var file = process.argv[2];

fs.appendFileSync(file);// 或者通过fs.writeFileSync(file,'');
```





目录操作

查看目录内容   fs.readdirSync(dir)

```javascript
#!/usr/bin/node

const fs = require('fs');

var dir = process.argv[2];

console.log(fs.readdirSync(dir));// 返回的是一个数组信息
```



创建目录    fs.mkdirSync(dir);

```javascript
#!/usr/bin/node

const fs = require('fs');
var dir = process.argv[2];

fs.mkdirSync(dir);
```



删除目录    fs.rmdirSync(dir)

```javascript
#!/usr/bin/node

const fs = require('fs');
var dir = process.argv[2];

fs.rmdirSync(dir);
```



链接操作

创建链接    fs.linkSync(src,lnk)    fs.symlinkSync(src,lnk)

```javascript
#!/usr/bin/node

const fs = require('fs');

var src = process.argv[2],
    lnk = process.argv[3];
// 硬链接
fs.linkSync(src,lnk);

// 软链接
fs.symlinkSync(src,lnk);
```



打印链接    fs.readlinkSync(lnk)

```javascript
#!/usr/bin/node

const fs = require('fs');

var lnk = process.argv[2];

console.log(fs.readlinkSync(lnk));
```



属性操作

修改文件权限    fs.chmodSync(file,mode)

```javascript
#!/usr/bin/node

const fs = require('fs');

var file = process.argv[2],
    mode = process.argv[3];
fs.chmodSync(file,mode);
```



修改文件所有者    fs.chownSync(file,Number(uid),Number(gid))

```javascript
#!/usr/bin/node

const fs = require('fs');

var file = process.argv[2],
    uid = process.argv[3],
    gid = process.argv[4];
fs.chownSync(file,Number(uid),Number(gid));
```



文件信息统计    fs.statSync(file)

```javascript
#!/usr/bin/node

const fs = require('fs');

var file = process.argv[2];
console.log(fs.statSync(file));// 返回的是一个对象
```



监视文件变化

```javascript
#!/usr/bin/node

const fs = require('fs');
fs.watch(__filename,(e,r)=>{
  console.log(e,r);
})
```







综合案例：递归删除

- 要求支持命令行参数，包括：要删除的目录名或文件名
- 命令行参数不存在的情况下，打印错误信息
- 命令行参数指定的文件名或者目录名不存在时，打印错误信息
- 如果命令行参数是合法的文件名，则删除文件
- 如果命令行参数是合法的目录名，则删除该目录以及该目录下的所有文件以及子目录

```javascript
#!/usr/bin/node

const fs = require('fs'),
      path = require('path');
var file = process.argv[2];
if(fs.statSync(file).isFile()) fs.unlikeSync(file);
if(fs.statSync(file).isDirectory()) deletedir(file);

function deletedir(file){
  var files = fs.readdirSync(file);
  for(var i= 0;i<files.length;i++){
  	var floder = path.join(file,files[i]); //用特定分隔符将files[i]追加到file后面，此处为file/files[i]
    if(fs.statSync(floder).isFile()){
  		fs.unlikeSync(floder);
      	continue;
	}
    if(fs.statSync(floder).isDirectory()) deletedir(file);
  }
  fs.rmdirSync(file);
}
```



###### 子进程

创建子进程的四种方式`exec`  、 `execFile`  、`sapwn` 、 `fork`



四种方式的不同

		**exec(command, options, callback)** 和 **execFile(file, args, options, callback)** 比较类似，会使用一个 **Buffer** 来存储进程执行后的标准输出结果，他们可以**一次性在callback里面获取到**。**不太适合数据量大的场景。**

　　另外，**exec会首先创建一个新的shell进程出来，然后执行command； execFile则是直接将可执行的file创建为新进程执行。 所以，execfile 会比 exec 高效一些（后者多了一个shell步骤，前者是直接拿到execfile就执行了）。**

　　**exec比较适合来执行 shell 命令， 然后获取输出（比如： exec('ps aux | grep "node" ')），但是 execFile 没有这么实用， 因为它实际上只接受了一个可执行的命令，然后执行（没法使用shell里面的管道之类的东西）。**

 		**spawn(command, args, options)适合用在进程的输入、输出数据量比较大的情况（因为它支持steam的方式，而刚才的exec/execFile都是Buffer，而不支持stream的方式）， 可以用于任何命令。** 可以进行管道操作。

 		**fork(modulePath, args, options)实际上是spawn的一个“特例”， 会创建一个新的V8实例**。新创建的进程只能用来运行node脚本，不能运行其他命令。 

 [外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-0xLDWG8P-1573636223464)(https://github.com/fuziwang/node.js/raw/master/nodejs-course/images/37.png)] 



四种方法的用法

 [外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-83x9KpwX-1573636223465)(https://github.com/fuziwang/node.js/raw/master/nodejs-course/images/36.png)] 

```javascript
//在app.js中操作child.js文件，以下为app.js中的代码
const cp = require('child_process')


//execFile
cp.execFile('node',['child.js', 'a', 'b'],(err, out, error)=>{console.log(out)});

//exec
cp.exec('node child.js a b',(err, stdout, stderr)=>{console.log(stdout)})


//spawn
var cmd=cp.spawn(
  'node', // 需要执行的命令
  ['child.js', 'a', 'b'], // 传递的参数
);
cmd.stdout.pipe(process.stdout)


//frok
cp.fork(
  'child.js', // 需要执行的脚本路径
  ['a', 'b'], // 传递的参数
);

```





### nodejs网络编程





###### http网络爬虫（模拟客户端）

模拟浏览器去访问服务器并获取到数据

```javascript
//实例
const http = require('http'),
      cheerio = require('cheerio');

for(var i = 1;i<87;i++){
  var address = 'http://edu.51cto.com/courselist/index-zh5-p' + i + '.html';
  http.get(address,(res)=>{
  	var html = '';
    
    res.on('data',(data)=>{
      html +=data;
      console.log(data.toString("utf8"))
	});
    
    res.on('end',()=>{
        // 沿用JQuery风格，定义$
  		var $ = cheerio.load(html);
    	$('body').find('div.main').each(function(){
  			var cName = $(this).find('a').text(),
                cTime = $(this).find('p.fl').text(),
                cTarget = $(this).find('div.course_target').text(),
                cUrl = $(this).find('a').attr('href');
          	if(cTime === '') return;
          	console.log('课程名称：',cName);
          	console.log('课程时长：',cTime);
          	console.log('课程目标：',cTarget);
          	console.log('课程地址：',cUrl);
		});
	});
  });
}

//架构
http.get(url,(res)=>{
    res.on('data',(data)=>{})
    res.on('end',()=>{})
})

```

此处用的是http的get()做的请求，在实际情况中发请求的方式有很多，还可以用http的request方法，甚至可以用其他模块，如got模块，request模块。



###### http前端渲染（前后端分离）



```javascript
//服务器架构
const http = require('http');

http.createServer((req,res)=>{
  console.log('HTTP Method:',req.method);
  switch(req.method){
    case 'GET':
          switch(req.url){
              case '/':
                  select1(req,res);
                  break;
              case '/login':
                  select1(req,res);
                  break;
          }
      break;
    case 'POST':
      add(req,res);
      break;
    case 'PUT':
      update(req,res);
      break;
    case 'DELETE':
      del(req,res);
      break;
    default:
      res.end('Something Wrong!');
  }
}).listen(8080);
```



在前后端分离时，每个方法若有返回，基本为json数据串，此时成为接口。有时也会提供返回html文件的路径。前后端分离是浏览器负责解析、渲染的文件，因为后台服务器无法解析html文件，若果要在服务器解析渲染文件，则需要用后端所提供的渲染模板。

```javascript
//前端渲染--直接传html文件
function showHomePage(res) {
  var html = fs.readFileSync('./template.html').toString('utf8');

  res.writeHead(200, {
    'Content-Type': 'text/html',
    'Content-Length': Buffer.byteLength(html),
    'Cache-Control': 'public,max-age=600',
    'Access-Control-Allow-Origin': '*'
  });

  res.end(html);
}
```



res的常用方法

| 方法名           | 描述                                                         |
| ---------------- | ------------------------------------------------------------ |
| end()            | end() 中的内容必须是字符串，否则会报错                       |
| write()          | res.write(chunk[, encoding][, callback])发送一块响应主体，可以多次调用该方法以提供连续的响应主体片段。 |
| writeHead()      | res.writeHead(200,{"Content-Type":"text/html;charset=UTF-8"}); |
| statusCode()     | res.statusCode = 200                                         |
| setHeader()      | res.setHeader("Content-Type":"text/html;charset=UTF-8")为隐式响应头设置单个响应头的值，如果此响应头已存在于待发送的响应头中，则其值将被替换。 在这里可以使用字符串数组来发送具有相同名称的多个响应头。 |
| res.sendfile（） | 向浏览器发送文件                                             |



在html中如果引入外部资源，'/' 即表示根目录，如请求与html统计的bg.png可直接在src中写`src='/bg.png'`



###### http后台模板渲染

常见渲染模板，耗时结果比较 Jade 287ms > ejs 43ms > Handlebars 28ms



**jade** **模板** **(express demo)** 就看起来干净，引入缩进，丧失了html该有的灵活性

```jade
html
   head
     title #{title}
     meta(charset="UTF-8")
   body
     div.description #{description}
     ul
       - each data in datas
         li.item(id='item_'+data.index)
           span= data.time
           a.art(href=data.url)= data.title
```



**handlebars** **模版** **(express -hbs demo)**

```handlebars
<!doctype html>
<html>
<head>
    <meta charset="UTF-8">
    <title>{{title}} - Page Test</title>
</head>
<body>
    <div class="description">{{description}}</div>
    <ul>
{{#datas}}
        <li class="item" id="item_{{index}}"><span>{{time}}</span><a href="{{url}}" class="art">{{title}}</a></li>
{{/datas}}
    </ul>
</body>
</html>

```

**ejs** **模版** **(node -e demo)**

```ejs
<!doctype html>
<html>
<head>
    <meta charset="UTF-8">
    <title><%=title%> - Page Test</title>
</head>
<body>
    <div class="description"><%=description%></div>
    <ul>
<% function data(data) { %>
        <li class="item" id="item_<%=data.index%>"><span><%=data.time%></span><a href="<%=data.url%>" class="art"><%=data.title%></a></li>
<% } %>
<% datas.map(data) %>
    </ul>
</body>
</html>

```



以上为模板的代码，然后再在创建的服务器中将其返回给浏览器

```javascript
function showpage(req,res){
  	var html = fs.readFileSync('./template.html');
  	html = html.replace('%',item.map(function(item){  //yong %tihuan
  		return '<li>' + item + '</li>';
	}).join('\n'));
 	res.end(html);
}
```



后台模板渲染与前后端分离的比较

后端渲染：

页面呈现速度：快，受限于用户的带宽
流量消耗：少一点点（可以省去前端框架部分的代码）
可维护性：差（前后端东西放一起，掐架多年，早就在闹分手啦）
seo友好度：好
编码效率：低（这个跟不同的团队不同，可能不对）



前端渲染：

页面呈现速度：主要受限于带宽和客户端机器的好坏，优化的好，可以逐步动态展开内容，感觉上会更快一点。
流量消耗：多一点点（一个前端框架大概50KB）当然，有的用后端渲染的项目前端部分也有在用框架。
度可维护性：好，前后端分离，各施其职，代码一目明了。
SEO友好度：差，大量使用ajax，多数浏览器不能抓取ajax数据。
编码效率：高，前后端各自只做自己擅长的东西，后端最后只输出接口，不用管页面呈现，只要前后端人员能力不错，效率不会低。



###### http高级编程用法

获取文件

```javascript
//将上传的文件输出到同级目录下
getFile(){
    req.setEncoding('binary');  //设置编码
    var file;
    req.on('data', (data)=>{
      file += data;
    });

    req.on('end', ()=>{
      log(file.split('\r\n'));
      var buf = file.split('\r\n')[4];
      var files = file.split('\r\n')[1].split(';');
      var fileName = qs.parse(files[2].trim())['filename'];
      fileName = fileName.slice(1, fileName.length-1);
      fs.writeFileSync(fileName, buf, {'encoding': 'binary'});
    });
}
//此方法不能用于所有图片，具体split截取的内容要根据图片不同类型或大小做出调整，统一式获取下文中有介绍，此处介绍的为底层方法
```



图片操作

```javascript
//上传图片
function writePic(file) {
  var data = file.split('\r\n');
  var fileName = qs.parse(data[1].split(';')[2].trim())['filename'],
      start = data[0].length + data[1].length + data[2].length + data[3].length + 8,
      end   = file.indexOf('------WebKitFormBoundary', start),
      buf   = file.slice(start, end);

  fileName = fileName.slice(1, fileName.length-1);

  if(fileName === '') return false;

  fileName = path.join(__dirname, 'images', fileName);
  fs.writeFileSync(fileName, buf, {'encoding': 'binary'});
  
  return true;
}

//向浏览器发送图片
function sendPic(req, res) {
  var info = req.url.split('/'),
      pic  = path.join(__dirname, req.url),
      ext = info[2].split('.')[1];

  if(info.length !== 3 || !fs.existsSync(pic)) {
    show(res, errorPage);
    return;
  }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'image/' + ext);
  res.setHeader('Content-length', fs.statSync(pic).size);
  res.end(fs.readFileSync(pic));
}
```



cookie使用

```javascript
//查看cookie
log(req.headers['cookie']);   //a=1; b=2
log(req.headers['cookie'].split(';'));    //[ 'a=1', ' b=2' ]
//设置cookie
res.setHeader('Set-cookie', ['name=wangding; Httponly', 'age=42; max-age=1000']);

/*
*有的网站会默认请求favicon.ico，所以当你用cookie记录增量时会成双倍增加
*此时须添加if(req.url === '/favicon.ico') return;
*/


```



其他一些功能如session辅助登录、服务器代理等功能将在express中介绍，此处将不再使用原生去写。



###### express框架

使用express框架既可以写后台模板渲染的服务器也可以写前端渲染的服务器。



前端渲染（即使用模板）

	使用生成器

```shell
$ npm install express-generator -g   //全局下载生成器
$ express --view=ejs myapp           //创建叫做myapp的项目，使用ejs模板
$ cd myapp                           //进入项目中
$ npm install                        //安装全部依赖
$ DEBUG=myapp:* npm start            //mac或linux中的打开项目
> set DEBUG=myapp:* & npm start      //windows中的打开项目

.
├── app.js 
├── bin
│   └── www    （入口文件）
├── package.json   
├── public 
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── users.js
└── views
    ├── error.pug
    ├── index.pug
    └── layout.pug

//此项目为mvc架构，routes为C，views为V，此后手动添加数据存储（文件存储或数据库）作为M。

```



后端渲染（即提供接口）

	通常我们将创建两个服务器，一个提供静态资源，一个提供接口服务
	
	基本路由 (var app = express();)

```javascript
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const data = require("./data.json");
var app = express();

app.use(express.static(path.join(__dirname, 'public')));   //设置静态资源，html中的资源会自动将public当作根目录去查询资源
app.use(bodyParser.json());     //设置post请求的中间件，与下面一行同时使用后app方可使用post()方法
app.use(bodyParser.urlencoded({ extended: false }));   //与上一句同时使用设置post请求


app.use('/list/', (req, res, next) => {
    loginOK = false;
    for (let i = 0; i < data.users.length; i++) {
        if (data.users[i].username == req.body.username && data.users[i].password == req.body.pwd) {
            loginOK = true;
        }
    }
    if (loginOK) {
        next()
    } else {
        res.writeHead(200, {
            'Content-Type': 'text/html;charset=utf-8'
        });
        res.end("用户名或密码错误")
    }
})


app.get('/', (req, res) => {
    res.type('text/html');
    res.status(200);
    res.sendfile(`${__dirname}/public/login.html`)
})



app.post('/list/', (req, res) => {
    var query = req.body;    //post请求的数据存在此处
    console.log(req.body);
    res.type('text/html');
    res.status(200);
    res.sendfile(`${__dirname}/public/list.html`)
})

app.get('/listDetil/', (req, res) => {
    console.log("ok");
    res.type('text/html');
    res.status(200);
    res.json(data.chapterList);
    // res.end("neirong");
})

app.listen(8080);
```

	模块化路由 (var router = express.Router();)

```javascript
 //将路由模块化，通过模块引入到app.js 
//app.js
const express = require('express');
const app = express();

const books = require('./router/books.js');

app.get('/', function(req, res) {
  res.end('hello world');
});

app.use('/books', books);

app.listen(8080);
//books.js
  
const express = require('express');
const router = express.Router();

router.use(function(req, res, next) {
  console.log(Date.now());
  next();
});

router.get('/', function(req, res) {
  res.end('books');
});

router.get('/list', function(req, res) {
  res.end('books-list');
});

module.exports = router;
```



常用功能

	实现代理（解决跨域问题）

```javascript
//当前后端分离的时候，常开启两个服务器，一个提供静态资源，一个提供接口服务。
//当一个服务器开启两个服务的时候，必须打开两个接口（例如3000和5000），拿在3000端口返回的html文件就无法请求到5000端口中的接口，也就是所谓的跨域问题
//在提供静态服务的服务器中（假设静态服务打开的是3000端口），加入一下代码

//使用到的中间件 http-proxy-middleware

var proxy=require("http-proxy-middleware");

app.use('/api',proxy({
  target:'http://localhost:5000',    //要转接到的地址
  changeOrigin:false,
  pathRewrite:{
    "^/api":""
  }
}))

//这样在3000端口的静态资源中请求接口可直接写为src='/api'


```



	图片上传

```javascript
//使用到中间件 multer

let fs = require('fs');
let express = require('express');
let multer = require('multer');

let app = express();

/**
 * 多文件上传
 * 设置文件名 filename()
 * 设置存储图片路径 destination()
 * 图片信息 req.files
 * 其他非图片数据 req.body
 */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {   //设置存放位置
        cb(null, './datadb/upload-multer/')     
    },
    filename(req, file, cb) {   //设置文件名字，此处设为时间戳
        const filenameArr = file.originalname.split('.');
        cb(null, Date.now() + '.' + filenameArr[filenameArr.length - 1]);
    }
});

let uploadMulti = multer({ storage })
//uploadMulti.array中参数第一个为图片名字，第二个参数为上传图片个数
app.post('/upload-multi', uploadMulti.array('logos', 1), (req, res, next) => {
    var files = req.files;
    var fileInfos = [];

    // 获取文件信息
    for (let i in files) {
        var file = files[i];
        var fileInfo = {};

        fileInfo.mimetype = file.mimetype;
        fileInfo.originalname = file.originalname;
        fileInfo.size = file.size;
        fileInfo.path = file.path;

        fileInfos.push(fileInfo);
    }

    // 设置响应类型及编码
    res.set({
        'content-type': 'application/json; charset=utf-8'
    });
    console.log(req.body);
    res.end(JSON.stringify(fileInfos), 'utf8');
});


/**
 * http服务
 */
app.get('/', (req, res, next) => {
    let form = `<form action="/upload-multi" method="post" enctype="multipart/form-data">
    <h2>多文件上传</h2>
    <div class="form-group">
        <input type="file" name="logos" class="from-control">
    </div>
    <div class="form-group">
        <input type="file" name="logos" class="from-control"> 
    </div>
    <button type="submit" class="btn btn-default">上传</button>
</form>`
//此处两个表单name名字相同
    res.send(form);
});

app.listen(8080);

```

  

     cooike使用

```javascript
const express = require('express'),
      cookieParser = require('cookie-parser'),
      app     = express();

app.use(cookieParser());     //设置中间件
app.get('/', (req, res) => {
  if(typeof req.cookies.login === 'undefined') {    //cookie存储在req.cookies中
    res.render('login');
  } else if(req.cookies.login === 'true') {
    res.render('index');
  } else {
    res.render('login');
  }
  console.log('cookie:', req.cookies);

  res.cookie('name', 'wangding', {maxAge: 100000, httpOnly: true});//设置cookie
  res.cookie('age', 41, {maxAge: 100000});
  res.send('OK!');
});

app.listen(8080);
```



    session会话

```javascript
//服务器端生成了一个sessionn-id，客户端使用了cookie保存了session-id这个加密的请求信息，而将用户请求的数据保存在服务器端，但是它也可以实现将用户的数据加密后保存在客户端。

//session记录的是客户端与服务端之间的会话状态，该状态用来确定客户端的身份。可以存放在cookie中，也可以存放在内存中，或者是redis、mongodb等第三方服务器中。session默认存放在内存中，存放在cookie中安全性太低，存放在非redis数据库中查询速度太慢，一般项目开发中都是存放在redis中(缓存数据库)。

//cookie保存session
//session信息是不可见的，同时也是不可改的，而且在客户端关闭浏览器后数据消失。
var path = require('path');
var express = require('express');
var session = require('express-session');
var app = express();

app.use(session({
    name: 'session-name', // 这里是cookie的name，默认是connect.sid
    secret: 'my_session_secret', // 建议使用 128 个字符的随机字符串
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 1000, httpOnly: true }
}));

app.get('/', function(req, res, next) {
    if(req.session.isFirst || req.cookies.isFirst) {
        res.send("欢迎再一次访问");
    } else {
        req.session.isFirst = 1;
        res.cookie('isFirst', 1, { maxAge: 60 * 1000, singed: true});
        res.send("欢迎第一次访问。");
    }
});

app.listen(3030, function() {
    console.log('express start on: ' + 3030)
});



//数据库保存session
//用数据库保存session，我们一般使用redis，因为它是缓存数据库，查询速度相较于非缓存的速度更快。
//使用数据库保存session数据，在浏览器端的session-id会随着浏览器的关闭而消失，下次打开浏览器发送请求时，服务器依然不能识别请求者的身份。
var path = require('path');
var express = require('express');
var redisStore = require('connect-redis')(session);
var session = require('express-session');
var app = express();

app.use(session({
    name: 'session-name', // 这里是cookie的name，默认是connect.sid
    secret: 'my_session_secret', // 建议使用 128 个字符的随机字符串
    resave: true,
    saveUninitialized: false,
    store: new redisStore({
        host: '127.0.0.1',
        port: '6379',
        db: 0,
        pass: '',
    })
}));

app.get('/', function(req, res) {
    if (req.session.isFirst) {
        res.send("欢迎再一次访问。");
        console.log(req.session)
    } else {
        req.session.isFirst = 1;
        res.send("欢迎第一次访问。");
    }
});

app.listen(3030, function() {
    console.log('express start on: ' + 3030)
});


//cookie和数据库同时保存session
var path = require('path');
var express = require('express');
var cookieParser = require('cookie-parser');
var redisStore = require('connect-redis')(session);
var session = require('express-session');
var app = express();

app.use(cookieParser());
app.use(session({
    name: 'session-name', // 这里是cookie的name，默认是connect.sid
    secret: 'my_session_secret', // 建议使用 128 个字符的随机字符串
    resave: true,
    saveUninitialized: false,
    // cookie: { maxAge: 60 * 1000, httpOnly: true },
    store: new redisStore({
        host: '127.0.0.1',
        port: '6379',
        db: 0,
        pass: '',
    })
}));

app.get('/', function(req, res, next) {
    if(req.session.isFirst || req.cookies.isFirst) {
        res.send("欢迎再一次访问");
    } else {
        req.session.isFirst = 1;
        res.cookie('isFirst', 1, { maxAge: 60 * 1000, singed: true});
        res.send("欢迎第一次访问。");
    }
});

app.listen(3030, function() {
    console.log('express start on: ' + 3030)
});

```



res方法总结



| express封装后res的常用方法 | 描述                                                         |
| -------------------------- | ------------------------------------------------------------ |
| res.end()                  | 快速结束响应，可传数据，但不建议                             |
| res.json()                 | 发送json相应                                                 |
| res.sendFile()             | 在给定的位置传输文件                                         |
| res.send()                 | 发送http相应可以是buf对象可以是String对象                    |
| res.render()               | 可发送html文件                                               |
| res.sendStatus()           | 返回状态码                                                   |
| res.set()                  | 设置请求头   ({ 'content-type': 'application/json; charset=utf-8' }); |



###### 数据库编程（以mysql为例）

数据存储的方式一共有三种：内存存储、文件存储、数据库存储 

**配置mysql**

+ 运行配置命令

```bash
mysql_secure_installation
```

![63.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9naXRodWIuY29tL2Z1eml3YW5nL25vZGUuanMvYmxvYi9tYXN0ZXIvbm9kZWpzLWNvdXJzZS9pbWFnZXMvNjMucG5n?x-oss-process=image/format,png)

+ 配置MySQL支持中文

```bash
# 打开my.cnf配置文件进行编辑
sudo vi /etc/my.cnf
# 修改对应的代码文件
[mysqld]
character-set-server=utf8
[client]
default-character-set=utf8
[mysql]
default-character-set=utf8

# 重新启动服务
sudo systemctl restart mariadb
```



**MySql操作（此命令为在centos上下载mysql）**

```shell
su # 切换到root用户
yum install -y mariadb mariadb-server # 安装MySQL服务器
systemctl start mariadb # 启动MySQL服务
```

eg：若安装mysql后无法启动，[可参考本篇文章解决问题]( https://www.cnblogs.com/xianyulouie/p/11041790.html )

**数据库操作**

```shell
mysql -u root -p     #使用root用户登录数据库

##数据库
#查看所有数据库
show databases;
#创建数据库
create database nodejs;
#删除数据库
drop database nodejs;
#连接数据库
use nodejs;


##表
#创建表
create table MyClass(
> id int(4) not null primary key auto_increment,
> name char(20) not null,
> sex int(4) not null default '0',
> degree double(16,2));
#删除表
drop table MyClass;


##数据
#增
insert into MyClass values(1,'Tom',1,96.45),(2,'Joan',1,82.99), (3,'Wang',1, 96.59);
#删
delete from MyClass where id=1;
#改
update MyClass set name='Mary' where id=1;
#查
select * from MyClass;

```



**在nodejs中使用数据库**



```javascript
const mysql = require('mysql');   //引入第三方库

const con = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'123456',
  database:'MyClass'
});

con.conent();   //连接数据库
// database operation
// 查 const sql = 'select * from books';
// 增 const sql = 'insert into books where book_id = ?';
// 改 const sql = 'update books set status = ? where book_id = ?';
// 删 const sql = 'delete from books where book_id = ?';
con.query(sql,[1],(err,result)=>{
  	if(err){
  		console.error(err);
      	process.exit(1000);
	}
  	console.log(result);
});

con.end();





```