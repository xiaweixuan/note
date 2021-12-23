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

