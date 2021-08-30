### 环境搭建和配置

需要的依赖`@babel/cli`、`@babel/core`、`@babel/preset-env`

配置`.babelrc`

```javascript
{
    "presets": ["@babel/preset-env"],
    "plugins": []
}
```

通过命令`npx babel src/index.js`来进行编译

> presets为预设，`plugins`为插件
>
> babel实则为一个空壳，它通过各种`plugins`来配置自己的编译，当经常使用的`plugins`过多，我们把它们打包成一个预设，在presets中设置
>
> 除此之外，我们可以在`plugins`中拓展自己想用的其他插件

常见的preset

* `@babel/preset-env`
* `@babel/preset-react`
* `@babel/preset-typescript`

### `babel-polyfill`

首先来了解一下，`Polyfill`，它是不定的意思。例如我们在使用`indexOf`方法。但在有些低版本浏览器中不支持此方法，所以它的`polyfill`就是一个他的补丁，即在不支持他的时候所作的代码处理

而任何人都可以写补丁，但是以谁的为准呢？所以便出现了一个官方的补丁集和，即为`core-js`。它里面包含所有的高级语法补丁（除了generator函数），它可以处理`env`中无法处理的`es6`特性。如果象处理generator函数，需要引用`regenerator`包。

而`babel-polyfill`就是`core-js`和`regenerator`的一个集合（现在已经不推荐使用）

注意，babel他的工作是编译语法例如箭头函数，而要解决新特性，例如使用数组新增includes方法或者promise等，就要使用core去进行兼容

我们可以这样配置core

```javascript
{
    "presets": [
    	[
    		"@babel/preset-env",
    		{
    			"useBuiltIns":"usage",
    			"corejs":3
    		}
    	]
    ],
    "plugins": []
}
```

这样配置后，编译后，他会为你自动添加`require("core0js/modules/es.promise.js")`语句，他只是帮你添加了一个引入（按需引入），然后再通过打包工具将他们打包后，即可交给浏览器运行

### `babel-runtime`

`babel-polyfill`的实质无非是定义一个全局变量，例如

```javascript
promise.resolve(100).then(data=>data)
```

它被编译完，只是在window上添加一个promise的方法

但是这样就污染了全局变量，所以为了避免污染全局变量，便有了`babel-runtime`

```javascript
{
    "presets": [
        [
            "@babel/preset-env",
            {
                "useBuiltIns": "usage",
                "corejs": 3
            }
        ]
    ],
    "plugins": [
        [
            "@babel/plugin-transform-runtime",
            {
                "absoluteRuntime": false,
                "corejs": 3,
                "helpers": true,
                "regenerator": true,
                "useESModules": false
            }
        ]
    ]
}
```

它编译完是会把代码变为这样

```javascript
_promise["default"].resolve(100).then(function(data){return data}))
```

即不会污染全局变量







