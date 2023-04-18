#### meta

meta标签提供关于HTML文档的元数据。元数据不会显示在页面上，但是对于机器是可读的。它可用于浏览器（如何显示内容或重新加载页面），搜索引擎（关键词），或其他 web 服务。

```html
<!--声明编码-->
<meta charset='utf-8' />
<!--viewport用于优化移动浏览器的显示 例如控制用户缩放-->
<meta name="viewport" content="width=device-width" />
<!--声明编码-->
<meta name="generator" content={Astro.generator} />
<!--OG Open Graph Protocol, 即这种协议可以让网页成为一个“富媒体对象”。
用了Meta Property=og标签，就是你同意了网页内容可以被其他社会化网站引用等，-->
<meta property="og:title" content={formattedContentTitle} />
<meta property="og:type" content="article" />
<meta property="og:url" content={canonicalUrl} />
<meta property="og:locale" content={frontmatter.ogLocale ?? SITE.defaultLanguage} />
<meta property="og:image" content={canonicalImageSrc} />
<meta property="og:image:alt" content={imageAlt} />

```



#### rel属性

HTML中有一个名为`rel`的属性，是relationship这个单词的缩写，指明两个文档之间的关系，专门用来链接相关元素上，如`<a>`、`<area>`、`<form>`或`<link>`元素上，因此`rel`的属性值也是“链接类型”的代称

- rel=”preconnect” 作用是告知浏览器提前连接链接地址对应站点，不过只是连接，并不会公开任何私人信息或者下载任何内容。好处是打开链接内容的时候可以更快的获取（节约了 DNS 查询、重定向以及指向处理用户请求的最终服务器的若干往返）
- rel=”stylesheet” 指向样式表资源
- rel="canonical" 解决网站内容存在多个版本时，指定规范链接，帮助解决内容重复收录问题。比如多个url的内容是相同的，如果被收录了，权重会被分散，这个时候，这几个页面就可以指定一个页面的地址，搜索引擎就会只收录这一个地址
- 

 