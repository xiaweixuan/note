#### 高阶函数

高阶函数，接受函数作为输入或者输出一个函数

```
emmitter.on('data',function(){})
```

#### 偏函数

为了调用函数A，但为了应对不同情景，需要对函数A根据不同场景做出细微改变，于是创建创建函数B去返回根据不同场景更改后的函数A（函数A的参数或者变量是预置的），函数B即为偏函数。

简单来说就是，把一个函数的某些参数给固定住（也就是设置默认值），返回一个新的函数，调用这个新函数会更简单。

```javascript
//例如我们要封装sum函数，现在要锁定a=1
function sum(a, b) {
    return a + b;
}
sum_add_1(2); // 3
sum_add_1(3); // 4
//最简单的实现，sum_add_1为偏函数
const sum_add_1 = sum.bind(null, 1);

//当然，我们也可以做一个函数来产生偏函数
/*
我们预期做一个函数partial
使得const sum_add_1 = partial(sum, 1);
*/
const partial = (func, ...args) => {
    return (...rest) => {
        return func.apply(this, [...args, ...rest])
    }
}

```

#### 柯里化

可以自由选择操作，如加减乘除

```javascript
var curry = function(fn) {
    var _args = [];
    return function() {
        if(arguments.length === 0) {
            return fn.apply(fn, _args);
        }
        [].push.apply(_args, arguments);
        return arguments.callee;
    }
}
var multi = function() {
    return [].reduce.call(arguments, function(a, b) {
        return a + b;
    })
}
var add = curry(multi);
add(100, 200, 300)(400);
add(1000);
add(); // 2000

```

无需最后通过空参数调用来求职

```javascript
var curry = function(fn) {
	var len = fn.length,
		args = [];
	return function() {
		Array.prototype.push.apply(args, arguments)
		var argsLen = args.length;
		if(argsLen < len) {
			return arguments.callee;
		}
		return fn.apply(fn, args);
	}
}
var add = function(a, b, c) {
	return a + b + c;
}

var adder = curry(add)
adder(1)(2)(3)
```

以上的方式太过于依赖参数数量

```javascript
var curry = function(fn) {
	var func = function() {
		var _args = [].slice.call(arguments, 0);
		var func1 = function() {
			[].push.apply(_args, arguments)
			return func1;
		}
		func1.toString = func1.valueOf = function() {
			return fn.apply(fn, _args);
		}
		return func1;
	}
	return func;
}
var add = function() {
	return [].reduce.call(arguments, function(a, b) {
		return a + b;
	})
}

var adder = curry(add)
adder(1)(2)(3)
```

#### 柯里化进行预加载

有时候，我们多次调用一个函数，而每次调用的而一部分参数相同，我们可以用柯里化进行预加载。

例如

```javascript
//简单封装一下match
var match = curry(function(what, str) {
  return str.match(what);
});
match(/\s+/g, "hello world");
match(/\s+/g)("hello world");
match(/\s+/g)("spaceless");
//参数都一样，我们进行改造
var hasSpaces = match(/\s+/g);
hasSpaces("hello world");
hasSpaces("spaceless");
```



#### 动态创建函数

if在创建出`addEvent`实例之前进行if判断保证只判断一回，不会每次使用都进行if判断，判断后将`addEvent`重新赋值而不是直接返回一个函数，解决了内存。

````javascript
var addEvent = function(el, sType, fn, capture){
    if (window.addEventListener) {
        addEvent =  function(el, sType, fn, capture) {
            el.addEventListener(sType, function(e) {
                fn.call(el, e);
            }, (capture));
        };
    } else if (window.attachEvent) {
        addEvent = function(el, sType, fn, capture) {
            el.attachEvent("on" + sType, function(e) {
                fn.call(el, e);
            });
        };
    }
}
var addEvent = addEventHandler();
addEvent(document.body, "click", function() {}, false);
addEvent(document.getElementById("test"), "click", function() {}, false);
````

#### 反柯里化

反柯里化恰恰和柯里化相反，是为了扩大适用范围，创建一个应用范围更广的函数。使本来只有特定对象才适用的方法，扩展到更多的对象。

通过反柯里化，让对象也可以使用数组的方法。

```javascript
const unCurry= function(fn) {
    return function(target, ...rest) {
        return fn.apply(target, rest);        
    }    
};
const obj = {};
const push = unCurry(Array.prototype.push);
push(obj, 1, 2, 3);
console.log(obj); // { 0: 1, 1: 2, 2: 3}
```

我们在开发中，经常会借用 `Object.prototype.toString` 来检测一个变量的类型，这也是反柯里化的用法之一。

```javascript
const num = 1, 
    str = '2', 
    obj = {}, 
    arr = [],
    nul = null;
const toString = unCurry(Object.prototype.toString.call);
toString.call(nul); // "[object Null]"
toString.call(num); // "[object Number]"
toString.call(str); // "[object String]"
toString.call(arr); // "[object Array]"
```

#### 防抖

在最后一次触发事件后n秒后执行。

最简单的防抖

```javascript
function debounce(func, wait) {
    var timeout;
    return function () {
        clearTimeout(timeout)
        timeout = setTimeout(func, wait);
    }
}
```

存在的问题

* 在传入的`func`中，如果使用了this，他会指向window
* 无法传入事件对象event

以下是优化的

```javascript
function debounce(func, wait) {
    var timeout;

    return function () {
        var context = this;
        var args = arguments;

        clearTimeout(timeout)
        timeout = setTimeout(function(){
            func.apply(context, args)
        }, wait);
    }
}
```

当我们改变需求后，需要立刻执行函数，然后等到停止触发 n 秒后，才可以重新触发执行。我们添加一个参数来判断是否立刻执行

```javascript
function debounce(func, wait, immediate) {

    var timeout;

    return function () {
        var context = this;
        var args = arguments;

        if (timeout) clearTimeout(timeout);
        if (immediate) {
            // 如果已经执行过，不再执行
            var callNow = !timeout;
            timeout = setTimeout(function(){
                timeout = null;
            }, wait)
            if (callNow) func.apply(context, args)
        }
        else {
            timeout = setTimeout(function(){
                func.apply(context, args)
            }, wait);
        }
    }
}
```

 #### 节流

如果你持续触发事件，每隔一段时间，只执行一次事件。

时间戳实现

```javascript
function throttle(func, wait) {
    var context, args;
    var previous = 0;

    return function() {
        var now = +new Date();
        context = this;
        args = arguments;
        if (now - previous > wait) {
            func.apply(context, args);
            previous = now;
        }
    }
}
```

计时器实现

```javascript
// 第二版
function throttle(func, wait) {
    var timeout;
    var previous = 0;

    return function() {
        context = this;
        args = arguments;
        if (!timeout) {
            timeout = setTimeout(function(){
                timeout = null;
                func.apply(context, args)
            }, wait)
        }

    }
}
```

#### 数组去重

使用`indexOf`

```javascript
var array = [1, 2, 1, 1, '1'];

function unique(array) {
    var res = array.filter(function(item, index, array){
        return array.indexOf(item) === index;
    })
    return res;
}

console.log(unique(array));
```

先排序，后去重。如果给出的是一个排列好的数组，那次方法效率更高。当然两种方法可以结合，通过参数一个参数制定数组是不是有序来选择return的内容

```javascript
var array = [1, 2, 1, 1, '1'];

function unique(array) {
    return array.concat().sort().filter(function(item, index, array){
        return !index || item !== array[index - 1]
    })
}

console.log(unique(array));
```

ES6中骚操作

```javascript
//使用set
var unique = (a) => [...new Set(a)]
//使用map
function unique (arr) {
    const seen = new Map()
    return arr.filter((a) => !seen.has(a) && seen.set(a, 1))
}
```

#### 类型判断

由于Error、array等都属于对象，所以为了区分它们，就不能使用`typeOf`了，我们引出`Object.prototype.toString`

> 当 `toString` 方法被调用的时候，下面的步骤会被执行：
>
> 1. 如果 this 值是 undefined，就返回 [object Undefined]
> 2. 如果 this 的值是 null，就返回 [object Null]
> 3. 让 O 成为` ToObject(this) `的结果
> 4. 让 class 成为 O 的内部属性 [[Class]] 的值
> 5. 最后返回由 "[object " 和 class 和 "]" 三个部分组成的字符串

所以

```javascript
var date = new Date();
console.log(Object.prototype.toString.call(date)) // [object Date]
```

利用这个特性我们进行以下函数的封装

```javascript
var class2type = {};

// 生成class2type映射
"Boolean Number String Function Array Date RegExp Object Error Null Undefined".split(" ").map(function(item, index) {
    class2type["[object " + item + "]"] = item.toLowerCase();
})

function type(obj) {
    return typeof obj === "object" || typeof obj === "function" ?
        class2type[Object.prototype.toString.call(obj)] || "object" :
        typeof obj;
}
```

#### 深拷贝、浅拷贝

当我们想复制一个数组，通过`concat`等一些方法就可以产生一个新的对象，但是这仅限于数组的元素全部为基本元素，如果元素是对象，那么改变就数组，新数组也会变，这就是浅拷贝，也就几十克隆不彻底。（所以`concat` 和 `slice` 是一种浅拷贝）

有很多技巧类方法例如`concat` 和 `slice` 可以实现浅拷贝`JSON.stringify `可以实现深拷贝，以下是原理实现方面

浅拷贝实现

```javascript
var shallowCopy = function(obj) {
    // 只拷贝对象
    if (typeof obj !== 'object') return;
    // 根据obj的类型判断是新建一个数组还是对象
    var newObj = obj instanceof Array ? [] : {};
    // 遍历obj，并且判断是obj的属性才拷贝
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = obj[key];
        }
    }
    return newObj;
}
```

深拷贝的实现

```javascript
var deepCopy = function(obj) {
    if (typeof obj !== 'object') return;
    var newObj = obj instanceof Array ? [] : {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
        }
    }
    return newObj;
}
```

#### 数组的最大值

很多方法如最基础的循环、reduce、排序、eval等

```javascript
//循环
var arr = [6, 4, 1, 8, 2, 11, 23];
var result = arr[0];
for (var i = 1; i < arr.length; i++) {
    result =  Math.max(result, arr[i]);
}
console.log(result);

//reduce
var arr = [6, 4, 1, 8, 2, 11, 23];
function max(prev, next) {
    return Math.max(prev, next);
}
console.log(arr.reduce(max));

//排序
var arr = [6, 4, 1, 8, 2, 11, 23];
arr.sort(function(a,b){return a - b;});
console.log(arr[arr.length - 1])

//eval
var arr = [6, 4, 1, 8, 2, 11, 23];
var max = eval("Math.max(" + arr + ")");
console.log(max)

//apply
var arr = [6, 4, 1, 8, 2, 11, 23];
console.log(Math.max.apply(null, arr))

//es6
var arr = [6, 4, 1, 8, 2, 11, 23];
console.log(Math.max(...arr))
```

#### 惰性函数

我们现在需要写一个` foo `函数，这个函数返回首次调用时的 Date 对象，注意是首次。

首先想到的方法是定义一个变量，第一次调用函数的时候赋值，之后每次调用直接请求

```javascript
var foo = (function() {
    var t;
    return function() {
        if (t) return t;
        t = new Date();
        return t;
    }
})()
```

而惰性函数就是解决每次都要进行判断这个问题

```javascript
var foo = function() {
    var t = new Date();
    foo = function() {
        return t;
    };
    return foo();
};
```

应用场景，DOM 事件添加中，为了兼容现代浏览器和 IE 浏览器，我们需要对浏览器环境进行一次判断：

```javascript
function addEvent (type, el, fn) {
    if (window.addEventListener) {
        el.addEventListener(type, fn, false);
    }
    else if(window.attachEvent){
        el.attachEvent('on' + type, fn);
    }
}
//写成惰性函数的形式
function addEvent (type, el, fn) {
    if (window.addEventListener) {
        addEvent = function (type, el, fn) {
            el.addEventListener(type, fn, false);
        }
    }
    else if(window.attachEvent){
        addEvent = function (type, el, fn) {
            el.attachEvent('on' + type, fn);
        }
    }
}
```

#### 函数组合

当我们要完成一套业务时，需要完成多个功能，利用函数去做大概是这样`fn3(fn2(fn1(fn0(x))))`。然而这样嵌套多层，我们的理想化是这样`var greet=compose(fn0,fn1,fn2,fn3);greet(x)`

```javascript
function compose() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
        var i = start;
        var result = args[start].apply(this, arguments);
        while (i--) result = args[i].call(this, result);
        return result;
    };
};
```

当我们使用业务的时候

```javascript
// 需求：输入 'kevin'，返回 'HELLO, KEVIN'。
// 非 pointfree，因为提到了数据：name
var greet = function(name) {
    return ('hello ' + name).toUpperCase();
}

// pointfree
// 先定义基本运算，这些可以封装起来复用
var toUpperCase = function(x) { return x.toUpperCase(); };
var hello = function(x) { return 'HELLO, ' + x; };

var greet = compose(hello, toUpperCase);
greet('kevin');
```

这种写法属于`pointfree`思想。指的是函数无须提及将要操作的数据是什么样的。

#### 记忆函数

函数记忆是指将上次的计算结果缓存起来，当下次调用时，如果遇到相同的参数，就直接返回缓存中的数据。函数记忆只是一种编程技巧，本质上是牺牲算法的空间复杂度以换取更优的时间复杂度

使用起来如下

```javascript
function add(a, b) {
    return a + b;
}

// 假设 memoize 可以实现函数记忆
var memoizedAdd = memoize(add);

memoizedAdd(1, 2) // 3
memoizedAdd(1, 2) // 相同的参数，第二次调用时，从缓存中取出数据，而非重新计算一次
```

下面是他的实现

```javascript
function memoize(f) {
    var cache = {};
    return function(){
        var key = arguments.length + Array.prototype.join.call(arguments, ",");
        if (key in cache) {
            return cache[key]
        }
        else {
            return cache[key] = f.apply(this, arguments)
        }
    }
}
```

#### 乱序

将一个数组打乱顺序，通常的实现

```javascript
var values = [1, 2, 3, 4, 5];

values.sort(function(){
    return Math.random() - 0.5;
});

console.log(values)
```

但是此处并不是真正的乱序，我们乱序十万次得到统计，1为最后一次的次数大约为5的五倍，那原因是什么呢？

这和sort有关，由于这是es的规范，每个浏览器的实现不同，这里以`v8`为准。`v8`处理sort方法时，当数组长度小于10时，使用插入排序，反之使用快速排序和插入排序的混合排序。

当我们处理`[1,2,3]`时，使用插入排序。

插入排序原理，从第二位（i位）开始，依次按顺序插入到[1,i-1]的数组中，直到最后一位。

所以，在插入排序的算法中，当待排序元素跟有序元素进行比较时，一旦确定了位置，就不会再跟位置前面的有序元素进行比较，所以就乱序的不彻底。

所以真正做到乱序，用到了`Fisher–Yates`算法，他的实现如下

```javascript
function shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
    return a;
}
```

插入排序的实现，时间复杂度最好O(n)，最坏o(n*2)

```javascript
function insertionSort(arr) {
    for (var i = 1; i < arr.length; i++) {
        var element = arr[i];
        for (var j = i - 1; j >= 0; j--) {
            var tmp = arr[j];
            var order = tmp - element;
            if (order > 0) {
                arr[j + 1] = tmp;
            } else {
                break;
            }
        }
        arr[j + 1] = element;
    }
    return arr;
}

var arr = [6, 5, 4, 3, 2, 1];
console.log(insertionSort(arr));
```

快速排序，他的原理步骤

1. 选择一个元素作为"基准"
2. 小于"基准"的元素，都移到"基准"的左边；大于"基准"的元素，都移到"基准"的右边。
3. 对"基准"左边和右边的两个子集，不断重复第一步和第二步，直到所有子集只剩下一个元素为止。

实现如下

```javascript
var quickSort = function(arr) {
　　if (arr.length <= 1) { return arr; }
    // 取数组的中间元素作为基准
　　var pivotIndex = Math.floor(arr.length / 2);
　　var pivot = arr.splice(pivotIndex, 1)[0];

　　var left = [];
　　var right = [];

　　for (var i = 0; i < arr.length; i++){
　　　　if (arr[i] < pivot) {
　　　　　　left.push(arr[i]);
　　　　} else {
　　　　　　right.push(arr[i]);
　　　　}
　　}
　　return quickSort(left).concat([pivot], quickSort(right));
};
```































