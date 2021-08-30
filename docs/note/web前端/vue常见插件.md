# axios

### 基本用法

##### get

常见的方法有get请求

> `axios`调用`http`有两种方法，他们是
>
> ```javascript
> //get方法
> axios.get('/data.json',{
>     params:{
>         id:12
>     }
> }).then(res=>{
>     console.log(res)
> })
> ```
>
> 和
>
> ```javascript
> //get方法
> axios({
>     method:'get',
>     url:'/data.json',
>     params:{
>         id:12
>     }
> }).then(res=>{
>     console.log(res)
> })
> 
> ```

##### post

上面是get的请求，接下来为post请求。对于post请求常常伴随着数据、文件传输。通常格式有`form-data`是之前表单提交的格式，它常用于图片或者文件的上传。另一种是`applicition/json`，以`json`的格式去上传。

首先是表单格式

```javascript
let formData=new FormData()
let data={id:12}
for(let key in data){
	formData.append(key,data[key])
}
axios.post('/post',formData)
axios.post('/post',{
	method:'post',
	url:'/post',
	data:formData
})
```

然后是`json`格式

```javascript
let data={id:12}
axios.post('/post',data)
axios.post({
	method:'post',
	url:'/post',
	data:data
})


```

##### 并发请求

例如我们要同时请求两个接口，将数据一起处理，那么就需要用到并发请求

```javascript
axios.all(
	[
        axios.get('/data.json'),
        axios.get('/nav.json')
    ]
).then(axios.spread((res1,res2)=>{
    console.log(res1,res2)
}))
```



### 深入

##### 实例

实例上有很多可配置的方法和操作，通过使用实例更加的方便便捷

```javascript
let instance=axios.creat({})
instance.get('/data').then(()=>{
    console.log(res)
})

```

##### 配置

例如我们像设置一个基础超时时长，我们就要设置，配置参数的方法有三种

```javascript
//优先级顺序
//全局配置 
axios.defaults.timeout=1000
//实例配置
let axi=axios.creat({timeout:1000})
//请求配置
axios.get('/api',{
    timeout:5000
})
```

常见的参数有

```javascript
let instance=axios.creat({
    baseURL:'http://localhost:8080',//基本地址
    timeout:1000,//超时时长
    url:'/data.json',//请求路径
    method:'get',//请求方法
    headers:{},//设置请求头
    params:{},//将参数拼接url上
    data:{},//把请求参数放到请求体里
})
instance.get('/data').then(()=>{
    console.log(res)
})

```

##### 拦截器

在请求或响应处理前拦截他们并做一些处理

请求拦截器

```javascript
axios.interceptors.request.use//请求前的回调，请求失败后的回调
(config=>{
    //操作
    return config
},err=>{
    //请求错误时操作
    return Promise.reject(err)
})
```

响应拦截器

```javascript
axios.interceptors.response.use//请求成功的回调，响应错误后的回调
(res=>{
    //操作
    return res
},err=>{
    return Promise.reject(err)
})
```

取消拦截器

```javascript
let interceptors=exios.interceptors.request.use(config=>{
    config.headers={
        auth:true
    }
    return config
})
axios.interceptors.request.eject(interceptors)
```

拦截器的例子

例如当我们需要获取token再进行请求时，我们会用到请求拦截器

```javascript
let ins=axios.create({})//访问需要登录的接口
ins.interceptors.request.use(config=>{
    config.headers.token=''
    return config
})
let ins2=axios.create({})//访问不需要登录的接口
```

再例如移动端开发时,当我们请求时弹出一个提示框显示正在加载中

```javascript
let ax=axios.create({})
let ax2=axios.create({})
ax.interceptors.request.use(config=>{
    $('#modal').show()
    return config
})
ax.interceptors.response.use(res=>{
    $('#modal').hide()
    return res
})
```

##### 错误处理

错误处理的三种方式

```javascript
axios.interceptors.request.use
(config=>config,err=>{
    $('#modal').show()//提示框提示请求错误
    setTime(()=>{
        $('#modal').hide()
    }2000)
    return Promise.reject(err)
})

axios.interceptors.response.use
(res=>res,err=>{
    $('#modal').show()
    setTime(()=>{
    	$('#modal').hide()
    }2000)
    return Promise.reject(err)
})

axios.get('/data.json').then(res=>{console.log(res)}).catch((res)=>{
    //操作
    console.log(err)
})
```

##### 取消请求

用于取消正在进行的`http`请求

```javascript
let souce=axios.CancelToken.source()
axios.get('/data.json',{
    CancelToken:souce.token
}).then(res=>{
    console.log(res)
}).catch(err=>{
    console.log(err)
})
//取消请求  参数为传入的信息 该信息会被内catch捕捉到
source.cancel('cancel http')
```

例如，在一个后台管理系统中，用户查询一个数据可能会很慢，达到三秒至五秒，如果用户点击了查询突然不想查了，这时就会需要取消查询

### 封装

每一个请求我们都要写一遍错误捕捉或者一切成功后调用的方法，如果每写一个就写一遍，会造成代码冗余

封装文件

```javascript
import axios from 'axios'
import {baseURL} from '@/config'
import {MessageBox,Message,Loading} from 'element-ui'
import router from '@/router/index'
class HttpRequest{
//封装axios
  constructor(baseUrl){
      baseUrl = 'http://xiawx.top'
      this.baseUrl = baseUrl;
  }
  getInstdeConfig(){
    const config ={
      baseUrl:this.baseUrl,
      headers:{
        "token":""
      }
    }
    return config
  }
  //拦截器
  interceptors(instance,url){
    instance.interceptors.request.use(config => {
      if (localStorage.getItem('token')) { // 判断是否存在token
        config.headers.token = localStorage.getItem('token');
      }
      return config
    },error => {
      Message.error({message: '请求超时!'});//ui组件
      return Promise.reject(error)
    })
    instance.interceptors.response.use(res => {
      if(res.data.meta.code == '-2'){
        MessageBox('登录超时,请重新登录!','登录超时')//ui组件
      }
      return res
    },error => {
      if (error.response) {
        switch (error.response.status) {
          case 401: //401
            store.commit(types.LOGOUT);
            router.replace({
              path: 'login',
              query: {redirect: router.currentRoute.fullPath}
            })
        }
      }
      return Promise.reject(error.response.data)  // 返回接口返回的错误信息
    })
  }
  request(options){
    //创建一个请求
    //创建实例
    var _this = this;
    const instance = axios.create({
      baseURL: _this.baseUrl,
      timeout: 3000,
      // 携带凭证
      withCredentials: true
    })

    options = Object.assign(this.getInstdeConfig(),options)
    this.interceptors(instance,options.url)
    return instance(options)
  }
}
export default HttpRequest


```

再创建一个文件把某个模块中所有请求操作放在里面，只暴露方法

```javascript
export const getLoginInfo = (data) => {
  return HttpRequest.request({
    url: '/login/' + data.username + '/' + data.password + '/' + data.role,
    method: 'post',
    data: data
  })
}
```

# bus

### 基本用法

当项目较小，无需使用vuex但仍然需要组件间通讯时，我们可以选择使用bus

全局的定义（app.js）

```javascript
var eventBus = {
    install(Vue,options) {
        Vue.prototype.$bus = vue//bus就是一个vue对象
    }
};
Vue.use(eventBus);
```

分发事件的组件

```javascript
methods: {
  todo: function () {
    this.$bus.$emit('todoSth', params);  //params是传递的参数
    //...
  }
}
```

监听的组件

```javascript
// ...
created() {
  this.$bus.$on('todoSth', (params) =&gt; {  //获取传递的参数并进行操作
      //todo something
  })
},
// 最好在组件销毁前
// 清除事件监听
beforeDestroy () {
  this.$bus.$off('todoSth');
}
```

# echarts

一个用于创建绘制图表的npm第三方库















