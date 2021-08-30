### 框架使用

#### 基本使用

##### 变量表达式

```jsx
<p>{this.state.data}</p>
<img src={this.state.src}/>
```

在`vue`中使用`：`的属性为动态属性，而在react中直接使用`{}`即可

##### class style

```jsx
<p className={this.state.className}></p>
<p style={this.state.style}></p>
<p dangerouslySetInnerHTML={__html:'<span>ha</span>'}></p>
```

##### 条件判断

```jsx
render(){
const btn1=<button>1</button>
const btn2=<button>2</button>

return <div>
	{
tag ?btn1:btn2
}
</div>
}
```

##### 列表渲染

```jsx
return <ul>
{
this.state.list.map((item,key)=>{
return <li key={item.id}>{item.title}</li>
})
}
</ul>
```

##### bind this

```jsx
this.clickhandler=this.clickhandler.bind(this)
clickhandle1r=funciton(){
console.log(this)//如果不进行bind绑定，this为undefined
}
clickhandler2=()=>{
console.log(this)//静态方法中指向正确
}
return <div onClick={this.clickhandler1}></div>
return <div onClick={this.clickhandler2}></div>

```

##### event参数

react中的事件对象是封装过的

* event是`SyntheticEvent`示例，模拟出`dom`事件所有能力
* 所有事件都被挂在到document上了

```jsx
return <div onClick={this.clickhandler3}></div>

clickhandler3=(e)=>{
 console.log(e.target)//指向触发元素
 console.log(e.currentTarget)//指向绑定事件的元素
 console.log(e.nativeEvent)//原生事件对象
 console.log(e.nativeEvent.target)//指向触发元素
 console.log(e.nativeEvent.currentTarget)//指向绑定事件的对象
}
```

##### 表单

* 受控组件

  ```jsx
  <input type="text" value={this.state.name} onChange={this.changeEvent}/>
  changeEvent=function(e){
  	this.setState({
          name:e.target.value
      })    
  }
  ```

* 非受控组件

  ```jsx
  见高级特性
  ```

##### 组件传值

`vue`中组件传值，父向子传值，子触发事件，父接受事件

而react中，父向子传值，父向子传函数，在函数中该百年父的值

```jsx
//props传递值
	//父
	<child list={this.state.list}/>
	//子
	const {list} = this.props
//props传函数
    //父
    <Child add={this.addData}/>
    addData=(title)=>{
        this.setState({
            list:this.state.list.concat({
                id:`${Date.now()}`,
                title
            })
        })
    }
    //子
    const {add}=this.state
    add("title")
//props类型检查
    import PropTypes from 'prop-types'
	class Child extends Component{}
	Child.propTypes={
        list:PropTypes.arrayOf(PropTypes.object).isRequired
    }
```

##### `setState`

他的特性如下

* 不可变值：在`setSate`修改之前，不可以直接操作state
* 可能是异步更新：
* 可能会被合并：

不可变值

```jsx
//基本类型
this.setState({
    //不可以this.state.count++，这样不符合state的不可变特性
    count:this.state.count+1
})
//数组
var list=this.state.list5.slice()
list.push(100)
this.setState({
    list1:this.state.list1.concat(100),//追加
    list2:[...this.state.list1],//追加
    list3:this.state.list1.slice(0,3)，//截取
    list4:this.state.list1.filter(item=>item>100)，//筛选
	list5:list//其他操作使用副本擦欧总
    
})
//对象
this.setState({
    obj1:Object.assign({},this.state.obj1),
    obj2:{...this.state.obj2,a:100}
})
```

同步或异步

```jsx
//正常使用是异步
this.setState({
    count:1
},()=>{console.log(this.state.count)})
//在setTimeout中是同步的
setTimeout(()=>{
    this.setState({
    	count:1
    })
    console.log(this.state.count)
},0)
//自定义dom事件中是同步
handle=()=>{
    this.setState({
        count:1
    })
    console.log(this.state.count)
}
componentDidMount(){
    document.body.addEventListener('click',this.handle)
}
```

合并与不合并

```jsx
/*this.state.count===0*/
//传入对象会合并:三个会被合并，最终count的值是1
this.setState({
    count:this.state.count+1
})
this.setState({
    count:this.state.count+1
})
this.setState({
    count:this.state.count+1
})
//传入函数不会和合并:最终将结果为3
this.setState((prevState,props)=>{//参数：设置前的state、props属性
    return {
        count:prevState.count+1
    } 
})
this.setState((prevState,props)=>{//参数：设置前的state、props属性
    return {
        count:prevState.count+1
    } 
})
this.setState((prevState,props)=>{//参数：设置前的state、props属性
    return {
        count:prevState.count+1
    } 
})
```

##### 生命周期

render之前为render阶段，纯净且不包含副作用，可能会被react暂停、中止、重启

react更新`dom`时进入commit阶段，可以使用`dom`，运行副作用，安排更新

[示例](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

```jsx
//挂载
constructor
|
render
|
react更新dom和refs
|
componentDidMount
//更新
new props/setState/forceUpdate
|
shouldComponentUpdate
|
render
|
react更新dom和refs
|
componentDidUpdate
//卸载
componentWillUnmout

```

父子组件生命周期和`vue`相同



#### 高级特性

##### 函数组件

* 纯函数，输入props输出jsx
* 没有实例，没有生命周期，没有state
* 不能拓展其他方法

```jsx
function List(props){
 const {list}=this.props
 return <ul>{
 	list.map(item=><li key={item.id}>{item.title}</li>)        
 }</ul>
}
```



##### 非受控组件

什么时候通常选择非受控组件

* 文件上传，只能手动操作`dom`元素
* 富文本编辑器的实现

```jsx
this.nameInputRef = React.createRef()

return <div>
         {/* 使用 defaultValue 而不是 value ，使用 ref */}
         <input defaultValue={this.state.name} ref={this.nameInputRef}/>
         {/* state 并不会随着改变 */}
         <span>state.name: {this.state.name}</span>
         <br/>
         <button onClick={this.alertName}>alert name</button>
</div>

alertName = () => {
     const elem = this.nameInputRef.current // 通过 ref 获取 DOM 节点
     alert(elem.value) // 不是 this.state.name
}
```



##### Portals

传送门。组件默认会按照规定层嵌套渲染，传送门可以让组件到负组件外。

使用场景

* 父组件`overflow:hidden`
* 父组件`z-index`太小
* `fixed`定位时需要放在body第一层级

```jsx
 render() {
     // // 正常渲染
     return <div className="modal">
         {this.props.children} {/* vue slot */}
     </div>

     // 使用 Portals 渲染到 body 上。
     // fixed 元素要放在 body 上，有更好的浏览器兼容性。
     return ReactDOM.createPortal(
         <div className="modal">{this.props.children}</div>,
         document.body // DOM 节点
     )
 }
```



##### context

公共信息利用context传递给每个组件。用props太繁琐，用`redux`小题大做。

下例中，我们将数据在`app`组件中赋值，向下传递两层，然后获取

```jsx
// 1、创建 Context 填入默认值（任何一个 js 变量）
const ThemeContext = React.createContext('light')

class App extends React.Component {
 constructor(props) {
     super(props)
     this.state = {
         theme: 'light'
     }
 }
 render() {
     //2、使用ThemeContext.Provider 设置value
     return <ThemeContext.Provider value={this.state.theme}>
         <Toolbar />
         <hr/>
         <button onClick={this.changeTheme}>change theme</button>
     </ThemeContext.Provider>
 }
 changeTheme = () => {
     this.setState({
         theme: this.state.theme === 'light' ? 'dark' : 'light'
     })
 }
}


// 中间的组件再也不必指明往下传递 theme 了。
function Toolbar(props) {
 return (
     <div>
         <ThemedButton />
         <ThemeLink />
     </div>
 )
}

// 底层组件 - class 组件
// 3、指定组件的contextType 读取当前的 theme context（变量名）。
ThemedButton.contextType = ThemeContext //指定静态属性
class ThemedButton extends React.Component {
 render() {
     // 4、赋值。React 会往上找到最近的 theme Provider，然后使用它的值。
     const theme = this.context 
     return <div>
         <p>button's theme is {theme}</p>
     </div>
 }
}

// 底层组件 - 函数是组件
function ThemeLink (props) {
 // 3、函数式组件可以使用 Consumer
 return <ThemeContext.Consumer>
     { value => <p>link's theme is {value}</p> }
 </ThemeContext.Consumer>
}
```



##### 异步组件

变成异步组件的方法如下

* import

* `React.lazy`
* `React.Suspense`

```jsx
const ContextDemo = React.lazy(() => import('./ContextDemo'))

class App extends React.Component {
 constructor(props) {
     super(props)
 }
 render() {
     return <div>
         <p>引入一个动态组件</p>
         <hr />
         <React.Suspense fallback={<div>Loading...</div>}>
             <ContextDemo/>
         </React.Suspense>
     </div>

     // 1. 强制刷新，可看到 loading （看不到就限制一下 chrome 网速）
     // 2. 看 network 的 js 加载
 }
}
```



##### 性能优化

性能优化的要点如下

* `shouldComponentUpdate`简称`SCU`
* `PureComponent`和`React.memo`
* 不可变值`immutable.js`

```jsx
//SCU
/*
当父组件中有多个子组件，当引起父组件重新渲染的时候，所有子组件都会重新渲染，即使他的内容没有发生改变。所以我们可以手动加入判断，如果内容不变，就略过渲染阶段
*/
shouldComponentUpdate(nextProps,nextState){
  if(nextSatate.count!==this.state.count){
     return true //可以渲染
  }
  return false //不可渲染
}

```

为什么react不内置本功能，也就是渲染内容相同就停止渲染，不同的时候再渲染？

state的特性之一就是不可变值，我们不可以直接改变他的值，但并不是所有编程者都会遵循，例如要改变的state是一个数组我们用如下方式更改他

```javascript
this.state.list.push(1)
this.setState({
  list:this.state.list
})
```

这是不规范的写法，但并不是错误写法，所以当这个时候使用`SCU`的时候，会永远判等。所以`scu`必须配合不可变值一起使用

在`SCU`中，我们比较某个state是否变化，但通常state是一个对象，这是需要我们进行深比较，但这是非常小号性能的，所以react提供了浅比较的方法

```javascript
/*PureComponent（只比较第一层属性）类组件中使用*/
class List extends React.PureComponent{}
//这样写他会为你默认生成SCU并进行配置


/*memo 函数组件中使用*/
function com(prevProps,nextProps){}
export default Rect.memo(myComponent,com)
//为你返回一个新组件
```

如果你想彻底使用不可变值，在`SCU`中使用深拷贝，但同时会降低性能。而immutable.js解决了这个问题。它基于共享数据而非深拷贝。

##### HOC和Render Props

关于组件中公共逻辑抽离，react将mixin废弃了，同时引出HOC和render Props。

HOC更像是一种模式，他接收一个组件作为参数，并返回一个新组件，它的作用像是一个工厂或是装饰器。

```jsx
//例如我们想把同一个功能添加入com1，com2两个组件
const HOCfactory=(Component)=>{
   class HOC extends React.Component{
       componentDidMount() {
 			conosle.log("一个功能")
       }
       render(){
           return <Compnent {...props}/>//透传props
       }
   }
   return HOC
}
export const app1=HOCfactory(com1)
export const app2=HOCfactory(com2)

```

除了HOC还有render props思想，HOC将需求组件传入公用逻辑组件中，而render Props是将公共逻辑组件传入需求组件中

但是HOC中我们要展现的模板写在需求组件中，公用逻辑组件只需要接受拿过来渲染，可如果需求组件作为父组件，那如何保证在父组件中使用公用的（子组件的）逻辑呢？下面为实现方法

```jsx
class Factory extends React.Component{
   constructor(){
       this.state={
           //多个组件的公用逻辑数据
           a:1
       }
   }
   render(){
       return <div>{this.props.render(this.state)}</div>
   }
}
//props.render为从外部传入的要渲染的模板，这样就可以使用子组件中的逻辑或者变量了。也就是说，即使需求组件在外层，渲染模板还是在子组件进行
const App=()=>{
   <Factory
   	render={
           (props)=><p>{props.a}</p>
       }    
   />
}
//props.a为公共逻辑组件中定义好的变量a:1
//这里我们将要渲染的东西及要使用的逻辑传入公共逻辑组件中
```



#### 生态

##### redux

##### react-router

分为hash和h5 history两种模式

他的传参方式

```jsx
//params
<Route path='/path/:name' component={Path}/>

<link to="/path/2">xxx</Link>
this.props.history.push({pathname:"/path/" + name});

读取参数用:this.props.match.params.name
//query
<Route path='/query' component={Query}/>
 
<Link to={{ path : ' /query' , query : { name : 'sunny' }}}/>
this.props.history.push({pathname:"/query",query: { name : 'sunny' }});
 
读取参数用:this.props.location.query.name
//state
<Route path='/sort ' component={Sort}/>
 
<Link to={{ path : ' /sort ' , state : { name : 'sunny' }}}/> 
this.props.history.push({pathname:"/sort ",state : { name : 'sunny' }});
 
读取参数用: this.props.location.query.state 
//search
<Route path='/web/departManange ' component={DepartManange}/>
 
<link to="web/departManange?tenantId=12121212">xxx</Link>
this.props.history.push({pathname:"/web/departManange?tenantId" + row.tenantId})

读取参数用: this.props.location.search
```



### 原理

#### 首次渲染流程

* jsx经过babel编译成React.createElement的表达式

* React.render(React.createElement())执行
* React.createElement()执行生成一个element
* 执行React.render函数，进行初始化此element
  * 判断element类别，假如是自定义组件
  * 初始化ReactCompositeComponentWrapper类
  * 调用mountComponent方法
    * 实例化自己的组件，例如叫Home类，得到instance
    * componentWillMount
    * renderedElement = instance.render()
    * 初始化renderedElement，得到child
    * componentDidMount
    * child.mountComponent(container)



> element下面有
>
> element的种类：string、原生DOM节点、React Component - 自定义组件、数组、null等



> 初始化element不同种类初始化时会用到不同的类
>
> 是对象-------原生DOM ReactDOMComponent
>
> ​				---自定义类 ReactCompositeComponentWrapper
>
> 不是对象-----string、number ReactDOMTextComponent
>
> ​				----ull、false ReactDOMEmptyComponent
>
> 每个类下面都有mountComponent、updateComponent



```javascript
mountComponent(container) {
  const domElement = document.createElement(this._currentElement.type);
  const textNode = document.createTextNode(this._currentElement.props.children);

  domElement.appendChild(textNode);
  container.appendChild(domElement);
  return domElement;
}
```



#### 更新渲染流程



#### `useState`实现原理

```javascript
let _state = [], _index = 0;
function useState(initialState) {
  let curIndex = _index; // 记录当前操作的索引
  _state[curIndex] = _state[curIndex] === undefined ? initialState : _state[curIndex];
  const setState = (newState) => {
    _state[curIndex] = newState;
    ReactDOM.render(<App />, rootElement);
    _index = 0; // 每更新一次都需要将_index归零，才不会不断重复增加_state
  }
  _index += 1; // 下一个操作的索引
  return [_state[curIndex], setState];
}
```

加入函数式更新和惰性初始化state，并判断是否需要刷新页面

```javascript
let _state = [],
  _index = 0;
function useState(initialState) {
  let curIndex = _index;
  if (typeof initialState === "function") {
    initialState = initialState();
  }
  _state[curIndex] =
    _state[curIndex] === undefined ? initialState : _state[curIndex];
  const setState = newState => {
    if (typeof newState === "function") {
      newState = newState(_state[curIndex]);
    }
    if (Object.is(_state[curIndex], newState)) return; // 使用Object.is来比较_state[curIndex]是否变化，若无，则跳过更新
    _state[curIndex] = newState;
    ReactDOM.render(<App />, rootElement);
    _index = 0;
  };
  _index += 1;
  return [_state[curIndex], setState];
}
```



#### `useEffect`实现原理

```javascript

```







#### `vnode diff`

具体见`vue`原理

`vnode`重点概念

* h函数
* `vnode`数据结构
* patch函数

`diff`重点概念

* 只比较同级
* tag不相同直接删掉重建，不太深度比较
* tag和key，两者都相同，认为相同节点，不再深度比较

#### `jsx`

他的样子等同于vue的模板，但vue的模板不是html，jsx也不是js。

vue在编译完模板后返回的是一个render函数体，render函数执行后会返回vnode。

jsx同样会被babel编译

他的编译形式如下

```jsx
//jsx
const el=<div id="el">
        <h2>标题</h2>
        <Child>内容</Child>
</div>
//babel编译后
"use strict";
var el =React.createElement("div", {id: "el"}, React.createElement("h2", null, "标题"), React.createElement(Child, null, "内容"));

//jsx
const el=<div id="el">
        {
        	list.map(item=><li>{item.title}</li>)
        }
</div>
//babel编译后
var el = React.createElement("div", {
  id: "el"
}, list.map(function (item) {
  return React.createElement("li", null, item.title);
}));

```

综上可看`React.createElement`的用法

```javascript
React.createElement(元素,属性,child1，child2)
React.createElement(元素,属性,[child1，child2])
```

* `React.createElement`即h函数，返回`vnode`
* 第一个参数可以实组件也可以是`html`的tag
* 区分是组件名还是tag的方法为组件名首字母必须大写（react规定）

#### 合成事件

* react的所有事件都是挂载到document上面的
*  event不是原生的，是`SynctheticEvent`合成事件对象
* 和`vue`事件不同，和`dom`事件不同

合成事件过程

* 元素触发事件
* ‘事件冒泡到顶层document
* 实例化统一的event对象
* 将事件派发下去

为什么要用合成事件

* 更好的兼容性和跨平台
* 全部挂载到document，减少内存消耗，避免频繁解绑
* 方便事件的统一管理（如事务机制）

#### `setState batchUpdate`

`setState`主流程

* `this.setState(newState)`
* `newState`存入pending队列
* 是否处于batch update
* (Y)保存到`diryComponents`中（即异步执行）
* (N)遍历所有`diryComponents`，调用`updataComponent`更新`pendingstate`或者props（即同步执行）

解释：

在react中定义函数的时候，会先设置一个状态，函数结束的时候再次设置

```javascript
//正常情况是异步
class Demo extends Component{
	constructor(){}
	render(){}
	increase=(){
		//isBatchingUpdates=true
		//逻辑
		this.setState({
			count:this.state.count+1
		})
		//isBatchingUpdates=false
	}
}

//有时候为同步
class Demo extends Component{
	constructor(){}
	render(){}
	increase=(){
		//isBatchingUpdates=true
		setTimeout(()=>{
            //此时isBatchingUpdates是false
            this.setSate({
                count:this.state.count+1
            })
        })
		//isBatchingUpdates=false
	}
}
```

所有react控制范围的，都可以被`batchUpdate`命中，例如生命周期，react注册事件，调用的函数，有些不能被命中，例如自定义事件，一些异步方法

以上这种机制被称为transaction机制，即在函数执行前进行`isBatchingUpdates=true`，然后执行函数体，在函数执行完成后`isBatchingUpdates=false`

transaction的原理如下

```
/*
 * <pre>
 *                       wrappers (injected at creation time)
 *                                      +        +
 *                                      |        |
 *                    +-----------------|--------|--------------+
 *                    |                 v        |              |
 *                    |      +---------------+   |              |
 *                    |   +--|    wrapper1   |---|----+         |
 *                    |   |  +---------------+   v    |         |
 *                    |   |          +-------------+  |         |
 *                    |   |     +----|   wrapper2  |--------+   |
 *                    |   |     |    +-------------+  |     |   |
 *                    |   |     |                     |     |   |
 *                    |   v     v                     v     v   | wrapper
 *                    | +---+ +---+   +---------+   +---+ +---+ | invariants
 * perform(anyMethod) | |   | |   |   |         |   |   | |   | | maintained
 * +----------------->|-|---|-|---|-->|anyMethod|---|---|-|---|-|-------->
 *                    | |   | |   |   |         |   |   | |   | |
 *                    | |   | |   |   |         |   |   | |   | |
 *                    | |   | |   |   |         |   |   | |   | |
 *                    | +---+ +---+   +---------+   +---+ +---+ |
 *                    |  initialize                    close    |
 *                    +-----------------------------------------+
 * </pre>
 */
```

perfirm是一个react定义的接口方法，由途中看到，我们在最初已经定义好了initialize和close方法，当通过perform执行一个方法的时候会一次执行这些方法，我们可以模拟一下这个过程

```javascript
transaction.initialize=function(){
    console.log('initalize')
}
transaction.initialize=function(){
    console.log('close')
}
function method(){
    console.log('method')
}
transaction.perform(method)

//最后的结果为

//initalize
//method
//close
```

#### 组件渲染、更新过程及

* props state
* 生成vnode
* 渲染组件（patch）

将patch可以分为两个阶段

* reconsiliation阶段--执行diff计算
* commit阶段--将diff结果渲染dom阶段

> ##### 可能遇到的性能问题：
>
> js是单线程，且和dom渲染公用一个线程，当组件足够复杂，组件更i性能时计算压力较大，同时再有dom操作需求（动画、鼠标拖拽事件），这时候页面将卡顿
>
> ##### 基于问题，react提出的解决方案fiber：
>
> 将reconsiliation阶段进行拆分，当dom需要渲染时，暂停计算，空闲时恢复渲染，这样通过`window.requestIdleCallback`这个`api`去实现





















