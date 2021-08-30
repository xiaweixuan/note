es每年发布一版，如2017年发布的就叫es2017也叫es8。

除此之外，以es2015为分割线，前面的内容统称为es5，而包括es2015以后的版本被称为es6。

## es2015

#### 1、箭头函数

在没有箭头函数情况下，this的指向有以下几种情况

* 在全局执行环境中（在任何函数体外部），this都是指向全局对象
* 在函数环境中，严格模式下无指向，一般模式下，在一层函数中指向window
* 在对象的方法中，指向对象
* 在构造函数中，指向实例化对象
* 在函数中，当函数被用作事件处理函数时，它的`this`指向触发事件的元素

对于this的理解，我认为this是指向对象的一个属性，他将函数视为透明，当初现在函数中，他会不断地向上级寻找，直至找到一个对象，并指向它。

在箭头函数中，箭头函数的`this`被设置为封闭的词法环境的，换句话说，箭头函数中的this取决于该函数被创建时的环境（即箭头函数与包围他的代码共享一个this）。

#### 2、函数参数

为函数参数添加默认的值

```javascript
const test = (a='a',b='b',c='c')=>{
    return a+b+c
}
 
console.log(test('A','B','C')) //ABC
console.log(test('A','B'))     //ABc
console.log(test('A'))         //Abc
```

多参数

```javascript
function fuc(...arg){
    console.log(arg)
}
fuc(1,2,3) //[1,2,3]

```

函数尾调用，在函数最后调用其他函数或者自己

> ```javascript
> let fun1=(x,y)=>x+y
> let fun2=()=>{
>     return fn1(1,2)
> }
> console.log(fun2)
> ```
>
> 以上是一个尾调用，在执行fun2的时候，也执行了fun1，当fun1执行完成后，由于再无牵连，会将fun1的内存给fun2继续使用，这样减少了内存占用。
>
> 以下情况不是尾调用：
>
> ```javascript
> let fun3=()=>{
>     let n=fun1(2,3)
>     return n;
> }
> ```
>
> 由于不是在最后一步调用所以不是尾调用
>
> ```javascript
> let fun4=()=>{
> 	return fun1(2,3)+1
> }
> ```
>
> `return fun1(2,3)+1`他其实是先执行的`fun1(2,3)+1`再执行return，所以此处也不是在最后一步调用，所以也不是尾调用

递归的尾调用优化

> 以下是一个递归函数
>
> ```javascript
> let factorial=(n)=>{
>     if(n<=1){
>         return 1;
>     }else{
>         return n*factorial(n-1)
>     }
> }
> console.log(factorial(4)) //4*3*2*1
> ```
>
> 由于函数参与了运算，所以不是尾调用，每次调用开辟内存，耗费资源，我们将其改为尾递归
>
> ```javascript
> let factorial=(n,p=1)=>{
>     if(n<=1){
>         return p*1;
>     }else{
>         let result=p*n
>         return factorial(n-1,result)
>     }
> }
> console.log(factorial(4)) //4*3*2*1
> ```



#### 3、模板字符串

```typescript
//常见写法
var name = `Your name is ${first} ${last}.`
//函数参数写法
function fuc(a,b,c,d){
    //b,c,d分别为第一、二、三个变量
    //a为被变量分割的字符串['name=','age=','logo=']
    return b+c+d
}
let name="xwx"
let age=21
let logo="1.png"
let result=fuc`name=${name}age=${age}logo=${logo}`

```

#### 4、解构赋值

###### 数组中

```javascript
var foo = ["one", "two", "three", "four"];
 
var [one, two, three] = foo;
console.log(one); // "one"
console.log(two); // "two"
console.log(three); // "three"
 
//如果你要忽略某些值，你可以按照下面的写法获取你想要的值
var [first, , , last] = foo;
console.log(first); // "one"
console.log(last); // "four"
 
//你也可以这样写
var a, b; //先声明变量
 
[a, b] = [1, 2];
console.log(a); // 1
console.log(b); // 2

```

###### 对象中

```javascript
const student = {
  name:'Ming',
  age:'18',
  city:'Shanghai'  
};
 
const {name,age,city} = student;
console.log(name); // "Ming"
console.log(age); // "18"
console.log(city); // "Shanghai"
```

#### 5、延展操作

###### 展开数组

```javascript

var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
var arr3 = [...arr1, ...arr2];// 将 arr2 中所有元素附加到 arr1 后面并返回
//等同于
var arr4 = arr1.concat(arr2);
```

###### 展开对象

```javascript

var obj1 = { foo: 'bar', x: 42 };
var obj2 = { foo: 'baz', y: 13 };
 
var clonedObj = { ...obj1 };
// 克隆后的对象: { foo: "bar", x: 42 }
 
var mergedObj = { ...obj1, ...obj2 };
// 合并后的对象: { foo: "baz", x: 42, y: 13 }
```

###### react中应用

```javascript
const params = {
	name: 'Jine',
	age: 21
}
<CustomComponent {...params} />
 
 
var params = {
	name: '123',
	title: '456',
	type: 'aaa'
}
 
var { type, ...other } = params;
 
<CustomComponent type='normal' number={2} {...other} />
//等同于
<CustomComponent type='normal' number={2} name='123' title='456' />
 
```

#### 6、promise

用于处理异步操作

```javascript
var test = (a,b)=>{
    return new Promise((reslove,reject)=>{
        //异步操作例如setTimeout
        //...
        
        reslove(resoult)//返回正确结果
        
        //...
        reject(err)    //出错时的结果
    })
}
 
 
//使用
 
test(a,b).then(res=>{
    //此处是reslove，即成功后执行的函数
}).catch(err=>{
    //此处是reject，即失败后执行的函数
})
 
//或者
 
try{
    var resoult = await test(a,b)
    //...
}catch(er){
    //...
}
```

#### 7、类

使用class声明的类，方法等价于写在原型上的。

```javascript
  class Animal {
    // 构造函数，实例化的时候将会被调用，如果不指定，那么会有一个不带参数的默认构造函数.
    constructor(name,color) {
      this.name = name;
      this.color = color;
    }
    // toString 是原型对象上的属性
    toString() {
      console.log('name:' + this.name + ',color:' + this.color);
 
    }
  }
 
 var animal = new Animal('dog','white');//实例化Animal
 animal.toString();
 
 console.log(animal.hasOwnProperty('name')); //true
 console.log(animal.hasOwnProperty('toString')); // false
 console.log(animal.__proto__.hasOwnProperty('toString')); // true
 
 class Cat extends Animal {
  constructor(action) {
    // 子类必须要在constructor中指定super 函数，否则在新建实例的时候会报错.
    // 如果没有置顶consructor,默认带super函数的constructor将会被添加、
    super('cat','white');
    this.action = action;
  }
  toString() {
    console.log(super.toString());
  }
 }
 
 var cat = new Cat('catch')
 cat.toString();
 
 // 实例cat 是 Cat 和 Animal 的实例，和Es5完全一致。
 console.log(cat instanceof Cat); // true
 console.log(cat instanceof Animal); // true
```

#### 8、模块化

es6虽然自己定义了模块的概念及方法，但通常在使用中，会使用到其他的规范，如nodejs使用的是commonjs规范去定义模块。

#### 9、Iterator

一个统一的接口来遍历所有的数据类型

```javascript
Array.prototype[Symbol.iterator]().next()
//返回下一个值
```

#### 10、循环方式

```javascript
let list=[3,4,5,6]
for(let i in list){
    console.log(list[i])
}

for(let n of list){
    console.log(n)
}

list.forEach((n,i)=>{
    console.log(n)
})
```

#### 11、filter

过滤器

```javascript
let num1=[1,2,3,4]
let num2=num1.filter(x=>x!=1)//过滤掉1
console.log(num2) //[2,3,4]
```

#### 12、Set

主要作用常用操作数组来去重、添加删除成员变量、交并差集

```javascript
//去重
let arr1=[1,2,3,2]
let arr2=new Set(arr1)//[1,2,3]

//添加删除成员
let arr3=[1,2,3,2]
let arr4=new Set(arr3)
arr4.add(0)
arr4.delete(1)

//并集
let arr5=[1,2,3,4]
let arr6=[3,4,5,6]
let set1=new Set([...arr5,...arr6])

//交集
let arr7=[1,2,3,4]
let arr8=[3,4,5,6]
let set2=new Set([...arr7].filter(x=>arr8.has(x)))

//差集
let arr9=[1,2,3,4]
let arr10=[3,4,5,6]
let set3=new Set([...arr9].filter(x=>!arr10.has(x)))

```

#### 13、Map

通过键值对来存储的数据结构，他与对象的区别是他的key值可以是任意数据类型

```javascript
let num=123
let arr=[1,2,3]
let fun=function(){}
let obj={}

const map1=new Map();
map1.set(num,"abc")//赋值
map1.set(arr,"abc")//赋值
map1.set(fun,"abc")//赋值
map1.set(obj,"abc")//赋值

map1.keys()//key值得数组
map1.values()//value值得数组
map1.entries()//以Array的格式输出所有项

//直接创建对象
const map2=new Map(
	[
        ["s1","as1"],
        ["s2","as2"],
        ["s3","as3"],
        ["s4","as4"]
    ]
)
map2.detele("s3")
map2.has("s3")//false

```







## ES2016

#### 1、includes()、startsWith()、endsWidth()

用来判断一个**数组**或**字符串**是否包含某一个值

用来判断**字符串**的前n位中是否以一个值开头

用来判断**字符串**的前n位中是否以一个值结尾

```javascript
let arr = ['react', 'angular', 'vue'];
let str = "abc"
console.log(arr.includes('react'))
console.log(str.includes('a'))
console.log(str.startsWith('a',2))
console.log(str.endsWith('c',3))

```

#### 2、**指数运算符

它的作用与`Math.pow(..)`等效的计算结果

```javascript
console.log(2**10);// 输出1024
```

## es2017

#### 1、async/await

await使得后面的异步方法执行完后再向下执行

```javascript
async function process(array) {
  for await (let i of array) {
    doSomething(i);
  }
}
```

#### 2、Object.values(obj)

返回一个给定对象自身的所有可枚举属性值的数组。

用于将对象转化为数组。

```javascript
const obj = {a: 1, b: 2, c: 3};
 
const values=Object.values(obj);
console.log(values);//[1, 2, 3]
```

#### 3、Object.entries()

`Object.entries()`函数返回一个给定对象自身可枚举属性的键值对的数组。

常用于遍历对象

```javascript
const obj = {a: 1, b: 2, c: 3};
console.log(Object.entries(obj))
//(3) [["a", 1], ["b", 2], ["c", 3]]

for(let [key,value] of Object.entries(obj1)){
	console.log(`key: ${key} value:${value}`)
}
//key:a value:1
//key:b value:2
//key:c value:3
```

#### 4、String padding

String.prototype.padStart(targetLength,[padString])

String.prototype.padEnd(targetLength,padString])

* targetLength:当前字符串需要填充到的目标长度。如果这个数值小于当前字符串的长度，则返回当前字符串本身。
* padString:(可选)填充字符串。如果字符串太长，使填充后的字符串长度超过了目标长度，则只保留最左侧的部分，其他部分会被截断，此参数的缺省值为 " "。

```javascript
console.log('0.0'.padStart(4,'*'))//*0.0
console.log('0.0'.padStart(20))//                 0.0
console.log('0.0'.padEnd(4,'*'))//0.0*
console.log('0.0'.padEnd(10,'*'))//0.0*******
```

#### 5、Object.getOwnPropertyDescriptors()

返回对象所有属性的属性（如可遍历、可操作性）

```javascript
const obj2 = {
	name: 'Jine',
	get age() { return '18' }
};
console.log(Object.getOwnPropertyDescriptors(obj2))
// {
//   age: {
//     configurable: true,
//     enumerable: true,
//     get: function age(){}, //the getter function
//     set: undefined
//   },
//   name: {
//     configurable: true,
//     enumerable: true,
//		value:"Jine",
//		writable:true
//   }
// }
```

#### 6、ArrayBuffer、SharedArrayBuffer

关于内存的知识，可以通过这篇文章来进行一个了解：

https://hacks.mozilla.org/2017/06/a-crash-course-in-memory-management/

## es2018

#### 1、Promise.finally

一个Promise调用链要么成功到达最后一个`.then()`，要么失败触发`.catch()`。在某些情况下，你想要在无论Promise运行成功还是失败，运行相同的代码，例如清除，删除对话，关闭数据库连接等。

```javascript
function doSomething() {
  doSomething1()
  .then(doSomething2)
  .then(doSomething3)
  .catch(err => {
    console.log(err);
  })
  .finally(() => {
    // finish here!
  });
}
```



#### 2、正则表达式命名捕获组

通过添加组在一个正则式子中选择多个字符串。

```javascript
const
  reDate = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/,
  match  = reDate.exec('2018-04-30'),
  year   = match.groups.year,  // 2018
  month  = match.groups.month, // 04
  day    = match.groups.day;   // 30
 
const
  reDate = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/,
  d      = '2018-04-30',
  usDate = d.replace(reDate, '$<month>-$<day>-$<year>');
```















