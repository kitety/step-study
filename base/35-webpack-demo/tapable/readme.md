tapable-同步方法和异步方法
异步：并发和串行

- SyncHook 串行同步执行 不关心返回值
- SyncBailHook 串行同步执行 关心返回值.如果函数返回非 undefined 的话就会停止调用后续的逻辑
- SyncWaterfallHook 串行同步执行 水流 会传给后面
- SyncLoopHook 同步循环 返回 true 继续循环，返回 undefined 结束循环
- AsyncParallelHook 异步并发执行
- AsyncParallelBailHook 异步并发执行 关心返回值.如果函数返回非 undefined 的话就会停止调用后续的逻辑
- AsyncSeriesHook 异步串行执行
