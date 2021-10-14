const generateNoteSidebar = require('./articleConfig')

module.exports = {
  lang: 'zh-CN',
  title: 'Wix',
  description: 'Wix 学习笔记',

  base: '/',
  dest: `dist/`,

  head: [
    ['link', { rel: 'icon', href: '/images/logo.ico' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
  ],
  themeConfig: {
    home: true,
    logo: '/images/logo.ico',
    smoothScroll: true,
    nextLinks: false,
    prevLinks: false,
    nav: [
      { text: '主页', link: 'http://xiawx.top' },
      { text: '学习笔记', link: '/note/' },
    ],
    sidebar: {
      '/note/': generateNoteSidebar(),
      // '/note/': [
      //   {
      //     "title": "Applet",
      //     "path": "/note/Applet/",
      //     "collapsable": false,
      //     "children": [
      //       {
      //         "title": "小程序开发如何使用colorUI框架",
      //         "path": "/note/Applet/小程序开发如何使用colorUI框架.md"
      //       }
      //     ]
      //   },
      //   {
      //     "title": "js",
      //     "path": "/note/js/",
      //     "collapsable": false,
      //     "children": [
      //       {
      //         "title": "ES6",
      //         "path": "/note/js/ES6.md"
      //       },
      //       {
      //         "title": "babel",
      //         "path": "/note/js/babel.md"
      //       },
      //       {
      //         "title": "对于js事件的解析",
      //         "path": "/note/js/对于js事件的解析.md"
      //       },
      //       {
      //         "title": "常见方法封装",
      //         "path": "/note/js/常见方法封装.md"
      //       }
      //     ]
      //   },
      //   {
      //     "title": "社区文章",
      //     "path": "/note/社区文章/",
      //     "collapsable": false,
      //     "children": []
      //   }
      // ]
    }
  },
}