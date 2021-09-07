const fs = require('fs')
const path = require('path');

function check(item) {
  return !excludeDir.includes(item) && !/^\./.test(item)
}

const excludeDir = ['README.md']
const targetDirPath = path.resolve(__dirname, '../note')

var classList = fs.readdirSync(targetDirPath)
  .filter(check);


const articleConfig = classList.reduce((target, dir) => {
  const fileList = fs.readdirSync(path.resolve(targetDirPath, dir)).filter(check).map(item => item.replace(/\.md$/, ''))
  return {
    ...target,
    [dir]: fileList.length ? fileList : 'README'
  }
}, {})

function generateNoteSidebar() {
  const noteChildren = []
  Object.keys(articleConfig).forEach(item => {
    noteChildren.push(getClassArticles(item, articleConfig[item]))
  })
  return noteChildren
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
module.exports = generateNoteSidebar
