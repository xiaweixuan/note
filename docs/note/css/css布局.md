## 居中布局

### 水平居中布局

##### text-align+inline-block

```html
<div class='parent'>
	<div class='child'></div>
</div>
<style>
    .parent{
        width:100%;
        height:200px;
        text-align:center;
    }
    .child{
        width:200px;
        height:200px;
        display:inline-block;
        /*
        block:块级元素 
        inline:内联元素 width与height无效
        inline-block:结合体
        */
    }
</style>
```



##### table+margin

```html
<div class='parent'>
	<div class='child'></div>
</div>
<style>
    .parent{
        width:100%;
        height:200px;
    }
    .child{
		width:100px;
        height:200px;
      	display:table;/*block也可*/
        margin:0 auto;
    }
</style>
```



##### absolute+transform

```html
<div class='parent'>
	<div class='child'></div>
</div>
<style>
    .parent{
        width:100%;
        height:200px;
        position:relative;
    }
    .child{
		width:100px;
        height:200px;
      	position:absolute;
        left:50%;
        transform:translateX(-50%)
    }
</style>
```



### 垂直居中布局

##### table-cell+vertical-align

```html
<div class='parent'>
	<div class='child'></div>
</div>
<style>
    .parent{
        width:200px;
        height:600px;
        display:table-cell;
        vertical-align:middle;
        /*设置文本对齐方式top middle bottom*/
    }
    .child{
		width:200px;
    }
</style>
```

##### absolute+transform

```html
<div class='parent'>
	<div class='child'></div>
</div>
<style>
    .parent{
        width:200px;
        height:600px;
        position:relative;
    }
    .child{
		width:200px;
        position:absolute;
        /*
        如果父元素开启定位，则相对父元素进行定位
        如果父元素未开启定位，则相对底页面进行定位
        */
        top:50%;
        transform:translateY(-50%)
    }
</style>
```



### 居中布局

##### table-cell+margin+vertical-align

```html
<div class='parent'>
	<div class='child'></div>
</div>
<style>
    .parent{
        width:200px;
        height:600px;
		
        display:table-cell;
        vertical-align:middle;
    }
    .child{
		width:100px;
        height:100px;

        display:block;
        margin:0 auto;
    }
</style>
```



##### absolute+translate

```html
<div class='parent'>
	<div class='child'></div>
</div>
<style>
    .parent{
        width:200px;
        height:600px;
		
        position:relative;
    }
    .child{
		width:100px;
        height:100px;

        position:absolute;
        left:50%;
        top:50%;
        transform:translate(-50%,-50%);
    }
</style>
```



## 多列布局

### 两列布局

左定宽，右面自适应

##### float+margin

```html
<div class='left'></div>
<div class='right'></div>

<style>

    .right,.left{
        height:300px;
    }
    .left{
        width:300px;
        float:left;
        /*使用浮动以后，元素将脱离文档流*/
    }
    .right{
        margin-left:300px;
    }
</style>

<!--优化-->

<div class='parent'>
    <div class='left'></div>
    <div class='right-fix'>
        <div class='right'></div>
    </div>
</div>
<style>
    .right,.left{
        height:300px;
    }
    .left{
        width:300px;
        float:left;
        position:relative;
        /*有定位的元素显示层级高于一般元素*/
    }
    .right-fix{
        float:right;
        /*在设置float以后，默认宽度为0,且可以由子元素所撑起*/
        width:100%;
        margin-left:-300px;
    }
</style>
```



##### float+overflow

```html

<div class='left'></div>
<div class='right'></div>

<style>
    .right,.left{
        height:300px;
    }
    .left{
        width:300px;
        float:left;
        
    }
    .right{
        overflow:hidden;
        /*
        overflow将开启BFC模式，当前元素内部环境与外界完全隔离
        在不加overflow属性时，right与left在一行，但right会覆盖left且长度为100%;
        */
    }
</style>
```



##### table+table-cell

```html
<div class='parent'>
    <div class='left'></div>
    <div class='right'></div>
</div>
<style>
    .parent{
        width:100%;
        display:table;
        table-layout:fixed;
        /*列宽由表格宽度和列宽度设定*/
    }
    .left,.right{
        display:table-cell;
    }
    .left{
        width:300px;
    }
</style>
```



### 三列布局

```html
|-----------------|
|-----------------|
|	|  |	      |
|	|  |     	  |
|-----------------|
|-----------------|

<!--此处的三列布局为定长、定长、自适应）-->
<!--三列布局的实现与二列布局相似,常用方法也有三种-->
<div id='left'></div>
<div id="center"></div>
<div id='right'></div>
<style>
    #left,#right,#center{height:300px}
    #left{float:left;width:200px}
    #center{float:left;width:200px}
    #right{margin-left:400px;}
</style>
```



### 圣杯布局

```html
|-----------------|
|-----------------|
|	|	     |	  |
|	|	     |	  |
|-----------------|
|-----------------|

<!--圣杯布局中间的三列布局（定长、自适应、定长）实现-->
<div id='left'></div>
<div id='right'></div>
<div id="center"></div>
<style>
    #left,#right,#center{height:300px}
    #left{float:left;width:200px}
    #right{float:right;width:200px}
    #center{margin-left:200px;margin-right:200px}
</style>
<!--float特性说明
	center必须放到最后。因为float的特性是，他的兄弟元素中，前面一个元素必须为浮动，否则它会自行另起一行渲染。也就是如果将center放到中间，right会另起一行渲染，和left、center不在同一行内。
-->
<!--缺陷
	这种布局使得center放在最后，所以会在浏览器中最后渲染。而作为页面主要内容的center往往需要最先渲染，即将center放在最前面。下面将进行改造。
-->
<div id="parent">
    <div id="center"></div>
	<div id='left'></div>
	<div id='right'></div>
</div>
<style>
    #parent{height:300px;margin-left:300px;margin-right:300px}
    /*如果子代全是浮动元素，父级元素会出现高度坍塌现象*/
    #left,#right,#center{
        height:300px;
        float:left;
    }
    #left{
        width:300px;
        margin-left:-100%;
        position:relative;
        left:-300px;
    }
    /*margin-left后移动到上一行的相同位置，开启定位，使用left纠正位置*/
    #right{
        width:300px;
        margin-left:-300px;
        position:relative;
        right:-300px;
    }
    #center{width:100%}
</style>
```



### 双飞翼布局

```html
<!--与圣杯布局相同，它优化了left与right定位后带来的副作用-->
<div id="parent">
    <div id="center">
    	<div id='inner'></div>
    </div>
	<div id='left'></div>
	<div id='right'></div>
</div>
<style>
    #parent{height:300px}
    /*如果子代全是浮动元素，父级元素会出现高度坍塌现象*/
    #left,#right,#center{height:300px;float:left;}
    #left{width:300px;margin-left:-100%;}
    /*margin-left后移动到上一行的相同位置，开启定位，使用left纠正位置*/
    #right{width:300px;margin-left:-300px;}
    #center{width:100%}
    #inner{margin-left:300px;margin-right:300px;}
    /*center虽然占满全行，但inner元素为真正使用的中间元素*/
</style>
```

### 等分布局

将一行分为若干列，每一列占比相同

##### float实现

```html
<div id='parent'>
    <div id='col1'></div>
    <div id='col2'></div>
    <div id='col3'></div>
    <div id='col4'></div>
</div>
<style>
    #parent{height:300px;}
    #col1,#col2,#col3,#col4{
        height:300px;
        width:25%;
        float:left;
    }
</style>
<!--增加间隙留白-->
<div class='parent-fix'>
    <div id='parent'>
    	<div id='col1'></div>
    	<div id='col2'></div>
    	<div id='col3'></div>
    	<div id='col4'></div>
	</div>
</div>
<style>
	#parent{height:300px;margin-left:-10px;}
    #col1,#col2,#col3,#col4{
        height:300px;
        width:25%;
        float:left;
        /*box-sizing:border-box使得padding的空隙为向内扩展，而非向外扩展*/
        box-sizing:border-box;
        padding-left:10px;
    }
</style>
```



##### table实现

```html
<div id='parent'>
    <div id='col1'></div>
    <div id='col2'></div>
    <div id='col3'></div>
    <div id='col4'></div>
</div>
<style>
    #parent{display:table;width:100%}
    /*设置为table，默认width为0*/
    #col1,#col2,#col3,#col4{
        height:300px;
        display:table-cell;
    }
</style>
<!--增加间隙留白-->
<div class='parent-fix'>
    <div id='parent'>
    	<div id='col1'></div>
    	<div id='col2'></div>
    	<div id='col3'></div>
    	<div id='col4'></div>
	</div>
</div>
<style>
    #parent-fix{
        overflow:hidden;
    }
    #parent{
        display:table;
        width:1424;/*宽度为100%+10px*/
        margin-left:-10px;
    }
    /*设置为table，默认width为0*/
    #col1,#col2,#col3,#col4{
        height:300px;
        display:table-cell;
        
        box-sizing:border-box;
        padding-left:10px
    }
</style>


```



### 等高布局

一行划分为若干列，每列高度相同

##### 使用table

```html
<div id='parent'>
	<div id='left'>dhkadhwkjhdkahwdkhkawj</div>
	<div id='right'>       ewrqewrdhkadhwkjhdkahwdkhkawjdhkadhwkjhdkahwdkhkawjdhkadhwkjhdkahwdkhkawjdhkadhwkjhdkahwdkhkawjdhkadhwkjhdkahwdkhkawjdhkadhwkjhdkahwdkhkawjdhkadhwkjhdkahwdkhkawjdhkadhwkjhdkahwdkhkawjdhkadhwkjhdkahwdkhkawjwer
    </div>
</div>
<style>
    /*基于table的默认设置，单元格默认是等高的*/
    #parent{display:table}
    #left,#right{width:300px;display:table-cell;}
</style>
```



##### 使用padding+margin (伪等高布局)

```html
<div id='parent'>
	<div id='left'>dhkadhwkjhdkahwdkhkawj</div>
	<div id='right'>       ewrqewrdhkadhwkjhdkahwdkhkawjdhkadhwkjhdkahwdkhkawjdhkadhwkjhdkahwdkhkawjdhkadhwkjhdkahwdkhkawjdhkadhwkjhdkahwdkhkawjdhkadhwkjhdkahwdkhkawjdhkadhwkjhdkahwdkhkawjdhkadhwkjhdkahwdkhkawjdhkadhwkjhdkahwdkhkawjwer
    </div>
</div>
<style>
    #parent{overflow:hidden;}
    #left,#right{
        width:300px;
    	float:left;
        padding-bottom:9999px;
        margin-bottom:-9999px;
    }
</style>
```

### 多列布局

一行多列，每列元素等宽

```html
<div id='parent'>
	<div id='col1'></div>
	<div id='col2'></div>
	<div id='col3'></div>
	<div id='col4'></div>
</div>
<div id='parent2'>
	<div id='col5'></div>
</div>
<style>
    #parent,#parent2{
        column-count:4;/*有多少个子元素*/
		column-width:300px;/*子元素宽度*/
        /*column:4 300px;*/
        column-gap:15px;/*设置间隙大小*/
        column-rule:5px red double;/*设置间隙边框效果 */
    }
    #col1,#col2,#col3,#col4{
        column-fill:balance/*设置高度 auto根据内容自适应，balance根据内容最多的一列为准*/
    }
    #col5{
        column-span:all;/*横跨所有列*/
    }
</style>
```

## 全屏布局

### 全屏布局

html页面铺满整个浏览器窗口，有滚动条

```html

|-----------------------------|  -->定长自适应宽
|-----------------------------|  
|	  |						  |  
|	  |						  |  -->（左）自适应长定宽、
|	  |						  |     （右）自适应长自适应款
|	  |						  |  
|-----------------------------|  
|-----------------------------|  -->定长自适应宽
<body>
	<header></header>
	<div class='content'>
	    <div class='left'></div>
	    <div class='right'></div>
	</div>
	<footer></footer>
</body>

<style>
    html,body{margin:0;overflow:hidden;}
    header{
        height:100px;
    	position:fixed;
        top:0;
        left:0;
        right:0;
    }
    .content{
       	position:fixed;
        top:100px;
        bottom:100px;
        left:0;
        right:0;    
        overflow:auto;
    }
    .content .left{
        width:300px;
        height:100%;
        
        position:fixed;
        left:0;
        top:100px;
        bottom:100px;
    }
    .content .right{
        margin-left:300px;
        
    }
    footer{
        height:100px;
    	position:fixed;
        bottom:0;
        left:0;
        right:0;
    }
</style>
```

## 视觉差布局

**什么是视差滚动效果，如何给每页做不同的动画？**

- 视差滚动是指多层背景以不同的速度移动，形成立体的运动效果，具有非常出色的视觉体验
- 一般把网页解剖为：背景层、内容层和悬浮层。当滚动鼠标滚轮时，各图层以不同速度移动，形成视差的
- 实现原理
  - 以 “页面滚动条” 作为 “视差动画进度条”
  - 以 “滚轮刻度” 当作 “动画帧度” 去播放动画的
  - 监听 mousewheel 事件，事件被触发即播放动画，实现“翻页”效果

css实现图片不滚动

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>css视差滚动</title>
    <style>
        body,
        html {
            height: 100%;
            margin: 0;
            padding: 0
        }

        .box {
            height: 100%;
            position: relative;
            z-index: 1;
        }

        .flowImage {
            position: relative;
            height: 500px;
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center center;
            z-index: 1;
            background-attachment: fixed;
        }

        .flowImage>p {
            margin: 0;
            /* position: absolute; */
            position: relative;
            top: 50%;
            left: 10%;
            color: #31202f;
            font-size: 30px;
            transform: translate(-10%, -50%);
        }

        .bg1 {
            background-image: url(images/4.png);
        }

        .bg2:nth-child(2) {
            background-image: url(images/1.png);
        }

        .bg3:nth-child(3) {
            background-image: url(images/3.png);
        }

        .bg4:nth-child(4) {
            background-image: url(images/4.png);
        }

        .bg5:nth-child(5) {
            background-image: url(images/2.png);
        }

        .bg6:nth-child(6) {
            background-image: url(images/1.png);
        }
    </style>
</head>

<body>

    <div class="box">
        <div class="flowImage fixed-bg bg1">
            <p>
                lalal
            </p>
        </div>
        <div class="flowImage fixed-bg bg2">
            <p>
                lalal
            </p>
        </div>
        <div class="flowImage fixed-bg bg3">
            <p>
                lalal
            </p>
        </div>
        <div class="flowImage fixed-bg bg4">
            <p>
                lalal
            </p>
        </div>
        <div class="flowImage fixed-bg bg5">
            <p>
                lalal
            </p>
        </div>
        <div class="flowImage fixed-bg bg6">
            <p>
                lalal
            </p>
        </div>
    </div>

</body>

</html>
```

元素岁鼠标方向轻微移动

## 网格布局

##### 容器本身的属性

>### display
>
>* grid：块级盒子
>* grid-inline：行级盒子
>
>### grid-template-cloumns,grid-template-rows
>
>* 100px  1fr：fr可以自适应剩下的空间
>* repeat()：重复次数repeat(3, 33.33%)
>* auto-fill：单元格固定大小，容器不确定，但尽可能容纳多的单元repeat(auto-fill, 100px)
>* minmax()：长度范围的最小值和最大值minmax(100px, 1fr)
>* auto：由浏览器自己决定长度
>
>### grid-gap `<grid-row-gap> <grid-row-gap>`
>
>* 行间距、列间距
>
>### grid-template-areas
>
>自行设定位置
>
>```css
>.contain{
>    grid-template-areas:
>      "fw . . . ."
>      "dz rz yyr zs jl"
>      "lx rz yyr zs jl"
>      "cc . . . .";
>}
>.fw {
>      grid-area: fw;
>      color: gray;
>}
>.dz {
>      grid-area: dz;
>}
>.lx {
>      grid-area: lx;
>}
>.cc {
>      grid-area: cc;
>}
>.rz {
>      grid-area: rz;
>}
>.yyr {
>      grid-area: yyr;
>}
>.zs {
>      grid-area: zs;
>}
>.jl {
>      grid-area: jl;
>}
>```
>
>### grid-auto-flow
>
>划分网格以后，容器的子元素会按照顺序，自动放置在每一个网格。默认的放置顺序是"先行后列"，即先填满第一行，再开始放入第二行。
>
>* column：先列后行
>* row ：先行后列
>* row dense：紧密填满，尽量不出现空格
>
>### justify-items(水平),align-item(垂直),place-items(结合)
>
>项目的子元素在项目这个容器的位置
>
>![img](https://www.wangbase.com/blogimg/asset/201903/bg2019032516.png)
>
>* start：项目的内容对齐起始边缘
>* end：项目内容对齐结尾边缘
>* center：项目内容居中
>* stretch：项目内容拉伸
>
>### justify-content,align-content,palce-content
>
>所有项目占容器的位置
>
>![img](https://www.wangbase.com/blogimg/asset/201903/bg2019032519.png)
>
>* start：对齐容器的起始边框
>* end：对齐容器末尾边框
>* center：容器内部居中
>* stretch：拉伸占满
>* space-around：每个项目两侧间隔相等，项目之间的间隔比项目容器的间隔大一倍
>* space-between：项目之间间隔相等，项目与容器无间隔
>* space-evenly：项目之间、项目与容器之间间隔相等
>
>### grid-auto-columns,grid-auto-rows
>
>一些项目的指定位置，在现有网格的外部。比如网格只有3列，但是某一个项目指定在第5行。这时，浏览器会自动生成多余的网格，以便放置项目。该属性指定多出来项目的大小
>
>![img](https://www.wangbase.com/blogimg/asset/201903/bg2019032525.png)



##### 设置项目属性

>### grid-column-start 属性， grid-column-end 属性， grid-row-start 属性， grid-row-end 属性
>
>项目的位置是可以指定的，具体方法就是指定项目的四个边框，分别定位在哪根网格线。
>
>```css
>.item-1 {
>  grid-column-start: 2;
>  grid-column-end: 4;
>}
>```
>
>![img](https://www.wangbase.com/blogimg/asset/201903/bg2019032526.png)
>
>### grid-column,grid-row
>
>`grid-column:1/3`等同于`grid-column-start:1,grid-clumn-end:3`
>
>### justify-self 属性， align-self 属性， place-self 属性
>
>`justify-self`属性设置单元格内容的水平位置（左中右），跟`justify-items`属性的用法完全一致，但只作用于单个项目。
>
>`align-self`属性设置单元格内容的垂直位置（上中下），跟`align-items`属性的用法完全一致，也是只作用于单个项目。

## 弹性盒子

##### 容器属性

>#### **flex-direction      ——** **定义子元素在主轴的排列方式**
>
>* row：主轴为水平方向，起点在左端。
>
>* row-reverse：主轴为水平方向，起点在右端。
>
>* column：主轴为垂直方向，起点在上沿。
>
>* column-reverse：主轴为垂直方向，起点在下沿。
>
>#### flex-wrap —— **定义子元素在一条轴线排不下时如何换行**
>
>* nowrap ：默认值。规定灵活的项目不拆行或不拆列。
>
>1. ![img](data:image/png;base64,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)
>
>*  wrap ： 规定灵活的项目在必要的时候拆行或拆列。
>
>1. ![1 αααααααι  αααα ](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOsAAABECAIAAADvIlW5AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAADkkSURBVHhe7X0JnF1FlXdt976ll3R3OjtZSQJJgEACBEgIiCAgDuIg6Dgq8zmjIqjjjBuKy6iIKCPjjKKi+KkIjIIyOo4bIFsgbAFCNrLva6fTe7/37r21fP9T93V6e50gjfzG39d/Ko+7VJ06VXXqLHXr3ubOOTaCEfzFQpT/P4IR/GViRIJH8JeNXi+iUFiXHoxgBH8RyOfn4reCBHNO/5wd8ZBH8L8FkEkuOINI9pHJyhKMrMa4YtFEsTBW4kJ6dxg4XOfwSfUFyL7qBFO8umRfRbzqTT6MP0dnvooEneAmE9p8XkopDktsBQnmnGtj21qTJIqzbFdg9jGnh8EKSGPigEDouGKuiw7dMBvmHFx3J4TIOZcwm5QvDxPcOp5xIsN1AVOY5nG5V14x0EzLVNZaQyc24RRyDIeoZ4kbxwImA+a6uYN+GR5JgqPGyiw6wLkiOrZ8eVjAGCsrFccAOUNnwwJaKLUcWxLTZJCtGyXDjLCWblTWwa2tcZLY+tz+KrtV2AIJIXkVrwzOWsGEtKWdLD6oRp1gWCCdr/yVA+Ut09IUn5LZyTycijk2zB4CnAucbdLFDbLqFMmyJCp8mKJBU9V0rk57T9TMFdoyLl+5NqBug0JwJurSydogf4qQeeqM4QLjG5jOtc5FomaBYFBYwwdaHpuup1luLgsbpWd9GHDOYHxqSq7xUDRFqHxDQyAECeZACS4WX4pKurXN1JinayYt5rkThi8ZANgv7P8N73iuevbn7HCmQw/ALvRax7rrqidcHDSeQ9JWvvPKAQpRx+rizh/WHH+jUFmqY3hEURq6t7jp6ypbg9Ps5PdxS8rolesjP0ooHnWs6d7xH6Nm3aKy1cPnEwCBwpbbIqfrZl5bvjQ8gKBNurrWXqemfiBbP2/YDDJoXIm5dfDXpUMrWjN/XVsr8nkFuU0luNdqQLYSjUleypVWwetQjAWwWEMlumuRQKnntEKSMCKgnMTWFAXyMz0gw+GkkCwR9DQtjpX1lAcnawSLRVIUpiTpCor0z9CTpHV9iOAgTb0ZDieyx9oJkwQO6h1XhqjaOWnNYT4H3e1NaA5oOm255UjoTHT00F2athqdYwbd6kkonv6CgVjALaE+P9IYoe0Go6Pgy1g6Hdwof91LgIt44gn2z9AvMRRP+fSjM3TzqbFWcxPD3g5Fsw8RSjRSg/KkyQsGRpxB/WXilYp1aBjdPtOinwQ70hKGsxiBn780dCJ9IHzq8Wz73u1J0BE+IQ9q9dp+UJ7eBNuAehFz4peOB2VIU2pQe0/73BqY4HwSez4zGCAeBuWh5BmDK4xUOUNPAmsSvKVtH3S3fyp3EZH1TA5JuYeacqmbMWQiNnFAhHDqj4dOaDuoUV8iDbqbJs8S8el75sgE8c/TSkfH0+2f4XCivCRKPceVEhqBEKksQiAIRgfl6ZuIDlyHGAmi3Be9EtwHaYkySO4cra0ZZ2AJ4ShBr1rdrTt3Ru2bksKe2ES4iFwW/orP7VMZZVokR+lRCspDVC1okkg6kCzt1yDYsTlJmmnMMTdwFdX2L9mDwy3rB9AEqygOJo2N4u6dScdG3b3LmC5/UYCao/iPjENfEH9pbNQHqYvlHTHiE2V00pJ0bjJdG3Rxnyb7RrrBmgQ008z9QCZoEJ9EjuImkCQmkUxRd+8utb2UdG9LTEQ06To1npB2TyXQzfSAatJ+lKjtGI7INkedW+L2zUl8AAEveEBWZ7UzaAtOB2NgZxI1m1j0oj/VzCXxnlLn+qRzq9GdqRj4Acd9qtfnOgoou4mIMuYqwlLTlhS2xh0bTGG3RgdSQ3oaTYeDaVYY9IoSPADa8YixxHKJmVU8+FjXqg/Fj1/gli+2yxezx88qLn9DccMnTNdKK/1E9v2YlixX2DsfD/OEPkd3RpGQcdLZve37hWcu0U+8zi0/2y1fqpctLTxzWWnn7ZFpScqeyGGSKXACgp55Il4G8hjGY86jjhej1Z+LHz+PLVvMlp1pH18cg+bKa5KDy5GBhKNPKYD4I/o9lqcH0AxE00lt43jPzwvPvT0Bk4++zi1bYpefU3jyDd3rbykUD0QyMAZD3D8MIoIWegYJR17JEKAF0HRYum4pks4NXWs/3f3UJeaJpeax89hjr7PLLiy8cG3S/CwGWcMBIWlE+/s1vgLQHB3BD4qtLuz/Q/zclezxpe7JJfbRs+2ji0vLL+zY8NWkuFMLpXkCIR5EjwxB+fAwMCcgv0xGxR1dm/49WX6he3wJe2yJXbbYPnZusuKdpb2/N9YaLiw8pVSFHw3OxiBouSg0P9m+6lr9+Bvs40vQmaBcWn5+ac11SfuahGiReJTLAGXi+B3EJGPyX/7lX9IjY5oj+PNxVKVfFPVLRNjQkx0lneUZU9ptV1/P1v1TvulJEe+WpkPpAk/ag+IO0bTc7P2FEVrWn0kOm9UCJoxKoqBI2je4ZG+u8XW4wGny4So0K0tERh+4Xz3/Hrnlu5muzTJuxrBy28Wj5qBtA9/3a9bymM0ez2umkmzCvYEd8YUhBNGBBzO1s2XVDLQuFQ5MHORwNnKbb+bPXyOafheWdnHdIUyRmQ5R3K9aV7g990CJytFncpmjGPawWGGaFvcnHS9mx57HRYYulu+Af67b1+o1H1IvfTFoWRsmTcJ1GdPNo5agc5s8eD/b+98uaBQNpwgmSeR6ehlHUfPjKszjOBy1ML1IcEkiBTcJ2/w1/vy1wf7fZQrbpW6ToitI2nVxh2x+1h34qYn38LoFXI0SLuHwLVN+wEx0IG5ZkRnzehXk/IXUuCWxzLqu1XbVB+Xaz8nWNSpqlkmXZEWZHBLdW9m+B03T/U7Vs1GncGZFz6pIKnpx6zMYkPyYM+iSBw05GBXK7fxP99zfi7138a6tIm4LHDqzy5X2ubbVcu89unMdGzVXZsf6vkS5nrabUtT0oKpfFOTGlS95LjGFTNIUr/lssOYjonm5Ku5VpouWvCBFXTtY0xNu368wv3n9aUwE5H95onSFC13YyDtXFDJniaAqm4VHwYJgDO4eRQejWs1MwkNT2KJfeIfa8q0sj2VGCgSHXBq4MiJE8C7DIBs1i1XXF9d+QLsO48QAZ8UD3FDPQKmRVRaK7f0pX/E21fJ0kAmcCg10PDQkYiARsDDLlZRNT5kVbzP7fp6Q7JIqHgroQcyJki7plR8Qaz8d6oMizJKpQjnwiGhGBEoFoe0KN369+MI7Y5gt+KfpuuIQwBAiIDCtz4hn/zq/675QcZUNBFfoTfLrITlK8DAMSxvZyqv0lm9ECF5MwZq4XH4IOB5irsWr/lGtvT6b7AuzgQlBMoA/iIBFSqZyImM71YZbSyveFZcOaJYxWvvp2SMMPcAFC0NvE80D0/6UfuZt2V33gZ7KKCszTCgr4LBIJ2WYF1Vd68QL77RbvmElAiSgwgh5IP4kz0FzYTbdxFb+rSpuDHhIK1ioznvXgeQQAaWSzN573FNvLrU/Dz2FMR2KJDSOtcUEVqW4I3n2HZmt3whZdzbE8CDUJLFAuMZCIfIy1Hvluk+YNR+ySQl1eT1wpDECjiLBICK55EnRvfCRcO8ymaGOpsbDx4QakQ2JyJHGZQni7Szs5aYfxBtugfBVMCsYcvh0EBqMhgzswcf4Cx/Ildos5AqGPYk1qypVzS7lpsFdF6ZEjn5G5JK97Pl/FIdWOJEp06kIzoywcv0X5LYfSYXjDGKyKFsbh8dG1XPjsMEYeEEJZE5Kntv+G7bqI9ZF5UBmCKB+27GVPfd3QcdGHuKcTDV+YTmtyjtej16XcLFUJkDzV33K7fkFk9U9Jm9IUP+t/Zza/L0AfY9YnUE0R8WZXKKqdVBjVS2F+9C6GZXZ92Cy7r0Os0JSQJgW7wfkc9pI6bp3uJV/F7a/BMkCowIa0SQabprLJUEtx5zAkCk0wok1H7e77qZyGIxKzSeT5oXG7vgeX/v50AYYTeRPVI0TVVbktKiKZV0cZlGPgrLp3GKfu9oVDiAcG6rtGBzrAq67GKSo6WEZhhQQOpdIbXIYoIXFqimYiDKBS6KUYmrr9+Otn0e/0JQgPo+Eo0gwAJ2YbLvNNf1PAAVEPqSEe6/rThMn/kie/YSd8h6rNQbXOQn5CNGOTV83LQ+R80cOcZkIgY5JdzlaCzpk1306KLaxDEw2RMKVjv17ft4Kdf5K8bpVdv6dUTiRbAd6HH0U7zVrPoNwJyVTCehxbpruE1u+FoADLpWJEj7aLfpv+/rH3LkP83OfKB37fxIXCovucTLL5J77zPa76VF7JVCoAc0Gspu/zNpfcmGajcxDYnU8/mK+ZLld8pBtONVoC5EWIghZib90ne3cBHXoW1oG9FKqmvAPsxcn8YEH+NZbFKSJgmuGoFKf+PXkrGfd0hfZ0nVsyRO6ZibZIszfUFTt/HW860dWhGhU/1CAWKIgD9Gn4XbjDdmWDSJDkxwWF65uUjXVnfRtfc7z/JwX3eyvxj7mwgApjNbGT5VKO6A1+xMsg+jyIO7ezDd+PitidJdITDJqAVv8jDlno1m6zi5e4RYvt/O+qWnTgYV2zrQ8G2/6YuJNGroupdMX3MEmBIXd3wn2/TJQqIG8yIjXmBO/bs5d7pb8hi1eZmd/0Ygq0BAQJBmoDd80zctgByDZFCwPjaNLcJQc0ntuR9+QEYOfZxNzzFv14mXsmDcHtcfJbKPENW9UaYQhPbrLbr8dkk6jMKA9GBbyB6RrfpS1PsVDIV2i/BIHz08X0Sax4sPywP2ZKW9j098NDUK6hKOrQ9b2iG19rExkAGiiQoqM2/UThZhCZFCK+lZ0uu3fF8vfyZ58u4GNnvOvLjMZyh4tAAvQambHfzjTXnEMQQ0KwHasZLCSIRkDuu5YBOufGS/n3izrTlL1J6tgFAkmNxAiobhs32b2/5w0oCdTBk7Sc4oydQkyt/P2wCBOIC2EiwqCUAdStXznD93eH9u996q4xRtQ6j9lmdh5FzOH0MO45Pkg+DMCWbOO1WzfvbTK5xK4jrAKNjeJn/prPvlKte+nduun3YFfUFgifLtDHnbs1NvvQIRIPVcB3jLt+Zno3A9XUcB3lTzgBVFaHcQvqtJKxg6quuNFdiy3CF4hEeSwsP33Jl0bUXtFTwLNsfHBYOtPIL20Dgc/BUM+5o1qxj+7Hd9jD10gmh4Njv+sHXM6TQDIkpAqKfKd36fgmEKLinyWcXQJ5q0vBu1bBFQLAAahFTv32XUfT174MDw+NMDn8kBFHC4yV4eWu+6dvicq1I1Lbu8fAkSlVLuFnMKnCtd/0S2/zG27nW/9d1xVNXNkT2myoTpxBx72pQeB8nAb7RWHVjmFHoRSs0yyTGQzm+7gzQ+75ocRhVA/wLXzYoEiNDZdq0z7Cz2S0BekN5EvPvBHGXWh02lcaBjg2zgx+3MuGF3a9k0IORmZchupFRAS3rRM+JlbERgYV9jJWh5X3qWkgiREFDPwtjV21Zf4858Rq74ouvdzOJ1EFpOdyfYVtuPFijQxtTDFdfMfZamdQhIoQS4j6+JJ77b188wLf29WfYFvulPteSj0Bg1F8I/8jOaHKcAlbTIYkMyS2f97H3Kj5fDOpWhfz596q3j8jfzRt4jmJzFH2LZvpT4sqXKmwu6DomkF6gAXKZW+oD5qXSfaN8MElq+gKFwmDHTSyrtXM32IQwchpCtzWEIoxJv/aIqbJHyq3glbARXb0AOK+plo3xjoyJCzDWAi26BtWXbTN4NoF84lpgnuUJSF2WMFiyF5QbRXl/aQzAysmewWd1p0bqCHPFSEGoPISLk443VnMu5CqAd78CHKTk0H+1bBCnWsxLwlAiRPZbr4nyFzz1znjky0H8xABeEimi1ZZMedGZ95FzvnaVG3VK//ooSzSJJBgABLOACd24nJtGWHARqYhcjTsR5DDI2KYzBqNNNjLhYzPhC/dL1sWa6VjE1M8aPxc5t0B+PRNmvayswNAI2ulMUdqnTAs+85QRf4R/x89Ov0ecv00v9OZlwRu/QRngf62ySsY50/H0g4HVoVbUOoSsCJS9BEWXcKGaVjrnbnPK7P+n089a8LtPpM1pjmI0Kxwi5XOoiGVoY+oIrbfW3IAglCnKPhnhp0bsMcMeVafeh+tf9h6ksKakkGwLFqe4ZmCY3OQIASL21hvJiuRAEwQWz/fXrPT9zcm8Ub1rCp/1B86aPy4NOIudDTNC8RI5QO8sIBhKEY8QpEe9DTU0MjStqof9I+Im78kyMF1UgejW9megekqE3I4OBpsIiyDqoZ+RGtJ6alJy+aRBvmcEMDU9+mZl8f7f9Pt/uuw04qXARUYXQnEStf6wNfhUnaHGLLnrsgZ7iG3hVRIKJOkRxSk95q6o/nNNsImgIJFOtITweATDbEOOlK6ZHnDknNTmAnfa14aDnfficLRmMeJrzKBIHz4kNKBfXC9fGb0YYE7Sjr1ykYM77lRrbxE0HrM6JmTrDwZ3rym1yi/SCWs/IkGoooZRKlw90CZ5nigLAGbrZ0LfzQI7LmOLbwLjdqSaou0mycFvj7sdEXGBWEKuUTAo0EdSlm28x/4mGV3Pw9WqfpUQdlUpZGfCiyiKB6eATQC47HiSy2C91iYZKCKpGf5YIaX7pMAc6GQBSLYof5roQjSXBKSYU5b3jSMxhOeG6kF5zugrIs0mMbDDmmt0Qjac7S1jEwRc0uLwBR2bQ4HcGvlSrv7TnuIg6CIsMYsWjqW9X877u99wRP/5+wqK0P1AEKQcCoHJXSIr3Q00ii5hnjQdZJchpBjq6RWQ9U+5Nqxdv5o+frtde5MUvE2MtoxccDpTAPjajxNAciFUch894HQ5MxeCxpPCOoPSGoni3Of0Ece71MSmLh9/mx/yQSepABwaExdzmY1HId/QGa6COLQKocG/hcUMuGq+2/YC/d4lZ+NHnxWgp1Ry8lrsrNpC5lIkuZy2X6AVeszlCeFJTZCc0SV9BrPiGe+4zd/Fkms+HoRRqmync/0XV5kufB5DwMgnWovp671BlQsrHjo+fLY94VN90vDv6OlCW1GJkoH9qkwzx6v5/k9wA54C1jxH33oxsQaTo+6yo384Nu5cfYA6dHW24R069Nxl2KutFwyuGYZkLzKlSDUKiHlwo4kgSnd23VDKtCr7KQvELMHmMmvEGOPguCrWvnuOkXmtx0H7nhH+lTK8eI7LjDXZA2EkidJC6Uq5kFOshK3MLAGZVMv1LOv51HB82un4nGRcmk85iEHimXIltdPYu8x8FA+zDNEHqHYyngpgFCj5tI5LuyU2WukddNZA0LQcnG+8o2DPkNxFKx3BSiOIgq3GVqWs0s6A34eQaGXsGbWqvXfFps/g+7627d/gy5vQceci3PGbKMpLYo6siOkbK2Z5r0Aw0b9FB2is2M8+1KM6FuGVdNcvlGPmpM2PAG6qDCZkikXz7DRLNOZl3NXJqXvkBf4Aq1Kze9/DicHqhIxFes7Xkha2Xjhbq2StSeBRMfF7YKBZqUD5lsdowI61KBGgyuGpLwmD730K2aemT6NVpm+ab/UEmpx0Kmufy2jurpXjFUoEmXshNdGJB6I7apYps/AYwZdlDqAuvajRvCL5iSXiMrz5J8o81NRuHBDe+LI0kwhAGFxaj5OjPebyomUsJo3nAWW/xbPuem0CX5Yy4PTv09G3O2X1GA8EJDM1e70FVNZzCzg5qDK7jGx0JA4VcpvxjkbDYrZn9WBqNUvjY8/Yd68aNu/reZqi33DwApbjy7fNwfcK1onSk/La4+SSR+8qLLIEy1i+TSJ9zZT7qlT9up/4DAlu//rY+QqBA9L62aKevmD2KQ6sI/kJFjzrZBBpNH0hIHgpXNavNX1OYvhWtvkAd+aVRObLtV7v8jlxkigvgH/2s8C2F0z7j2B9StdiJ3LKtb5LWwd3Yt2j5OLPqVO/dpuWSlOO59duutYtvd5CYSFYoodfVMNeqkdNQHgLxoRBGjz3QyA4VIG9EwhVF0149Z6xP85H+TFzyrZlxltv9A7PmDEAGRgIhB1dSfLoJaH01WAA+qwtHn93hDNDkh83HDfDvxKtb0gGy5X8DEkt4gEFdoRVjLGhbTulF5MvUDOJK1J9n8lN6egVLYfSfr3s4X/Iyfv07OvZE1/V42/8bLI9gMYORZ7amyajLmMMzqEYQ4HdEhgZKZ/BRxzFUxrZxQl9mA27Yn+dOXsqfepJ+6iD11iX72YnfgUfLnMIyIY2Vopr83ZBkB5z+VGNr5D0oQNFAgixc2XhLXnqhpFwuVk9aZtdfapy62z7zdPv0WufxyseZqZ9toDoFmYk3d6arhfM/RYFAmwQM19T3wXqjDca54EG2IN33J7rhZbPiseuKicOU1maSZHihRDtquIqf9ncg0Hu7SXmDSY4gQjzacyca+2cQQZ6lo0ZcFkAIhVIazQ4+5Zy9BdBJkoZ4jy0P0uKkdLyf+DaTTT/wy4BSkrhQuUncgwpxyZeQkLLVXXJwnbWLTN9yGm93GL7onL+CrP5i1bRISIpRxIcJHNu4KF4yuKGyQXmG1GnWybrw4Scg80x5IGYjiRvfMZea59+kNt7on3qJWfSDHCxJKSFDgG+UnqmPeBYtfoe0eFJlNucxkGqC1YCmpOUIGcYE991ax8iNgXcBRIeWEYYV5DKOElcZfpupOwqSsLFDo8NwEM+FvoDhovY8FSvKg9XH35BvE8+83W24VL14VrrhCFA/AslG3WBvzkE25OkB/+64bglNCxQr7Af2ipv9zPO5MWr2nfuSisFfu/S3bfz/b9xDf+6Da93tV2kVhJqpCCDf13WrCpUTXj9wgkGUU2bFm7nWWo1cxRBKWL3PgMdDhUGn7HhL77xMHHqHgHxSMizM5MefzPFtXJlAJpDMnvsVNvsoaKAfaES27do7aclu47btix49k6+OSgjcwRT4ri5wbe46c8j4x9EtKYN1yZWZ/LKkehziRBoFEm2qi5xfd2zO7fptN9sGb5ohENKISxmdfJ0bNxYQrkxgEJwyziZj4Njftb2ITkXMNCXYdYs+dxOf224KmpwNc8uuI5MrrKJpwlpp+TdmFG9SdPp9hMhfMuaFUPQXeJRQ9PZ2EwEXNud0/C6HRm+6n2BFzwi+Cw0qZ4z4l6k92Jh5KLJwuubpTzJyPFEjz0yIvLRV2b5H7/psVNgiIdLkkcSVsZBumBXM+oWg3b2WSuI65I2f8UzL6LHpQKDCVaIFadW+Su+5Wu74Z7rs3SIpSBJAgamwcuel/K8a/icS3shT14ugSDD9Q5uoy878VjzqeJjouSUS7mTDgYchlgFpDTmtT2pRsdMwbs3O+7J9KVWgMmPGJC+uqJryDn3BTEf1KG7WMkCG6PYDuDEAcApiFrEBhxCJUc77Kxr1RUCRSAZ4eNVJyJebeZMdcaErMJbCoGZtRXCpFT5IFiSMZbYHRiRsWqJO/J8L6ofonvQbLIEedJk+8tZgfRfEXLDZCCowm+gCDGkjLQtLLmmrT0z8STP0ALQVAlIfoc8imYjIAnyfdYsZdHKN50EmcFA1XXAQBegAjm7AQdt6WdFR/glrwA5VrpIABJoDkuAwyZ/7/nAeIN+SoeeEp34pz42wCFeLDatSWCRSZjICWUjjYdEV04cz3qmnvp/iZB0MJB1hRiBJmfFJM+Rgabsg/IvWEkfGbnkAe/YneoGfqSdgojv+OqpqHAfcWt3KHBtaqXIM8+dtxzYmmaDCVoYkhPfRUS0KhBxaqwIjEuiiGFJ0fzvsqJrMvO0Rv9uDoEgz6EGJeu4Cffp+edKnfXxBzG1FDMD9RrY1NjMg8LM66Njj1TnpaQ6v9R6iYHsug38WxH5Pzf5Bkp1tDm+JI1aU0UdxA0JIkN8MuuIPP+BCF96SZhgTuwYPh2UZ++p3RzPdGNmPjkoxpBRPX0dnOOI0plph46lvZGb8QNbPhT2B4y+UrwT89isXEy/mCX8e1Z5Roa4WxBhNBQ5royYUFi6VSUOtO+Iac8680kwnlJZTBICMADYbOlGOChXdEs95fROcVE8x+qEnpEDagB7RJIh3bZPL56rR7ZPZ4WsSix2mVgTtk5iGR4/6KL7y3MHpBUjJoKUScm0RwCzvDk0SXdEE2mJNu5HP/TVlDz6G8fitT6Q/ydUiZh+6kG/Tcr0SizuiSiOF1+CetcJBBvwS7o7vrz3Cn/ZebeJFFuEDEKhMkLYP4APWOms8X/SKecHGcOIswySQSraMBSliCyRKVbGhmfUguvJuFY8hhfxl4mbsrYX41LS9M+ut41DToI24LUpdI3sK8zU3T4y52c7+qjv2QElkBW0b77smjh/nAZB28u5KUCEUhztYvFGMuMiKXiETYEm2p5hwemB51qpl6VTDvZtm4lHaWea+rrDPoOcvA3ZWg6z1sJ1SVGP9Xov40WkRwXbR9B/NBZExuUjz2HDbn+mD2F7iq98FZP6kYvLuSCEINI+CsnqEmXu4yYxOuOYaO3CkIao3OzYynXiFP/JqceLkiPxmarpcmlEzF3ZWkwm1BBHVq3CWs8QwobeM60XBtY6fyIpykG89l8z4jj/uyyI4XulvQpghqIxWuuLsSvxBYm8jqaXziFaZ6grMFKyDIXstnanXVcXrS5fLEW8JJV0Ifw1Cgc3xB/FDPDt5dCXCGEWFuzDm28SKjMsIVOS9iBpODnm209YvMcR9Vc28QtXMCiCb6qm/bB+2uRG2oS8AzzI0Rx1xqqmdqoaWNrSuRYyPzpvYYO/aNYt5XgmM/JGQeuoMmkW8d2oaiQ+2upLb7KlgUvdTeboqd7WOKP1bTP6mqju0/75GNyPnFT+OK23Wx1bGSgmGpmmiDST07x7wgpVyTvTGay+6dv7Ldz9Yf/wVcKD+d7oGDHUoXUONWU9iX2EPoUqnGysxkEVb1MFCuOoX1b0O0rLmuZsIbw7HnQ8jSlR2fqTcn7fgv7rel3ZaEIMurxovsVHQIJlA/Fj2Qt9TyQmHXj+vmfYnLGuqetO9Scj1UI1twxd2u2IzppDI1PDNWhWNwE32c9nVfoGEd62/KVI3GcdWU96YXewAWQLNMO473uMIeG3XxbEZljuHhVMT6dJ9ErZcsjRTnpfYXuzZ/t2bujdlcPa4MqBfTBgWNLrjSPhM1wXEQ4VgRTlTZBnQm9U+fpqfFUaRzy7eS2DTO+cfyjR4QD/4X0EmLKe5lMYXXPDeWZY4JZC4doDRbX+i4tWPNJzPTP5SvP3HArTQ7tKt1iSju0/FezDSuqlhuvMxMgnDQk39vIA7nhp+J2Lp08H/43u8013xU5cfW1UmY1YFveh4NZYr0Eh9sVu5YUX+qaFjCR50m5MQgObwpdoBsHA3QcQh9oCaDelY3VzacLeqX8urjOYJ8aPgyXhZFn6k3J61LQ4eBSajexkU8N5Ucekt8DsHi4ep6Uc7Xk125QOVnq/qzZN0ZtnoeLB0tHZIKqEjwCAALvUWkmhTUnR6OOy+sXSwzU1N3iX4GzYqjAkMDv06KLBRQdvSZmcbzVO0JMqwnTevv/0mcpnnTRTcuG1jVCbxxiRy9WGVnKRscHqAhSFboTw/KjtFBZ5r8FFZ7hmpYGoxaGKqJKoF1x8T/01pdQYJpOQO/3trR6sfhBNVLrgn1K/zLAE48Imu6kmBse7JRnt5ELg7iUEH7hdEiGm/Q6SXotQYpAu50YHXGmIyJlY39omVPtsMpZYAIwJvEf3DLwGlPXX3ykNvLE87BXqJMoqxON89beuzaJ3NP8mKIyAxKCloKKNPpn83AwYF1k1wL+DwOx1QFrpd5SLNR/EkjAc4s9EnPi2ZE1d8dlDRnJSILn5s+ERIRtQHdmLaI6NNSN3w0YpFkZBBB3KHhMRxWmBqeBCyRwm9pGkTTFyfmMEQ4IeJUxWAm0T+w41pxDE0i6estCZxB+FhePAZlRv0OjoUydDoUTRIbclQQVGCYcMBjDn+KRoAa15uN3t3yA03Wo4K4Dr4EZhOnEJTgHlwbWjIvJ3hQYJyWQRAmUlRNgbWQcNQQ9/Zkozy9SQYwVFaRu46c9HaA95H7E1REUCj4sPSKggwppTtiyzT75QdvtNOHXF/80r7G8vU+eVAWgYhEmI84X1JA7h/zoCKf83DmnkR7KYMqGyT0CIPCn4rZwGoWjMGiSUTrtOgQ+Ii+lwEyUVwmQtH7ORgMiRCbUchOwwV73dOEPglccZF19Fmj0FE/ZOj6gG70LUIi7aQyiYAU++fM/fMg0Use1HbQCal2Efg36tHtQ9H0AsA5htBPCd/S/tkcNRB+s6KBJg4pUSdQdSjeLzNCgQQSJ3L4h4iCdEIlmn64A8nQjbQ0jJ6kNxhEhhaUPGN9MmPUiA7j+E2DqH7o7wd36EJH19jSbQV1vGHVECm6RzPfo8cU9aBH2/e93C+Pox3lPAn0Dmf2mdyZcFlpJh0u0eewDH+3l0h6ehj+Oilzx4Pu5SI7vaTGUxfRlBhU9sjwmQ/bVCgS6Q6F8XqdW5I4Scra0/EKrQ9S4ocvDqgLc6p8RHSN0Nmu1SIYhdNS1XzSJX+qgeyDMidcSXNQda2Ias7mAjEiGPAavheHVZK/TqWQUHGFbimPPFe5rme0CEz1QoQt/soAmhWRUgZApZc4+gAyJ2wx2/FAnD3VBROggOlGZZpleehzN+W/L02SUM5UEO+ods8fyH1wgB/cX4LbdaGze1z8bRvONaIeyji99YrhKDpHGLlX6AM2twBmhQQOlaZtfyVASQ1dJNpfcLlGE8yEZAyDWsoKEgzEoaC0Pqk6lV7go31U1C0wymm2lw+UoPkEEyuVitar4mpc9K8H9/N9XyGckzJQQZBEEfwKujIcmj2NCzI5HCdx4VXgkHoAKluqIGd0iV7hfjVaDapKSRnW7s5co6rG1dXRAumfGsmNYAT/GzFAB5tiZ1tj6Y7Msf/CsxOHPx/Jz0ecsu+3ovB09bFfwGnZSAyDtNc8rH31x2vGvykYc44/e4UgXVk+ZEnn+mj796rn3sT9nriUw1cwv72+KB8Xtn4v1/ULHCiv5HrM9rBBe4DRDcMfnz4Ab6+GAu6HtC+GTxWM0TMAxHm5o+ngtDJEvqaEGzCI/RPCJ8ROGFwf8qanA1O/IvTgADJndJwgmgZlxDNUSU+GIYikVVAt6ZXD+Skpl9B3XxIEqn5pjNYYBiZMnUFEcDAwG4UYvgvAkk26jIm4Q4KA0F6kAT1ANOEFlVMvnxinvtlQioImtJXWpON0PYfmMWX3hIeVqB3E18Drw0ygSYsLg64PL1E3DLr4ChIJkY87KwHVDABccVz008d7bj2JBJCSVyScQI9dkSieRY70LrqhTyl0NX58EVxHxE9nNC3Tuz1FkIGGvocgblImX8oX7EeT5IY+2qCox4la/7s9ZMs14YKnSVTozsDMaGo5Oelc+rQFl8sXD2dL4XcvUUppEn0/CT2TfTIfzk8bu9KzcluGnVJqNKSDbg0npdTS3/+1qTIwDEcFlfdSBjVKW0AN7YzYo7teKLU/o7s2WnoNCXJU/uZUT5EyykdEIz3qC1poRMEEcZQpmMKOqO3FqG1VUtxlTAlBIC2m9C6FlOFPITSVYltwmd4XIoF2jptt56ao9cWkc60tHQAh55/eWWpIRQy8TDOL/qNg0QpO23uiXbpjVdS2UndvMLodMYsRYBL/aZpxI3jN0V+C0zE4rHPKINm1RhsRGNtd2nln9PRb3MPnukd8enRpvGwxfUWr6Y9F4W21X9NO0aMl6YeO+ooIEeWaB0nn9uSlz5rHLrKPLeXLznaPLjGPLYmXX5ys/xJ9WQccEj0U7Cnrq6DnCAPYpBz03AKqPt7/YLTib82joLbYPrLUPbJUP3p2ccU7CrvvKpkSrbCkgXxfQH16+e4FyNEigtFOxckhu/mW5IkL9MNL2aPnuUfOjh87N378vNLaj0SdL8R+5xfYKhccwWuIo+tgr4eclaHt3OBWXCWfe1duzy9lYbOyHVmWsOSA6lgnd97lnrrErf2wdW30wCKV3KFhoQYhalLq3Xfr5a8P1t2g2pbJaGfAOjOiU5V2ZpsfCdZ9zjz+Br3/d1B+9AGSwTLXH+ATttzErcXV19inLsvuuFt2rLf2YFZ1StfKC5uzu/8zWP5Ou+JK173Dcrjolpp2JNB8oO8dHnqMPXmRWPPRsOkhWdjObXuWd2WS/bLt+XDdv7vHzzNbbrZWgM9yuRG8hji6BBtrS1zFHWvYM1fw3f8VBMzmQ3qZlR4papQXUnAV5mwUbLhVP/ueOD7klbD/6SchGGBSpeQYWPoqltl2K3/26mzX1kCCD1DJpH6plfCJyeGkzyituDzZ8R0ouSMLG25qCFzcZJ57Z37jd7Ks28FZVQz+MiwKPVpU9B0xqVhm16/diiuSrvXQ7tZE5fKV4SIhkwO/ss9cETSvoEV3ehwJh1obKRAF0mPogOULbeGLn4jXfcq6Am2+JGelXH4ErwGOLsEYJZsccivfLztWizB0LqT9pmFVPOYMPfqCpHYGRJw2fyilAi73/JK/dD1idY+K7iasLbcqY/f/nK/5qLSdRlWXquclubEUtZPLYVlsu6tmF8ZcqhsXqig2L/6zaXrAHnEvLxwV+ujImusye39rFdOZ8a52BmN5mi/kvDuelJjMJKOPS6rGidbn3MoPM93m5JB7eQlcqNY1dtX7VKlJc2FrZpncBCJI7xxBuHncMC+uP1fXnaaFCjbcHG29HfcSm6CFZQoj+PPjZehgZNl6S6ZpOQsULSRpo/NT7an3stMfsIvuNIuX6anvJWVMa0zSZaTZ+X/Z7nvJTDt6Ql6m0gv/bnF00K35nEzi0pTz9OJ75DnL2fQPa5vQN6Uh37M/Ls9ZJk69nS99xC78jgQHa693UVuZQH94YUHdzO35Kd92h86OjWd9xi15wpz+m6R2CvwAEIyDejP53XbxA/LMp03dIsVZ0PSA3nYreQieyAD46YdJ6cymG3OdTXrsqdGiu+zSp+IZ19MyLNRsUKfn/6dd+jQ/6/f6dcvcgm+6IKvWf013roMwpwswI3htcHQJdqU9budP6aug8HAxfMLo2Z8JxlxkV76fPXqOKjTxOV+O88eSUwndinBfJ/Huu42JDUmH9yX6gmSDRwf+wFtecpMvl6f+XuTnyqCWqTyyGvjVjRezE74m9j9kHzqdrf/XYPrVZuY/SBjxliG+OkXLGZgWhWT3bTF4W3CHmvVJp6pYZjrcEHCsYdpnfdou/KFVk40aRd/y8P6A2/szF7WUafQFBYpkVpKWJ8XOe/TY08yi36m6pUnYwII6QVNSWh3IuEWsvzF+6gJ+6MlwytV2wrmie4/Ze7dKA9cRvFYYQoL9aizGEWPt2leE3TvhJHiFahKVtfULdWGX2HsvO7A+2XOXyIyRtXPITSRHF84EV50vsK5dtNto0LvXCLZQpW17GO6p695snvuHZNWHaMhJsMENt5OvhD+rN3yGd28vL+KOPQ+37MEHPIGB8MvDPCnuDjo2BHCgD/zf5IlzS3vu4ZhzJI20emub/mCevjDZcoP0C7i4jqhLdq61bSs8jYFAFtSrmx9BZKiLB8y6j7gnL3dxh3fTyVEPXIta80G18cbsvmWs+XcaQh3Ug5Xg0JNaV1gkGcGfD0NIMAY+XZxHjq6d5JtCwmhYXRDHvG2ly092x92gZ71ZjLkAuWRQl95HeAbDHEQHTbzfSxBRgFj6svgH2eBQz6ptA2147FiZ2XGH0u3lEYdyVEpUT7Mdm5yoZYsfMDM/quM2pUbbgJmubd4jQR0gVS6B/2GW0X6q7v0qag0dz26/J2h+TkpuaHsxfUMNYVym+cFw94MBfQmdihAdrkRiZXGbJ9MfxCN9SUp0bAoFyxV3ZTffpZK9AYjSLkFGuy8FlDDxYrKj2Li/cVEza16JFrlovzWtRIOaO4LXAkfyIlIxCejzYfARSMc62hLKxKab3L775Ix3y3k3ufx0CAQF9Z4SaUQkG1vWCUmrOI60ATymjwEjUkofcqWAnCPAhw1X1RPE4t+xqjH2+Ytd11Ymc1IzF5fK+foDARxxpruERawG409fC6G1DKocdxi9PwwoelXUt6hHusDw0G/GA9wiWqPt0AocBoH0jyrpBn7QStq8r9jCb/GGk9maT4mul3BmbEmS9z+C1w5HkuAUSViH8SoLGsKwQGbaN4gnLpf3TxePnSba1jlTdB0bUnEnXxhCKDNK1JEKL69GpDfLkCKUuRrEXlxrHjOni14EixxiqpOktJ8HDXzf/7AHTxeHnjdVk3lhFyyzy2T7UekBNCJpw6CaVqyRDV5vAkmK6TszScEhNqRVM/rbAOnaGW6jIm4Rd8JnD1MiA5DKOC2YQGFr+kicjTs1PXXDD6pwLuGxzCcLbuNj3myfe5fcdDut2aGPRJ523HsiI3htcCQJ9kafmerjNb0RAF1G+pVByKpnmul/W5rwFnPCN8XkN/PdP+Kd9DeZkRn6DkKbhONZ9hjow9SP9WRI/HAB3jX0YVI9H7Y8rp6WTHu7HftXpNTq5hRnv13np7l995KVT9pEZhw/9ks8M8bs/S8UVqNO6tXyqS70/4NfTd9vqp6cZCbG3EVTzo2mvdPmTxCYWJPe3jn5zUZXRdWnFma/TTeepSG/Y8/TMy5nwSj6OxG541M6/UBcapoVtfMiy+KwIZp+pR5/Fb21mh1fmP7OqG6BDmuTE7/Lpr2n2PJEYltLs94djz3fxc7kpnJZ79kqExvBnxtH18G89hRTNduVv62JyJ+xhpPFKT9gC36oRl9q1n+FrfkkfV8AFpdGjtYk4rrFMjcBdnbQA2ovwpypxvNJV49a4BbdIY/7KC+18cYLw4V3uQmvl7vuY1u+Gsz8gL3gOTvzfWzL1+TeX8A9ZkN8dYp2JuAnNxlzgEVMzbgut+gn+dGn6bijat6X5byvJKHkEy6qOuWnYuIVrNRaNeNafuqPXXZsUjuX151WptIX5MnQFxWC0ZcwkXdVE8Qpt2bmfzlwJtNwilr4Ez7mfFY9NZh0CU86axuWZBfcFyz8MZ9xFT2A9t9N8x0xgtcI9OwhPar0tj3dKkJyN/+rXPNxSR8Ng142UGAmP0UzLQstorgfnqLjgfABEuIqo/J20a/DxvNIWKG3hOx52/6LsML0uQK4q3Fz8szFYevqpO44xPuhpQ1mMPcm2qVKrVDTpmFRkpkiiltEx7PwNPSE84PTfqkC+hans0nibPuq62omXRKOPZ8cFXqgwuMDv5LPvF3kj+HZnLQUxsG3MDbhnTtcZrTM0yfSOEsMlLMWrnMdm/cNMePD/vuYZCn6vm0PCUZeGIv4+fepHbfz+vn0d5ssfSbCwlMoHnBJxGqmKB6j4f41ScWKBzSXcvGDsmomuREcrgrr3PLt6u7/QrcEqoq6eATDAsY0/FPf0SCTrYyxU68xYy8ycWIhahDiuE21rMq2rFPRfgRjPnby71eRADM25YOBF1/S2ZWMKclbppHPuTFhucyBVUHzWte6hresli0vhsUWer2Uu+DQ8vzun+Zans0kLKluFPO+LIJ8RdXmK6HPWLGxlybTP8wObVZNq3nrWtGyQRxao9o2wDyo0l7e/CJveZG1rDMHX+LNa23jm/jk9/jvplUgSpsn8R+m1KxPuOrZQctK1byat7ykDq0Lm1fLYpOyHaplNTu0gTevEc2r+MHnXWEPn/clWTULTjfNlBG8VjiaF4HhZ1bKPD/ptmji2UYjSsJFaKSM9R/5oiVbJy19F8vSzel/7+Z8nlbPSIQrgkROwNFsvIAtvK2QycEtoe/d0GKB5KTS/CMtqWyQhXwVw5pg/g/UqNM54qkhaCI75hWCsuC4z5vj3kF/SRWTKQycAodQiNoJZVRgQRPTLWF60uuCk78rgmovaENImw8BeM1MdurdUe2xIGgUi6U0Sjj6zpPiMqA3YXEFTElhT7hZTXqX3/aOLh2q7SN49fEy/GAZZKAUq6eEC+5m067WOpPQC3yRdYl3Eyjmt3FcUOOLJ90gTvpWoPJeKgZLBj168HvD8U9BsuSkK8XpPy+NPs3A6CfaJQakYH79RjStbSlqXMTO+KUafynFajKEri1TGgD6PhF9MDUT5sX82+J5n0/UWB0lIGros25Enf7yAeafyNrZ14qT75K5iQEJnv9GTCXAgfef+nJh/QJ22q/icW+ykGlt4EoY+F0O7SaCOjK6dka08Ed85seE4WCDXm0d5P2P4M+Hl/PdNIIzxoV1fMIlbszZiaTP21qmNAQibCjVzrFTrghP/Fp2wpWSnhpAUlGC/mGoh/huGuCYiW3tbDnhSlM1uSSgyiFsYSxqTPXkpO5MNuOf1ZyvBjVzaLNmX5mAgFf6q7R0h/4qjeBjXu/GnW9klpweHkQyNEEdyx8bTbhMzrtJzLiGy5yn2W/2Dv5uGoyLd+6FzYzVEy9iuZPoI+xwSlg2lrk4M57VLrAzr2YnfD2sO9u7+A7ym1IDYIfi1mfDZD2O5RDLdiP4U0DGrkOdJsLqbJai5T/tu2kQGmTFqCM3xtCYTlZqNiaWsMWZRiH8d8wBkqf0iEC6dOjvpqWb10CTnA6cR4ds3EpsZkazsB4HYIAeBxLFXqIDIjnad9a7MRdTBr/kh3hHpgQmte4WMsNzjYJX+3s+9vPPPA4DhSp+N83fQbuN4/CUCEK3uVIr7WQK8zwzlqd/7IO+K+OZ6CPBI5Hcq40/IZIjKRgAjHiqtNKBlbJGVk0Pa4+TuUk9f/7Ap/T2ywMIUsQEap4PkRmtamYGNTNFWI9TXCRiVOnLJwrbT75GmSbPitwxYc1xKj9NcvJ6PUF6zvyyKfoS/kkkPBlyZlSdrJ4e1MySmUmCBSlN/94eiFL/jODPiYqS2QPSNmSSEZ3koOjI2aOHU0dIiGGQBlzsm9IKoblJf6dKvH+GwenoND1RUqQQHU9/+DTJDiEES6l56v3vDkxQBkenSeSIYirkIxg2YAlF1pGPl5rDMvpIMG1Sx0Bmo/AExhKMaE/vD5Wg5lJFOVTCD71uYRAQoVp4CxxabECeAenoNB19rC1Liwz0HCVtQd8Mg9NRafotyyyLeJD+CBVdANHeu4MS7h6dJujQiyf+nX6aZSMYFiC1xWJwoma1ARy3Pt3Z6wcXCuvw29oSJ9pWqf2ytEOYLuib9O4rA31WQQkRb1W6JckvRAwmy4P5ykeUAjkhgsILNtvogmnwtL3EvHKgsOFKxi2hXh9XnaYx7UiihyVzJL1wMkrrq9g2Opf+awwjeGUgzzAsqhOa1GVCZRsaAviBENuB302DBMPV1dq2tSVJVAr1Dq6b2PB2WmEgoXwlfQlTJqZIq6VlvHL5IFeXuyCoQhyp6XvAvjXDhZCSPsylE21o/cE7AsMCPfoJVAZk/QkaDs09fD7/vwQXWo4tsMkIm+rrZJjxfxqOVZJgOufcGFssmigW9An+4am3FFRB/zWK4QNcv7oEAU8TzL5qdF+FmTUCAr1YnAlNPi8l/QnjcrdWlmCAJAMjedR30UcwgtcK5EfAnEMk+8jkkBI8ghH8RWCgBI9gBH+J6F1NG8EI/vLA2P8Ds/HYhAdxe8cAAAAASUVORK5CYII=)
>
>* wrap-reverse ： 规定项目在必要的时候以相反的顺序拆行或拆列。
>
>1. ![, 000000  @ 0 ](data:image/png;base64,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)
>
> #### **justify-content ——** 定义子元素在主轴的对齐方式
>
>![img](data:image/png;base64,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)
>
>#### **align-items ——** 定义子元素在纵轴上的对齐方式
>
>![text text  text text  text text ](data:image/png;base64,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)

##### 项目属性

> #### flex-grow ——定义项目的放大比例
>
> - - flex-grow: number ;
>   - 如果所有项目的flex-grow属性都为1，则它们将等分剩余空间。
>   - 如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。
>
> #### flex-shrink ——定义了项目的缩小比例
>
> - - flex-shrink: number 
>   - flex 元素仅在默认宽度之和大于容器的时候才会发生收缩。
>   - 如所有项目的 flex-shrink      属性都为1，当空间不足时，将等比例缩小。如一个项目的 flex-shrink      属性为0，其他项目都为1，则空间不足时，前者不缩小。
>
>  
>
> #### flex-basis ——定义了在分配多余空间之前，项目占据的主轴空间
>
> - - flex-basis:      number | auto ;
>
> - - number：长度单位或者百分比，规定灵活项目的初始长度。
>
> - - auto：默认值。长度等于灵活项目的长度。如果该项目未指定长度，则长度将根据内容决定。
>
> #### flex —— flex-grow,     flex-shrink 和 flex-basis的简写，默认值为0 1 auto，后两个属性可选
>
> - - flex-basis: number | auto 
>   - 该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)。
>   - flex: 1 ; 所有项目等分剩余空间。













## css相关知识

### 实用属性

```css
{
    width:calc(100%-120px); /*使用计算的方式得到宽*/
    background-attachment: fixed;/*是背景图不随滚轮滑动而滚动*/
}
```

### 常见尺寸

* px：最常用的也是最基本的单位就是px，表示占多少像素值。页面默认是16像素。

* em：em也是经常用到的单位，一般用在字体上。它的大小由父元素决定。如果父元素的字体大小是20px，那么子元素中`1em = 20px`。

* rem：rem是做移动端适配必不可少的。它是根据html根元素的大小决定的。例如在`html{font-size:12px}`的前提下，div设置`font-size{1.5rem}`此时div的下字体的大小为`12*1.5=18`18px。

* fr：css fr 单位是一个自适应单位，fr单位被用于在一系列长度值中分配剩余空间，如果多个已指定了多个部分，则剩下的空间根据各自的数字按比例分配。例如

  ```css
  .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 10px;
  }
  ```

  这样写后，实际格子的宽度占比为总宽度减去间隔的10px后进行一比一分配

* vh/vw：用来做适配也是非常的方便。1vw就等于/页面宽度的1%。高度也是如此。
* vmin/vmax：1vmin是获取页面宽度和高度中较小的一个值的1%，1vmax则是获取较大的一个值的1%。
* ch/ex：`ch`表示当前字体下，0字符的高度。`ex`表示当前字体下x字符的高度。所以这两个单位的大小由字体大小和字体类型决定。

### 盒子模型

- `content-box`：默认值，总宽度 = `margin` + `border` + `padding` + `width`
- `border-box`：盒子宽度包含 `padding` 和 `border`，`总宽度 = margin + width`
- `inherit`：从父元素继承 `box-sizing` 属性

### 格式化上下文（Formatting Contexts即FC）

例如一个ifc并不是指的是一个行内元素，而是只可能由很多个行内级元素共同组成的一个上下文。

##### BFC

块级格式化上下文，容器里面的子元素不会在布局上影响到外面的元素，反之也是如此(按照这个理念来想，只要脱离文档流，肯定就能产生 `BFC`)。产生 `BFC` 方式如下：

- `float` 的值不为 `none`。
- `overflow` 的值不为 `visible`。
- `position` 的值不为 `relative` 和 `static`。
- `display` 的值为 `table-cell`, `table-caption`, `inline-block`中的任何一个

BFC的布局规则如下：

* 内部的盒子会在垂直方向，一个个地放置；
* 盒子垂直方向的距离由margin决定，属于同一个BFC的两个相邻Box的上下margin会发生重叠；
* BFC的区域不会与float重叠；
* BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之也如此；
* 计算BFC的高度时，浮动元素也参与计算

常见的多栏布局，结合块级别元素浮动，里面的元素则是在一个相对隔离的环境里运行

##### IFC

内联格式化上下文，`IFC` 的 `line box`（无形的线框）高度由其包含行内元素中最高的实际高度计算而来（不受到竖直方向的 `padding/margin` 影响)。

`IFC`中的`line box`一般左右都贴紧整个 `IFC`，但是会因为 `float` 元素而扰乱。`float` 元素会位于 IFC 与 `line box` 之间，使得 `line box` 宽度缩短。 同个 `ifc` 下的多个 `line box` 高度会不同。 `IFC`中是不可能有块级元素的，当插入块级元素时（如 `p` 中插入 `div `）会产生两个`p`与 `div` 分隔开，即产生两个 `IFC` ，每个 `IFC` 对外表现为块级元素，与 `div` 垂直排列。

用处如下：

- 水平居中：当一个块要在环境中水平居中时，设置其为 `inline-block` 则会在外层产生`IFC`，通过 `text-align` 则可以使其水平居中。
- 垂直居中：创建一个 `IFC`，用其中一个元素撑开父元素的高度，然后设置其 `vertical-align`: `middle`，其他行内元素则可以在此父元素下垂直居中

布局规则：

* 在一个IFC中，从父级元素的顶部开始，盒子一个接一个横向排列
* 一个line box总是足够高对于包含在它内的所有盒子。然后，它也许比包含在它内最高的盒子高
* 当盒子的高度比包含它的line box的高度低，在line box内的盒子的垂直对齐线通过'vertical align'属性决定
* 当在一行中行内级盒子的总宽度比包含他们的line box的宽度小，他们的在line box中的水平放置位置由'text align'属性决定
* 当一个行内盒子超过了line box的宽度，则它被分割成几个盒子并且这些盒子被分配成几个横穿过的line boxs

##### GFC

网格布局格式化上下文

display: grid

##### FFC

自适应格式化上下文

display: flex

##### 区分概念

* 块级元素： 块级元素是那些视觉上会被格式化成块状的元素，通俗一点来说就是那些会换新行的元素。例例如：display属性为block, list-item, table, flex, grid 
* 块元素： 块元素是 display 属性值为 block 的元素，它应该是 块级元素 的一个子集 
* 行内级元素： 行内级元素是那些不会为自身内容形成新的块，而让内容分布在多行中的元素。
  例如：display属性为inline, inline-table, inline-block, inline-flex, inline-grid。 
* 行内元素： 行内元素仅仅是display属性值为inline的元素。 

### 

