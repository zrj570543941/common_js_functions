//原理是每次传入key时通过loseloseHashCode找到相对应的value在table数组中
//位置，然后进行删读写value等操作
let HashMap = (function() {
    //存储map中的所有的values的数组集合，注意不存储keys
    const table = new WeakMap();

    //当传入key时用于返回当前key在table数组中相应的value值的应当在的位置，
    //这个所在位置可能之前不存在，就用来写入value，
    //也可能之前这个所在位置可能之前就存在，可用来修改或删除value，看具体应用
    const loseloseHashCode = function(key) {
        var hash = 0;
        for (var i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i);
        }
        return hash % 37; //取余是为了table数组过长，这个37数字是任意的，可以是其他任意数字，但引出一个问题各种keys在table中的pos可能冲突
    };


    class HashMap {
        constructor() {
            table.set(this, []);
        }

        //通过loseloseHashCode找到key相应的value在table数组中的位置进行写入或修改value操作
        put(key, value) {
            const _table = table.get(this);
            let position = loseloseHashCode(key);
            console.log(position + ' - ' + key);
            _table[position] = value;
        }

        //通过loseloseHashCode找到key相应的value在table数组中的位置进行读操作
        get(key) {
            return table.get(this)[loseloseHashCode(key)];
        }

        remove(key) {
            //这里并没有真正的在table数组中删掉一个数组元素而只是设为undefined是因为当删一个数组元素时
            //会引起其他数组元素的位置变动，下次想要对其他values进行操作时就会发生意外
            table.get(this)[loseloseHashCode(key)] = undefined;
        }
    }

    return HashMap;
})();

var hash = new HashMap();
hash.put('Gandalf', 'gandalf@email.com');
hash.put('John', 'johnsnow@email.com');
hash.put('Tyrion', 'tyrion@email.com');

console.log(hash.get('Gandalf'));
console.log(hash.get('Loiane'));

hash.remove('Gandalf');
console.log(hash.get('Gandalf'));