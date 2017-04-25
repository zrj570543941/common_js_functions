/**
 * 对于length长度较小的数组，用以下方法代替普通for循环或forEach，注意只能用来遍历长度>=1的数组
 * @param  {数组类型}   arr      指明要遍历的数组
 * @param  {Function} callback 指明对每个数组元素要做什么的回调函数
 * @return {无返回值}            
 */
function forEachSmallArr(arr, callback) {
    var i = arr.length - 1;
    if (i > -1) {
        do {
            callback(arr[i]);
        } while (--i >= 0);
    }
}

/**
 * 对于length长度很长(大于1000)的数组，用以下方法代替普通for循环或forEach，注意只能用来遍历长度>=8的数组
 * @param  {数组类型}   arr      指明要遍历的数组
 * @param  {Function} callback 指明对每个数组元素要做什么的回调函数
 * @return {无返回值}            
 */
function forEachLargeArr(arr, callback) {
    var iterations = Math.floor(arr.length / 8);
    var leftover = arr.length % 8;
    var i = 0;
    if (leftover > 0) {
        do {
            callback(arr[i++]);
        } while (--leftover > 0);
    }
    do {
        callback(arr[i++]);
        callback(arr[i++]);
        callback(arr[i++]);
        callback(arr[i++]);
        callback(arr[i++]);
        callback(arr[i++]);
        callback(arr[i++]);
        callback(arr[i++]);
    } while (--iterations > 0);
}