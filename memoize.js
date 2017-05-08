/**
 * 使被传进的方法拥有缓存代理的能力
 * @param  {Fuction} fundamental 想要拥有缓存代理能力的方法
 * @param  {Obj} cache       当做上述方法的默认且还未经修饰缓存代理对象
 * @return {Function}             经过修饰的拥有缓存代理的方法
 */
function memoize(fundamental, cache) {
    cache = cache || {};
    var shell = function(arg) {
        if (!cache.hasOwnProperty(arg)) {
            cache[arg] = fundamental(arg);
        }
        return cache[arg];
    };
    return shell;
}

/*
    此通用缓存代理方法缺点：只缓存特定参数的调用结果，并不会像手工写缓存代理一样还能充分利用之前缓存的值进行计算。他不拥有此能力，
    这个通用函数的唯一的好处仅在于第二次以上传进同一个参数时才会利用之前缓存好的对象。所以最好还是开发者自己手动实现缓存代理
    比较好。
 
    应用举例：
    function factorial(n) {
        if (n == 0) {
            return 1;
        } else {
            return n * factorial(n - 1);
        }
    }
    //memoize the factorial function
    var memfactorial = memoize(factorial, {
        "0": 1,
        "1": 1
    });
    //call the new function
    var fact6 = memfactorial(6);
    var fact5 = memfactorial(5);
    var fact4 = memfactorial(4);
*/