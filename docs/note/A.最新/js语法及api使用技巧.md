## 基础

#### bigint
js的最新类型。通过在数字后面加`n`定义.

在JS中，按照[IEEE 754-2008](https://link.segmentfault.com/?enc=7Il%2FflvyjWTtm6DGl6e%2Fvw%3D%3D.ZRKtgT55iAp6cSZqIiezd6cTHlGk5TZHmWsN4jXy3AYKABqk5SUUB1b7ZLcbKHzSRbD0ViMf4qVePBHqkbb9iA%3D%3D)标准的定义，所有数字都以[双精度64位浮点](https://link.segmentfault.com/?enc=bxZO%2FGVOpZhoKXCO4XyUUw%3D%3D.naKOm3LX%2BfNPNnSsp2GHOxSjIqZ2piqcnWk8ysxxCfAiFCwbstCg6YVT%2Fld0uHrREoqeTTRCsNu35RIaTG08w8fMGZfIs7s5vIVvm0%2BrYJg%3D)格式表示。JS 中的`Number`类型只能安全地表示`-9007199254740991 (-(2^53-1))` 和`9007199254740991(2^53-1)`之间的整数，任何超出此范围的整数值都可能失去精度(四舍五入)。

```javascript
console.log(9999999999999999)
// 10000000000000000
console.log(9999999999999999n)
// 9999999999999999n
typeof 9999999999999999n
// "bigint"
```

#### globalThis
全局对象
```javascript
// 浏览器环境下
globalThis === window // true
```

## 书写技巧


#### Infinity
表示最大的数

```javascript
// 寻找最小的值
const array = [2,4,5,1,3]
let min = Infinity // 作为初始值
for (const item of array) {
  min = Math.min(min, item)
}
```

#### 将Key统一变为number

```javascript
parseInt('  10', 2)
// 2
```

#### 函数域的改变
在很多源码中出现，

```javascript
var foo = {
  fullName:"Peter",
  sayName:  function() { console.log("My name is", this.fullName); }
};

window.fullName ="Shiny";

foo.sayName();       // My name is Peter

(foo.sayName)();     // My name is Peter

(0, foo.sayName)();  // My name is Shiny
```

#### 任务队列
```javascript
// requestIdleCallback 来实现任务队列    
function workLoop(deadline) {
  while ((deadline.timeRemaining() > 1 || deadline.didTimeout) && works.length > 0) {
    performUnitOfWork();
  }
  if (works.length > 0) {
    window.requestIdleCallback(workLoop, { timeout: 1000 });
  }
}
function performUnitOfWork() {
  works.shift()();
}
requestIdleCallback(workLoop, { timeout: 1000 });

// MessageChannel 实现
const threshold = 5
let deadline = 0
const getTime = () => performance.now()

const flush = () => {
  let task, next
  deadline = getTime() + threshold
  while (getTime() < deadline) {
    if (works.length) works.pop()()
  }
  if (works.length) setTimeout(flush)
}

flush()
```


