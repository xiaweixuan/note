width设置100%水平方向出现滚动条

例如直接设置body为100%会出现滚动条，此时还需要将html设置为100%，滚动条就会消失

##### 使子元素变得透明，露出父元素的背景图

设置子元素css属性

```css
    background-color: rgba(0, 0, 0, 0.3)!important;
    filter: blur(100px);
```

##### 如何设置选中文字时不出现背景

为span设置如下css样式

```css
span{
   -webkit-user-select:none;
   -moz-user-select:none;
   -ms-user-select:none;
   user-select:none;
}
```

##### 如何设置元素大平时横排，小屏时竖排

```css
    /*小屏*/
    @media screen and (max-width : 419px){
        .actionxwx_contain{
            display: flex;
            flex-direction:column;
        }
    }
    
    /*大屏*/
    @media screen and (min-width : 420px){
        .actionxwx_contain{
            display: flex;
        }
        .scroll{
            flex-grow: 1;
            height: 350px;
        }
    }
```



##### 如何使div能滚动但是不显示滚动条

原理就是将滚动条设置为无颜色

````css
div{
	overflow-y: auto;
}
div::-webkit-scrollbar{
    background: none;
}
````



##### 在react中引用其他js库

```html
<!--在入口文件中引入（index.html）-->
<script src="./scorllreveal/scrollreveal.js"></script>

```

```javascript
//之后在在组建中引用时，使用window去引用
window.sr = window.ScrollReveal();
window.sr.reveal('.scroll', { distance: '150px' });
```

##### react中引用规范

1、尽量如果引用其他的css库，尽量将引用放到最前面，一面第三方库中的样式覆盖自己写的样式

```javascript
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap'
import './index.css';
```

##### 鼠标位置的事件

screenY表示距离电脑屏幕顶端的距离

clientY表示到浏览器顶端的距离

offsetY表示距离触发事件的当前组件的顶端距离

##### 添加层z-index

在添加层的时候必须搭配position使用，否则没有效果

##### react中为使img的src等于变量的写法

```jsx
<div>
	<img src={'icon/switch' + (isOpen?'-open':'-close')+'.png'}/>
</div>
//以上写法为错误写法


//一下为正确写法
let [img1,setImg1] = useState(<img src={'icon/switch' + (isOpen?'-open':'-close')+'.png'}/>);
useEffect(() => {
    store.subscribe(() => {
        setSwitchs(store.getState())
        setImg1(<img src={'icon/switch' + (isOpen ? '-open' : '-close') + '.png'}/>)
        })
	})
}

<div>
	{img1}
</div>
```

##### 自定义事件

```javascript
//定义事件
$(".class").bind("eventName",function(){})
//触发事件
$(".class").trigger("eventName");
```



##### 用hook获取后台数据，只需要获取一遍，而useEffect会一直获取

为useEffect添加第二个参数

```javascript
useEffect(() => {
       		        setBlogName(props.match.params.name.replace(/name=/, ""));
 var url = 'http://localhost:9000/blog';
 fetch(url)
     .then((res) => res.json())
     .then((data) => {
          setBlogData(data.content.filedata);
      });
}, [])
```



##### hook渲染列表注意点

lists为状态变量，一定要在lists初始化的时候设置初始值

```jsx
const [lists, submitClick] = useState([]);

<ul>
  {lists.map((item,index)=>
     <li key={index} onClick={(e)=>liClick(index)}>{item}</li>
  )}
</ul>
```



##### React 怎样将后端给的html标签渲染到页面上

```jsx
<div dangerouslySetInnerHTML = {{ __html: listdata.content}}></div>,
```



##### 只改变usestate产生变量的属性的时候注意的问题

例如我们使用usestate生成一个变量arr数组，当我们只想改变数组的某一位的时候应如下操作。

```javascript
const [cptStyle, setCptStyle] = useState([]);

var arr1 = [...setCptStyle];
arr1[1]='change';
setCptStyle(arr1);
```

! ! ! 此时要注意。一定要用解构赋值。`arr1 = setCptStyle` 指的是将arr1的地址指向setCptStyle的地址；而 `arr1 = [...setCptStyle]` 是产生新的数组赋值给arr1。而setCptStyle只有检测到地址有变化的时候才会去改变状态。

##### 更改hr颜色

```css
border:5px solid blue;
```



#### a标签设置打开新页面而不是刷新页面

```html
<a href="http://www.baidu.com" target="_blank">qweqweqweq</a>
```



#### nodejs中模块return的返回值为undefined

在写模块的时候使用promise

```javascript
//假设文件叫做md.js
exports.MovieDetil = function (a,b) {
    return new Promise(function (resolve) {
		var sum=a+b;		
    	resolve(sum);
    })
}
//外部文件中
var md=require("./md.js")
md.MovieDetil(ab).then((data)=>{console.log(data)})

```

#### react路由上传几种方式    

```jsx
//路由表中
<Route path=' /sort/:id '  component={Sort}></Route>
//转跳
<Link to={ ' /sort/ ' + ' 2 ' } activeClassName='active'>XXXX</Link>    
this.props.history.push( '/sort/'+'2' )
//获取参数
this.props.match.params.id    
　　　　　　　　　　　
```

```jsx
//路由表
<Route path='/sort' component={Sort}></Route>
//跳转(replace不加会无法跳转)
<Link to={{ path : ' /sort ' , query : { name : 'sunny' }}} replace>XXXX</Link> 　　　　　　　
this.props.history.push({ path : '/sort' ,query : { name: ' sunny'} })
//获取参数
this.props.location.query.name

```

```jsx
//通过state同query差不多，只是属性不一样，而且state传的参数是加密的，query传的参数是公开的
//路由表
<Route path='/sort' component={Sort}></Route>
//跳转
<Link to={{ path : ' /sort ' , state : { name : 'sunny' }}} replace>XXXX</Link> 
this.props.history.push({ pathname:'/sort',state:{name : 'sunny' } })
//获取参数
this.props.location.state.name

```

#### nodejs获取参数

```js




```



#### color类型input标签样式设置

它其实是两层div组成的，chrome提供了两个伪类来控制它们，

`::-webkit-color-swatch-wrapper` 这个是外面的容器
`::-webkit-color-swatch` 这个是内部的颜色按钮，改变颜色后会改变

```css
::-webkit-color-swatch-wrapper{
	background-color:#ffffff;
    outline: none;
}
::-webkit-color-swatch{
	position: relative;
} 
```



​    

##### nodejs解决跨域问题

```js
res.header("Access-Control-Allow-Origin","*");
```





##### 数组如何判等

```
var a=[1,2,3]
var b=[1,2,3]
console.log(a.toString()===b.toString());
```





##### 如何使文本保留格式（pre标签）

```html
<pre>
&lt;html&gt;

&lt;head&gt;
  &lt;script type=&quot;text/javascript&quot; src=&quot;loadxmldoc.js&quot;&gt;
&lt;/script&gt;
&lt;/head&gt;

&lt;body&gt;

  &lt;script type=&quot;text/javascript&quot;&gt;
    xmlDoc=<a href="dom_loadxmldoc.asp">loadXMLDoc</a>(&quot;books.xml&quot;);
    document.write(&quot;xmlDoc is loaded, ready for use&quot;);
  &lt;/script&gt;

&lt;/body&gt;

&lt;/html&gt;
</pre>
<!--以下为显示结果-->
<html>

<head>
  <script type="text/javascript" src="loadxmldoc.js">
</script>
</head>

<body>

  <script type="text/javascript">
    xmlDoc=loadXMLDoc("books.xml");
    document.write("xmlDoc is loaded, ready for use");
  </script>

</body>

</html>
```

```html
<pre>
此例演示如何使用 pre 标签
对空行和    空格
进行控制
</pre>

<!--以下为显示结果-->
此例演示如何使用 pre 标签
对空行和    空格
进行控制
```



##### 常用方法

```javascript
Math.pow(x,y)  //x的y次幂
NumberObject.toFixed(n)    //保留n位小数
```





















































