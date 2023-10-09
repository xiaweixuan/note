



#### 基本使用

```jsx
// react18
// import ReactDOM from "react-dom/client";
// import React from "react";
// const root = ReactDOM.createRoot(document.getElementById("root")!);
// root.render(<div>hello world</div>);
// require('react/jsx-runtime').jsx("div", { children: "hello world" })

// react17
import ReactDOM from "react-dom";
import React from "react";
ReactDOM.render(<div>hello world</div>, document.getElementById("root"));
// React.createElement("div", null, "hello world");
```

18中的ReactDom不在具有render方法

react 与 react-dom各司其职

- react为主要功能的载体，与平台无关
- react-dom主要包含如何将虚拟dom与真实dom转化的方法

jsx会在编译时转化为可被js识别的函数，目前最常见的有jsxDEV和React.createElement两种。最新的react脚手架通常默认为jsxDEV，可通过配置开启后一种。例如vite

```js
export default defineConfig({
  plugins: [react({ jsxRuntime: 'classic' })],
})
```



#### 当前整体结构

当前代码中，包含`ReactDOM.render`去渲染dom到页面上，还有创建虚拟dom的`React.createElement`

```js
import { REACT_ELEMENT } from './utils'

function createElement(type, properties = {}, children) {
    let ref = properties.ref || null;
    let key = properties.key || null;
    // __sorce, __self为编译器追加的 暂不需要
    ;['ref', 'key', '__self', '__source'].forEach(key => {
        delete properties[key] // props中有些属性并不需要
    })
    let props = {...properties}

    if (arguments.length > 3) {
        props.children = Array.prototype.slice.call(arguments, 2);
      } else {
        props.children = children;
      }

    return {
        $$typeof: REACT_ELEMENT, // 代表着这是React元素，也就是React框架中的虚拟DOM
        type, // 虚拟DOM的元素类型
        ref,
        key,
        props
    }
  }
  const React = { createElement }
  export default React;
```

```js
import { REACT_ELEMENT } from './utils'

function render(VNode, containerDOM) {
    // 未来还有其他操作 目前只需要挂在即可
    mount(VNode, containerDOM)
}

function mount(VNode, containerDOM) {
    let newDOM = createDOM(VNode)
    newDOM && containerDOM.appendChild(newDOM);
}

export function createDOM(VNode) {
    if (!VNode) return
    // 1.创建dom元素 2.处理子元素 3.处理属性
    const { type, props } = VNode
    let dom;
    if (type && VNode.$$typeof === REACT_ELEMENT) {
      dom = document.createElement(type)
    }
    if (props) {
        if (typeof props.children === 'object' && props.children.type) {
            mount(props.children, dom)
        } else if (Array.isArray(props.children)) {
            mountArray(props.children, dom);
        } elese if(typeof props.children === 'string') {
            dom.appendChild(document.createTextNode(props.children))
        }
    }
    return dom
}
function mountArray(children, parent) {
    if (!Array.isArray(children)) return
    for (let i = 0; i < children.length; i++) {
        mount(children[i], parent)
    }
}

const ReactDOM = {
    render
}
export default ReactDOM
```

完成了这两个函数，我们就可以把一个dom元素渲染到页面上了。





























