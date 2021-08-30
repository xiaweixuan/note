#### js的异步发展

js是单线程，也就是所有的工作将按顺序完成，这也就是正常的同步执行，但是如果有一个任务加载时间较长，后面的任务将始终得不到加载，即发生堵塞，所以，异步执行对js的意义非凡。

此处所讲的，也可是说是es的异步发展史。除此之外，仍有一些模式可以解决异步问题。

 JS的异步发展史，可以认为是从 callback -> promise -> generator -> async/await。 

###### 回调函数callback

被作为实参传入另一函数，并在该外部函数内被调用，用以来完成某些任务的函数。如setTimeOut，ajax请求，readFile等。



```jsx
function greeting(name){
  console.log("Hello,"+name);
}
function processUserInput(callback){
  let name = prompt("请输入你的名字");
  callback(name);
}
processUserInput(greeting);
```

优点：
 解决了异步的问题。
 缺点：
 回调地狱：多个回调函数嵌套的情况，使代码看起来很混乱，不易于维护。

###### Promise

Promise是es6提出的异步编程的一种解决方案。
Promise 对象有三种状态：

- pending: 初始状态，既不是成功，也不是失败状态。
- fulfilled: 意味着操作成功完成。
- rejected: 意味着操作失败。
  promise的状态只能从pending变成fulfilled，和pending变成rejected，状态一旦改变，就不会再改变，且只有异步操作的结果才能改变promise的状态。
  例：



```tsx
function read(url){
  return new Promise((resolve,reject) => {
    fs.readFile(url,'utf-8',(err, data) => {
      if(err) reject(err);
      resolve(data);
    })
  })
}
read(A).then(data => {
  return read(B);
}).catch(reason => {
  console.log(reason);
})
```

优点：解决了回调地狱的问题，将异步操作以同步操作的流程表达出来。
缺点：无法取消promise。如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。当处于Pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。当执行多个Promise时，一堆then看起来也很不友好。

###### Generator

Generator是es6提出的另一种异步编程解决方案，需要在函数名之前加一个*号，函数内部使用yield语句。Generaotr函数会返回一个遍历器，可以进行遍历操作执行每个中断点yield。



```jsx
function *count(){
  yield 1;
  yield 2;
  return 3;
}
let c = count();
console.log(c.next());  // { value: 1, done: false }
console.log(c.next()); // { value: 2, done: false }
console.log(c.next()); // { value: 3, done: true }
console.log(c.next()); // { value: undefined, done: true }
```

优点：没有了Promise的一堆then(),异步操作更像同步操作，代码更加清晰。
 缺点：不能自动执行异步操作，需要写多个next()方法，需要配合使用Thunk函数和Co模块才能做到自动执行。

###### async/await

`async function`自动将常规函数转换成Promise，返回值也是一个Promise对象, 只有async函数内部的异步操作执行完，才会执行then方法指定的回调函数, 异步函数内部可以使用await.

`await` 放置在Promise调用之前，await 强制后面点代码等待，直到Promise对象resolve，得到resolve的值作为await表达式的运算结果  

```javascript
//实例一
async function read() {
 let readA = await readFile('data/a.txt')  //readFile是异步发开文件
 console.log(readA)
}
read()
//实例二
function pm(){
    return new Promise((res,rej)=>{
        res('1')
    })
}
async function test(){
    let a=await pm();
    let b=await `2`;
    return a+b;
}
test()  //12
```

优点：内置执行器，比Generator操作更简单。`async/await`比`*/yield`语义更清晰。返回值是Promise对象，可以用then指定下一步操作。代码更整洁。可以捕获同步和异步的错误。
 缺点：暂时没有人提及这种写法的缺点，目前前端圈一致推荐的异步操作的写法。
