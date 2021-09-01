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
  const fileList = fs.readdirSync(path.resolve(targetDirPath, dir)).filter(check).map(item => item.replace(/\.md$/,''))
  return {
    ...target,
    [dir]: fileList.length ? fileList : 'README'
  }
}, {})

module.exports = articleConfig
