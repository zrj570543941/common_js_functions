function.prototype.uncurrying = function(){
	var _self = this;
	return function () {
		var args = Array.prototype.slice.call(arguments),
			context = args[0];

		return _self.apply(context, args.slice(1));
	}
};

/*
	应用举例：
	var push = Array.prototype.push.uncurrying();
	push(document.getElementsByTagName('body'), 2); 

	以上两句等价于 Array.prototype.push.call(document.getElementsByTagName('body'), 2)
*/