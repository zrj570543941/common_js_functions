/*
	参数解释：
	arr：表示进行fn里面的操作时要用到的arr数据
	fn：封装了怎样操作每个ary元素的方法
    interval:定时器时间间隔，最好大于等于25ms(参考高效能js)
	context(可选)：指定fn body里面的this指向
    callback(可选)：数组处理完后的回调函数，接收参数即这里的arr
*/
function timeChunk(ary, fn, interval, context, callback) {
    var cloned_ary = ary.concat(), //克隆数组
        len = cloned_ary.length;

    var obj,
        t;

    //用于每次时间间隔处理大数组中一定数量的数组元素
    var processSomeArrItems = function() {
        var start = +new Date(); //+可以转化日期为数字

        //确保每次时间间隔处理数组元素所花时间小于50ms
        while (+new Date() - start <= 50) {
            var obj = cloned_ary.shift();
            fn.call(context, obj);
        }
    };
    return function() {
        t = setInterval(function() {
            if (cloned_ary.length === 0) { // 如果全部节点都已经被创建好
                clearInterval(t);
                callback(ary);
            }
            processSomeArrItems();
        }, interval); // 分批执行的时间间隔，也可以用参数的形式传入
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
	}, 100 ); //这样之后就会每隔100s分批处理那个大数组里的item
	renderFriendList();
*/