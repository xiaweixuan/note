### redux原始数据流

* 用户发出action
* store自动调用reducer，传入两个参数，当前state和action（reducer会返回新的state）

```javascript
//action
function increment(type){
  return { type: 'INCREMENT',payload}
}
function decrement(type){
  return {type:'DECREMENT',payload}
}
//reducer
export default (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + action.payload
    case 'DECREMENT':
      return state - action.payload
    default:
      return state
  }
}
//store
const store = createStore(counter)
//ui
const Counter = ({ value, onIncrement, onDecrement }) => (
  <div>
  <h1>{value}</h1>
  <button onClick={onIncrement}>+</button>
  <button onClick={onDecrement}>-</button>
  </div>
);
const App =()=>{
  <Counter
    value={store.getState()}
    onIncrement={() => store.dispatch(increment({payload:1}))}
    onDecrement={() => store.dispatch(decrement({payload:1}))}
  />
}

const render = () => ReactDOM.render(App,rootEl)
render()

store.subscribe(render);

```

上面总共有两个组件，一个App作为容器组建，一个Counter作为展示组件。

也就是说，App我们单纯是为了处理业务而创建的，在App中我们定义了增删的函数方法。那我们我们也可以不用手动定义，直接改用react-redux直接生成组件容器组建

```javascript
//ui
const Counter = ({ value, onIncrement, onDecrement }) => (
  <div>
  <h1>{value}</h1>
  <button onClick={onIncrement}>+</button>
  <button onClick={onDecrement}>-</button>
  </div>
);
function mapStateToProps(state) {
    return {
      value: state.getState()
    }
  }
function mapDispatchToProps(dispatch) {
    return {
      onIncrement: () => dispatch(increment({payload:1})),
      onDecrement: () => dispatch(decrement({payload:1}))
    }
  }
export const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(Counter)

const render = () => ReactDOM.render(App,rootEl)
render()

store.subscribe(render);
```

虽然看上去代码多了，但是因为我们现在的逻辑较少，当我们的逻辑复杂时，更能体验出直接生成容器组件的优势



### redux-thunk

上述代码我们想要改变state时使用的`dispatch(increment({payload:1}))`，我们很清楚我们要增加一，但实际生产中，这个要改变的state很可能要从接口中获取，即一步操作，这时候我们可以在先请求接口，然后再回调中调用dispatch方法，但这样会加大代码的复杂性，于是我们将这个操作移入action中

```jsx
//action
function increment(usr){
  //假装我们请求确认身份后，后台返回让我们加多少
  return dispatch => {
    return axios('/add/id=usr').then(res=>res.json()).then(
    	data => dispatch({type:'INCREMENT',payload:data})
    )
  }
} 
function increment(usr){
  //假装我们请求确认身份后，后台返回让我们加多少
  return dispatch => {
    return axios('/add/id=usr').then(res=>res.json()).then(
    	data => dispatch({type:'DECREMENT',payload:data})
    )
  }
} 


//reducer
export default (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + action.payload
    case 'DECREMENT':
      return state - action.payload
    default:
      return state
  }
}
//store
const store = createStore(counter)

//ui（改动）
function mapDispatchToProps(dispatch) {
    return {
      onIncrement: () => dispatch(increment('xwx')),
      onDecrement: () => dispatch(decrement('xwx'))
    }
  }
```



thunk的缺点也是很明显的，thunk仅仅做了执行这个函数，并不在乎函数主体内是什么，也就是说thunk使得redux可以接受函数作为action，但是函数的内部可以多种多样。

从这个具有副作用的action中，我们可以看出，函数内部极为复杂。如果需要为每一个异步操作都如此定义一个action，显然action不易维护。

action不易维护的原因：

- action的形式不统一
- 就是异步操作太为分散，分散在了各个action中



### redux-saga

之前的action他只是创造了一个对象返回，是标准的函数式编程中的纯函数，如果在这其中，加入ajax操作，就会让他产生副作用从而不在是纯函数

而显然这并不利于我们实际管理代码。而redux-saga将action回归到了原始的对象模型。把所有的异步副作用操作放在了saga函数里面。这样既统一了action的形式，又使得异步操作集中可以被集中处理。

redux-saga是通过genetator实现的，如果不支持generator需要通过插件babel-polyfill转义。

现在我们将action变回最初的版本

```javascript
//action
function increment(type){
  return { type: 'INCREMENT',payload}
}
function decrement(type){
  return {type:'DECREMENT',payload}
}
//reducer
export default (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + action.payload
    case 'DECREMENT':
      return state - action.payload
    default:
      return state
  }
}
```

然后我们的ui部分几乎也不变

```javascript
//ui
const Counter = ({ value, onIncrement, onDecrement }) => (
  <div>
  <h1>{value}</h1>
  <button onClick={onIncrement}>+</button>
  <button onClick={onDecrement}>-</button>
  </div>
);
function mapStateToProps(state) {
    return {
      value: state.getState()
    }
  }
function mapDispatchToProps(dispatch) {
    return {
      onIncrement: () => dispatch(increment({usr:'xwx'})),
      onDecrement: () => dispatch(decrement({usr:'xwx'}))
    }
  }
export const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(Counter)

const render = () => ReactDOM.render(App,rootEl)
render()

store.subscribe(render);
```

在`redux-thunk`中，我们发送`dispatch(increment('xwx'))`然后在action中进行请求，但现在我们的action中没有ajax请求，我们要新建一个``sagas.js``文件，他用来写所有的异步操作，在我们发送dispatch的时候进行一个拦截，执行完一部请求后，在进行下面的行动，即reducer去改变state

```javascript
function* fetchUser(action) {
   try {
      const num = yield call(ajaxRequest, action.payload.usr);
      yield put({type: "DECREMENT", payload: num});
   } catch (e) {
      yield put({type: "DECREMENT", message: e.message});
   }
}

/*
  在每个 `DECREMENT` action 被 dispatch 时调用 fetchUser
  允许并发（译注：即同时处理多个相同的 action）
*/
function* mySaga() {
  yield takeEvery("DECREMENT", fetchUser);
}
/*
  也可以使用 takeLatest

  不允许并发，dispatch 一个 `DECREMENT` action 时，
  如果在这之前已经有一个 `DECREMENT` action 在处理中，
  那么处理中的 action 会被取消，只会执行当前的
*/
function* mySaga() {
  yield takeLatest("DECREMENT", fetchUser);
}

export default mySaga;
```

他就像是一个拦截器，突然拦住你的操作进行操作补充后，就继续执行。

最后，我们要让我们写的这个所谓的拦截起运行起来

```javascript
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import reducer from './reducers'
import mySaga from './sagas'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
// mount it on the Store
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)

// then run the saga
sagaMiddleware.run(mySaga)

```



### dva

dva 首先是一个基于 [redux](https://github.com/reduxjs/redux) 和 [redux-saga](https://github.com/redux-saga/redux-saga) 的数据流方案，然后为了简化开发体验，dva 还额外内置了 [react-router](https://github.com/ReactTraining/react-router) 和 [fetch](https://github.com/github/fetch)，所以也可以理解为一个轻量级的应用框架。

他的数据流向：数据的改变发生通常是通过用户交互行为或者浏览器行为（如路由跳转等）触发的，当此类行为会改变数据的时候可以通过 `dispatch` 发起一个 action，如果是同步行为会直接通过 `Reducers` 改变 `State` ，如果是异步行为（副作用）会先触发 `Effects` 然后流向 `Reducers` 最终改变 `State`，所以在 dva 中，数据流向非常清晰简明，并且思路基本跟开源社区保持一致

当我们使用saga的时候，关于数据的目录可能如下

```
+ src
	+ sagas
		- user.js
	+ reducers
		- user.js
	+ actions
		- user.js 
```

而dva将他们全部整合起来，放到一个文件中。

所以dva的整个项目目录如下

```
+ src/
	+ assets
	+ util/
		- request
  + services/
    - users.js
  + models/
    - users.js
  + components/
    + users/
      - users.js
      - users.css
  + routes/
    - users.js
  - router.js
  - index.js
  - index.ejs
```

下面将展示一个dva项目(demo，不符合上面的目录)

```javascript
import dva, { connect } from 'dva';
import { Router, Route } from 'dva/router';
import React from 'react';
import styles from './index.less';
import key from 'keymaster';

const app = dva();

app.model({
  namespace: 'count',
  state: {
    record: 0,
    current: 0,
  },
  reducers: {
    add(state) {
      const newCurrent = state.current + 1;
      return { ...state,
        record: newCurrent > state.record ? newCurrent : state.record,
        current: newCurrent,
      };
    },
    minus(state) {
      return { ...state, current: state.current - 1};
    },
  },
  effects: {
    *add(action, { call, put }) {
      yield call(delay, 1000);
      yield put({ type: 'minus' });
    },
  },
  subscriptions: {
    keyboardWatcher({ dispatch }) {
      key('⌘+up, ctrl+up', () => { dispatch({type:'add'}) });
    },
  },
});

const CountApp = ({count, dispatch}) => {
  return (
    <div className={styles.normal}>
      <div className={styles.record}>Highest Record: {count.record}</div>
      <div className={styles.current}>{count.current}</div>
      <div className={styles.button}>
        <button onClick={() => { dispatch({type: 'count/add'}); }}>+</button>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return { count: state.count };
}
const HomePage = connect(mapStateToProps)(CountApp);

app.router(({history}) =>
  <Router history={history}>
    <Route path="/" component={HomePage} />
  </Router>
);

app.start('#root');


// ---------
// Helpers

function delay(timeout){
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}
```


