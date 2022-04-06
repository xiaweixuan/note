在koa中自定义error错误，在抛出错误时，可以拿到自定义的属性

```javascript
export class HttpError extends Error {
  code: number;
  statusCode: number;
  msg: string;

  constructor(message = ERROR_ERROR[1000], code = 1002, statusCode = 500) {
    super();
    this.msg = message;
    this.statusCode = statusCode;
    this.code = code;
  }
}
```

在中间件中进行拦截

```javascript

export default async (ctx: RouterCtx, next: MiddleNext) => {
  try {
    await next();
  } catch (error) {
      if (error?.statusCode !== 200) {
        ctx.response.status = error?.statusCode;
        ctx.response.body = {
          message: error?.msg,
          code: error?.code,
        };
        return;
      }
      if (Object.keys(ERROR_ERROR).map(Number).includes(error?.code)) {
        ctx.body = {
          message: error?.msg,
          code: error?.code,
        };
        return;
      }
    ctx.body = {
      message: 'Sometimes， mistakes are inevitable',
    };
  }
};
```

然而在ts中，error会默认为unknown，所以无法去此处是不识别error下众多属性的，此时，需要加一个判断

```javascript
export default async (ctx: RouterCtx, next: MiddleNext) => {
  try {
    await next();
  } catch (error) {
    if (error instanceof HttpError) {
      if (error?.statusCode !== 200) {
        ctx.response.status = error?.statusCode;
        ctx.response.body = {
          message: error?.msg,
          code: error?.code,
        };
        return;
      }
      if (Object.keys(ERROR_ERROR).map(Number).includes(error?.code)) {
        ctx.body = {
          message: error?.msg,
          code: error?.code,
        };
        return;
      }
    }
    ctx.body = {
      message: 'Sometimes， mistakes are inevitable',
    };
  }
};

```

但是这样定义完后，`error instanceof HttpError`并不会为true，而是始终是false

需要在他继承error时，进行一层中间的过度

```javascript
export class ExtensibleError implements Error {
  message: string
  name: string

  constructor(message?: string) {
    this.message = message || ''
    this.name = this.constructor.name

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

ExtensibleError.prototype = Object.create(Error.prototype)

export class HttpError extends ExtensibleError {
  code: number;
  statusCode: number;
  msg: string;

  constructor(message = ERROR_ERROR[1000], code = 1002, statusCode = 500) {
    super();
    this.msg = message;
    this.statusCode = statusCode;
    this.code = code;
  }
}
```

JavaScript 有内置的错误对象，它通常由`try`块抛出，并在`catch`块中捕获，**Error** 对象包含以下属性：

- **name**：是错误的名称，例如 “Error”, “SyntaxError”, “ReferenceError” 等。
- **message**：有关错误详细信息的消息。
- **stack**：是用于调试目的的错误的堆栈跟踪。

我们创建一个**Error** 对象，并查看它的名称和消息属性:

```javascript
const err = new Error('Error while executing the code');

console.log("name:", err.name);
console.log("message:", err.message);
console.log("stack:", err.stack);

name: Error
message: Error while executing the code
stack: Error: Error while executing the code
    at <anonymous>:1:13

```

JavaScript 有以下内置错误，这些错误是从 **Error** 对象继承而来的


通常状态

```
getName() {
    try {
      return userInfo.name;
    } catch (error) {
      console.log("name 不存在");
    }
  }
```

使用装饰器

```javascript
const userInfo: any = undefined;

function catchError(target: any, key: string, descriptor: PropertyDescriptor) {
  const fn = descriptor.value;
  descriptor.value = function () {
    try {
      fn();
    } catch (error) {
      console.log("userInfo 有问题");
    }
  };
}

class Test {
  @catchError
  getName() {
    return userInfo.name;
  }
}

const test = new Test();
test.getName();
//
const userInfo: any = undefined;

function catchError(msg: string) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const fn = descriptor.value;
    descriptor.value = function () {
      try {
        fn();
      } catch (error) {
        console.log(msg);
      }
    };
  }
}

class Test {
  @catchError('userInfo.name 不存在')
  getName() {
    return userInfo.name;
  }

  @catchError('userInfo.age 不存在')
  getAge() {
    return userInfo.age;
  }
}

const test = new Test();
test.getName();
test.getAge();
```

