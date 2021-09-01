
const articleConfig = {
  'js': [
    '常见方法封装',
    '对于js事件的解析',
    'babel',
    'ES6',
    'js常用api总结',
    'js函数高阶应用',
    'js模块化',
    'js异步编程',
    'nodejs笔记总结',
    'ts笔记',
  ],
  'css': [
    'css布局'
  ],
  '数据库': [
    'windows如何安装mysql'
  ],
  'Applet': [
    '小程序开发如何使用colorUI框架'
  ],
  'web前端': [
    'vite',
    'angular复习总结',
    'react复习总结',
    'vue复习总结',
    'webpack复习总结',
    'redux',
    'http',
    'mvvm',
    '常见组件设计',
    '开源项目流程',
    '内存控制',
    '前端常见特效原理',
    '前端面试复习',
    '前端算法总结',
    'reactNative',
    'spa富应用开发',
    'vue常见插件',
    'web前端常见问题',
  ],
  '社区文章': 'README'
}

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
    sidebar: generateSidebar()
  },
}

function generateSidebar() {
  const noteChildren = []
  Object.keys(articleConfig).forEach(item => {
    noteChildren.push(getClassArticles(item, articleConfig[item]))
  })
  return [{
    title: '学习笔记',
    path: '/note/',
    collapsable: false,
    children: noteChildren
  }]
}

function getClassArticles(className, articles) {
  return {
    title: className,
    path: `/note/${className}/`,
    collapsable: false,
    children: Array.isArray(articles) ?
      articles.map(item => ({
        title: item,
        path: `/note/${className}/${item}.md`
      })) :
      articles === 'README' ?
        [] :
        [{
          title: articles,
          path: `/note/${className}/${articles}.md`
        }]
  }
}
