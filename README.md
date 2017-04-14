# 常用js方法个人集锦


+ AOP:目前提供before()、after()方法
+ bind：兼容ie8及以下不支持js内置bind的方法
+ uncurrying:用来简化诸如Array.prototype.slice.call(arguments, 2)的操作到slice(arguments, 2),使代码更简洁
+ throttle：函数节流，有些函数调用不被用户控制并且被调用次数太频繁，如window.onresize,onmousemove的事务处理函数。函数节流使这些函数可以间隔0.5s、1s等自定频率时间执行来限制这些函数的频繁调用
+ timeChunk:分时函数，用来每隔一定时间分批处理一个性能消耗很大的函数调用