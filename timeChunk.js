/*
	参数解释：
	arr：表示进行fn里面的操作时要用到的arr数据
	fn：封装了怎样操作每个ary元素的方法
	count：指定每次要处理多少个arr元素
	context(可选)：指定fn body里面的this指向
*/
function timeChunk(ary, fn, count, context){
	var obj,
	t;
	var len = ary.length;
	var start = function(){
		for ( var i = 0; i < Math.min( count || 1, ary.length ); i++ ){
			var obj = ary.shift();
			fn.call(context, obj);
		}
	};
	return function(){
		t = setInterval(function(){
		if ( ary.length === 0 ){ // 如果全部节点都已经被创建好
			return clearInterval( t);
		}
		start();
		}, 200 ); // 分批执行的时间间隔，也可以用参数的形式传入
	};
};

/*
	应用举例：
	var ary = [];
	for ( var i = 1; i <= 1000; i++ ){
		ary.push( i );
	};
	var renderFriendList = timeChunk( ary, function( n ){
		var div = document.createElement( 'div' );
		div.innerHTML = n;
		document.body.appendChild( div );
	}, 8 ); //这样之后就会每隔100s执行一次fn，每次操作8个数组元素
	renderFriendList();
*/