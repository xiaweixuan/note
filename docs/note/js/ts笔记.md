## 推导基础

#### infer

infer在extends中使用，表示待推断的类型变量

```typescript
// 例如当我不知道传入变量的某一部分，可以用infer去创建这么一个临时介质，下面是一个生成传入函数返回类型的一个体操
type ReturnType<T extends (v: any) => any> = T extends (v: any) => infer R ? R : any;
```

因为extends的前后应相互对应，所以，可以通过infer来取出前者类型的某一部分

```typescript
type Last<T extends any[]> = T extends [...infer First, infer Res] ? Res : never
type a = last<['a', 'b', 'c']> // 'c'
// 这样我们就取出了传入类型的某一部分
```

上面的体操中，因为我们限制了入参一定为数组，那么后面的三元表达式中，我们再次判断T是否属于数组，那么他应该永远为真，故永远返回三元的第一个结果，所以此三元式相当于取出（输出）了infer所定义的变量，及入参的某一部分

如果我们不止想取出入参的某一部分，而是使用它，其实可以直接在三元的第一个返回中去处理，因为他是必定返回的结果

```typescript
type Last<T extends any[]> = T extends [...infer First, infer Res] ? [Res, 2,3] : never
type a = last<['a', 'b', 'c']> // ['c', 2, 3]
```

#### keyof

in



never



unknown



...

```typescript
// ts也拥有数组结构的方法
type A = [1,2,3] // 注意A是类型，不是数组变量
type B = [...A] // type [1,2,3]

```



写类型的方式  Interface, Type 或 Class 



模版字符串

```typescript
type Concat<S1 extends string, S2 extends string> = `${S1}${S2}`;
type T2 = Concat<'Hello', 'World'>;  // 'HelloWorld'
```



递归

```typescript
// FlatUnion<[1, 2, 3]> -> 1 | 2 | 3
// FlatUnion<1> -> 1
type FlatUnion<T> = T extends unknown[]
  ? T extends [infer head, ...infer tail]
    ? head | FlatUnion<tail>
    : never
  : T;
```



#### 基础知识

###### 类型

基本类型：number、string、boolean、symbol、null、undefined

还有Object，

除了上了的类型，ts还添加了下面一些类型：数组、元组、枚举、Ang、void、Never

类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。 它没有运行时的影响，只是在编译阶段起作用。 TypeScript会假设你，程序员，已经进行了必须的检查。

```typescript
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;//使用<>

let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;//使用as
```

一些特点

* 默认情况下`null`和`undefined`是所有类型的子类型。是说你可以把 `null`和`undefined`赋值给`number`类型的变量。
* `never`类型是任何类型的子类型，也可以赋值给任何类型；然而，*没有*类型是`never`的子类型或可以赋值给`never`类型（除了`never`本身之外）。

###### 接口 interface

定义一种数据结构，它可以去声明一个变量，也可以作为类型检验。接口可以是类接口，函数接口，索引接口。

> interface ：描述一个对象的取值规范

```typescript
interface User {
  name: string;
  age?: number;
}
const user1: User = {
  name: "lili",
  age: 18
};

interface SearchFunc {
  (source: string, subString: string): boolean;
}
let myFunc: SearchFunc = function(source: string, subString: string){
    ...
    return true;
}
```

###### 类

他与js的区别在于在声明变量的时候需要指明数据类型

```typescript
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

let greeter = new Greeter("world");
```

还可以通过继承来拓展类。通过extends关键字来进行继承。 派生类包含了一个构造函数，它 *必须*调用 `super()`，它会执行基类的构造函数。 而且，在构造函数里访问 `this`的属性之前，我们 *一定*要调用 `super()`。  

```typescript
class Animal {
    name: string;
    constructor(theName: string) { this.name = theName; }
    move(distanceInMeters: number = 0) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}

class Snake extends Animal {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 5) {
        console.log("Slithering...");
        super.move(distanceInMeters);
    }
}

class Horse extends Animal {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 45) {//重写基类方法
        console.log("Galloping...");
        super.move(distanceInMeters);//调用基类方法
    }
}

let sam = new Snake("Sammy the Python");
let tom: Animal = new Horse("Tommy the Palomino");

sam.move();
tom.move(34);
```

###### 函数

在ts中，函数也可以定义类型

```javascript
function add(x: number, y: number): number {
    return x + y;
}

let myAdd = function(x: number, y: number): number { return x + y; };
```

有时，你想同时操作多个参数，或者你并不知道会有多少参数传递进来。 在JavaScript里，你可以使用 `arguments`来访问所有传入的参数。 

```javascript
function buildName(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}

let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");
```

###### 泛型

使用`泛型`来创建可重用的组件，一个组件可以支持多种类型的数据。 这样用户就可以以自己的数据类型来使用组件。 

```javascript
//使用泛型声明的函数
function identity<T>(arg: T): T {//T可以为number等任何数据类型
    return arg;
}

//使用泛型函数
let output = identity<string>("myString");
let output = identity("myString");//编辑器会自动查询myString的类型，然后做声明的
```

泛型与接口连用方法基本相同

```javascript
interface Human {
    name: string
    age: number
}
interface Animal {
    category: string
}

function create<T>(what: T): T {
    return what
}

create<Human>({
    name: 'Jack',
    age: 18
})

create<Animal>({
    category: 'dog'
})

//注意下面
interface JJ {
    jjSize: string
    jjLength: number
}
interface Human {
    name: string
    age: number
}

function create<T extends JJ>(what: T): T {
    return what
}

create({
    name: 'Jack',
    age: 18,
    jjSize: 'large',
    jjLength: 18
})

create({
    name: 'Jack',
    age: 18
}) // 报错：没有 jjSize 和 jjLength
```

泛型与类的合用

```javascript
function create<T>(c: { new (): T }): T {
    return new c()
}
//两个括号里写的是 new () 说明传入的 C 是可以用 new C() 的。然后为new ()添加类型，为函数输出添加类型
```

###### 注解（装饰器）

*装饰器*是一种特殊类型的声明，它能够被附加到[类声明](https://www.tslang.cn/docs/handbook/decorators.html#class-decorators)，[方法](https://www.tslang.cn/docs/handbook/decorators.html#method-decorators)， [访问符](https://www.tslang.cn/docs/handbook/decorators.html#accessor-decorators)，[属性](https://www.tslang.cn/docs/handbook/decorators.html#property-decorators)或[参数](https://www.tslang.cn/docs/handbook/decorators.html#parameter-decorators)上。 装饰器使用 `@expression`这种形式，`expression`求值后必须为一个函数，它会在运行时被调用，被装饰的声明信息做为参数传入。 对于不同类型的修饰器具有不同的参数。

```javascript
// 定义
function zsq(params?:string) {
    return (target:any) => {
        console.log(target)
    }
}
function logAttr(params?:string){
    return (target:any, attrName:any)=>{
        console.log(target,attrName)
    }
}
function logMethod(params?:string) {
    return function(target:any, methodName:any, desc:any) {
        console.log(target,methodName,desc)
    }
}
function logParam(params?:any) {
    return function(target:any, methodName:any, paramIndex:any) {
        console.log(target,methodName,paramIndex)
    }
}
// 使用
@zsq()
class HttpClient {
    @logAttr()
    public url:string|undefined='123';

    @logMethod()
    actions(@logParam() p:any) {
        console.log(p)
    } 
}
```

###### 类型映射

类型映射： 在映射类型里，新类型以相同的形式去转换旧类型里每个属性。 

```javascript
type Readonly<T> = {
    readonly [P in keyof T]: T[P]
}
type Partial<T> = {
    [P in keyof T]?: T[P]
}


interface Person {
  name: string
}
type PersonPartial = Partial<Person> // {name: string}
type ReadonlyPerson = Readonly<Person> // { readonly name?: string }
```



#### ts内置类型

###### Partial

```typescript
// 实现
type Partial<T> = {
    [P in keyof T]?: T[P];
};

// 例如
interface Person {
    name: string;
    age: number;
}
Partial<Person> = {
    name?: string;
    age?: number;
}

```

这个类型的用处就是可以将某个类型里的属性加上 ? 这个 modifier ，加了这个 modifier 之后那些属性就可以为 undefined 了。

###### Required

和上面相反，去掉所有的？属性。当然除了

```typescript
// 实现
type Required<T> = {
    [P in keyof T]-?: T[P];
};
```

###### Pick

可以讲某个类型中的子属性调出来

```typescript
// 实现
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};

// 示例
type NewPerson = Pick<Person, 'name'>; // { name: string; }
```

###### Record

获取根据K中的所有可能值来设置key和value的类型

```typescript
// 实现
type Record<K extends keyof any, T> = {
    [P in K]: T;
};

// 示例
type T11 = Record<'a' | 'b' | 'c', Person>; // { a: Person; b: Person; c: Person; }
```

###### Exclude

将 T 中的某些属于 U 的类型移除掉

```typescript
// 实现
type Exclude<T, U> = T extends U ? never : T;

//示例
type T00 = Exclude<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "b" | "d"

```

这个类型可以结合Pick使用

```typescript
// 例如Chicken类型如下
interface Chicken {
    name: string;
    age: number;
    egg: number;
}
// NewChicken类型除了name想变为number其他不变，我们可以这样
interface NewChicken extends Pick<Chicken, 'age' | 'egg'> {
  name: number;
}
// 但是上面我们要把除了name的其他属性都写一遍，很麻烦，所以我们可以这样写
interface NewChicken extends Pick<Chicken, Exclude<keyof Chicken, 'name'>> {
  name: number;
}

// 我们还可以封装一下上面
type FilterPick<T, U> = Pick<T, Exclude<keyof T, U>>;
interface NewChicken extends FilterPick<Chicken, 'name'> {
  name: number;
}
```

###### ReturnType

获取某个方法的返回类型

```typescript
// 实现
type ReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : any;

// 示例
function TestFn() {
  return '123123';
}
type T01 = ReturnType<typeof TestFn>; // string
```

###### ThisType

指定上下文类型。可以看到声明中只有一个接口，没有任何的实现，说明这个类型是在 ts 源码层面支持的，而不是通过类型变换，那这个类型有啥用呢，是用于指定上下文对象类型的。

```typescript
// 实现
interface ThisType<T> { }

// 示例
interface Person {
    name: string;
    age: number;
}
const obj = {
  dosth(this: Person) {
    this.name // string
  }
}
// 有了ThisType可改为
const obj: ThisType<Person> = {
  dosth() {
    this.name // string
  }
}



```

###### NonNullable

去掉某个类型中的null属性

```typescript
// 实现
type NonNullable<T> = T extends null | undefined ? never : T;

// 示例
type T22 = '123' | '222' | null;
type T23 = NonNullable<T22>; // '123' | '222';
```

#### 推导

```typescript
import React from 'react'

/**
 * 可能为各个key的独立类型
 */
export type SingleProps<T> = {
  [K in keyof T]: {
    [K2 in K]: number
  }
}[keyof T]

/**
 * 根据type动态添加id
 */
export type AddId<T extends { type: string }> = {
  [K in T['type']]: {
    type: K
  } & Record<`${K}Id`, string>
}[T['type']]

/**
 * 获取React组件参数的类型
 */
export type PropsOfComponent<P> = P extends React.FC<infer Props>
  ? Props
  : P extends React.Component<infer Props>
  ? Props
  : never

/**
 * 添加指定字符串类型的提示
 */

export type LooseAutocomplete<T extends string> = T | Omit<string, T>

/**
 *
 */

```



#### 操作技巧

###### 类型体操实现字段禁用

类型系统的优势

* 开发体验：代码补全、类型即文档

* 程序运行优化：动态类型不利于编译器输出优化代码。比如在JavaScript/Python中做加法，必须考虑到操作对象的类型转换或者不同类型的运算符重载。弱类型的语言（如C，或者一部分C++），是无法做出安全的垃圾回收器的。比如一个结构体中包含了一个特定类型的指针，在类型强转后变成了整型或者其他类型的指针。那么在访问对象数据或类型的时候就会出现内存访问错误或者回收了错误的对象。

* 错误检查、程序验证

类型解决问题的实际场景：

在To C业务中，我们需要时刻注意，绝对不能把用户敏感信息输出到公开的接口上，比如：打印到日志、存储到非保密数据库、明文做数据请求。我们将在代码编写上**多加一层**保护，使得敏感数据不会应用在公开的接口或日志中。



类型交叉，这让我们可以把现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性。 

我们可以给所有数据都加上一个字段来代表它是敏感的，但是这个字段在运行时不存在。这个技巧就叫**幻影类型（Phantom type**）。在理解幻影类型的之前，我们要理解下运行时和编译时的差异。

```javascript
type Sensitive<T> = T & {
 readonly  '@@sensitive': unique symbol
}
```

当 `S` 类型是 `T` 类型的子集，或者 `T` 类型是 `S` 类型的子集时，`S` 能被成功断言成 `T`。这是为了在进行类型断言时提供额外的安全性，完全毫无根据的断言是危险的，如果你想这么做，你可以使用 `any`。

```javascript
function makeSensitive<T>(t: T): Sensitive<T> {
  return t as any as Sensitive<T> // cast
}
//生产一条敏感数据
let password = makeSensitive('1145141919810')
password = '123456' // error, string is not 
```

如果A extend B，那么A类型的变量可以赋值给B类型的变量

如果a是禁用字段，那么a不能赋值给b，b也不能赋值给a。但a是交叉类型，它包括了一个T类型，所以如果b是T类型，那么b=a是可以通过的

条件类型：它能够表示非统一的类型。条件类型会以一个条件表达式进行类型关系检测，从而在两种类型中选择其一： `T extends U ? X : Y` 上面的类型意思是，若T能够赋值给U，那么类型是X，否则为Y。 

```javascript
declare function f<T extends boolean>(x: T): T extends true ? string : number;
f(true) // string
f(false) // number

type TypeName<T> =
    T extends string ? "string" :
    T extends number ? "number" :
    T extends boolean ? "boolean" :
    T extends undefined ? "undefined" :
    T extends Function ? "function" :
    "object";

type T0 = TypeName<string>;  // "string"
type T1 = TypeName<"a">;  // "string"
type T2 = TypeName<true>;  // "boolean"
type T3 = TypeName<() => void>;  // "function"
type T4 = TypeName<string[]>;  // "object"
```

回到刚才的例子中，我们可以判断下，一个类型是不是敏感类型，如果是的话，那么就用条件类型解析成一个不可能存在的类型，否则的话就返回类型本身。

```javascript
type NoSensitive<T> = 
    T extends Sensitive<{}>  // if type T is Sensitive
      ? never               // then it will `never` be`NoSensitive`
      : T                   // 

type UserAge = Sensitive<number>
type Loggable = NoSensitive<number> // number
type Secret = NoSensitive<UserAge> // never
```

但是，这个判别只会针对敏感类型本身，如果一个类型本身不敏感，但是它的字段里，或者嵌套的字段里有敏感数据怎么办呢？我们可以用映射类型(Mapping type)!

我们可以对嵌套的对象类型进行去敏感数据的操作

```ts
type NoSensitive<T> = {
  [K in keyof T]: NoSensitive<T[K]>
}
```

这里我们判断，对类型T的所有字段，如果一个字段是本身就敏感类型的话返回`never`，否则递归去掉那个字段上的敏感信息。

但是要注意，对于JS的原生数据类型我们需要直接返回。于是整合条件类型和映射类型就得到了如下。

```javascript
type Primitives = 
    number | string | boolean | null | 
    undefined | symbol | Date | RegExp

type NoSensitive<T> = 
    T extends Sensitive<{}> ? 'No Leak' :
    T extends Primitives ? T :
    {
        [K in keyof T]: NoSensitive<T[K]>
    }
interface UserData {
  name: string
  ageGroup: Sensitive<string>
}
function usePublic(t: NoSensitive<UserData>) {}

// error
// ageGroup is never, Sensitive<string> cannot be assigned to never
usePublic({ 
  name: 'Sheep',
  ageGroup: makeSensitive('middle aged man')
})
```

通过上面的思路可以实现如下

```typescript
type Sensitive<T>=T&{
  readonly '@@sensitive':unique symbol
}
type Primitives=number | string | boolean | null | undefined | symbol | Date | RegExp
type NoSensitive<T> =
		 T extends Sensitive<{}> ? never :
     T extends Primitives ? T :
     {
       [K in keyof T]:NoSensitive<T[K]>
     }
type Sanitized<T>={
	[K in keyof T]:NoSensitive<T[K]>
} & {
  readonly '@@sensitive'?:never
}
//uasge
declare function makeSensitive<T>(t:T):Sensitive<T>

//guard data
declare function logToStdout<T extends Sanitized<T>>(t:T):T

const data=makeSensitive('lalala')
logToStdout(data)
logToStdout({
  data
})
```



###### 不确定参数类型

```typescript
interface A { a: number };
interface B { b: string };

function foo(x: A | B) {
    if ("a" in x) {
        return x.a;
    }
    return x.b;
}
```

###### 类型判断

```typescript
type num = 1;
type str = 'hello world';

type IsNumber<N> = N extends number ? 'yes, is a number' : 'no, not a number';

type result1 = IsNumber<num>; // "yes, is a number"
type result2 = IsNumber<str>; // "no, not a number"
```

###### never的使用

never：never类型表示值的类型从不出现。

- `never`是所有类型的子类型并且可以赋值给所有类型。

- 没有类型是`never`的子类型或能赋值给`never`（`never`类型本身除外）。 
- 在有明确`never`返回类型注解的函数中，所有`return`语句（如果有的话）必须有`never`类型的表达式并且函数的终点必须是不可执行的。

```javascript
// 函数返回never必须无法执行到终点
function error(message: string): never {
    throw new Error(message);
}
let a: never 
a = 123 // error, nothing else can be assigned to never
a = error('never here') // ok, only never can be assigned
```

那never的具体使用场景呢？

举个具体点的例子，当你有一个 union type:

``` typescript
interface Foo {  type: 'foo' } 
interface Bar {  type: 'bar' } type All = Foo | Bar
```

在 switch 当中判断 type，TS 是可以收窄类型的 (discriminated union)：

```typescript
function handleValue(val: All) {
  switch (val.type) {
    case 'foo':
      // 这里 val 被收窄为 Foo
      break
    case 'bar':
      // val 在这里是 Bar
      break
    default:
      // val 在这里是 never
      const exhaustiveCheck: never = val
      break
  }
}。
```

注意在 default 里面我们把被收窄为 never 的 val 赋值给一个显式声明为 never 的变量。如果一切逻辑正确，那么这里应该能够编译通过。但是假如后来有一天你的同事改了 All 的类型：

```typescript
type All = Foo | Bar | Baz
```

然而他忘记了在 handleValue 里面加上针对 Baz 的处理逻辑，这个时候在 default branch 里面 val 会被收窄为 Baz，导致无法赋值给 never，产生一个编译错误。所以通过这个办法，你可以确保 handleValue 总是穷尽 (exhaust) 了所有 All 的可能类型。

never的作用：

1. `never` 代表空集。
2. 常用于用于校验 "类型收窄" 是否符合预期，就是写出类型绝对安全的代码。
3. `never` 常被用来作 "类型兜底"。

###### keyof、in、infer

```typescript
// keyof的示例
interface API {
  '/user': { name: string },
  '/menu': { foods: Food[] },
}
const get = <URL extends keyof API>(url: URL): Promise<API[URL]> => {
  return fetch(url).then(res => res.json())
}
get('/usr').then(usr => user.name)

// in的示例
type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
}

// 巧用显式泛型
function $<T extends HTMLElement>(id: string):T {
  return document.getElementById(id)
}
$<HTMLInputElement>('input').value

// infer
type ParamType<T> = T extends (param: infer P) => any ? P : T;
interface User {
  name: string;
  age: number;
}
type Func = (user: User) => void;
type Param = ParamType<Func>; // Param = User
type AA = ParamType<string>; // string
```

###### 类型推导

过滤与分流

```typescript
//过滤
type Exclude<T, U> = T extends U ? never : T;
//分流（类型守卫
// 注意这里需要返回 boolean 类型
function isA(x): x is A {
  return true;
}

// 注意这里需要返回 boolean 类型
function isB(x): x is B {
  return x instanceof B;
}

function foo2(x: unknown) {
  if (isA(x)) {
    // x is A
  } else {
    // x is B
  }
}
```



















