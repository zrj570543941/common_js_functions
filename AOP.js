Function.prototype.before = function( beforefn ){
	var __self = this; // 保存原函数的引用
	return function(){ // 返回包含了原函数和新函数的"代理"函数
		beforefn.apply( this, arguments ); // 执行新函数，修正this
		return __self.apply( this, arguments ); // 执行原函数
	}
};

Function.prototype.after = function( afterfn ){
	var __self = this;
	return function(){
		var ret = __self.apply( this, arguments );
		afterfn.apply( this, arguments );
		return ret;
	}
};

/*
	应用举例：
	var func = function(){
		console.log( 2 );
	};

	func = func.before(function(){
		console.log( 1 );
	}).after(function(){
		console.log( 3 );
	});

	func(); //经上面处理函数func执行时辉依次输出1,2,3	
*/