```html
<body>
	<div id="app">
		<input type="text" v-modal="name">
		<div class="outer">
			<span>{{name}}</span>
			<p><span v-html="name"></span></p>
		</div>
		<button @click="reset">重置</button>
	</div>

	<script>
		class Wvue {
			constructor(option) {

				this.$option = option
				this.$data = option.data
				this.$methods = option.methods
				let that=this;
				Object.keys(option.data).forEach(function (key) {
					that.proxy(key);
				});
				//数据劫持
				this.observer(this.$data)
				//模板解析
				this.$compile = new Compile(option.el, this)
				
				
			}
			observer(obj) {
				if (!obj || typeof obj !== "object") {
					return;
				}
				Object.keys(obj).forEach(key => {
					this.defineProperty(obj, key, obj[key])
				})
			}
			defineProperty(obj, key, val) {
				this.observer(val)
				const dep = new Dep()
				Object.defineProperty(obj, key, {
					get() {
						// 每次访问name 都会创建一个watcher，并加入到Dep中
						Dep.target !== null && dep.addDep(Dep.target)
						return val
					},
					set(newVal) {

						val = newVal
						dep.notify()
					}
				})
			}
			proxy(key) {
				//使得读写vm的方法编程读写vm.data的
				var that = this;
				Object.defineProperty(that, key, {
					configurable: false,
					enumerable: true,
					get() {
						return that.$data[key];
					},
					set(newVal) {
						that.$data[key] = newVal;
					}
				});
			}
		}

		class Dep {
			constructor() {
				this.dep = []
			}
			addDep(dep) {
				this.dep.push(dep)
			}
			notify() {
				// 通知所有的watcher执行更新
				this.dep.forEach(watcher => {
					watcher.update()
				})
			}
		}

		class Watcher {
			constructor(vm, key, cb) {
				this.$vm = vm
				this.$key = key
				this.$cb = cb
				// 用一个全局变量来指代当前watch
				Dep.target = this
				// 实际是访问了this.name，触发了当前变量的get，
				// 当前变量的get会收集当前Dep.target指向的watcher,即当前watcher
				this.$vm.$data[this.$key]
				Dep.target = null

			}
			update() {
				// 执行
				// console.log(his.$vm[this.$key])
				this.$cb.call(this.$vm, this.$vm[this.$key])
			}
		}


		class Compile {
			constructor(el, vm) {
				this.$vm = vm
				// $el挂载的就是需要处理的DOM
				this.$el = document.querySelector(el)
				// 将真实的DOM元素拷贝一份作为文档片段，之后进行分析
				const fragment = this.node2Fragment(this.$el)
				// 解析文档片段
				this.compileNode(fragment)
				// 将文档片段加入到真实的DOM中去
				this.$el.appendChild(fragment)
			}
			node2Fragment(el) {
				// 创建空白文档片段
				const fragment = document.createDocumentFragment()
				let child
				//  appendChild会把原来的child给移动到新的文档中，当el.firstChild为空时，
				// while也会结束 a = undefined  => 返回 undefined
				while ((child = el.firstChild)) {
					fragment.appendChild(child);
				}
				return fragment
			}
			// 通过迭代循环来找出{{}}中的内容，v-xxx与@xxx的内容，并且单独处理
			compileNode(node) {
				const nodes = node.childNodes
				// 类数组的循环
				Array.from(nodes).forEach(node => {
					if (this.isElement(node)) {
						this.compileElement(node)
					} else if (this.isInterpolation(node)) {
						this.compileText(node)
					}
					node.childNodes.length > 0 && this.compileNode(node)
				});
			}
			isElement(node) {
				return node.nodeType === 1;
			}
			isInterpolation(node) {
				return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
			}
			compileText(node) {
				const reg = /\{\{(.*?)\}\}/g
				const string = node.textContent.match(reg)
				// RegExp.$1是RegExp的一个属性,指的是与正则表达式匹配的第一个 子匹配(以括号为标志)字符串
				// 以此类推，RegExp.$2，RegExp.$3，..RegExp.$99总共可以有99个匹配
				this.text(node, RegExp.$1)
			}
			compileElement(node) {
				const nodeAttrs = node.attributes;
				Array.from(nodeAttrs).forEach(arr => {
					if (arr.name.indexOf('v-') > -1) {
						this[`${arr.name.substring(2)}`](node, arr.value)
					}
					if (arr.name.indexOf('@') > -1) {
						// console.log(node, arr.value)
						this.eventHandle(node, arr.name.substring(1), arr.value)
					}
				})
			}
			// 因为是大括号里面的内容，所以沿用之前的逻辑，都加上watcher
			text(node, key) {
				new Watcher(this.$vm, key, () => {
					node.textContent = this.$vm.$data[key]
				})
				// 第一次初始化界面， 不然如果不进行赋值操作，
				// 就不会触发watcher里面的回调函数
				node.textContent = this.$vm.$data[key]
			}
			html(node, key) {

				new Watcher(this.$vm, key, () => {
					node.innerHTML = this.$vm.$data[key]
				})
				node.innerHTML = this.$vm.$data[key]

			}
			// 对@xxx事件的处理
			eventHandle(node, eventName, methodName) {
				node.addEventListener(eventName, () => {
					this.$vm.$methods[methodName].call(this.$vm)

				})
			}
			// v-modal的处理 不仅仅当赋值的时候回触发watcher，并且为input添加事件
			// input中的值去修改this.$data.$xxx的值，实现双向绑定
			modal(node, key) {
				new Watcher(this.$vm, key, () => {
					node.value = this.$vm.$data[key]
				})
				node.value = this.$vm.$data[key]
				node.addEventListener('input', (e) => {
					this.$vm.$data[key] = e.target.value
				})
			}
		}




	</script>
	<script>
		const data = {
			el: '#app',
			data: {
				name: '米粒'
			},
			methods: {
				reset() {
					this.name = ''
				}
			},
		}
		const app = new Wvue(data)
	</script>
</body>
```

