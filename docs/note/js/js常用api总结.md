#### 数组方法

###### 改变自身的方法(可看作队列)

> * push()和pop()：把内容填到末尾返回长度，删除末尾元素并返回
> * shift() 和 `unshift()`：把内容填到首位返回长度，删除首位元素并返回
> * sort()：排序
> * reverse()：反转
> * splice()：删除、插入、替换。参数表示1、要删除的第一项2、要删除的位数3、要插入的项
> * `indexOf()`和 `lastIndexOf() `：从正反向查找某一项
> * `forEach() `：遍历，传入函数的参数为遍历数组内容、对应数组索引、数组本身
> * map() ：映射
> * filter() ：过滤器
> * every() ：判断每一项是否满足返回的条件，满足返回true
> * some() ：判断是否有一项满足返回条件，满足返回true

###### 生成新数组

> * join()：数组转化为字符串
>* `concat()`：将参数的数字或数组添加到源数组中
> * slice()：截取起始项和结束位置（不包括结束位置）

###### 其他方法

* reduce

  ```javascript
  //arr.reduce(callback,[initialValue])
  
  //callback （执行数组中每个值的函数，包含四个参数）
  	//1、previousValue （上一次调用回调返回的值，或者是提供的初始值（initialValue））
  	//2、currentValue （数组中当前被处理的元素）
  	//3、index （当前元素在数组中的索引）
  	//4、array （调用 reduce 的数组）
  //initialValue （作为第一次调用 callback 的第一个参数。）
  
  
  ```

  

#### 字符串方法

> * `toLowerCase()`: 把字符串转为小写，返回新的字符串。
> * `toUpperCase()`: 把字符串转为大写，返回新的字符串。
> * `charAt`(): 返回指定下标位置的字符
> * `indexOf()`: 返回某个指定的子字符串在字符串中第一次出现的位置
> * `lastIndexOf()`: 返回某个指定的子字符串在字符串中最后出现的位置。
> * `slice()`: 返回字符串中提取的子字符串。
> * `substring()`: 提取字符串中介于两个指定下标之间的字符。
> * `split()`: 把字符串分割成字符串数组。

