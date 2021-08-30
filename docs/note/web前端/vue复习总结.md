### 框架使用

#### 基本使用

##### 插值、表达式、动态属性

```jsx
data:(){
msg:true,
id:'contain',
rawHtml:'<p>hahahah</p>'//富文本，有xss风险
}

{{msg?"":"hello"}}

<p :id:"id"></p>

<p v-html="rawHtml"></p>
```

##### computed和watch

* computed有缓存，data不变不会重新计算

* watch不会深度监听
* watch监听引用类型，拿不到`oldValue`

```jsx
//computed用字啊v-model中是需要写get和set
<p>{{msg1}}</p>
<p v-model="msg2"></p>

data:{
    num:1
}
computed:{
    msg1(){
        return this.msg
    },
    msg2:{
        get(){
            return this.num
        },
            set(val){
                this.num=val
            }
    }
}
//watch
<p>{{msg}}</p>
watch:{
    msg:{
        bandler(oldVal,val){
        	//深度监听时拿不到oldValue    
        },
        deep:true//开启深度监听
    }
}
```

##### class、style

```jsx
<p :class="{black:isBlack}"></p>
<p :class="[black,yellow]"></p>
<p :style="styleData"></p>
```

##### v-if、v-for

* v-if是根本不会渲染
* v-show只是使用了display属性将他隐藏,但是依然渲染

* v-for支持对象和数组，key是必须的

##### 事件

`vue`中的event是原生对象，且挂在地方与原生相同

```jsx
<button @click="handle"></button>

methods:{
    handle(e){
        console.log(e)
    }
}
```

常见事件修饰符、按键修饰符

```jsx
<a v-on:click.stop></a>
<a @click.capture></a>
<button @click.ctrl=""></button>
```

##### v-model双向绑定

```jsx
<input type="text" v-model.trim="name"/>//截取空格
<input type="text" v-model.lazy="name"/>//防抖
<input type="text" v-model.lazy="name"/>//转化为数字
```

##### 父子组件通讯

父--->子

```jsx
//parent
<child :list:"list0"></child>
data(){
    list0:[1,2,3]
}

//child
props:['list']
props:{
    list:{
        type:Array,
        default(){
            return [] 
        }
    }
}
```

子-->父

```jsx
//parent
<input @add="addHandler"/>

methods:{
    addHandler(title){
        console.log(title)
    }
}
//child
methods:{
    clickEvent(){
        this.$emit('add',this.title)
    }
}
```

兄弟组件通讯

```jsx
//child1发出事件
event.$emit('eve',this.title)
//child2接受事件
event.$on('eve',this.handler)
deforeDestroy(){//解绑事件、防止内存泄漏
    event.$off('eve',this.handler)
}
//event为自己封装
export default Vue()
```

 ##### 生命周期

单个组件中

```
new Vue

beforeCreate
将数据存入内存中
created

模板编译

beforeMount
再网页上绘制
mounted

beforeUpdate
更改数据
updated

beforeDestory
解除绑定、小蕙子组件、事件监听器
destroyed
```

多个组件

```
parent created
child created
child mounted
parent mounted

parent before updata
child before updata
child updata
parent updata
```

 



#### 高级特性

##### v-model组件绑定

```jsx
//parent
<p>{{name}}</p>
<child v-model="name" />
data(){
 name:"xwx"
}
//child
<input/ 
 type="text"
 value="text" 
 @input="$emit('change',$event.target.value)"
>
 
model:{
props:'text',
event:'change'
}
props:{
text:{
	type:String,
 default(){
     return ""
 }
}
}
```

##### `$nextTick`与refs

在data后，数据为异步渲染，`dom`不会立刻渲染,`$nextTick`会在`dom`更新后进行操作

```jsx
<ul v-for="item" ref="ul">
<li>{{item}}</li>
</ul>

data(){
 return {
     list:['a','b','c']
 }
}
methods:{
 addItem(){
     this.list.push(`${Date.now()}`)
     const ul=this.$refs.ul
     console.log(ul)//此时ul为未改变之前的元素
     this.$nextTick(()=>{
         console.log(ul)//ul为改变后的元素
     })
 }
}
```



##### slot

基本使用

```jsx
//parent
<child>
	{{msg}}
</child>
data(){
 return {
     msg:'haha'
 }
}

//child
<slot>默认值</slot>

```

作用域插槽，在父组件中使用子组件的数据

```jsx
//parent
<child>
	<template v-solt="slotProps">
		{{slotProps.slotData.title}}
	</template>
</child>
data(){
 return {
     msg:'xwx'
 }
}
//child
<solt :slotData="msg"></solt>
data(){
 return {
     msg:'haha'
 }
}
```

具名插槽

```jsx
//parent
<child>
<template v-slot:header>haha</template>
<p>heiehi</p>
<template v-slot:foot>luelue</template>
</child>
//child
<solt name="header"></solt>
<solt name="foot"></solt>
<solt></solt>
```



##### 动态、异步组件

当不确定组件名字的时候，可以将组件名字动态传入

```jsx
//使用:is="component-name"
<component :is="comName"/>


components:{
 child
},
data(){
 return {
     comName:"Child"
 }
}
```

当一个组件过大时，我们可以异步加载他

```jsx
<Child v-if="showchild"/>
<button @click="showchild=true"/>

components:{
 Child:()=>import('./child')
}
data(){
 return {
     showchild:false
 }
}
```



##### keep-alive

我们可以将某个组件缓存，可以避免重复渲染

```jsx
<keep-alive>
	<component1 v-if="com===1"></component1>
	<component2 v-if="com===2"></component2>
	<component3 v-if="com===3"></component3>
</keep-alive>
```



##### `mixin`

当我们想抽离出多个组建的相同部分

当有相同生命周期时，会合并逻辑，如果有相同数据，则以本页面数据为主

```jsx
//index
<p>{{age}}{{name}}</p>

mixins:[myMixin]
data(){
 return {
     age:12
 }
}
//mixin
export default{
 data(){
     teturn {
         name:'xwx'
     }
 },
 methods:{},
 mounted(){}	
}
```

##### 自定义指令

全局定义

```javascript
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
```

局部定义

```
directives: {
  focus: {
    // 指令的定义
    inserted: function (el) {
      el.focus()
    }
  }
}
```

声明周期

- `bind`：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
- `inserted`：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
- `update`：所在组件的 VNode 更新时调用，**但是可能发生在其子 VNode 更新之前**。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。

- `componentUpdated`：指令所在组件的 VNode **及其子 VNode** 全部更新后调用。
- `unbind`：只调用一次，指令与元素解绑时调用。

钩子函数中的参数

- `el`：指令所绑定的元素，可以用来直接操作 DOM。
- `binding`：一个对象，包含以下 property：
  - `name`：指令名，不包括 `v-` 前缀。
  - `value`：指令的绑定值，例如：`v-my-directive="1 + 1"` 中，绑定值为 `2`。
  - `oldValue`：指令绑定的前一个值，仅在 `update` 和 `componentUpdated` 钩子中可用。无论值是否改变都可用。
  - `expression`：字符串形式的指令表达式。例如 `v-my-directive="1 + 1"` 中，表达式为 `"1 + 1"`。
  - `arg`：传给指令的参数，可选。例如 `v-my-directive:foo` 中，参数为 `"foo"`。
  - `modifiers`：一个包含修饰符的对象。例如：`v-my-directive.foo.bar` 中，修饰符对象为 `{ foo: true, bar: true }`。
- `vnode`：Vue 编译生成的虚拟节点。
- `oldVnode`：上一个虚拟节点，仅在 `update` 和 `componentUpdated` 钩子中可用。

#### 周边插件

##### `Vuex`

* mutations为原子操作
* action才能做异步操作，可能会整合多个mutations



简单介绍下store的使用方法

> 在`main.js`中引入
>
> ```javascript
> import Vue from 'vue'
> import Vuex from 'vuex'
> import store from './store'
> 
> Vuew.use(Vuex)
> new Vue({
>  store
> })
> 
> ```
>
> store定义
>
> * state中是你所需要存储的状态值
> * mutations中是你的逻辑操作
> * actions中是你的业务方法，在他里面去调用逻辑操作
> * getters中是属于计算属性
> * 当我们分模块分别创建多个store的时候将他们最终归入module中
>
> ```javascript
> export default new Vuex.Store({
>   state: {
>       count:0
>   },
>   getters:{
>   	  myCount(state){
>           return `数值是${state.count}`
>       }      
>   },
>   mutations: {
>       increment(state,n){
>           state.count+=n
>       },
>       decrement(state,n){
>           state.count-=n
>       }
>   },
>   actions: {
>       async myIncrement(context,obj){
>           context.commit('increment',2)
>           await const products=[1,2,3]
>           console.log(obj)
>           //其他业务
>           return products
>       },
>       async myDecrement(context){
>         context.commit('increment',2)
>         await const products=[1,2,3]
>         //其他业务
>         return products
>     }
>   },
>   modules: {
>   }
> })
> ```
>
> 在组件中调用
>
> ```javascript
> //调用state值
> import {mapState,mapGetters} from 'vuex'
> computed:{
>     ...mapState(['count'])
>     ...mapGetters(['myCount'])
> }
> {{count}}
> {{myCount}}
> //改变值
> import {mapMutations,mapActions} from 'vuex'
> methods:{
>     ...mapMutations(['increment','decrement'])
> 	...mapActions(['myIncrement','myDecrement']) 
>     async increase(){
>         this.$store.state.count+=1//不推荐
>         this.increment()//直接调用逻辑方法，也不推荐
>         const prodicts=await this.myIncrement({a:1})
>     }
> }
> ```

但通常，我们的目录是比较复杂的

> 在大型项目中。我们的目录通常是这样
>
> ```
> ├── index.html
> ├── main.js
> ├── api
> │   └── ... # 抽取出API请求
> ├── components
> │   ├── common
> │   └── page
> └── store
>  ├── index.js          # 我们组装模块并导出 store 的地方
>  ├── actions.js        # 根级别的 action
>  ├── mutations.js      # 根级别的 mutation
>  └── modules
>      ├── cart.js       # 购物车模块
>      └── products.js   # 产品模块
> ```
>
> 其中每个模块中都包括自己的一个store及其自己的state、getters、action等
>
> 最终合并后
>
> ```javascript
> //index.js
> export default new Vuex.Store({
>  //...
>  module:{
>      
>  }
> })
> //cart.js
> export default const cart={
>  state:{},
>  getters:{},
>  mutations:{},
>  actions:{}
> }
> //调用state值,调用cart模块中的值
> import {mapState,mapGetters} form 'vuex'
> computed:{
>  ...mapState({
>      count:state=>{
>          return state.app.count
>      }
>  })
> }
> {{count}}
> //改变值和之前相同
> ```
>
> 

##### `vue-router`

路由模式

* hash：http://abc.com/#/user
* `h5 history`：http://abc.com/user，且需要后端支持

操作方法

> ###### 标签转跳
>
> ```javascript
> 1. 不带参数
>  <router-link :to="{name:'home'}"> 
> <router-link :to="{path:'/home'}"> //name,path都行, 建议用name 
> // 注意：router-link中链接如果是'/'开始就是从根路由开始，如果开始不带'/'，则从当前路由开始。
>  2.带参数
>  <router-link :to="{name:'home', params: {id:1}}"> 
> // params传参数 (类似post)
> // 路由配置 path: "/home/:id" 或者 path: "/home:id" 
> // 不配置path ,第一次可请求,刷新页面id会消失
> // 配置path,刷新页面id会保留
> // html 取参 $route.params.id
> // script 取参 this.$route.params.id
> <router-link :to="{name:'home', query: {id:1}}"> 
> // query传参数 (类似get,url后面会显示参数)
> // 路由可不配置
> // html 取参 $route.query.id
> // script 取参 this.$route.query.id
> ```
>
> ##### **push**
>
> ```javascript
> 1. 不带参数
> this.$router.push('/home')
> this.$router.push({name:'home'})
> this.$router.push({path:'/home'})
> 2. query传参 
> this.$router.push({name:'home',query: {id:'1'}})
> this.$router.push({path:'/home',query: {id:'1'}})
> // html 取参 $route.query.id
> // script 取参 this.$route.query.id
> 3. params传参
>  this.$router.push({name:'home',params: {id:'1'}}) // 只能用 name
> 
> // 路由配置 path: "/home/:id" 或者 path: "/home:id" ,
> // 不配置path ,第一次可请求,刷新页面id会消失
> // 配置path,刷新页面id会保留
> // html 取参 $route.params.id
> // script 取参 this.$route.params.id
> 4. query和params区别
> query类似 get, 跳转之后页面 url后面会拼接参数,类似?id=1, 非重要性的可以这样传, 密码之类还是用params刷新页面id还在
>  params类似 post, 跳转之后页面 url后面不会拼接参数 , 但是刷新页面id 会消失
> ```
>
> ##### replace
>
> ```
> 使用this.$router.replace() (用法同上,push)
> ```
>
> ##### go
>
> ```javascript
> this.$router.go(n)
> 向前或者向后跳转n个页面，n可为正整数或负整数
> ```
>
> ##### 区别
>
> - push：跳转到指定路径，并想history栈中添加一个记录，点击后退会返回到上一个页面
> - replace：跳转到指定路径，但是history栈中不会有记录，点击返回会跳转到上上个页面 (就是直接替换了当前页面)
> - go：向前或者向后跳转n个页面，n可为正整数或负整数

### 框架原理



#### `vue`的数据劫持

vue的一大卖点就是他的响应式，即数据一旦变化，会立刻触发视图的更新。

他原理的核心API为`Object,defineProperty`，接下来我们来模拟实现一下

我们要达到的效果如下

```javascript
//定义一个数据
const data={
    name:'zhangsan',
    age:20,
    info:{
        address:'北京'
    },
    nums:[10,20,30]
}
//将数据进行监听
observer(data)
//改变变量会驱动渲染或处理替他逻辑
data.name='lisi'   //改变属性值
data.info.address='tianjin'
```

下面我们实现observer函数

```javascript
// 监听对象属性
function observer(target) {
    if (typeof target !== 'object' || target === null) {
        // 不是对象或数组
        return target
    }
    // 重新定义各个属性（for in 也可以遍历数组）
    for (let key in target) {
        defineReactive(target, key, target[key])
    }
}

// 重新定义属性，监听起来
function defineReactive(target, key, value) {
    // 深度监听
    observer(value)
    // 核心 API
    Object.defineProperty(target, key, {
        get() {
            return value
        },
        set(newValue) {
            if (newValue !== value) {
                // 深度监听
                observer(newValue)
                // 监听新值，因为新值可能是对象，所以需要深层监听
                // 注意，value 一直在闭包中，此处设置完之后，再 get 时也是会获取最新的值
                value = newValue
                // 触发更新视图或者其他逻辑
                updateView()
            }
        }
    })
}
```

这样虽然可以实现，但是仍有一下缺点

* 通过深层递归监听所有变量，耗费性能
* 如果删除某个变量或者添加新变量无法触发渲染页面
* 如果数据是数组，数组的原生方法是无效的

所以在vue中如果要创建或删除变量需要用vue.set或vue.delete方法去进行

对于数组，我们需要另外进行操作，即修改数组原型

```javascript
// 重新定义数组原型
const oldArrayProperty = Array.prototype
// 创建新对象，原型指向 oldArrayProperty ，再扩展新的方法不会影响原型
const arrProto = Object.create(oldArrayProperty);
['push', 'pop', 'shift', 'unshift', 'splice'].forEach(methodName => {
    arrProto[methodName] = function () {
        updateView() // 触发视图更新
        oldArrayProperty[methodName].call(this, ...arguments)
        // Array.prototype.push.call(this, ...arguments)
    }
})


// 监听对象属性
function observer(target) {
    if (typeof target !== 'object' || target === null) {
        // 不是对象或数组
        return target
    }
    if (Array.isArray(target)) {
        //如果师叔祖，重新定义原型
        target.__proto__ = arrProto
    }
    // 重新定义各个属性（for in 也可以遍历数组）
    for (let key in target) {
        defineReactive(target, key, target[key])
    }
}

```

这样下来，如果通过push等方法修改数组，也可以进行渲染

当然，此处简单的实现了修改数据重新渲染视图，但实际还要结合观察者模式，在get的时候对该变量进行观察。具体可看mvvm文章

#### `Vnode` && `diff`

dom操作时非常消耗性能的通过虚拟dom来减少浏览器性能的消耗

vue通过参考snabbdom实现的vdom与diff，但每种vdom和diff的实现小同大异

首先让我们思考，通过虚拟dom来实现视图渲染的过程是什么

* 将html转化为js结构体
* 将js结构体转化为vnode
* 将vnode渲染到页面 / 比较vnode是否异同后渲染到页面

如果使用snabbdom，我们做这样一个过程是如何用代码实现的呢，它定义了h函数、patch来帮我们实现

```javascript
//获取容器
const container = document.getElementById('container')
// 生成 vnode
const vnode = h('ul#list', {}, [
    h('li.item', {}, 'Item 1'),
    h('li.item', {}, 'Item 2')
])
patch(container, vnode)
//添加点击改变dom的操作
document.getElementById('btn-change').addEventListener('click', () => {
    // 生成 newVnode
    const newVnode = h('ul#list', {}, [
        h('li.item', {}, 'Item 1'),
        h('li.item', {}, 'Item B'),
        h('li.item', {}, 'Item 3')
    ])
    patch(vnode, newVnode)
})
```

h函数接收我们要渲染到页面的html结构，但是这里可以看到他又固定的格式，但实际开发中，我们不可能将很长的html全部写为这样的格式，所以这个时候会用模板编译器帮助我们将html结构生成这样的格式，然后我们将他传入h函数

h函数用来实现vnode，虽然vnode包括很多东西，但是这个函数的实现逻辑无非是赋值、创建对象，我们主要看patch

patch一个作用是渲染，另一个自然是更新，在更新的时候，就用到了diff算法。

diff就是对两棵树进行比较，它是一种思想，因为他有很多实现方式，但他们大同小异。

通常查找两棵树的差异，我们的方法是遍历两棵树完成后还有进行排序，他的时间复杂度大概为n^3,大幅度消耗性能

diff将复杂度变为n，他有如下规则

* 值比较同级
* tag不相同，直接删掉重建
* tag和key相同，则认为相同，不在深度比较

#### 模板编译

在写vue的时候，我们通常会写html、指令、插值等，这些不是html的语法，但是浏览器最后还是能识别它，是因为它经历了模板编译。

模板编译过程

* 将template模板编译为render函数
* 执行render函数生成vnode（这里的render实际就是对h函数的一个封装和功能补充）

这里我们简单展示一个编译结果

```jsx
const template = `<p>{{message}}</p>`
//编译后
with(this){return createElement('p',[createTextVNode(toString(message))])}
```

当然这只是针对插值的情况进行的编译，能编译的还例如指令

```jsx
// 循环
const template = `
    <ul>
        <li v-for="item in list" :key="item.id">{{item.title}}</li>
    </ul>
`
//编译后
with(this){return _c('ul',_l((list),function(item){return _c('li',{key:item.id},[_v(_s(item.title))])}),0)}
```

那么是什么将他们编译的呢，工具也有很多，例如webpack的vue-loader会在开发环境下编译模板

这是，我们回忆一下如何去写一个vue组件，可能你是这么写

```javascript
Vue.component('heading',{
    template:`balabal`
})
```

然后运行的时候编译器会把template编译生成render函数，当然我们其实可以直接写render函数

```jsx
Vue.component('heading',{
    render: createElement(
    	'h1',
        [
            createElement('a',{
                attrs:{
                    name:'headerId',
                    href:"#headerId"
                }
            },'this is a tag')
        ]
    )
})
//渲染出来时
<h1>
    <a name:'headerId' href="#headerId"/>
</h1>
```

#### 组件渲染过程（总结）

* 模板编译（编译为render）
* 响应式（数据劫持）
* 执行render后生成vnode
* 通过patch去渲染或者更新

首先编译器进行编译，编出render函数。render函数执行产生vnode，进行patch。在render的同时，会触发data数据的getter，他会将当前变量写入观察者。当数据发生改变会触发setter中的动作函数。

### `vue3`

使用ts重写代码，性能提升且代码量更少。

#### 特性

`vue3.0`重要的特点就是讲之前的`option api`改为了`composition api`

也就是`组合式api`，一个功能就是一个`api`

在2.0中，我们创建`vue`对象通常是

```javascript
var vm = new Vue({
  el: '#app',
  data: data
})
```

在3.0中，我们可以改变了方式

```javascript
Vue.createApp({
    data:()=>({
        tag:true
    })
}).moute('#app')
```

#### 优点

* 没有了this的烦恼
* 更好的而类型推到能力（ts）
* 更友好的`Tree-shaking`支持
* 更大的代码压缩空间
* 更灵活的逻辑复用能力



#### proxy实现响应式

defineProperty的问题

* 深度监听一次性递归，耗性能

* 无法监听新增属性删除属性

* 无法原生监听数组

proxy使用

```javascript
const data={
    name:'xwx',
    age:21
}

const proxyData=new Proxy(data,{
    get(target,key,receiver){
        const result=Reflect.get(target,key,receiver)
        return result;//结果
    },
    set(target,key,val,receiver){
        const result=Reflect.set(target,key,val,receiver)
        return result;//是否设置成功
    },
    deleteProperty(target,key){
        const result=Reflect.deleteProperty(target,key)
        return result;//时候删除成功
    }
})
```

