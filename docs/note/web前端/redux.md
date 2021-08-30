### 基本形式

基本思路，reducer中创建所有state及其方法，在store中创建store对象，在组件中调用对应方法

```javascript
//reducer.js
import {combineReducers} from 'redux'

function Count(state = 0, action){
    switch(action.type){
        case 'add':
            return state+action.val
        case 'del':
            return state-1
        default:
            return state
    }
}
function Str(state = 'str', action){
    switch(action.type){
        case 'addS':
            return state+action.val
        case 'delS':
            return state-1
        default:
            return state
    }
}
const data = combineReducers({
    Count,
    Str
})
export default data;
//store.js
import {createStore} from 'redux'
import data from './reducer'
const store = createStore(data)
export default store;
//组件中
store.dispatch({type:'add',val:5})
store.getState()
useEffect(()=>{
    store.subscribe(()=>{
        console.log(store.getState())
    })
},[])

```

在使用`store.dispatch`对state进行操作时，我们传入action很麻烦（上例中的`{type:'add',val:5}`）我们将这个action抽离出来

```javascript
//actionType.js
export const ADD='add'
export const DEL='del'
export const ADDS='addS'
export const DELS='delS'

//action.js
import * as type from './actionType'

export function addNumber(val){
    return {
        type:type.ADD,
        val
    }
}
export function delNumber(val){
    return {
        type:type.DEL,
        val
    }
}
export function addString(val){
    return {
        type:type.ADDS,
        val
    }
}
export function delString(val){
    return {
        type:type.DELS,
        val
    }
}

//reducer.js
import {combineReducers} from 'redux'
import * as type from './actionType' 
function Count(state = 0, action){
    switch(action.type){
        case type.ADD:
            return state+action.val
        case type.DEL:
            return state-1
        default:
            return state
    }
}
function Str(state = 'str', action){
    switch(action.type){
        case type.ADDS:
            return state+action.val
        case type.DELS:
            return state-1
        default:
            return state
    }
}
const data = combineReducers({
    Count,
    Str
  })
export default data;
//store.js
import {createStore} from 'redux'
import Count from './reducer'
const store = createStore(Count)
export default store;

//组件中
store.dispatch(addNumber(5))

```

### redux与react的结合

为了简化某些组件，我们引入了展示组件的概念，在这个组件中，只用来做样式布局，而不进行数据的处理，这样我们只需要在父组件给他传入数据就可以了。相对应的容器组件只是为了处理数据和存放展示组件，`redux-react`可以协助你生成这样一个组件。

> * connect：用来创建容器组件
> * Provider：用来让子组件都可以拿到state
> * `mapStateToProps、mapDispatchToProps`
> * `protoTypes`： 对某个组件接受的props进行类型检查
>
> 我们需要自定义一个展示组件，但是你无需管理状态变量，只需要将他从props中取出使用，利用`react-redux`生成容器组建时，通过`mapStateToProps、mapDispatchToProps`定义了接受的state以及改变state的方法。在展示组件中的state他也会自动被检测，在发生变化时重新渲染。
>
> 值得注意的是，因为对于展示组件所有重要的操作全部由props传入，所以我们应该对prosp参数进行检查，防止出错

```jsx
//app.js
import Reactfrom 'react';
import {Home} from './component/home'
import store from './store/stroe'
import { Provider } from 'react-redux'

function App() {

  return (
    <Provider store={store}>
      <div className="App">
        <Home />

      </div>
    </Provider>
  );
}

export default App;

//home.js
import React from 'react';
import { addNumber } from '../store/action'
import {connect} from 'react-redux'
import PropTypes from 'prop-types' 


function HomeMsg(props){
    const { value, onIncreaseClick } = props
    
    return (
      <div>
        <span>{value}</span>
        <button onClick={onIncreaseClick}> 增加</button>
      </div>
    )
}
//对Counter组件接受的props进行类型检查
HomeMsg.propTypes = {
  value: PropTypes.number.isRequired,   //要求数字类型，没有提供会警告
  onIncreaseClick: PropTypes.func.isRequired //要求函数类型
}

//  将state映射到Counter组件的props
function mapStateToProps(state) {
    return {
      value: state.Count
    }
  }
  
//  将action映射到Counter组件的props
function mapDispatchToProps(dispatch) {
    return {
      onIncreaseClick: () => dispatch(addNumber(5))
    }
  }

export const Home = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeMsg)
```



### 异步Action

action就是我们改变状态的动作，它包括了如何改变动作和改变的值。但是这个值我们通常是通过http请求得到的，而`http`请求通常又是异步的，所以这要求我们创建异步action

>`applyMiddleware`：用于在创建store的时候激活插件
>
>`thunk`：`react-thunk`中间件，允许`action creator`返回一个函数，且接受`dispatch`和`getState`为参数
>
>

正常的话，我们发出一个动作就可以去改变一个状态，而http是异步请求，这就包含了三种状态，发送中、请求成功、请求失败。所以我们需要分别对这几种请坐创建对应的action动作。这三个动作是对接reducer函数的，我们需要再建立一个整合的与用户对接。

```jsx
//action.js
import * as type from './actionType'
/*一个异步请求*/
function fetchAmount() {
    return fetch('http://xiawx.top/movie')
}
/*通知 reducer 请求开始的 action*/
function requestPosts() {
    return {
        type: type.REQUEST_POSTS,
        isFetch: true //进度条相关
    }
}

/*通知 reducer 请求成功的 action*/
function receviePostOnSuccess(data) {
    return {
        type: type.RECEIVE_POSTS,
        isFetch: false,
        amount: data
    }
}
/*通知 reducer 请求失败的 action。*/
function receviePostOnError(message) {
    return {
        type: type.RECEIVE_POSTS,
        isFetch: false,
        errorMsg: message
    }
}
/*异步请求action 【将上面3个基础的action整合】*/
export function getAmount() {
    return dispatch => {
        // 首次 dispatch：更新应用的 state 来通知API 请求发起了
        dispatch(requestPosts())
        //异步请求后端接口
        return fetchAmount().then(res=>res.json()).then(
            data => dispatch(receviePostOnSuccess(data)),
            error => dispatch(receviePostOnError('error'))
        )

    }
}


//reducer.js
function getData(state=[],action){
    switch (action.type) {
        case type.RECEIVE_POSTS:
            return state=action.amount.content
        case type.REQUEST_POSTS:
            return state
        default:
            return state
    }
}
export default getData;

//store.js
import {createStore,applyMiddleware} from 'redux'
import getData from './reducer'
import thunk from 'redux-thunk';

const store = createStore(
    getData,
    applyMiddleware(thunk)
)
export default store;


```



