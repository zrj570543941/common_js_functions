# 常用js方法个人集锦


+ AOP:目前提供before()、after()方法
+ bind：兼容ie8及以下不支持js内置bind的方法
+ uncurrying:用来简化诸如Array.prototype.slice.call(arguments, 2)的操作到slice(arguments, 2),使代码更简洁
+ throttle：函数节流，有些函数调用不被用户控制并且被调用次数太频繁，如window.onresize,onmousemove的事务处理函数。函数节流使这些函数可以间隔0.5s、1s等自定频率时间执行来限制这些函数的频繁调用
+ timeChunk:数组分时函数，如果一次性迭代一个数组对每个数组元素进行一些操作的所需时间超过100mas消耗很大，可以用分时函数每隔一定时间分批迭代处理大数组，每次就处理一部分数组元素。
+ multistep:函数分时函数，可以把一个需要超过100ms完成的函数里面的子任务进行分时分批处理。
+ iterators:自己封装的性能更好的遍历数组的函数
+ memoize:通用的缓存代理函数，但性能比不上开发者根据具体业务逻辑自己手动实现的具有针对性的缓存代理