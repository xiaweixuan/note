

## 数组

```javascript
arr.flat(depth) // new 将指定深度的元素与最外层元素合并
```





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

#### 位运算符

位逻辑运算符工作流程如下:

- 操作数被转换为32bit整數，以位序列（0和1组成）表示.若超過32bits，則取低位32bit
- 第一个操作数的每一位都与第二个操作数的对应位组对: 第一位对应第一位,第二位对应第二位,以此类推.
- 运算符被应用到每一对"位"上, 最终的运算结果由每一对“位”的运算结果组合起来.

```javascript
15 & 9   // 9    1111 & 1001 = 1001
15 | 9   // 15   1111 | 1001 = 1111
15 ^ 9   // 6    1111 ^ 1001 = 0110
~15      // -16  ~00000...00000001111 = 11111...11111110000
9 << 2   // 36   1001 << 2 = 100100
9 >> 2   // 2    1001 >> 2 = 0010  [用符号位填充]
19 >>> 2 // 4    10011 >>> 2 = 100 [用0填充]

// 使用
y >> x // 相当于除以2的x次方
x >> 0 // Math.floor()
~~2.2  // 取整 2
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

#### ?? 空值合并

当发现null和undefined的时候使用后面的值

```javascript
const foo = null ?? 'default string';
console.log(foo);
// expected output: "default string"

const baz = 0 ?? 42;
console.log(baz);
// expected output: 0
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

#### 语句前的分号;

由于js引擎会自动在语句末添加`;`,导致一些问题的出现

```javascript
var globalCounter = { }

(function () {
    var n = 0
    globalCounter.increment = function () {
        return ++n
    }
})()
```

这样在第一句末尾则不会添加分毫，从而将`{}`作为函数来执行。所以在`'semi': [2, 'never']`规则下，通常这样写

```javascript
var globalCounter = { }

;(function () {
    var n = 0
    globalCounter.increment = function () {
        return ++n
    }
})()
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

