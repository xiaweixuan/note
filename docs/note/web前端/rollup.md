
rollup简单实现

```javascript
// modules/myModule.js
export const name = 'jiahang'
export const age = 18
export const height = 180

// src/mian.js
import { name, age } from './modules/myModule'
function say() {
  console.log(`my name is ${name}`);
}
console.log(age);
say();

// 打包后
'use strict';

const name = 'jiahang';
const age = 18;
function say() {
  console.log(`my name is ${name}`);
}
console.log(age);
say();

```

实现

```
```

