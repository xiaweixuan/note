## land模型



## filber







diff算法



- 只对同级元素进行Diff。如果一个DOM节点在前后两次更新中跨越了层级，那么React不会尝试复用他。

- 两个不同类型的元素会产生出不同的树。如果元素由div变为p，React会销毁div及其子孙节点，并新建p及其子孙节点。

- 开发者可以通过 key prop来暗示哪些子元素在不同的渲染下能保持稳定。







## Scheuler

对于react的任务，它拥有可中断性的特质。为了防止过大的js计算堵塞了渲染，react将大的计算任务拆分成多个小的任务执行。

通常浏览器的渲染频率约60hz，也就是每16ms渲染一帧。为了防止js计算占用过久的时间从二导致没有时间渲染，react将大任务切分成一个个小任务，每个小任务仅执行5ms，这样便保证浏览器有足够的时间去进行页面渲染。

对于每个要执行的任务，我们会将它进行一层封装，在封装层，我们要去

```javascript
const createTask(pending) {
  return 
}
```



















```javascript
unstable_scheduleCallback

advanceTimers

flushWork

workLoop

```































## react的执行阶段

render阶段 ：react进行计算的阶段

mount阶段：即浏览器去渲染阶段























#### MessageChannel

Channel Messaging API的**`MessageChannel`** 接口允许我们创建一个新的消息通道，并通过它的两个[`MessagePort`](https://developer.mozilla.org/zh-CN/docs/Web/API/MessagePort) 属性发送数据。创建一个宏任务。



#### performance.now()

返回值表示为从[time origin](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp#the_time_origin)之后到当前调用时经过的时间



## js实现小顶堆

堆是一个完全二叉树，而小顶堆即是满足**结点的键值是所有堆结点键值中最小者**,即根节点的值永远比他的叶子结点要小。

对于js而言，我们会创建一个数组去存储他的所有节点，每个节点的数据结构为

```typescript
type Node = {
	id: number;
  sortIndex: number;
}
```

id作为节点的唯一表示，sortIndex真正排序的数据（开始时间）

```javascript
export function push(heap: Heap, node: Node): void {
  const index = heap.length;
  heap.push(node);
  siftUp(heap, node, index);
}

export function peek(heap: Heap): Node | null {
  const first = heap[0];
  return first === undefined ? null : first;
}

export function pop(heap: Heap): Node | null {
  const first = heap[0];
  if (first !== undefined) {
    const last = heap.pop();
    if (last !== first) {
      heap[0] = last;
      siftDown(heap, last, 0);
    }
    return first;
  } else {
    return null;
  }
}

function siftUp(heap, node, i) {
  let index = i;
  while (true) {
    const parentIndex = (index - 1) >>> 1;
    const parent = heap[parentIndex];
    if (parent !== undefined && compare(parent, node) > 0) {
      // The parent is larger. Swap positions.
      heap[parentIndex] = node;
      heap[index] = parent;
      index = parentIndex;
    } else {
      // The parent is smaller. Exit.
      return;
    }
  }
}

function siftDown(heap, node, i) {
  let index = i;
  const length = heap.length;
  while (index < length) {
    const leftIndex = (index + 1) * 2 - 1;
    const left = heap[leftIndex];
    const rightIndex = leftIndex + 1;
    const right = heap[rightIndex];

    // If the left or right node is smaller, swap with the smaller of those.
    if (left !== undefined && compare(left, node) < 0) {
      if (right !== undefined && compare(right, left) < 0) {
        heap[index] = right;
        heap[rightIndex] = node;
        index = rightIndex;
      } else {
        heap[index] = left;
        heap[leftIndex] = node;
        index = leftIndex;
      }
    } else if (right !== undefined && compare(right, node) < 0) {
      heap[index] = right;
      heap[rightIndex] = node;
      index = rightIndex;
    } else {
      // Neither child is smaller. Exit.
      return;
    }
  }
}

function compare(a, b) {
  // Compare sort index first, then task id.
  const diff = a.sortIndex - b.sortIndex;
  return diff !== 0 ? diff : a.id - b.id;
}
```


