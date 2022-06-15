### 工作原理

在一个前端项目中，我们会用到很多零散的资源，例如`html`、`css`、`js`、`json`、`png`等等，`webpack`将他们呢每个部分当作一个模块进行操作

它通过loader进行资源整合，通过`prugin`进行自动化构建

他的工作过程如下

* 载入 Webpack 核心模块，创建 Compiler 对象；
* 使用 Compiler 对象开始编译整个项目；
* 从入口文件开始，解析模块依赖，形成依赖关系树；
* 递归依赖树，将每个模块交给对应的 Loader 处理；
* 合并 Loader 处理完的结果，将打包结果输出到 dist 目录。

##### module、chunk、bundle

* `module`：`webpack`中一切皆模块，源码中，每一个文件（除了`html`输出模板以外）其他的都是模块
* chunk：多模块的合成，例如在entry，import()，`splitChunk`中都可能产生chunk
* `bandle`：最终输出文件，通常每个`bandle`都对应着一个chunk

社区文章 https://xie.infoq.cn/article/ddca4caa394241447fa0aa3c0

### 资源整合原理

`webpack`最早的用途是资源打包，在模块化盛行后，我们开始讲项目分为多个模块，而最后讲各个模块整合到一起的任务就可以交给`webpack`。`webpack`整合代码的能力源于loader，并且默认的它只具有整合`js`的能力

##### 整合`js`

我们的模块文件和入口文件分别如下

```javascript
//bundle.js
function say(){
	console.log('hello')
}
export {say}
//main.js
import {say} from './hundle.js'
say()
```

在`webpack`的配置文件中，最基础的设置为下

```javascript
const path=require('path')
module.exports={
    mode:'none',
    entry:'./src/main.js',//所有模块的入口文件
    output:{
        filename:'bundle.js',
        path:path.join(__dirname,'dist')
    }
}
```

如何合并js文件

> 整体结构如下,是一个闭包结构，每一个传入的参数代表一个`js文件`，且第一个为入口文件（即`main.js`）
>
> ```javascript
> (function(modules){
>     //...
> })([
>     (function(module,__webpack_exports__,__webpack_require__){
>         //...
>     }),
>     (function(module,__webpack_exports__,__webpack_require__){
>         //...
>     })
> ])
> ```
>
> 抛开传入的参数，我们看闭包内的内容,在程序的最后，调用执行函数去执行第一个参数即入口模块
>
> ```javascript
> (function(modules){
> //缓存所有参数（模块）
> var installedModules = {};
> //用于加载某个模块
> function __webpack_require__(moduleId){}
> //定义了一些方法
> __webpack_require__.m = modules;
> __webpack_require__.c = installedModules;
> __webpack_require__.d = function(exports, name, getter){}
> __webpack_require__.r = function(exports){}
> __webpack_require__.t = function(value, mode){}
> __webpack_require__.n = function(module){}
> __webpack_require__.o = function(object, property){}
> __webpack_require__.p = "";
> //调用加载，传入参数0即调用第一个参数，即入口文件
> return __webpack_require__(__webpack_require__.s = 0);
> })([...])
> ```
>
> 我们来看如何调用
>
> ```javascript
> /******/ 	function __webpack_require__(moduleId) {
> /******/
> /******/ 		// 查看该模块是否在缓存中
> /******/ 		if(installedModules[moduleId]) {
> /******/ 			return installedModules[moduleId].exports;
> /******/ 		}
> /******/ 		// 创建一个新模块并放入缓存，这个对象中有该模块的导出内容
> /******/ 		var module = installedModules[moduleId] = {
> /******/ 			i: moduleId,
> /******/ 			l: false,
> /******/ 			exports: {}
> /******/ 		};
> /******/
> /******/ 		// 运行参数函数
> /******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
> /******/
> /******/ 		// 将模块标记为已加载
> /******/ 		module.l = true;
> /******/
> /******/ 		// 返回模块的导出
> /******/ 		return module.exports;
> /******/ 	}
> ```
>
> 上面步骤来说，他做的只是在里面调用了参数的函数，那么参数的函数到底是什么呢，最开始我们说他是我们写的`js文件`，但它其实是通过改造的
>
> ```javascript
> //由main.js改造的，也就是第一个参数
> function(module, __webpack_exports__, __webpack_require__) {
> "use strict";
> /*定义导出的esModule*/
> __webpack_require__.r(__webpack_exports__);
> /*这句话便是翻译的import {say} from './hundle.js'*/
> var _hundle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
> /*这句话便是翻译的say()*/
> Object(_hundle_js__WEBPACK_IMPORTED_MODULE_0__["say"])()
> })
> 
> //由bundle.js改造的
> (function(module, __webpack_exports__, __webpack_require__) {
> "use strict";
> __webpack_require__.r(__webpack_exports__);
> __webpack_require__.d(__webpack_exports__, "say", function() { return say; });
> function say(){
> 	console.log('hello')
> }
> }
> ```
>
> 这里面用到了`__webpack_require__.r`和`__webpack_require__.d`
>
> ```javascript
> //定义导出的esModule
> /******/ 	__webpack_require__.r = function(exports) {
> /******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
> /******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
> /******/ 		}
> /******/ 		Object.defineProperty(exports, '__esModule', { value: true });
> /******/ 	};
> 
> //定义和谐输出的getter函数
> /******/ 	__webpack_require__.d = function(exports, name, getter) {
> /******/ 		if(!__webpack_require__.o(exports, name)) {
> /******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
> /******/ 		}
> /******/ 	};
> 
> 
> __webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
> ```
>
> 

##### 整合`css`

在`webpack`理念中，他将样式或者是图片加载全部放到`js文件`中，而不是只讲`js文件`和样式分开引入管理。这样的思想保证了每个模块的独立性。

当我想合并`css文件`的时候会进行如下设置

```javascript
const path=require('path')
module.exports={
    entry:'./src/main.css',//所有模块的入口文件
    output:{
        filename:'bundle.js',
        path:path.join(__dirname,'dist')
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    }
}
```



##### 自定义loader

loader的实质就是将我们自己写的js文件转化为最终js文件中闭包的参数，即

```javascript
(function(modules){
    //...
})([
    (function(module,__webpack_exports__,__webpack_require__){
        //...
    }),
    (function(module,__webpack_exports__,__webpack_require__){
        //此处便是将你的模块经过loader操作所return的结果，直接防御此处
    })
])
```





我们将自定义一个解析markdown的loader

我们将对下面的模块化项目进行使用

> `about.md文件`
>
> ```markdown
> #About
> hello
> ```
>
> `main.js文件`
>
> ```javascript
> import about from './about.md'
> console.log(about)
> //预想输出
> //<h1>about</h1><p>hello</p>
> ```
>
> `webpack.config.js文件`
>
> ```javascript
> const path=require('path')
> module.exports={
>     entry:'./src/main.js',//所有模块的入口文件
>     output:{
>         filename:'bundle.js',
>         path:path.join(__dirname,'dist')
>     },
>     module:{
>         rules:[
>             test:/\.md$/,
>             use:'./markdown-loader'
>         ]
>     }
> }
> ```
>
> 

现在我们开始编写loader文件,loader返回的结果必须是`js语句`

```javascript
//markdown-loader.js
const marked=require('marked')//借助第三方模块
module.exports=source=>{
    //source是被转化模块输出的东西
    var html=marked(source)
    reutrn `export default${JSON.stringify(html)}`
}
```

更改外如下最后打包出的文件为

```javascript
(function(modules){
    //...
})([
    (function(module,__webpack_exports__,__webpack_require__){
        //...
    }),
    (function(module,__webpack_exports__,__webpack_require__){
        export default${JSON.stringify('<h1>about</h1><p>hello</p>')}//此处还会被再一次转化
    })
])
```





### 插件机制原理

随着发展，webpack不仅仅局限于资源整合，更有了自动化构建的能力loader的作用是为模块化设计来整合项目中的资源。而plugin做的就是完成一些项目自动化方面的事情

接下来，我们介绍几个常见插件

##### 自动清除dist文件

`clean-webpack-plugin`

配置方式

```javascript
const CleanWebpackPlugin=require('clean-webpack-plugin')
const path=require('path')
module.exports={
    entry:'./src/main.js',//所有模块的入口文件
    output:{
        filename:'bundle.js',
        path:path.join(__dirname,'dist')
    },
    plugins:[
        new CleanWebpackPlugin()
    ]
}
```

##### 自动生成`html`

`html-webpack-plugin`

将`html`自动生成到dist目录中，并且不用再手动修改引入路径

```javascript
//自动生成html文件
const path=require('path')
const HtmlWebpackPlugin=require('html-webpack-plugin')
module.exports={
    entry:'./src/main.js',//所有模块的入口文件
    output:{
        filename:'bundle.js',
        path:path.join(__dirname,'dist')
    },
    plugins:[
        new HtmlWebpackPlugin({
            title:'页面标题',
            meta:{
                view:'width=device-width'
            }
        })
    ]
}
//定义index.html模板
const path=require('path')
const HtmlWebpackPlugin=require('html-webpack-plugin')
module.exports={
    entry:'./src/main.js',//所有模块的入口文件
    output:{
        filename:'bundle.js',
        path:path.join(__dirname,'dist')
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename:'index.html',//如果不写，默认是index.html
            title:'页面标题',
            template:'./src/index.html'
        })
    ]
}

```

##### 复制文件

`copy-webpack-plugin`

我们一般统一将静态文件放到public目录下

```javascript
const path=require('path')
const CopyWebpackPlugin=require('copy-webpack-plugin')
module.exports={
    entry:'./src/main.js',//所有模块的入口文件
    output:{
        filename:'bundle.js',
        path:path.join(__dirname,'dist')
    },
    plugins:[
        new CopyWebpackPlugin([
            'public'
        ])
    ]
}

```

##### 自定义插件

插件机制使用的是钩子机制，运行的每个步骤都对应着一个钩子，而我们通过向钩子上添加方法来实现优化

具体有哪些预先定义好的钩子，我们可以参考官方文档的 `API`：

* `nCompiler Hooks`
* `Compilation Hooks`
* `JavascriptParser Hooks`

我们将实现一个小区文件中注释的插件

> `Webpack` 要求我们的插件必须是一个函数或者是一个包含 apply 方法的对象，一般我们都会定义一个类型，在这个类型中定义 apply 方法。然后在使用时，再通过这个类型来创建一个实例对象去使用这个插件。
>
> 我们这里定义一个 `RemoveCommentsPlugin` 类型，然后在这个类型中定义一个 apply 方法，这个方法会在 `Webpack `启动时被调用，它接收一个 compiler 对象参数，这个对象是 `Webpack `工作过程中最核心的对象，里面包含了我们此次构建的所有配置信息，我们就是通过这个对象去注册钩子函数
>
> ```javascript
> // ./remove-comments-plugin.js
> class RemoveCommentsPlugin {
>   apply (compiler) {
>     console.log('RemoveCommentsPlugin 启动')
>     // compiler => 包含了我们此次构建的所有配置信息
>   }
> }
> 
> ```
>
> 知道这些过后，还需要明确我们这个任务的执行时机，也就是到底应该把这个任务挂载到哪个钩子上。我们的需求是删除 `bundle.js` 中的注释，也就是说只有当 `Webpack` 需要生成的 `bundle.js` 文件内容明确过后才可能实施。emit这个钩子会在 `Webpack` 即将向输出目录输出文件时执行
>
> ```javascript
> // ./remove-comments-plugin.js
> class RemoveCommentsPlugin {
>   apply (compiler) {
>     compiler.hooks.emit.tap('RemoveCommentsPlugin', compilation => {
>       // compilation => 可以理解为此次打包的上下文
>       for (const name in compilation.assets) {
>         if (name.endsWith('.js')) {
>           const contents = compilation.assets[name].source()
>           const noComments = contents.replace(/\/\*{2,}\/\s?/g, '')
>           compilation.assets[name] = {
>             source: () => noComments,
>             size: () => noComments.length
>           }
>         }
>       }
>     })
>   }
> }
> 
> ```
>
> 

### 基本配置

通常，我们会配置三个文件，在开发模式和生产模式种，分别引入共有模块

```
webpack.common.js 
webpack.dev.js
webpack.prod.js
```

配置`package.json`

```
    "devBuild": "webpack --config build-optimization/webpack.dev.js",
    "dev": "webpack-dev-server --config build-optimization/webpack.dev.js",
    "build": "webpack --config build-optimization/webpack.prod.js"
```

常见的包

```
webpack-merge  合并webpack配置
```

##### common配置

```javascript
const path=require('path')

const srcPath=path.join(__dirname,'..','src')
const distPath=path.join(__dirname,'..','dist')

module.exports={
    entry:path.join(srcPath,'index'),
    module:{
        rules:[
            {
                test:/\.js$/,
                loader:['babel-loader'],//还要配置.babelrc文件
                include:srcPath,
                exclude:/node_modules/
            },
            {
                test:/\.test$/,
                loader:['style-loader','css-loader','postcss-loader']//postcss处理css的兼容性的,需要配置postcss.config.js
            },{
                test:/\.less$/,
                loader:['style-loader','css-loader','less']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'index.html'),
            filename: 'index.html'
        })
    ]
}



//.babelrc
{
    "presets": ["@babel/preset-env"],
    "plugins": []
}

//postcss.config.js
module.exports = {
    plugins: [require('autoprefixer')]
}
```

##### `dev`配置

```javascript
const webpackCommonConf = require('./webpack.common.js')
const { smart } = require('webpack-merge')
module.exports = smart(webpackCommonConf, {
    mode: 'development',
    module: {
        rules: [
            // 直接引入图片 url
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            ENV: JSON.stringify('development')
        })
    ],
    devServer: {
        port: 8080,
        progress: true,  // 显示打包的进度条
        contentBase: distPath,  // 根目录
        open: true,  // 自动打开浏览器
        compress: true,  // 启动 gzip 压缩

        // 设置代理
        proxy: {
            // 将本地 /api/xxx 代理到 localhost:3000/api/xxx
            '/api': 'http://localhost:3000',

            // 将本地 /api2/xxx 代理到 localhost:3000/xxx
            '/api2': {
                target: 'http://localhost:3000',
                pathRewrite: {
                    '/api2': ''
                }
            }
        }
    }
})
```

> #####  打包后文件为什么要用hash命名?
>
> 通常根据内容产生的hash名字，内容相同，hash名字相同。这样当再一次打包后，浏览器访问的时候，如果hash名字相同，就可以直接使用缓存，加快打开网页的速度。

##### `prod`配置

```javascript
const webpackCommonConf = require('./webpack.common.js')
const { smart } = require('webpack-merge')
module.exports = smart(webpackCommonConf, {
    mode: 'production',
    output: {
        filename: 'bundle.[contentHash:8].js',  // 打包代码时，加上 hash 戳
        path: distPath,
    },
    module: {
        rules: [
            // 图片 - 考虑 base64 编码的情况
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        // 小于 5kb 的图片用 base64 格式产出
                        // 否则，依然延用 file-loader 的形式，产出 url 格式
                        limit: 5 * 1024,

                        // 打包到 img 目录下
                        outputPath: '/img1/',
                    }
                }
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(), // 会默认清空 output.path 文件夹
        new webpack.DefinePlugin({
            // window.ENV = 'production'
            ENV: JSON.stringify('production')
        })
    ]
})
```

### 高级配置



##### 多入口输出

```javascript
//更改common
    entry: {
        index: path.join(srcPath, 'index.js'),
        other: path.join(srcPath, 'other.js')
    },
    plugins: [
        // 为每个文件配置html
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'index.html'),
            filename: 'index.html',
            // chunks 表示该页面要引用哪些 chunk （即上面的 index 和 other），默认全部引用
            chunks: ['index']  // 只引用 index.js
        }),
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'other.html'),
            filename: 'other.html',
            chunks: ['other']  // 只引用 other.js
        })
    ]
//更改prod
	output: {
        filename: '[name].[contentHash:8].js', // name 即多入口时 entry 的 key
        path: distPath,
    },
```

##### 抽离`css文件`

之前，我们的方法是将`css`放到`html`中变为style标签

```javascript
    module: {
        rules: [
            // 抽离 css
            {
                test: /\.css$/,
                loader: [
                    MiniCssExtractPlugin.loader,  // 注意，这里不再用 style-loader
                    'css-loader',
                    'postcss-loader'
                ]
            },
            // 抽离 less --> css
            {
                test: /\.less$/,
                loader: [
                    MiniCssExtractPlugin.loader,  // 注意，这里不再用 style-loader
                    'css-loader',
                    'less-loader',
                    'postcss-loader'
                ]
            }
        ]
    },
    plugins: [
        // 抽离 css 文件
        new MiniCssExtractPlugin({
            filename: 'css/main.[contentHash:8].css'
        })
    ],
    optimization: {
        // 压缩 css
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    }
```

##### 抽离公共代码

例如当我们在index.js和other.js中都引用了math.js，打包的时候，它会将math.js分别放到index和other

中，所以我们应该在打包的时候将公共代码抽离出来

```javascript
//prod  
	optimization: {
        // 分割代码块
        splitChunks: {
            chunks: 'all',
            /**
             * initial 入口 chunk，对于异步导入的文件不处理
                async 异步 chunk，只对异步导入的文件处理
                all 全部 chunk
             */

            // 缓存分组
            cacheGroups: {
                // 第三方模块
                vendor: {
                    name: 'vendor', // chunk 名称
                    priority: 1, // 权限更高，优先抽离，重要！！！
                    test: /node_modules/,
                    minSize: 0,  // 大小限制
                    minChunks: 1  // 最少复用过几次
                },

                // 公共的模块
                common: {
                    name: 'common', // chunk 名称
                    priority: 0, // 优先级
                    minSize: 0,  // 公共模块的大小限制
                    minChunks: 2  // 公共模块最少复用过几次
                }
            }
        }
    }
//common
	entry: {
        index: path.join(srcPath, 'index.js'),
        other: path.join(srcPath, 'other.js')
    },
    plugins: [
        // 多入口 - 生成 index.html
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'index.html'),
            filename: 'index.html',
            // chunks 表示该页面要引用哪些 chunk （即上面的 index 和 other），默认全部引用
            chunks: ['index', 'vendor', 'common']  // 该出口需要引入的模块，第一个是上面出口名字，后面的为要引入的chunk名字
        }),
        // 多入口 - 生成 other.html
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'other.html'),
            filename: 'other.html',
            chunks: ['other', 'common']  // 考虑代码分割
        })
    ]
```

##### 懒加载

通常在业务中，我们可能会懒加载一些模块例如

```javascript
//index.js
setTimeout(()=>{
	import('./data.js').then(res=>{
	console.log(res.default.msg)
	})
},1500)
```

在`webpack`中本身即支持懒加载，无需配置。

但需要知道的是，异步加载的组件会被`webpack`单独打成一个chunk,即会被单独打成一个文件。

##### `jsx`、`vue`

处理`jsx`需要配置`.babelrc`文件

```javascript
//.babelrc
{
    "presets": ["@babel/preset-react"],
    "plugins": []
}
```

`vue`用到`vue-loader`插件

```javascript
module:{
rules:[
	{
		test:/\.vue$/,
		loader:['vue-loader'],
		include:srcPath
	}
]
}
```

### 性能优化--优化构建速度

##### 优化babel-loader

```javascript
{
    test:/\.js$/,
    use:['babel-loader?cacheDirsctory'],//开启缓存
    include:srcPath//明确范围
}
```

开启缓存后，会将代码缓存，当再一次打包的时候，没有改变的代码会不再进行`es6`编译，直接使用缓存

另外一种给方法为明确范围

通常二者使用一个即可

##### `ignorePlugin`

避免引用无用模块

例如有一个moment模块，它可以将日期转化为各国语言的格式。我们在模块中使用它

```javascript
import moment from 'moment'
moment.locale('zh-cn')
console.log(moment.locale())
```

那么实例中，我们只需要用中文的格式，但实际打包中会将整个包即所有国家语言的设置都引入，所以打包速度变慢且包也变大，所以我们可以不引入这个模块，而是手动引入需要的包

```javascript
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
console.log(moment.locale())
```

然后设置，忽略引入该模块

```javascript
plugins:[
    new webpack.IgnorePlugin(/\.\/locale/,/moment/)//忽略moment下的/locale目录
]
```



##### `noParse`

取消对某模块的打包，直接将其引入

例如我们在项目中，引入了`react.min.js`，这个包本身就是压缩的，无需我们再一次进行压缩处理，可以直接引入，所以我们设置取消对他的打包

```javascript
module:{
    noParse:[/react\.min\.js$/]
}
```



##### `happyPack`

多进程打包编译

因为`js`是单线程的，但是我们可以开启多进程打包，特别是对于多核`cpu`。

```javascript
    module: {
        rules: [
            // js
            {
                test: /\.js$/,
                // 把对 .js 文件的处理转交给 id 为 babel 的 HappyPack 实例
                use: ['happypack/loader?id=babel'],
                include: srcPath,
                // exclude: /node_modules/
            }
        ]
    }
    plugins: [
        new HappyPack({
            // 用唯一的标识符 id 来代表当前的 HappyPack 是用来处理一类特定的文件
            id: 'babel',
            // 如何处理 .js 文件，用法和 Loader 配置中一样
            loaders: ['babel-loader?cacheDirectory']
        })
    ]
```

##### `ParallelUglifyPlugin`

多进程压缩`js`

```javascript
    plugins: [
    	// 使用 ParallelUglifyPlugin 并行压缩输出的 JS 代码
        new ParallelUglifyPlugin({
            // 传递给 UglifyJS 的参数
            // （还是使用 UglifyJS 压缩，只不过帮助开启了多进程）
            uglifyJS: {
                output: {
                    beautify: false, // 最紧凑的输出
                    comments: false, // 删除所有的注释
                },
                compress: {
                    // 删除所有的 `console` 语句，可以兼容ie浏览器
                    drop_console: true,
                    // 内嵌定义了但是只用到一次的变量
                    collapse_vars: true,
                    // 提取出出现多次但是没有定义成变量去引用的静态值
                    reduce_vars: true,
                }
            }
        })
    ]
```

> ##### 关于开启多进程
>
> * 项目大，开启多进程可以开启速度
> * 项目比较小，开启多进程会降低速度，因为开启进程会有进程开销

##### 自动刷新

保存代码，页面自动刷新，整个网页全部刷新，速度较慢，且状态消失

```javascript
module.export={
	watch:true,//开启监听
}
```

##### 热更新

保存代码，性能代码自动生效，网页不刷新。状态不丢失

```javascript
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');
module.export={
     entry: {
        // index: path.join(srcPath, 'index.js'),//之前的写法
        index: [
            'webpack-dev-server/client?http://localhost:8080/',
            'webpack/hot/dev-server',
            path.join(srcPath, 'index.js')
        ],   
     }
     plugins: [
        new HotModuleReplacementPlugin()
     ],
     devServer: {
         hot:true
     }
}
```

 但是在`js`文件中修改不会出发热更新，一位内他不在范围内，我们需要手动将他添加进监听范围

```javascript
//添加math.js为监听范围，其内部修改会触发热更新
if (module.hot) {
    module.hot.accept(['./math'], () => {
        const sumRes = sum(10, 30)
        console.log('sumRes in hot', sumRes)
    })
}
```



##### `DllPlugin`

动态链接库插件。这是`webpack`本身内置实现的功能

通常，在我们使用`vue`或者react等一些库的时候，打包框架本身的时间是比较慢的，所以，我们可以吧react框架及其用到的依赖于打包一下，然后之后在想打包的时候，利用于大宝出来的内容，会大大加快打包速度。以react框架为例

我们创建新的`webpack.dll.js`文件

```jsx
const DllPlugin = require('webpack/lib/DllPlugin')
const { srcPath, distPath } = require('./paths')

module.exports = {
  mode: 'development',
  // JS 执行入口文件
  entry: {
    // 把 React 相关模块的放到一个单独的动态链接库
    react: ['react', 'react-dom']
  },
  output: {
    // 输出的动态链接库的文件名称，[name] 代表当前动态链接库的名称，
    // 也就是 entry 中配置的 react 和 polyfill
    filename: '[name].dll.js',
    // 输出的文件都放到 dist 目录下
    path: distPath,
    // 存放动态链接库的全局变量名称，例如对应 react 来说就是 _dll_react
    // 之所以在前面加上 _dll_ 是为了防止全局变量冲突
    library: '_dll_[name]',
  },
  plugins: [
    // 接入 DllPlugin
    new DllPlugin({
      // 动态链接库的全局变量名称，需要和 output.library 中保持一致
      // 该字段的值也就是输出的 manifest.json 文件 中 name 字段的值
      // 例如 react.manifest.json 中就有 "name": "_dll_react"
      name: '_dll_[name]',
      // 描述动态链接库的 manifest.json 文件输出时的文件名称
      path: path.join(distPath, '[name].manifest.json'),
    }),
  ],
}
```

然后我们配置命令

```
    "dll": "webpack --config build/webpack.dll.js"
```

执行`npm run dll`后便进行了域打包，在`dist`目录中生成资源

要使用它，首先修改`index.html`入口文件，让他引用一下生成的资源

 ```
<script src="./react.dll.js"></script>
 ```

然后我们在dev打包文件中进行配置

```javascript
// 第一，引入 DllReferencePlugin
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');

{
    test: /\.js$/,
    loader: ['babel-loader'],
    include: srcPath,
    exclude: /node_modules/ // 第二，不要再转换 node_modules 的代码
}

// 第三，告诉 Webpack 使用了哪些动态链接库
new DllReferencePlugin({
     // 描述 react 动态链接库的文件内容
     manifest: require(path.join(distPath, 'react.manifest.json')),
 }),
```

 然后使用`npm run dev`打包时的速度会大大加快

##### 用于优化构建速度（生产环境）

可用于

`ignorePlugin`、`noParse`、`happyPack`、`ParellelUglifyPlugin`

不可用于

自动刷新、热更新、`DllPlugin`

### 性能优化--优化产出效率

它可以让项目体积更小，合理分配，不重复加载，速度更快，内存使用更小

##### 小图片变为base64

```javascript
            // 图片 - 考虑 base64 编码的情况
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        // 小于 5kb 的图片用 base64 格式产出
                        // 否则，依然延用 file-loader 的形式，产出 url 格式
                        limit: 5 * 1024,

                        // 打包到 img 目录下
                        outputPath: '/img1/',
                    }
                }
```

##### `bandle`加hash

`filename:'[name].[contentHash:8].js'`根据内容计算hash值，并保留8位数字

利用了缓存，加快客户端浏览器访问时加载的速度

##### 懒加载

先加载重要的东西，其余的使用懒加载

##### 抽离公用代码

减少代码重复打包，减小项目体积

##### `ignorePlugin`

减少我们打包体积

##### 使用`cdn`加速

在图片资源、`js`资源、`css`资源添加`publicPath:'http://cdn.ab.com'`

然后将打包后的资源放到`cdn`服务器上

##### production

使用production模式的好处

* 自动开启代码压缩
* `vue`、react等会自动删除调试代码（如开发环境的warning）
* 自动启动tree-shaking

开启方法如下

```javascript
//prod
module.exports = smart(webpackCommonConf, {
    mode: 'production',
})
```

> ##### 关于tree-Shaking
>
> 例如在一个模块中，我们对外输出了两个函数`fn1`、`fn2`
>
> 但实际上，我们只用了第一个函数，但在普通情况下两个函数都会被打包进去
>
> tree-Shaking则会使得未使用的函数不打包进去
>
> ##### tree-shaking的要求
>
> 必须使用`es6`的模块语法，不可以使用`commonjs`语法
>
> 因为`es6`的module是静态引入即编译时引用，`commonjs`是动态引入，执行时引入
>
> 打包的时候还没有执行，所以必须使用静态引入的



### 自定义插件

Webpack 要求我们的插件必须是一个函数或者是一个包含 apply 方法的对象，一般我们都会定义一个类型，在这个类型中定义 apply 方法。然后在使用时，再通过这个类型来创建一个实例对象去使用这个插件。

常见的生命钩子

* entryOption：在处理完webpack选项的[`entry`配置](https://webpack.js.org/configuration/entry-context/#entry)后调用。
* afterPlugins：在设置初始内部插件集之后调用。
* afterResolvers：解析器设置完成后触发。
* environment：在初始化配置文件中的插件之后，在准备编译器环境时调用。
*  `afterEnvironment`：编译器环境设置完成后，在挂钩之后立即调用。
*  beforeRun：在运行编译器之前添加一个挂钩。
*  beforeCompile：创建编译参数后执行插件。
* compile：beforeCompile之后执行  
*  afterCompile：在完成并密封编译后调用。
* emit：在将资产释放到输出目录之前立即执行。
* afterEmit：在将资产释放到输出目录后调用。

选择合适的生命周期，添加需要挂载的方法和函数操作

compiler 对象参数，里面包含了我们此次构建的所有配置信息，我们就是通过这个对象去注册钩子函数

compilation 对象参数，这个对象可以理解为此次运行打包的上下文，所有打包过程中产生的结果，都会放到这个对象中。

```javascript
class RemoveCommentsPlugin {
  apply (compiler) {
    compiler.hooks.emit.tap('RemoveCommentsPlugin', compilation => {
      // compilation => 可以理解为此次打包的上下文
      for (const name in compilation.assets) {
        if (name.endsWith('.js')) {
          const contents = compilation.assets[name].source()
          const noComments = contents.replace(/\/\*{2,}\/\s?/g, '')
          compilation.assets[name] = {
            source: () => noComments,
            size: () => noComments.length
          }
        }
      }
    })
  }
}
```



### 常见问题

##### 前端为什么打包

代码方面

* 体积更小（tree-shaking、压缩、合并）、加载更快
* 编译高级语言和语法（ts、es6、模块化、scss）
* 兼容性和错误检查(polyfill、postcss、eslint)

研发流程方面

* 统一、高效的开发环境
* 统一的构建流程和产出标准
* 继承公司构建规范（提测、上线等）

 ##### 如何产出一个lib

```javascript
output:{
    //lib文件名
    filename:'lodash.js',
    //输出到dist目录下
    path:disPath,
    //lib全局变量名
    library:'lodash'
}
```

##### 为何proxy不能被`polyfill`

例如class可以用function模拟，promise可以用callback来模拟，但proxy无法被任何语法可以模拟取代

















