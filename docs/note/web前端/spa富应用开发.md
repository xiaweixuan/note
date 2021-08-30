## 前端的发展

* 1993年，出现表单，使得网页中可以有数据的流动
* 1995年，js出现，可以为网页添加一些动态效果
* 1996年，flash的出现，使得网页动画等动态效果称为可能
* 1998年，css产生，将网页的样式抽离出来
* 1999年，微软在ie5中实现了xmlhttprequest这个API
* 2005年，Google发布Gmail，采用了ajax技术，标志了前后端分离的产生
* 2007年，为了在手机端实现良好的网页效果，出现了网格布局等
* 2011年，h5发布，前端领域逐渐兴起

## 前端集成的方案

前端行业经历了这么长时间的发展，技术元素非常丰富，这里列举出一般web团队需要用到的技术元素：

1. `开发规范`：包括开发、部署的目录规范，编码规范等。不要小瞧规范的威力，可以极大的提升开发效率，真正优秀的规范不会让使用者感到约束，而是能帮助他们快速定位问题，提升效率。
2. `模块化开发`：针对js、css，以功能或业务为单元组织代码。js方面解决独立作用域、依赖管理、api暴露、按需加载与执行、安全合并等问题，css方面解决依赖管理、组件内部样式管理等问题。是提升前端开发效率的重要基础。现在流行的模块化框架有requirejs、seajs等。
3. `组件化开发`：在模块化基础上，以页面小部件(component)为单位将页面小部件的js、css、html代码片段放在一起进行开发、维护，组件单元是资源独立的，组件在系统内可复用。比如头部(header)、尾部(footer)、搜索框(searchbar)、导航(menu)、对话框(dialog)等，甚至一些复杂的组件比如编辑器(editor)等。通常业务会针对组件化的js部分进行必要的封装，解决一些常见的组件渲染、交互问题。
4. `组件仓库`：有了组件化，我们希望将一些非常通用的组件放到一个公共的地方供团队共享，方便新项目复用，这个时候我们就需要引入一个组件仓库的东西，现在流行的组件库有bower、component等。团队发展到一定规模后，组件库的需求会变得非常强烈。
5. `性能优化`：这里的性能优化是指能够通过工程手段保证的性能优化点。由于其内容比较丰富，就不在这里展开了，感兴趣的同学可以阅读我的这两篇文章 [[1](http://infoq.com/cn/articles/front-end-engineering-and-performance-optimization-part1)] [[2](http://infoq.com/cn/articles/front-end-engineering-and-performance-optimization-part2)]。性能优化是前端项目发展到一定阶段必须经历的过程。这部分我想强调的一点是 `性能优化一定是一个工程问题和统计问题`，不能用工程手段保证的性能优化是不靠谱的，优化时只考虑一个页面的首次加载，不考虑全局在宏观统计上的优化提升也是片面的。
6. `项目部署`：部署按照现行业界的分工标准，虽然不是前端的工作范畴，但它对性能优化有直接的影响，包括静态资源缓存、cdn、非覆盖式发布等问题。合理的静态资源资源部署可以为前端性能带来较大的优化空间。
7. `开发流程`：完整的开发流程包括本地开发调试、视觉效果走查确认、前后端联调、提测、上线等环节。对开发流程的改善可以大幅降低开发的时间成本，工作这些年见过很多独立的系统（cms系统、静态资源推送系统）将开发流程割裂开，对前端开发的效率有严重的阻碍。
8. `开发工具`：这里说的工具不是指IDE，而是工程工具，包括构建与优化工具、开发-调试-部署等流程工具，以及组件库获取、提交等相关工具，甚至运营、文档、配置发布等平台工具。前端开发需要工具支持，这个问题的根本原因来自前端领域语言特性（未来我会单独写一篇文章介绍前端领域语言缺陷问题）。前端开发所使用的语言（js、css、html）以及前端工程资源的加载与定位策略决定了前端工程必须要工具支持。由于这些工具通常都是独立的系统，要想把它们串联起来，才有了yeoman这样的封装。前面提到的7项技术元素都直接或间接的对前端开发工具设计产生一定的影响，因此能否串联其他技术要素，使得前端开发形成一个连贯可持续优化的开发体系，工具的设计至关重要。

以上8项，1-3是技术和业务相关的开发需求，4是技术沉淀与共享需求，5-8是工程优化需求。

## 常用工具

```shell
npm i -g htmlhint ##静态代码检查工具
npm i -g csslint ##静态代码检查工具
npm i -g eslint ##静态代码检查工具
npm - -g browser-sync ##热加载工具
```

## 自动化构建

#### github版本控制

* 创建github仓库,本地创建md笔记以及`SUMMARY.md`文件作为目录

* 初始化npm环境，下载gitbook`npm i gitbook-cli -D `
* 上传内容到主分支
* 打包`gitbook build`,打包后出现_book目录，进入目录，将此目录与本库的gh-pages关联，并上传。
* 通过访问`https://githubname.github.io/repositories`

#### 持续集成

* 在tarvis CI关联github，并选择要测试的项目，也可以设置环境变量

* 在主分支，创建.travis.yml，写入配置

* 上传到远程仓库，github会自动执行配置文件中的过程

#### 总结：

master分支中，有文章的md格式文档、summary目录、travis配置文件、依赖配置文件package（包含gitbook-cli模块）

gh-pages分支中，即为`gitbook build`打包后，`_book`目录下的全部内容

travis配置文件:

```markdown
language: node_js
node_js:
  - "node"

after_script:
  - gitbook build
  - cd ./_book
  - git init
  - git config user.name "${USER_NAME}"
  - git config user.email "${USER_EMAIL}"
  - git add .
  - git commit -m "publish gitbook"
  - git push --force --quiet "https://${ACC_TOKEN}@${GH_REF}" master:${BRANCH}

branches:
  only:
    - master
    
    
##ACC_TOKEN:token指令
##GH_REF:仓库地址
##BRANCH:分支名
##
```

#### 编译预处理

通常我们会使用一些高级语言进行开发，而浏览器只支持html、css、js基本代码，所以我们要在开发结束后，将高级代码预处理为基本代码。例如css的超集有less、sass、scss，js的超集有typescript、coffee script。

与上面相同，我们借助grunt的插件来将代码进行预处理。

以less为例

首先需要下载用到的插件

```shell
npm i -g grunt-cli   
npm i -D grunt grunt-contrib-less
```

编写`Gruntflie.js`文件，以下是基本框架

```javascript
module.exports=function(grunt){
	grunt.initConfig();
    grunt.loadNpmTasks();
    grunt.registerTasks();
}
```

在本实例中（处理less）写为

```javascript
module.exports=function(grunt){
	grunt.initConfig(
		less:{
        	compile:{
        		files:{'dist/compo;ed.css':"css/*.less"}
        	}
        }
	);
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.registerTask('default',['less:compile']);
}
```

在终端`grunt default`完成构建

#### 静态代码检查

属于静态的白盒测试。

检查要素：规则、开发工具检验、命令行工具、Grunt插件、配置文件。

###### html静态代码检查

创建`.htmlhintrc`配置文件,填写要检测的规则

```json
{
  "tagname-lowercase": true,
  "attr-lowercase": true,
  "attr-value-double-quotes": true,
  "attr-value-not-empty": false,
  "attr-no-duplication": true,
  "doctype-first": true,
  "tag-pair": true,
  "empty-tag-not-self-closed": true,
  "spec-char-escape": true,
  "id-unique": true,
  "src-not-empty": true,
  "title-require": true,
  "alt-require": true,
  "doctype-html5": true,
  "id-class-value": "dash",
  "style-disabled": false,
  "inline-style-disabled": false,
  "inline-script-disabled": false,
  "space-tab-mixed-disabled": "space",
  "id-class-ad-disabled": false,
  "href-abs-or-rel": false,
  "attr-unsafe-chars": true,
  "head-script-disabled": true
}
```

安装`grunt-htmlhint`模块，编辑`gruntfile.js`。

```javascript
module.exports=function(grunt){
	grunt.initConfig(
		htmlint:{
        	option:{	
        		htmlintrc:'./.htmlhintrc'
        	},
    		src:['*.html']
        }
	);
    grunt.loadNpmTasks("grunt-htmlhint");
    grunt.registerTask('default',['htmlint']);
}
```

在命令行通过执行`grunt`命令行下进行代码检测。

###### css静态代码检查

填写`.csslintrc`配置文件。

安装`grunt-contrib-csslint`插件，编辑`gruntfile.js`。

```javascript
module.exports=function(grunt){
	grunt.initConfig(
		cssint:{
        	option:{	
        		csslintrc:'./.csslintrc'
        	},
    		src:['*.css']
        }
	);
    grunt.loadNpmTasks("grunt-contrib-csslint");
    grunt.registerTask('default',['csslint']);
}
```

在命令行通过执行`grunt`命令行下进行代码检测。

###### js静态代码检查

JS下与上面两种同理，用打的是`grunt-eslint`插件,在命令行使用`eslint --init`初始化文件`.eslintrc.json`.

修改配置文件`gruntfile.js`。

```json
module.exports=function(grunt){
	grunt.initConfig(
		esint:{
        	option:{	
        		csslintrc:'./.eslintrc.json'
        	},
    		src:['*.js']
        }
	);
    grunt.loadNpmTasks("grunt-eslint");
    grunt.registerTask('default',['eslint']);
}
```

在命令行通过执行`grunt`命令行下进行代码检测。

#### 单元测试

属于动态的白盒测试。

程序中的错误种类，语法错误、逻辑错误、运行时错误。

软件测试主要针对于逻辑错误。

测试框架有很多，本文讲的测试主要基于mocha框架。

###### 后端单元测试

以一个`add.js`为例，其代码如下

```javascript
/*add.js*/
if(process.argv.length!=4){
	console.log('sum x y');
    process.exit(1);
}

var x=Number(process.argv[2]),
    y=Number(process.argv[3])
const add=require('./calc.js')
console.log(`${add(x,y)}`)


/*calc.js*/
function add(x,y){
    if((typeof x)==='number' && (typeof y)==='number')
       return x+y;
    else
       return NaN
}

```

在程序中测试的目标是某一个函数，所以我们真正测试的是`calc.js`

安装环境` mocha `（测试环境）`chai`（断言库）

```shell
npm install -D mocha chai
```

创建`test`目录，用于存放测试代码，进入目录创建`calc.test.js`并编写

```javascript
const add =require("../calc.js"),
      expect=require("chai").expect;

describe("加法描述",function(){
    //测试用例,一个it就是一个测试用例
    it("0+0=0",function(){
        expect(add(0,0)).to.be.equal(0)
    });
    it("1+0=1",function(){
        expect(add(1,0)).to.be.equal(1)
    });
});
```

在命令行下输入一下命令进行测试

```shell
node_modules/.bin/mocha
```

这样就完成了一个测试代码的编写，但是用例写的是否好是测试代码的关键，为了病假单元测试设计的好坏，引入了覆盖率的概念。

覆盖率分为四种：行覆盖率、函数覆盖率、分支覆盖率、语句覆盖率

为了查看测试覆盖率，引入以下依赖

```shell
npm -i -D istanbul
```

在命令行进行如下命令,通过`istanbul`进行`mocha`测试，在结果中可显示覆盖率

```shell
./node_modlues/.bin/istanbul cover ./node_modules/.bin/_mocha
```

当然这是的手动去测试，我们也可以借助grunt的插件去自动化测试。

###### 前端单元测试

对于前端，我们测试的也是js文件中的逻辑部分即方法、函数，以下面的js文件为例

```javascript
/*reactange.js*/
$(function(){
	var $width=$("#width"),
        $height=$("#height"),
        $btnCal=$("#calculate"),
        $perimeter=$("#perimeter"),
        $area=$("#area");
    $btnCal.click(function(){
        var w=Number($width.val()),
            h=Number($height.val);
        
        var react=reactangle();
        $perimeter.val(react.perimeter(w,h));
        $area.val(react.area());
    })
})
/*util.js*/
function reactabgle(){
    return {
        'perimeter':function(w,h){
            return 2*(w+h)
        },
        'area':function(w,h){
            return w*h
        }
    }
}
```

在前端`index.html`中引入`util.js`

接下里要生成前端测试环境，安装`mocha chai `

使用`./node_module/.bin/macha init test`生成前端测试环境，生成test目录

创建`util.test.js`

```javascript
var expect =chai.expect;

describe("矩形面积测试",function(){
    it("area(10,5)=50",function(){
        var r=reactangle();
        expect(r.area(10,5).to.be.equal(50))
    })
})
```

将`util.js ` 和`node_module/chai/chai.js`引入`test`目录下的`index.html`

此时打开页面可查看结果,接下来继续完成自动化测试

下载依赖`grunt grunt-mocha`(前端插件时`grunt-mocha`后端是`grunt-mocha-cli`)其中`grunt-mocha`要安装`^0.4.12`版本

配置`Gruntfile.js`

```javascript
module.exports=function(grunt){
    grunt.initConfig({
        mocha:{
            test:{
                src:['test/index.html']
            },
            option:{
                run:true,
                reportor:'Dot'
            }
        }
    })
    grunt.loadNpmTasks('grunt-mocha')
    grunt.registerTask('default',['mocha'])
}
```

在命令行下运行`grunt`查看结果

###### http接口测试

假设我们有一个接口

接口：`http://localhost:8080/reatangle?width=20&height=20`

返回结果：`{'code':200,'reason':'查寻成功'，result:{'area':400,'perimeter':80}}`

创建test目录，进入创建`app.test.js`文件编写测试代码

```javascript
const http =require("http"),
      expect=require("chai").expect;

describe("接口测试",function(done){//done是引入mocha的异步机制
    //测试用例,一个it就是一个测试用例
    it("正确请求格式测试",function(){
        http.get('http://localhost:8080/reatangle?width=20&height=20',function(res){
            var result="";
            res.on('data',(chunk)=>{result+=chunk})
            res.on('end',()=>{
                var rect=JSON.parse(result);
                expect(rect.area)to.be.equal(42);
                expect(rect.perimeter).to.be.equal(26);
                done();
            })
        })
        
    });
    it("1+0=1",function(){
        expect(add(1,0)).to.be.equal(1)
    });
})
```

安装`mocha chai`,通过`./node_module/.bin/mocha`进行测试

接下来进行自动化改造

安装`grunt grunt-mocha-cli grunt-run`

编写`Gruntfile.js`

```javascript
module.exports=function(grunt){
    grunt.initConfig({
		run:{
            api:{
                option:{wait:false},
                args:['./app.js']
            }
        },
        mochacli:{
            option:{
                reporter:'spec',
                bail:true
            },
            all:['test/*.js']
        }
    })
    grunt.loadNpmTasks('grunt-run')
    grunt.loadNpmTasks('grunt-mocha-cli')
    grunt.registerTask('default',['run','mochacli','stop:api'])
}
```

在命令行执行`grunt`进行测试



#### 性能优化

优化的常用手段是`压缩`和`打包`

###### 压缩html

下载插件`grunt grunt-contrib-htmlmin`

编写`Gruntfile.js`

```javascript
module.exports=function(grunt){
    grunt.initConfig({
		htmlmin:{
            options:{
                removeComments:true,
                collapseWhitespace:true
            },
            files:{
                src:'./index.html',
                dest:'dist/index.html'
                
            }
        }
    })
    grunt.loadNpmTasks('grunt-contrib-htmlmin')
    grunt.registerTask('default',['htmlmin'])
}
```

在命令行通过`grunt`命令进行打包

###### 压缩css

下载插件`grunt grunt-contrib-cssmin`

编写`Gruntfile.js`

```javascript
module.exports=function(grunt){
    grunt.initConfig({
		cssmin:{
            'rectangle.min.css':'rectangle.css'
        }
    })
    grunt.loadNpmTasks('grunt-contrib-cssmin')
    grunt.registerTask('default',['cssmin'])
}
```

在命令行通过`grunt`命令进行打包

###### 压缩js

下载插件`grunt grunt-contrib-uglify`

编写`Gruntfile.js`

```javascript
module.exports=function(grunt){
    grunt.initConfig({
		uglify: {
          			'dist/index.min.js': 'index.js'
      		}
    },
    })
    grunt.loadNpmTasks('grunt-contrib-uglify')
    grunt.registerTask('default',['uglify'])
}
```

在命令行通过`grunt`命令进行打包

###### 压缩图片

* 选择合适的图片格式，不同图片有不同的问题
* 选择合适的图片尺寸，不要放超过展示尺寸的图片
* 选择适当的压缩格式
* 关键性图片设置优先加载（设置延迟加载）

下载插件`grunt grunt-contrib-imagemin`

编写`Gruntfile.js`

```javascript
module.exports=function(grunt){
    grunt.initConfig({
		imagemin:{
            files:{
                expand:true,
                src:['images/*.{pmg,jpg,gif}'],
                dest:'dist/'
            }
        }
    })
    grunt.loadNpmTasks('grunt-contrib-imagemin')
    grunt.registerTask('default',['imagemin'])
}
```

在命令行通过`grunt`命令进行打包

###### 打包合并

下载`grunt grunt-contrib-concat`

编写`Gruntfile.js`

```javascript
module.exports=function(grunt){
    grunt.initConfig({
		concat:{
            js:{
                expand:true,
                src:['index.js','util.js'],
                dest:'dist/main.js'
            },
            css:{
                expand:true,
                src:['css/*.css'],
                dest:'dist/main.css'
            }
        }
    })
    grunt.loadNpmTasks('grunt-contrib-concat')
    grunt.registerTask('default',['concat:js','concat:css'])
}
```

在命令行通过`grunt`命令进行打包

###### 合并子图

下载`grunt grunt-spritesmith`

编写`Gruntfile.js`

```javascript
module.exports=function(grunt){
    grunt.initConfig({
		spritesmith:{
            file:{
                src:['images/*.png'],
                dest:'dist/bundle.png',
                destCss'dist/sprite.css'
            }
        }
    })
    grunt.loadNpmTasks('grunt-spritesmith')
    grunt.registerTask('default',['spritesmith'])
}
```

在命令行通过`grunt`命令进行打包,`sprite.css`中写了各个图的用法

#### 自定义一个grunt插件

下载插件`grunt`

编写`Gruntfile.js`

```javascript
module.exports=function(grunt){
    grunt.registerTask('build','build task',function(){
        console.log('build task')
    })
}
```



























