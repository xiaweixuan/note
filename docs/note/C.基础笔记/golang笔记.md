```shell
go mod init app-name
go run index.go
go get example.com/pkg ## 下载依赖
go mod tidy ## 检测该文件夹目录下所有引入的依赖,写入 go.mod 文件
go mod download ## 下载mod中的依赖
go env ## 环境变量
## GOROOT go的安装目录
## GOPATH go的工作目录
## GOPROSY go modules的代理地址，默认https://goproxy.io
## GOPRIVATE 引用内网包是，可以设置成内网代码仓库域名，只是go modules不去代理上下载

```



概念

- orm框架：对象-关系映射（Object-Relational Mapping，简称ORM）。ORM框架就是连接数据库的桥梁，是一个数据持久层框架。常见的ORM框架有MyBatis, Hibernate
- RPC 场景：Remote Procedure Call ，即远程过程调用。能使应用像调用本地方法一样的调用远程的过程或服务,可以应用在分布式服务、分布式计算、远程服务调用等许多*场景*。













### slice

#### slice与array的区别

```go
// slice
var s []int
s := make([]int, len, cap)

// array
var a [length]int

// slice底层结构
type slice struct {
  array unsafe.Pointer
  len  	int
  cap 	int
}
```

注意点：

- array需要指明长度，且为常量不可变
- array长度为其类型中组成部分
- array作为函数参数的时候会产生copy
- go所有函数参数都是值传递

#### len cap的变化

```go
// len cap
var s []int 		 									// 0,0
s = append(s, 0) 									// 1,1
s = append(s, 1)									// 2,2
s = append(s, 2)									// 3,4
for i := 3; i < 1025; i++ {				// 1025, 1280
  s = append(s, i)
} 																

// 当cap<1024时候，每次*2
// 当cap>=1024时候，每次*1.25
```



#### slice技巧

```go
/* 
	循环赋值：
	预先分配内存可以提升性能
	直接使用index赋值而不是append可以提升性能
*/
var s []int
for j:=0; j<10000; j++{
  s=append(s, j)
}
// 性能较好
s := make([]int, 0, 10000)
for j:=0; j<10000; j++{
  s=append(s, j)
}

// 性能最好的
s := make([]int, 10000)
for j:=0; j<10000; j++{
  s[j]=j
}
```

#### 作为参数传递的注意点

```go
// case1：虽然函数的参数是值传递，但是s中的值是一个指针
func modifySlice(s []int) {
  s[0]=1024
}
func main() {
  var s []int
  for i:=0; i<3; i++ {
    s=append(s, i)
  }
  modifySlice(s)
  fmt.Println(s) // [1024 1 2]
}

// case2：外面的s与函数内的s不是同一个struct。传进函数的是一个struct，且按值传递，所以里面对s进行append是无法改变外面s的len
func modifySlice(s []int) {
  s=append(s, 2048)
  s[0]=1024
}
func main() {
  var s []int
  for i:=0; i<3; i++ {
    s=append(s, i)
  }
  modifySlice(s)
  fmt.Println(s) // [1024 1 2]
}

// case3：当添加4096时，重新分配了内存，这样函数中的s整体指向了其他的内存，再修改s外面的变量已不受影响了
func modifySlice(s []int) {
  s=append(s, 2048)
  s=append(s, 4096)
  s[0]=1024
}
func main() {
  var s []int
  for i:=0; i<3; i++ {
    s=append(s, i)
  }
  modifySlice(s)
  fmt.Println(s) // [0 1 2]
}

// case4
func modifySlice(s []int) {
  s=append(s, 2048)
  s=append(s, 4096)
  s[0]=1024
}
func main() {
  var s []int
  for i:=0; i<3; i++ {
    s=append(s, i)
  }
  modifySlice(s)
  fmt.Println(s) // [1024 1 2]
}
```



#### 变量声明差异

使用`[]Type{}`或者`make([]Type)`初始化后，slice不为nil

使用`var x []Type`后，slice为nil

```go
// case1
func main() {
  var s []int
  b, _ := json.Marshal(s)
  fmt.Println(string(b)) // null
}

// case2
func main() {
  s := []int{}
  b, _ := json.Marshal(s)
  fmt.Println(string(b)) // []
}
```

#### 优化技巧

```go
func normal(s []int){
  i:=0
  i+=s[0]
  i+=s[1]
  i+=s[2]
  i+=s[3]
  i+=s[4]
  println(i)
}

===> 编译器实现优化 bce

func bce(s []int){
  _ = s[3]
  i:=0
  i+=s[0]
  i+=s[1]
  i+=s[2]
  i+=s[3]
  i+=s[4]
  println(i)
}
```



### map

```go
// map实际上的值是指针，传的参数是指针。修改会影响整个map
// map的key value都不可取地址，因为它们随着map扩容地址会改变
// map存的是值，会发生copy
// map赋值的时候会自动扩容，但随着删除不会缩容
```



### channel

```go
make(chan Type)
make(chan Type, len)

func main(){
  ch:=make(chan int)
  go func() {
    ch <- 1
    close(ch)
  }
  for {
    select {
      case i:= <-ch:
      	fmt.Println(i)
      default: 
      	break
    }
  }
}
// 死循环 一直输出0
// for + select closed channel 会造成死循环
// select 重break无法跳出for循环
```



### 可读性

```go
func aFunc() error {
  if err:=doSomething(); err != nil {
    return err
  }
  if err:=doAnotherthing(); err != nil {
    return err
  }
  return nil // happy path
}


var a int
if flag{
  a=1
}else{
  a=-1
}
===>
a:=-1
if flag{
  a=1
}
```







### 最佳实践 

```go
// 缩小锁持有时间，缩小临界区
var Users = map[string]string {
  "user": "password"
}
var mu sync.Mutex

func CheckUser(name, password string) bool {
  mu.Lock()
  defer mu.Unlock()
  realPwd, exist := Users[name]
  return exist && realPwd == password
}
===>
func CheckUser(name, password string) bool {
  var realPwd string
  var exist bool
  func(){
    mu.Lock()
  	defer mu.Unlock()
  	realPwd, exist := Users[name]
  }()
  return exist && realPwd == password
}

```





























变量定义

var 或者直接 :=



数组是有长度的

```go
// 定义
var a [3]int                    // 定义长度为3的int型数组, 元素全部为0
var b = [...]int{1, 2, 3}       // 定义长度为3的int型数组, 元素为 1, 2, 3
var c = [...]int{2: 3, 1: 2}    // 定义长度为3的int型数组, 元素为 0, 2, 3
var d = [...]int{1, 2, 4: 5, 6} // 定义长度为6的int型数组, 元素为 1, 2, 0, 0, 5, 6



// 遍历
for i, v := range e {  // e可以是数组，也可以是指针（var e = &b
    fmt.Printf("b[%d]: %d\n", i, v)
}
for range e {
    fmt.Println("hello")
}
for i := 0; i < len(e); i++ {
    fmt.Printf("c[%d]: %d\n", i, e[i])
}
```



字符串支持切片操作。

切片是简化版的动态数组

>  len返回切片有效长度，cap返回切片容量。
>
> `append`的操作会导致重新分配内存
>
> copy(target, origin)

```go
var (
    a []int               // nil切片, 和 nil 相等, 一般用来表示一个不存在的切片
    b = []int{}           // 空切片, 和 nil 不相等, 一般用来表示一个空的集合
    c = []int{1, 2, 3}    // 有3个元素的切片, len和cap都为3
    d = c[:2]             // 有2个元素的切片, len为2, cap为3
    e = c[0:2:cap(c)]     // 有2个元素的切片, len为2, cap为3
    f = c[:0]             // 有0个元素的切片, len为0, cap为3
    g = make([]int, 3)    // 有3个元素的切片, len和cap都为3
    h = make([]int, 2, 3) // 有2个元素的切片, len为2, cap为3
    i = make([]int, 0, 3) // 有0个元素的切片, len为0, cap为3
)

// 切片操作

// 结尾追加
var a []int
a = append(a, 1)               // 追加1个元素
a = append(a, 1, 2, 3)         // 追加多个元素, 手写解包方式
a = append(a, []int{1,2,3}...) // 追加一个切片, 切片需要解包

// 开头追加
var a = []int{1,2,3}
a = append([]int{0}, a...)        // 在开头添加1个元素
a = append([]int{-3,-2,-1}, a...) // 在开头添加1个切片

// 中间位置插入元素
a = append(a, x...)       // 为x切片扩展足够的空间
copy(a[i+len(x):], a[i:]) // a[i:]向后移动len(x)个位置
copy(a[i:], x)            // 复制新添加的切片

// 删除切片
a = []int{1, 2, 3}
a = a[:len(a)-1]   // 删除尾部1个元素
a = a[:len(a)-N]   // 删除尾部N个元素
a = a[1:] // 删除开头1个元素
a = a[N:] // 删除开头N个元素
a = append(a[:0], a[1:]...) // 删除开头1个元素
a = append(a[:0], a[N:]...) // 删除开头N个元素
a = a[:copy(a, a[1:])] // 删除开头1个元素
a = a[:copy(a, a[N:])] // 删除开头N个元素
a = append(a[:i], a[i+1:]...) // 删除中间1个元素
a = append(a[:i], a[i+N:]...) // 删除中间N个元素
a = a[:i+copy(a[i:], a[i+1:])]  // 删除中间1个元素
a = a[:i+copy(a[i:], a[i+N:])]  // 删除中间N个元素

```

> `e = c[0:2:cap(c)]`中，实际上是指定切片的三个属性，
>
> ```go
> type SliceHeader struct {
>     Data uintptr
>     Len  int
>     Cap  int
> }
> ```
>
> 通过移动三个指针的值，而改变切片。所以这样改不会像append一样创建新的切片。



## 语法

#### 变量定义

* 布尔类型：true、false
* 整数类型：int、int8、int32、int64（前面加u表示有符号）
* 浮点类型：float32、float64、complex64、complex128（complex是复数类型）
* 指针类型：uintptr

* byte：字符型（8位）
* rune：字符型（32位）

```go
// 包内变量
var (
	aa = 3
  bb = false
)

func main(){
  // 函数内定义
  var x string
  var a,b,c int = 3,4,5 
  d, e, f := 3, “123”, true
	fmt.Println(a, b, c, d, e, f, x)
}
```

> i等于根号-1，那么i就是一个虚数
>
> 复数：3 + 4i
>
> ｜3 + 4i｜= 根号下3的平方加4的平方

通过int()、float()等方法进行类型转换

```go
// 遍历中文
s := "hello,你好呀"
for i,ch := range []rune(s) {
  fmt.Printf("(%d %c)", i, ch)
}
```

> 使用utf8.RuneCountInString获得字符数量
>
> 

#### 常量与枚举

通过const定义常量，如果不规定类型，const定义的常量可作为各种类型使用

```go
// 普通常量
const name string = "123" 
// 普通枚举：一组常量
const (
	cpp = 0
  java = 1
  python = 2
)
// 递增枚举：iota代表下面的几个变量从0值递增
const (
	cpp = iota
  _
  python
  javascript
)

```

#### 常见语句

```go
// 条件语句
func fn1(v int) int {
  // 一般条件语句
  if v > 100 {
    return 100
  } else if v < 0 {
    return 0
  } else {
    return v
  }
  // 加入执行条件
  if v = 100;v > 100 {
    return 100
  } else {
    return v
  }
}
func eval(a,b int,op string) int {
	// 如果switch后面不写op，可直接在case后写条件，例如op>10
  var result int
  switch op {
    case "+":
    	result = a+ b
    case "-":
    	result = a - b
    case "*":
    	result = a*b
    case "/":
    	result = a / b
    default:
    	panic("n" + op)
  }
  return result
}

// 循环语句
sum := 0
for i := 1; i <= 100; i++ {
  sum += i
}
```

#### 函数

```go
// 一般函数
func eval(a, b int, op string) int {
  //...
}

// 返回多个值(通常第二个值返回error)
func div(a, b int) (int, int){
  return a/b, a%b
}

// 多个传入值
func sum(numbers ...int) int {
  return 1;
}
```

#### 指针

在go中，只有值传递一种方式，通过配合指针实现引用传递

```go
var a int = 2
var pa *int = &a
*pa = 3
fmt.Println(a)

// 交换两个值
func swap(a, b *int) {
  *b, *a = *a, *b
}
a, b := 3, 4
swap(&a, &b)
fmt.Println(a, b)
```

> 值传递与引用传递：
>
> 将变量传入函数时，值传递是拷贝了一份值给函数中的变量，而引用传递则直接传递了引用，可在函数中操作函数外的变量



## 数据结构的定义



make 用来为 [slice](https://so.csdn.net/so/search?q=slice&spm=1001.2101.3001.7020)，map 或 chan 类型分配内存和初始化一个对象，跟 new 类似，第一个参数是一个类型而不是一个值，跟 new 不同的是，make 返回类型的结构实列而不是指针，而返回值也依赖于具体传入的类型

```go
var slice_ []int = make([]int,5,10)
fmt.Println(slice_)
 
var m_ map[string]int = make(map[string]int)
m_["one"] = 1
fmt.Println(m_)
 
c := make(chan int)
go func() {
  for {
    n := <-c
		fmt.Println(n)
  }
}
c <- 1
c <- 2
time.Sleep(time.Millisecond)
// 打印结果：
// [0 0 0 0 0]
// map[one:1]
// 1
// 2
```







#### 数组

当数组被当参数传入函数中的时候，仍然是拷贝一个同样的值去进行操作

```go
var arr1 [5]int //默认为0
arr2 := [3]int {1,2,3} // 通过:=赋值必须有初值
arr3 := [...]int {2,4,6,8,10}
var grid [4][5]int

// 遍历数组
for i, v := rang arr3 {
  fmt.Println(i, v) // 下标和值
}

```



#### 切片（Slice）

slice是对某个数组的一个view，也就是说s1是arr的切片，在s1改变的同时，arr也会发生改变。当slice作为参数传入函数中后操作，也会改变对应数组的值。

```go
arr := [...]int{0,1,2,3,4,5,6,7}
s := arr[2:6] //[2,3,4,5] s即为切片

// 用[]int里面不加数字表示切片类型的参数
func fn(arr []int) {}

// slice是可以向后拓展的，但不能向前拓展
arr := [...]int{0,1,2,3,4,5,6,7}
s1 := arr[2:6] // [2,3,4,5]
s2 := s1[3:5] // [5,6]
fmt.Println(len(s1),cap(s1)) // 4 6

// 增加操作 s4 and s5 no longer view arr
arr := [...]int{0,1,2,3,4,5,6,7}
s1 := arr[2:6] // [2,3,4,5]
s2 := s1[3:5] // [5,6]
s3 := append(s2, 10)// [5,6,10]
s4 := append(s3, 11)// [5,6,10,11] 
s5 := append(s4, 12)// [5,6,10,11,12]
arr // [0,1,2,3,4,5,6,10]

// 直接创建slice
var s []int // zero value for slice is nil

s1 := []int{2,4,6,8}

s2 := make([]int, 16, 32) // 直接创建长度为16，cap为32的slice

// 拷贝
copy(s2, s1) //将s1中的值拷贝如s2

// 删除
s2 = append(s2[:3], s2[4:]) // 删除下标为3的元素
s2 = s2[1:] // 删除首元素
s2 = s2[:len(s2) - 1] // 删除尾元素
```

#### Map

map使用哈希表，必须可以比较相等，除了slice，map，function的内建类型都可以作为key，struct类型不包含上述字段，也可以作为key

```go
m := map[string]string {
  "name": "xwx",
  "age": "11",
}
m2 := make(map[string]int) // 定义空map m2 == empty map
var m3 map[string]stirng // 定义空map m3 == nil

// 遍历

for k,v := range m {
  fmt.Println(k,v)
}

// 查询 当查询的值不存在是，获得value初始值
name, ok := m["name"] //ok表示name是否存在与m

// 删除
delete(m, "name")

```

## 面向【还没有的】对象

go语言只支持封装，不支持继承和多态。他并没有面向对象的很多特征，但是使用它独有的特征可以模拟使用面向对象的思想











































#### 结构体

```go
// 结构体的定义
type treeNode struct{
  value int
  left, right *treeNode
}
// 实例的声明
func main() {
  var root treeNode
  root = treeNode{value: 3}
  root.left = &treeNode{}
  root.right = &treeNode{5, nil, nil}
  root.right.left = new(treeNode)
  fmt.Println(root)
  
  nodes := []treeNode {
    {value: 3},
    {},
    {6, nil, &root}
  }
}

// 为结构体定义方法 （因为go语言只有值传递，如果不加*，那么无法在方法中操作实例本身）
func (node treeNode) print() {
  fmt.Print(node.value)
}
func (node *treeNode) setValue(value int) {
  node.value = value;
}
func (node *treeNode) traverse() {
  if node == nil {
    return 
  }
  node.left.traverse()
  node.print()
  node.right.traverse()
}
root := treeNode{value: 3}
root.print();

// 用工厂函数模拟构造函数
func createTreeNode(value int){
  return &treeNode{value: value}
}

```

#### 封装与包

在go文件的最开头通过`package packageName`去定义包名，一个目录下只能有一个包，但是多个文件可以都叫一个包名，这代表他们属于同一个包。

变量及函数的命名习惯

* 名字一般使用驼峰式写法
* 首字母大写通常为public
* 首字母小写通常为private

通常来说，我们为结构定义的方法必须放在同一个包内。但是如果包是别人写的，我们需要拓展它，则通过以下方式

```go
// 扩充系统类型或其他类型有两种方法：1、定义别名。2、使用组合。3、内嵌
// 组合
import "tree"
type myTreeNode struct {
  ndoe *tree.treeNode
}
func (myNode *myTreeNode) postOrder() {
  if myNode == nil || myNode.node == nil {
    return 
  }
  left := myTreeNode{myNode.node.Left}
  left..postOrder()
  right := myTreeNode{myNode.node.Right}
  right.postOrder()
  myNode.node.Print();
}
func main(){
  root = tree.treeNode{value: 3}
  myRoot := myTreeNode{&root}
  myRoot.postOrder()
}
// 别名
type NewTree tree.treeNode

func (node *NewTree) handle(v int){
  //...
}
// 内嵌 Embedding
import "tree"
type myTreeNode struct {
  *tree.treeNode
}

func (myNode *myTreeNode) getValue() {
  // 通过Node来获取未命名的值 也可以直接myNode.value获取
  return myNode.Node.value 
}
```

## 面向接口





















```go
resp, err := http.Get(rul)
result, err := httputil.DumpResponse(res, true)
resp.Body.Close()
string(result)
```

























#### 接口的目的

定义一个结构的类型，我们可以只定义所需要的属性或者方法，然后用它进行类型说明，从而降低代码耦合

```go
type fnType interface {
  Get(string) string
}
```

上面的结构体他可以表示任何拥有一个【传入string类型返回string类型的】一个结构体

```go
func getRetriever() fnType {
	return testing.Retriever{}
}
func main() {
  var r fnType = getRetriever()
  r.Get("balabal")
}
```

#### 接口的定义

golang中，接口由使用者定义

```go
// mock.go
package mock
type Retriever struct {
  Contents string
}
func (r Retriever) Get(url string) string {
  return r.Contents
}
// main.go
import "mock"
type Retriever interface {
  Get(url string) string
}
func download(r Retriever)string {
  return r.Get("lala")
}
func main(){
  var r Retriever
  r = mock.Retriever{"hahaha"}
  fmt.Println(download(r))
}
```

我们用Retriever声明了r变量(接口变量)，变量`r`是`Retriever`类型的接口变量，他其实有两部分组成，一部分是实现者的类型，另一部分则是实现者的值（实现者的指针）。

可以通过下面代码验证

```go
// Type assertion
if mockRetriever, ok := r.(mock.Retriever); ok {
  fmt.Println(mockRetriever.Contents)
}

// switch
switch v := r.(type) {
	case mock.Retriever:
		fmt.Println(v.Contents)
}
mockRetriever := r.(mock.Retriever)
fmt.Println(mockRetriever.Contents)
```

> 使用`interface{}`表示任何类型



#### 接口的组合

例如我同时需要用到两个接口

```go
type Poster interface {
  Post() string
}
type Retriever interface {
  Get() string
}
type RetrieverPoster interface {
  Retriever
  Poster
}
func session(s RetrieverPoster) {
  s.Get()
  s.Post()
}
```



#### 常用系统接口

1、Stringer

他不是一个具体的类型，而是一个概念。他的定义为

```go
type Stringer interface {
  String() stirng
}
```

也就是说只要我们定义的结构体实现了String方法，那么他就是一个Stringer。

将一个结构体定义为Stringer的作用是，当我们为某一个结构体实现了String方法，在通过f m t.Println输出的时候就会自动调用此方法，类似js中的toStirng。

```go
type A struct {
  Contents stirng
}
func (a *A) String() string {
  return fmt.Sptintf(
  	"输出的值：%s",a.Contents
  )
}
```

2、Reader

```go
type Reader interface {
  Read(p []byte) (n int, err error)
}
```

Fscanf方法的第一个参数是Reader

3、Writer

```go
type Writer interface {
  Write(p []byte) (n int, err error)
}
```

Fprintf方法的第一个参数是一个Writer



## 函数式编程

标准的函数编程规范：（实际工作中并不需要一定遵守：）

* 不可变性：能不能有状态，只有常量和函数
* 函数只能有一个参数

#### 闭包

将函数中定义的变量长久的保存并在外部使用的现象

```go
func adder() func(int) int {
  sum := 0
  return func (v int) int {
    sum += v
    return sum
  }
}
func main() {
  a := adder()
  for i := 0;i<10;i++ {
    fmt.Printf(a(i))
  }
}
// 斐波那契数列
func fibonacci() func() int {
  a, b := 0, 1
  return func() int {
    a, b = b, a + b
    return a
  }
}

func main() {
  f := fibonacci()
  f() // 1
  f() // 1
  f() // 2
  f() // 3
  f() // 5
}
// 为函数实现接口

```



## 资源管理与错误处理

#### defer

在一个函数中使用defer定义的语句将在函数结束前执行

多个defer语句将栈式存储所有语句，即defer列表后进先出

 ```go
// 写入操作（再操作文件打开后应即使关闭）
func writeFile(filename string){
  file, err := os.Create(filename)
  if err != nil {
    panic(err)
  }
  defer file.Close()
  
  writer := bufio.NewWriter(file)
  defer writer.Flush()

  for i:= 0; i< 20; i++ {
    fmt.Fprintln(writer, i)
  }
}
                 
func main() {
  writeFile('a.txt')
}

 ```



#### 错误处理

最常见处理方式

```go
// 常见操作
func writeFile(filename string) {
	file, err := os.OpenFile(filename, os.O_EXCL|os.O_CREATE, 0666)

	if err != nil {
		if pathError, ok := err.(*os.PathError); !ok {
			panic(err)
		} else {
			fmt.Printf("%s, %s, %s\n",
				pathError.Op,
				pathError.Path,
				pathError.Err,
			)
			return
		}
	}
	defer file.Close()

	writer := bufio.NewWriter(file)
	defer writer.Flush()
}

func main() {
	writeFile("a.txt")
}
```

那么如果更优雅的去处理错误呢？

对于一个文件列表的服务，可能是下面逻辑(创建errWrapper包裹函数去处理error)

```go
func HandleFileList(writer http.ResponseWriter, request *http.Request){
    path := request.URL.Path[len("/list/"):]
    file, err := os.Open(path)
    if err != nil {
      return err
    }
    defer file.Close()
    
    all, err := ioutil.ReadAll(file)
    if err != nil {
      return err
    }
    writer.Write(all)
  return nil
}

type appHandler func(writer http.ResponseWriter, request *http.Request) error

func errWrapper(handler appHandler) func(http.ResponseWriter, *http.Request) {
  return func(writer http.ResponseWriter, request *http.Request) {
    err := handler(writer, request)
    if err != nil {
      log.Warn("error: %s",err.Error())
      code := http.StatusOK
      switch {
        case os.IsNotExist(err): // 资源不存在
					code = http.StatusNotFound
        case os.IsPermission(err): // 无权限
        	code = http.StatusForbidden
        default:
        	code = http.StatusInternalServerError
      }
      http.Error(
        writer,
        http.StatusText(code),
        code
      )
    }
  }
}

func main() {
  http.HandleFunc(
    "/list/", 
    errWrapper(HandleFileList))
  err := http.ListenAndServe(":8888", nil)
  if err != nil {
    panic(err)
  }
}
```



#### panic与recover

panic停止当前的函数执行，一直向上返回执行每一层reder，如果没遇见recover，程序直接退出

recover仅在defer中跳用，他可以获取panic的值，如果无法处理，可以重新panic

```go
func tryRecover(){
  defer func() {
    r := recover()
    if err, ok := r.(error); ok {
      rmt.Println("Error:", err)
    }else{
      panic(r)
    }
  }()
  panic(errors.New("this is an error"))
}
func main(){
  tryRecover()
}
```

当然，此处我们使用panic只是模拟错误发生，它代表了程序发生错误，我们也可以直接写一个错误

```go
func tryRecover(){
  defer func() {
    r := recover()
    if err, ok := r.(error); ok {
      rmt.Println("Error:", err)
    }else{
      panic(r)
    }
  }()
  b := 0
  a = 1 / b
  fmt.Println(a)
}
```



## 并发编程

协程

- 非强占式多任务处理，由协程主动交出控制权
- 编译器/解释器/虚拟机层面的多任务
- 多个协程可能在多个或者一个线程上进行

```go
func main() {
	for i:=0; i<1000;i++{
		go func(i) {
      for {
        fmt.Printf(i)
      }
		}(i)
	}
  time.Sleep(time.Milliscond)
}
// 此处fmt的io操作会主动交出控制权，我们也可以手动交出
func main() {
  var a [10]int
	for i:=0; i<1000;i++{
		go func(i) {
      for {
        a[i]++
        runtime.Gosched()
      }
		}(i)
	}
  time.Sleep(time.Milliscond)
}
```

channel用法

```go
func worker(id int, c chan int) {
	for n := range c {
		fmt.Printf("Worker %d received %c\n",
			id, n)
	}
}
// 写法等同于下
// func worker(id int, c chan int) {
// 	for {
// 		n, ok := <-c
// 		if !ok {
// 			break
// 		}
// 		fmt.Printf("Worker %d received %c\n",
// 			id, n)
// 	}
// }


func createWorker(id int) chan<- int { // chan<-表示返回的值只能用于传数据
	c := make(chan int)
	go worker(id, c)
	return c
}

func chanDemo() {
	var channels [10]chan<- int
	for i := 0; i < 10; i++ {
		channels[i] = createWorker(i)
	}

	for i := 0; i < 10; i++ {
		channels[i] <- 'a' + i
	}

	for i := 0; i < 10; i++ {
		channels[i] <- 'A' + i
	}

	time.Sleep(time.Millisecond)
}

func bufferedChannel() {
	c := make(chan int, 3) // 3个单位的缓存区，传入3个以内数据时，即使没有接收者，也不会报错
	go worker(0, c)
	c <- 'a'
	c <- 'b'
	c <- 'c'
	c <- 'd'
	time.Sleep(time.Millisecond)
}

func channelClose() {
	c := make(chan int)
	go worker(0, c)
	c <- 'a'
	c <- 'b'
	c <- 'c'
	c <- 'd'
	close(c)
	time.Sleep(time.Millisecond)
}

func main() {
	fmt.Println("Channel as first-class citizen")
	chanDemo()
	fmt.Println("Buffered channel")
	bufferedChannel()
	fmt.Println("Channel close and range")
	channelClose()
}

```

任务等待（使用channel等待goroutine结束，不再使用time.Sleep去等待

```go
func doWork(id int,
	w worker) {
	for n := range w.in {
		fmt.Printf("Worker %d received %c\n",
			id, n)
		w.done()
	}
}

type worker struct {
	in   chan int
	done func()
}

func createWorker(
	id int, wg *sync.WaitGroup) worker {
	w := worker{
		in: make(chan int),
		done: func() {
			wg.Done() // 完成任务
		},
	}
	go doWork(id, w)
	return w
}

func chanDemo() {
	var wg sync.WaitGroup

	var workers [10]worker
	for i := 0; i < 10; i++ {
		workers[i] = createWorker(i, &wg)
	}

	wg.Add(20) // 添加任务数
	for i, worker := range workers {
		worker.in <- 'a' + i
	}
	for i, worker := range workers {
		worker.in <- 'A' + i
	}

	wg.Wait() // 等待任务全部做完
}

func main() {
	chanDemo()
}
```

使用select进行调度（从c1和c2同时接收数据，只收取最返回的

```go

func generator() chan int {
	out := make(chan int)
	go func() {
		i := 0
		for {
			time.Sleep(
				time.Duration(rand.Intn(1500)) *
					time.Millisecond)
			out <- i
			i++
		}
	}()
	return out
}

func worker(id int, c chan int) {
	for n := range c {
		time.Sleep(time.Second)
		fmt.Printf("Worker %d received %d\n",
			id, n)
	}
}

func createWorker(id int) chan<- int {
	c := make(chan int)
	go worker(id, c)
	return c
}

func main() {
	var c1, c2 = generator(), generator()
	var worker = createWorker(0)

	var values []int
	tm := time.After(10 * time.Second) // 10s后向返回的channel传入一个值
	tick := time.Tick(time.Second)     // 定时，每隔指定时间向返回的channel传入一个值
	for {
		var activeWorker chan<- int
		var activeValue int
		if len(values) > 0 {
			activeWorker = worker
			activeValue = values[0]
		}

		select {
		case n := <-c1:
			values = append(values, n)
		case n := <-c2:
			values = append(values, n)
		case activeWorker <- activeValue:
			values = values[1:]

		case <-time.After(800 * time.Millisecond):
			fmt.Println("timeout")
		case <-tick:
			fmt.Println(
				"queue len =", len(values))
		case <-tm:
			fmt.Println("bye")
			return
		}
	}
}
```

传统同步机制（锁 mutex，建议使用channel进行场景处理

```go
type atomicInt struct {
	value int
	lock  sync.Mutex
}

func (a *atomicInt) increment() {
	fmt.Println("safe increment")
	func() {
		a.lock.Lock()
		defer a.lock.Unlock()

		a.value++
	}()
}

func (a *atomicInt) get() int {
	a.lock.Lock()
	defer a.lock.Unlock()

	return a.value
}

func main() {
	var a atomicInt
	a.increment()
	go func() {
		a.increment()
	}()
	time.Sleep(time.Millisecond)
	fmt.Println(a.get())
}

```

并发模式，同时接收多个channel传的数据

```go
func msgGen(name string) chan string {
	c := make(chan string)
	go func() {
		i := 0
		for {
			time.Sleep(time.Duration(rand.Intn(2000)) * time.Millisecond)
			c <- fmt.Sprintf("service %s: message %d", name, i)
			i++
		}
	}()
	return c
}

func fanIn(chs ...chan string) chan string {
	c := make(chan string)
	for _, ch := range chs {
		go func(in chan string) {
			for {
				c <- <-in
			}
		}(ch)
	}
	return c
}

func fanInBySelect(c1, c2 chan string) chan string {
	c := make(chan string)
	go func() {
		for {
			select {
			case m := <-c1:
				c <- m
			case m := <-c2:
				c <- m
			}
		}
	}()
	return c
}

func main() {
	m1 := msgGen("service1")
	m2 := msgGen("service2")
	m3 := msgGen("service3")
	m := fanIn(m1, m2, m3)
	for {
		fmt.Println(<-m)
	}
}

```





































## 工程化

#### 依赖管理

使用最新的go mod模式管理依赖

初始化：`go mod init[modulName]`

增加依赖：`go get -u [path]`

更新版本：`go get [@v...] / go mod tidy`

打包：`go build` 

> 使用go build fileName打包一个文件
>
> 但是当使用go build ./...打包所有目录下所有文件的时候，该命令只会去检查编译能否通过，使用go install ./...去进行打包。打包的结果会放在GOPATH的bin目录下

#### 目录结构

每个包只能有一个main函数



#### 测试

go语言使用的是表格驱动测试

## web开发







```go
//brief_intro/echo.go
package main
import (...)

func echo(wr http.ResponseWriter, r *http.Request) {
    msg, err := ioutil.ReadAll(r.Body)
    if err != nil {
        wr.Write([]byte("echo error"))
        return
    }

    writeLen, err := wr.Write(msg)
    if err != nil || writeLen != len(msg) {
        log.Println(err, "write len:", writeLen)
    }
}

func main() {
    http.HandleFunc("/", echo)
    err := http.ListenAndServe(":8080", nil)
    if err != nil {
        log.Fatal(err)
    }
}
```





































