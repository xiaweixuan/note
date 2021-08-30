## angular

### 工程总览

#### 工程创建

```shell
npm i @angular/cli
ng new project_name   ##创建名为project——name的项目
ng new project_name --skip-install --style css --routing false  ##只生成文件不下载依赖
ng serve   ##启动服务
ng build   ##打包
ng lint ##扫描代码
ng g c component/component_name  ## 创建新的组件
ng g m Home --routing##创建路由模块
ng add ng-zorro-antd ##ui库

```

#### 项目目录

```
--e2e  测试目录
--src  源码目录
----assets  资源目录（存放图片，音频等）
----environments  环境目录
----app  主要逻辑代码目录
--editorconfig  编码风格设置
--angular.json  项目的定义文件
--browserslist  浏览器兼容设置(css)
--karma.conf.js  测试文件
--tsconfig.*  ts配置文件
--tslint.json  静态代码扫描
--polyfills.ts  浏览器兼容设置(js)
```

#### 项目结构

项目是由一个个模块构成的。每个模块包括该模块内容与相对应的路由模块。模块内容包括一个个组件、指令、管道、服务。

模块分为根模块，普通模块，共享模块。

```
--根模块---组件一、指令一、管道一、服务一
|	   |--组件二、指令二、管道二、服务二
|-根路由模块
|-模块一---组件一、指令一、管道一、服务一
|	   |--组件二、指令二、管道二、服务二
|-负责模块一的路由模块
|-模块二---组件一、指令一、管道一、服务一
|	   |--组件二、指令二、管道二、服务二
|-负责模块二的路由模块
|-共享模块---公用组件一、公用指令一、公用管道一
	     |--公用组件二、公用指令二、公用管道二
```



以下是模块与组件的关系，组件是最小渲染单元。

```javascript
//在app.module.ts中，配置所有组件
@NgModule({
  declarations: [//本模块中含有的组件
    AppComponent
  ],
  imports: [//依赖的其他模块
    BrowserModule
  ],
  providers: [],//对内需要暴露的服务
  bootstrap: [AppComponent]//启动的根组件，入口组件
})
```

而一个项目通常是由多个模板组成的。

#### 脏值检测

###### 定义

脏值检测是angular的一个基本机制，他保证了当angular的数据变化时可以更新视图。

###### 触发脏值检测的条件

* 浏览器事件，例如click，mouseover，keyup

* setTimeout和setInterval

* HTTP请求

###### 如何进行脏值检测

他将组件按照嵌套关系生成以可组件树，递归的查询每棵树上的绑定数据的值，如果有变化则更新视图。

在有父组件和子组件的生命周期中

```
子组<------更新输入型属性
      |---OnInit，DoCheck，OnChanges
      |   更新dom--------->父组件
      |---脏值检测（完成后会引发下面的周期）
      |---AfterViewCheck，AfterViewInit
```

脏值检测的时候，angular会从跟组件开始循环遍历，查看所有绑定数据的属性值有没有变化，且进行两次。

这也指明了我们不能在AfterViewCheck，AfterViewInit中对绑定的数据进行更改，因为如果在此更改后，脏值检测完成后，触发AfterViewCheck事件更改了值，紧接着触发第二次脏值检测，检测到值不一样了会抛出异常。

###### 默认策略与onpush策略

以上说的为默认政策，默认政策时，脏值检测当出发的时候会递归的查询所有组件，有时候可能会影响性能。onpush政策可以使当触发脏值检测的时候，只检查本组件的input变量有没有变化而忽略其他的改变。而input变量有来自于组件外，所以，将组件设置为onpush政策使得该组件变成了一个笨组件(木偶组件)，只用于单纯的展示。

要设置成onpush策略我们要在组件逻辑ts中加入如下：

```javascript
@Component({
	changeDetection:ChangeDetectionStrategy.onpush
})
```

但需要主义的使，路由的参数变化在默认策略之下，不会销毁这个组件而是重用这个组件，所以ngOnInit（我们默认数据的获取写在这里）只走一遍，这在默认模式下面没有问题，但在onpush模式下会被忽略，从而导致在改变路由参数之后，再改回来的时候，数据会无法获取到。

解决方法，我们将`private cd:ChangeDetectorRef`引入到类中，通过再函数末尾使用`this.cd.markForCheck()`来告诉组件此处发生了变化，需要更新数据。

### angular基础知识

#### 条件渲染

*ngFor：循环渲染

```html
<ul>
	<li *ngFor="let menu of menus;
		let i=index;  //索引
		let first=first;  //是否为第一个元素
        let last=last;   //是否为最后一个元素
        let odd=odd;   //是否为第奇数个
        let even=even;   //是否为第偶数个
        trackBy:trackElement;   //提升性能，后面借一个表达式或者函数
    " >
        <a herf="#">{{menu.title}}</a>
	</li>
</ul>
```

*ngIf：判断渲染

```html
<div *ngIf="条件">
    条件为真的内容
</div>

<div *ngIf="条件" else elseContent>
    条件为真的内容
</div>
<ng-template #elseContent>
    条件为假的内容
</ng-template>
```

#### 事件绑定

```html
<a
   herf="#"
   (click)='function(){}'
   >
</a>
```





#### 样式绑定

* 第一种：当后面的表达式成立，`.active`样式生效。适用于单个样式

  ```html
  <a
     herf="#"
     [class.active]="selectedIndex===i"
     >
  </a>
  ```

* 第二种：自由度拓展性最强的绑定方法

  ```html
  <a
     [ngClass]="{'active':true,'first':false}"
  ></a>
  ```

* 第三种：嵌入式样式，会覆盖其他样式。常用于动态改变某个css属性。

  ```html
  <a
  	[ngStyle]="{'color':somecolor,'font-size':somesize}"   
  ></a>
  ```

* 第四种：js操作dom去绑定(不推荐使用)

* 第五种：js使用rd2去绑定

  ```javascript
  (private elr:ElementRef,private rd2:Renderer2)=>{
  	this.rd2.setStyle(this.elr.nativeElement,'display','grid')
  }
  ```

eg：

* 在组件中有一个伪类`:host`,他的属性定义会应用到他的宿主（也就是他所在的组件本身），而不是模板中的元素。

#### 依赖注入

当我们定义一个类之后，想要应用这个类中的方法，就比如通过new一个他的实例然后使用。但是如果该类被标记了注入服务，那么我们在声明他的时候就不用在通过new去创建实例，而是可以直接声明类型后去使用。此时该类也变成了单利模式。

```javascript
@Injectable()//声明可注入
class Product{
    constructor(private name:string){}
}
@Injectable()
class PurchaseOrder{
    private product:Product;
    constructor(private product:Product){}
}

ngOnInit(){
    const injector=Injector.create({
        //在声明自己函数后，在此将自己的函数创建实例，供别人直接使用
        providers:[//依赖池：在此声明所有需要供用的函数
            {
                provide:Product,//标识符
                useFactory:()=>{
                	return newProduct('haha')
            	}
            },{
                provide:PurchaseOrder,
                useClass:Product,//去new的东西
                deps:[Product]本类中依赖的类
            }
        ]
    })
    console.log(this.injector.get(Product))//可以通过js方式获取该类
}


//此后如果我想用Product类，可以直接通过private product:Product的方式，而不用new了。
```

在angular中提供了更为简单的方式，不用我们自己通过`Injector.create`自行构造的，再将类暴露出去之后，可以直接通过在模块中设置providers属性中设置。

```javascript
@NgModule({
	declarations:[],
	providers:[
		PurchaseOrder,//如果无需工厂设置可以直接只写一个类名
		{
			provide:Product,
			useFactory:()=>{
				return newProduct('haha')
			}
		}
	],
	imports:[]
})
```

除了在模块中自己设置angular6以后的版本中还有一种更简单的设置方法，直接在服务创建的时候自行声明

```javascript
@Injectable({
    providedIn: 'root' //root代表跟模块，也可以指定模块
})
export class Product{
    constructor(private name:string){}
}
```

如果我们要提供的不是一个具体的类，而是一个值，我们可以这么写

```javascript
const injector=Injector.create({
        providers:[
            {
                provide:'baseUrl',
                useValue:'http://localhost'
            }
        ]
})
this.injector.get('baseUrl')
```

但是在大型项目中，使用字符串做名字是很危险的，极有可能造成命名重复，所以我们创建一个token来确保他的唯一性

```javascript
const token=new InjectionToken<string>('baseUrl')
const injector=Injector.create({
        providers:[
            {
                provide:token,
                useValue:'http://localhost'
            }
        ]
})
this.injector.get(token)
//此后如果我想用这个字符串，可以这样声明：
//@Inject(token) private baseurl:string
```









### 组件

#### 组件的封装

* 通过` ng g c component_name`生成新的组件

* 在新生成的组件中创建index.ts并暴露此组件

* 在使用的组件中引入组件

* 组件可以使用其ts文件中selector作为名字在其他地方直接使用

* 结构目录如下

  ```
  ---component
  	---index.ts
  	---scrollable
  		---index.ts
  		---scrollable.component.css
  		---scrollable.component.html
  		---scrollable.component.ts
  		---scrollable.component.spec.ts
  	---app.component.css
  	---app.component.html
  	---app.component.ts
  	---app.component.spec.ts
  	---app.module.ts
  
  ```

#### 组件的通讯

##### 子组件--->父组件  事件绑定

在子组件中

```javascript
export class ChildComponent {
    index:-1;
  	@Output() tabSelected=new EventEmitter();
  	handleSelect(index){
        this.tabSelected.emit(index)
  		 	
  	}
}
```

在父组件中

```html
<child_component (tabSelect)="handleTabSelected($event)"></child_component>

export class AppComponent {
  	handleTabSelected(index){
		console.log(index)
	}
}

```

##### 父组件--->子组件  属性绑定

在父组件中

```html
<!--定义变量-->
export class AppComponent {
  menus=[1,2,3]
}
<!--将menus变量传给子组件-->
<child_component [data]='menus'></child_component>
```

在子组件中

```html
<!--接收变量-->
export class ChildComponent {
  @Input() data=[]
}
<!--使用变量-->
<ul>
    <li *ngFor="let menu of data;">
		{{menu}}
    </li>
</ul>
```

#### 组件的生命周期



组件在使用前需要继承相关接口

```javascript
export class ScrollableTabComponent implements OnInit {//需要先继承
  constructor() { }
  ngOnInit() {
  }
}
```

#### 组件的投影

```html
<!--父组件中-->
<child_component>
	<p>
        hello
    </p>
</child_component>
<!--在子组件中，被嵌套的内容会显示在此标签的位置,select选择指定内容显示-->
<ng-content select="样式/html标签/指令"></ng-content>  
```

#### 组件类中引用模板的元素

```html
<!--在模板中,用#做一个唯一标识,一下分别时去一个普通元素，一个自定义元素，多个普通元素-->
<div #helloDiv>
    hello
</div>
<app-image-slider></app-image-slider>
<img #img *ngFor"let a of lists" [src]="a.src"/>
<!--在组件类中使用@ViewChild选择器选择。ElementRef是html的一个包装类-->
export class AppComponent{
	@ViewChild('helloDiv') helloDivRef:ElementRef;
	@ViewChild('ImageSliderComponent') imageSlider:ImageSliderComponent;
	@ViewChildren("img") imgs:QueryList<ElementRef>
    
    handleable(){
		console.log(helloDivRef.nativeElement) //元素本身
	}
}
```

#### 组件的双向绑定

双向绑定最常见的作用就是，在我们更新input输入内容的同时，input的内容会不断更新在另外一处地方。

在此之前我们已经可以达到双向绑定了，通过事件绑定+属性绑定来实现。

```html
<input type="text" [value]="username" (input)="username=$event.target.value">
```

在angular中还有更简单的方法。[(ngModel)]=“变量”，这其实就是一个语法糖。

首先需要引入FormsModule模块。

然后可以简写为

```html
<input type="text" [(ngModel)]="username"> 
```



### 模块

### 服务

### 管道

##### 内建管道

* json管道：`a|json` 转化为json格式

* data管道：`a| data: slice:1:3` 切割第一位到第三位

* date管道：`a| date:'MM-dd'` 将日期转化为月-日的格式

* currency管道：`a|currency 'CNY' :'symbol':'4.0-2'` 使用￥前缀，小数点前4位小数点后两位保留数 

* async管道：异步管道，例子如下

  ```
  
  ```

  

##### 自定义管道

通过`ng-pipe`在vscode中创建模板

```javascript
//设置倒计时管道
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'appAgo' })
export class AgoPipe implements PipeTransform {
  transform(value: any): any {
    if (value) {
      const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
      if (seconds < 29) {
        // 小于 30 秒
        return '刚刚';
      }
      const intervals = {
        年: 3600 * 24 * 365,
        月: 3600 * 24 * 30,
        周: 3600 * 24 * 7,
        天: 3600 * 24,
        小时: 3600,
        分钟: 60,
        秒: 1
      };
      let counter = 0;
      for (const unitName in intervals) {
        if (intervals.hasOwnProperty(unitName)) {
          const unitValue = intervals[unitName];
          counter = Math.floor(seconds / unitValue);
          if (counter > 0) {
            return counter + ' ' + unitName + '前';
          }
        }
      }
    }
    return value;
  }
}

```







### 指令

指令分为三种：

* 组件：特殊的指令，带模板的指令
* 结构型指令（内建指令）：改变dom结构。例如ngIf、ngFor、ngSwitch
* 属性型指令（内建指令）：改变宿主行为。例如ngClass、ngStyle、ngModel



除了使用内建指令，我们还可以自己创建一个指令

```typescript
//创建一个属性指令
import { Directive, HostBinding } from '@angular/core';

/**
 * 指令可以理解为没有模版的组件，它需要一个宿主元素。
 * 推荐使用方括号 [] 指定 Selector，使它变成一个属性。
 */
@Directive({
  selector: '[appGridItem]'
})
export class GridItemDirective implements OnInit{
    contructors(private elr: ElementRef, private renderer: Renderer2){}
    ngOnInit():void {//注意修改属性的方法要放到oninit生命周期里执行 ，而不能放到contructor里面。
        this.rd2.setStyle(this.elr.nativeElement,'display','grid')
    }
}
```



如果单纯使用指令绑定样式和事件，angular提供了更简单的方法。

由于指令没有模板，所以他要寄宿在一个元素之上（宿主），`@HostBinding` 可以绑定宿主的属性或者样式，`@HostListener`可以绑定宿主的事件。

```javascript
export class GridItemDirective {
	@HostBinding('style.display') display = 'grid';
	@HostBinding('style.place-items') align = 'center';
/*
使用hostbinding绑定后，使得宿主的style.display与display变量相关联，同时变化。
*/
	@HostListener('click',['$event.target'])
   	handleClick(ev){console.log(ev)}
/*
使用hostlistener绑定后，第一个参数是事件类型，第二个参数是数组，写入数据依赖，当宿主触发了对一个事件后，会触发指令中的函数方法
*/
}

```









### 路由

##### 基本形式

通过`ng-router-appmodule`创建模板

```typescript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecommendContainerComponent } from './components';

const routes: Routes = [
    {path: '', redirectTo: 'home',pathMatch: 'full'},
    {path: 'home',component: RecommendContainerComponent1},
    {path: '**', component: RecommendContainerComponent2},
];
//''路径表示默认，**表示不识别的路径
@NgModule({
  imports: [RouterModule.forChild(routes)],//在此处导入模块
  exports: [RouterModule]
})
export class RecommendRoutingModule {}


//应用
//<router-outlet></router-outlet>
```

##### 路由的嵌套

当然路由也可以嵌套，加入home下面还有子路由,我们可以再子路由中设置

```typescript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeContainerComponent, HomeDetailComponent } from './components';

const routes: Routes = [
  {
    path: 'home',
    component: HomeContainerComponent,
    children: [
      {
        /**
         * 路由节点可以没有 component
         * 一般用于重定向到一个默认子路由
         */
        path: '',
        redirectTo: 'hot',
        pathMatch: 'full'
      },
      {
        /**
         * 路径参数，看起来是 URL 的一部分
         */
        path: ':tabLink',
        component: HomeDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}

```

##### 路径参数

拼接在url上面的，叫做路径参数

*配置*

{path:':tabLink',component:component}

*激活*

<a [routerLink]="['/home','/spots']"></a>

this.router.navigate(['home','/spots'])

*url*

http://loaclhost:4200/home/sports

*取读*

this.route.paramsMap.subcribe(params=>{})

##### 路径对象参数

形似`name=val1`的参数

*配置*

{path:':tabLink',component:component}

*激活*

<a [routerLink]="['/home','/spots'，{name:'val1'}]"></a>

this.router.navigate(['home','/spots',{name:'val1'}])

*url*

http://loaclhost:4200/home/sports;name=val1

*取读*

this.route.paramsMap.subcribe(params=>{})

##### 路径查询参数

形似`?name=val1`的参数

*配置*

{path:':tabLink',component:component}

*激活*

<a [routerLink]="['/home']" [queryParms]={name:'val1'}></a>

this.router.navigate(['home'],{queryParms:{name:'val1'}})

*url*

http://loaclhost:4200/home/sports;name=val1

*取读*

this.route.queryParamsMap.subcribe(params=>{})

##### 点击触发样式

我们可以通过`routerLinkActive`属性在标签点击触发路由的时候添加类名

```html
<a 
   [routerLink]="['/home']" 
   [queryParms]={name:'val1'}
   routerLinkActive="active"
></a>
```



### 网络接口对接

##### HttpClient

* 在根模块导入HttpClientModule
* 在构造中注入HttpClient
* 订阅后发送请求

```javascript
//在根模块引入后，在其他模块中也可以使用
export class HomeService{
    constructor(private http:HttpClient){}
    getData(){
        //通过泛型的形式，将他返回的数据进行格式转换，此处可以是string，也可以是其他自行定义的类型
        return this.http.get<string>(url,{
            params:{icode:123}
        })
    }
}
//http是一种异步操作
//这个时候getData返回的数据类型是
//在使用他的时候为
export class Home{
    constructor(private serve:HomeService){}
    let _data='';
    ngOnInit(){
        this.serve.subscribe(tabs=>{
         	this._data=tabs;   
        })
    }
}
```

##### http拦截器 httpInterceptor

在http获取到数据之前，我们先将其进行一步处理，然后再交给httpclient去处理。在请求和访问的时候都可以进行拦截。

在请求中，例如要为很多http请求统一加入一个请求参数而无需一个一个加。

通过`ng-http-interceptor`在vscode中生成模板

```javascript
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class ParamInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // 对请求消息进行处理
    const modifiedReq = req.clone({
      //将原来的req克隆下来，并为他加入查询参数
      setParams: { icode: environment.icode }
    });
    //交给下一个拦截器去处理，因为在angular中可能有多个拦截器
    return next.handle(modifiedReq);
  }
}
```

完成设置后，我们要在根模块将它引入

```typescript
@NgModule({
  declarations: [AppComponent],
  imports: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NotificationInterceptor,
      multi: true
    }
  ],
  bootstrap: []
})
```



同理，我们也可以拦截请求到的数据，也就是respond的数据。

例如我们要设置，当请求成功的时候弹出消息。

```javascript
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // 对响应消息进行处理
    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
        if (
          event instanceof HttpResponse &&
          event.status >= 200 &&
          event.status < 300
        ) {
          console.log('[此处假装弹出消息] 请求成功！');
        }
      })
    );
  }
}
```

完成后同样在根模块引入。

##### rxjs 响应式编程类库

###### 基础概念

rx要把事件或者数据看成一个流，随着事件流中的元素的变化随之做出相应的动作。

流的种类：无线、有限、单个、空

流的状态：next（得到流的数据之后的处理）、error（发生错误的处理）、complete（无论成功与否，最后都要执行的处理）

此外，所有的流都是异步的。

rx中流的类型用`observable`类型来表示。

rx最强大的地方之一，就是他拥有方便的操作符。

###### 操作符

在路由参数接受的时候，我们运用的就是`observable`类型，如下例子

```javascript
paramData;
ngOnInit(){
	this.route.paramMap.subscribe(params=>{
    	this.paramData=params.get('tabLink')
	})
}
```

使用在模板中

```html
<div *ngIf="paramData==='home'">
    <p>
        hello
    </p>
</div>
```



上面的代码中，我们获取到params参数中，获取到tabLink属性，我们也可以添加管道，通过操作符改造。

```javascript
paramData;
ngOnInit(){
    this.route.paramMap
    .pipe(
		filter(params=>params.has('tabLink')),
    	map(params=>params.get('tabLink'))
	)
    .subscribe(tabLink=>{
    	this.paramData=tabLink;
	})
}
```

应用在模板中同上。

但是在angular中，为了更好的兼容rx，我们可以直接将一个变量声明为流

```javascript
//当变量作为流的时候，我们习惯在命名上加上一个$用于区分
paramData$:Observable<string>;
ngOnInit(){
    this.paramData=this.route.paramMap
    .pipe(
		filter(params=>params.has('tabLink')),
    	map(params=>params.get('tabLink'))
	)
}
```

使用在模板中时，由于这是一部操作，所以在一开始的时候paramData和‘home’的数据类型不同，所以我们通过异步管道实现它。

```html
<div *ngIf="(paramData | async)==='home'">
    <p>
        hello
    </p>
</div>
```
