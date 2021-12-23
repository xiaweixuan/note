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
      { text: 'Todo', link: 'http://todo.xiawx.top' },
      { text: '学习笔记', link: '/note/' },
    ],
    sidebar: {
      '/note/': generateNoteSidebar(),
    }
  },
}