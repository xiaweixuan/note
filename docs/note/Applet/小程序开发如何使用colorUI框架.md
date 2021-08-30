### 小程序开发如何使用colorui框架
当我们进行微信开发的时候难免会为自己的样式发愁，这时就会苦于寻找、学习一些ui框架的使用。本篇文章就向大家介绍colorui框架的使用。
首先我们在github上下载到本地
[colorui的github仓库](https://github.com/weilanwl/ColorUI)
将整个库clone下来后发现里面有这些文件
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191022085926181.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2p1c3RfYV9iYWRfZ3V5,size_16,color_FFFFFF,t_70)
在此我们只介绍在微信开发者工具中开发的使用方法
ColorUIdemo文件下
Colorui-UniApp是在vue框架中的使用及demo，在此我们不做介绍；demo文件是colorui框架中所有效果及组件的演示demo；templat则是作者配置好的一个文件，大家可以直接在里面开始新的项目（将template文件中除project.config.json、sitemap.json文件以外的copy到你的小程序文件中，让他覆盖你原有的文件，然后即可开始自己的项目）。
接下来讲不使用他创建的模板，自己创建项目引入ui内容。
打开ColorUIdemo文件下的demo文件，将里面的colorui拷贝到你创建的项目的根目录。打开app.wxss加入下面代码
```
@import "colorui/main.wxss";
@import "colorui/icon.wxss";
```
这样就将样式引入了自己的项目中

接下来我们就可以通过添加类名的方式来修改我们自己的样式了，具体样式大家也可以在叫`colorui组件库`的小程序中查看属性名、及样式。

那么如何使用组件呢？
我们继续打开ColorUIdemo文件下的demo文件，再打开pages文件，再打开component文件，会发现如何的文件夹
![在这里插入图片描述](https://img-blog.csdnimg.cn/2019102208594896.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2p1c3RfYV9iYWRfZ3V5,size_16,color_FFFFFF,t_70)
这就是各个组件的样式demo，我们可以直接选择某个文件夹中的wxml，然后拷贝它里面的所有文件到自己的项目中即可运行起来了。