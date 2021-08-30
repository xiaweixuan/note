事件大致分为pc端和移动端，其事件对象有部分属性不同，但他们都有一些相同的且基础的属性和方法

## 事件对象的基本属性和方法
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191210131515132.png)
此处需要说明的是，target和currentTarget属性。
```html
<div id="a">
    <div id="b">
      <div id="c">
        <div id="d"></div>
      </div>
    </div>
</div>

<script>
    document.getElementById('a').addEventListener('click', function(e) {
      console.log('target:' + e.target.id + '&currentTarget:' + e.currentTarget.id);
    });    
    document.getElementById('b').addEventListener('click', function(e) {
      console.log('target:' + e.target.id + '&currentTarget:' + e.currentTarget.id);
    });    
    document.getElementById('c').addEventListener('click', function(e) {
      console.log('target:' + e.target.id + '&currentTarget:' + e.currentTarget.id);
    });    
    document.getElementById('d').addEventListener('click', function(e) {
      console.log('target:' + e.target.id + '&currentTarget:' + e.currentTarget.id);
    });
</script>
```
上面事件的绑定都是在冒泡阶段的，当我们点击最里层的元素d的时候，会依次输出:
```
target:d&currentTarget:d
target:d&currentTarget:c
target:d&currentTarget:b
target:d&currentTarget:a
```
上面事件的绑定都是在捕捉阶段的，当我们点击最里层的元素d的时候，会依次输出:
```
target:d&currentTarget:a
target:d&currentTarget:b
target:d&currentTarget:c
target:d&currentTarget:d
```

## 移动端特有属性
###### 移动端的事件大致有
1、touchstart
当手指放在屏幕上触发。
2、touchmove
当手指在屏幕上滑动时，连续地触发。
3、touchend
当手指从屏幕上离开时触发。
4、touchcancel
当系统停止跟踪时触发。

###### 除了常用的DOM属性，触摸事件还包含下列三个用于跟踪触摸的属性。
1、touches：表示当前跟踪的触摸操作的touch对象的数组。
当一个手指在触屏上时，event.touches.length=1,
当两个手指在触屏上时，event.touches.length=2，以此类推。
2、targetTouches：特定于事件目标的touch对象数组。
因为touch事件是会冒泡的，所以利用这个属性指出目标对象。
3、changedTouches：表示自上次触摸以来发生了什么改变的touch对象的数组。
每个touch对象都包含下列几个属性：
4、clientX：触摸目标在视口中的x坐标。
clientY：触摸目标在视口中的y坐标。
identifier：标识触摸的唯一ID。
pageX：触摸目标在页面中的x坐标。
pageY：触摸目标在页面中的y坐标。
screenX：触摸目标在屏幕中的x坐标。
screenY：触摸目标在屏幕中的y坐标。
target：触摸的DOM节点目标。


## 相关知识
###### 移动端双击放大
触屏设备不支持双击事件。双击浏览器窗口，会放大画面。
可以通过在head标签内加上这么一行：
```html
<meta name="viewport" content="width=device-width, minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
```
###### 使用addEventListener时切换上下文
当使用addEventListener时，上下文自动切换为html元素
```javascript
new function(){
	this.appName="wem";
	document.body.addEventListener("click",function(e){
		alert(this.appName)//发生上下文切换，此处为undined
	})
}
```