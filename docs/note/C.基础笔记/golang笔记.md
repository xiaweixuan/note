 go mod init app-name

go run index.go



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

上面的例子中，我们用Retriever声明了r变量(接口变量)，然后通过将创建的结构体实力赋值给他，那他的值到底是什么呢？分为两部分，一部分是实现者的类型，另一部分则是实现者的值（实现者的指针）。可以通过下面代码验证

```go
switch v := r.(type) {
	case mock.Retriever:
		fmt.Println(v.Contentss)
}
mockRetriever := r.(mock.Retriever)
fmt.Println(mockRetriever.Contents)
```

使用`interface{}`表示任何类型

#### 接口的组合

例如我同时需要用到两个接口

```go
func download(r Retriever) string{
  return r.Get("lala")
}
func post(p Poster) {
  p.Post("lala", map[string]string {
    "name": "xwx",
  })
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
  
  // 。。。写入操作
}

 ```

#### 错误处理

最常见处理方式

```go
// 常见操作
file, err := osOpenFile(...)
if err != nil {
  if pathError, ok := err.(*os.pathError);!ok {
    panic(err)
  }else{
    fmt.Printf("%s, %s, %s\n",
      pathError.Op,
      pathError.Path,
      pathError,Err
    )
    return
  }
}
```

那么如果更优雅的去处理错误呢？

对于一个文件列表的服务，可能是下面逻辑

```go
// filelisting.go
package filelisting
func HandleFileList(writer http.ResponseWriter, request *http.Request){
    path := request.URL.Path[len("/list/"):]
    file, err := os.Open(path)
    if err != nil {
      panic(err)
    }
    defer file.Close()
    
    all, err := ioutil.ReadAll(file)
    if err != nil {
      panic(err)
    }
    writer.Write(all)
}
// 主程序
func main() {
  http.HandleFunc("/list/", filelisting.HandleFileList)
  err := http.ListenAndServe(":8888", nil)
  if err != nil {
    panic(err)
  }
}
```

为了将逻辑抽离，降低耦合度，我们将他们进行改造。我们的想法是给动作函数再包裹一层专门去处理错误的函数，所以在HandleFileList中，我们直接去返回err

```go
// filelisting.go
package filelisting
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
```

然后在主程序中去接受err并进行操作

```go
// 主程序

type appHandler func(writer http.ResponseWriter, request *http.Request) error

func errWrapper(handler appHandler) func(http.ResponseWriter, *http.Request) {
  return func(writer http.ResponseWriter, request *http.Request) {
    err := handler(writer, request)
    if err != nil {
      panic(err)
    }
  }
}
func main() {
  http.HandleFunc(
    "/list/", 
    errWrapper(filelisting.HandleFileList))
  err := http.ListenAndServe(":8888", nil)
  if err != nil {
    panic(err)
  }
}
```

当我们请求`localhost:8888/list/a.txt`我们可以看到该文件内容，但是如果我们访问了一个不存在的文件，程序就会由于我们的panic抛出一个错误。所以，我们需要更友好的去处理错误，就需要再改造errWrapper函数

```go
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

















