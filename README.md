wait-step
----------

延遲函數，因為 setTimeout 用著有些不爽……

# 用法

## 一般用法

```javascript
const wait_step = require('wait_step')

wait_step(999, () => {
  // 999毫秒后才執行
})

wait_step(() => {
  // 立即執行
})
```

## 嵌套用法

```javascript
const wait_step

wait_step(500, () => {
  // 等待 500 毫秒才會執行
})(400, () => {
  // 上面的函數執行完后再等待 400 毫秒才會執行
})(300, () => {
  // 上面的函數執行完后再等待 300 毫秒才會執行
})

wait_step(500, () => {
  const d = new Date
  if(d.getDay === 1) {
    return wait_step(999, () => {})
  } else {
    return wait_step(2888, () => {})
  }
})(() => {
  // 根據返回的 wait_step 函數的不同，等待的時間也不同（999 毫秒或者 2888 毫秒）
})

```
