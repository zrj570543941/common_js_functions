/*使某个Constructor仅能有一个实例*/
var singularizeConstructor = function(Constructor) {
	var instance = null;
	return function(...args) {
		if (!instance) {
			instance = new Constructor(...args);
		}
		return instance;
	};
};
/*
	应用举例：
	var Constructor1 = function (num) {
		this.num = num;
	};
	var SingledConstructor = singularizeConstructor(Constructor1);
	var instance1 = SingledConstructor(1);
	var instance2 = SingledConstructor(3);
	console.log(instance1 === instance2); //true
*/
isArray


/*
	作用：用来使普通对象如：创建dom节点，能且仅能创建一个
	fn是用来创建普通对象的方法
*/
var singularizeObj = function(fn) {
	var instance = null;
	return function(...args) {
		if (!instance) {
			instance = fn(...args);
		}
		return instance;
	};
};

/*
	应用举例：
	var fn = function () {
		return document.createElement('div');
	};
	var singularizedObj = singularizeObj(fn);
	var div1 = singularizedObj();
	var div2 = singularizedObj();
	console.log(div1 === div2); //true
*/