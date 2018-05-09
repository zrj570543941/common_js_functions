/*
	参数解释：
	fn：需要被延迟执行的函数或事务处理函数
	interval：指定事务处理函数每次被调用间的时间间隔
*/
function throttle ( fn, isArrowFn = false, interval) {
    var __self = fn, // 保存需要被延迟执行的函数引用
        timer, // 定时器
        firstTime = true; // 是否是第一次调用
    return function () {
        var args = arguments,
            __me = isArrowFn ? null : this;
        if (firstTime) { // 如果是第一次调用，不需延迟执行
            __self.apply(__me, args);
            return firstTime = false;
        }
        if (timer) { // 如果定时器还在，说明前一次延迟执行还没有完成
            return false;

        }

        timer = setTimeout(function () { // 延迟一段时间执行
            console.log('执行')
            clearTimeout(timer);

            timer = null;
            !isArrowFn ? __self.apply(__me, args) : __self(args);
        }, interval || 500);

    }
}

/*
	应用举例：
	document.onmousemove = throttle(function(){
		console.log( 1 ); //上述方法已经修复这里的this指向指向document
	}, 500 ); //经此处理后function每隔0.5s才会执行一次了
*/