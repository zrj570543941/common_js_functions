let UnorderedMap = (function() {
    //第一步：要私有化的属性或方法的放置区域
    let items = new WeakMap();

    class UnorderedMap {
        constructor() {
            items.set(this, {});
        }

        has(key) {
            return items.get(this).hasOwnProperty(key);
            //return value in items;
        }

        set(key, value) {
            items.get(this)[key] = value;
        }

        delete(key) {
            const _items = items.get(this);
            if (this.has(key)) {
                delete _items[key];
                return true;
            }
            return false;
        }

        get(key) {
            const _items = items.get(this);
            return this.has(key) ? _items[key] : undefined;
        }

        getAllValues() {
            const _items = items.get(this);
            let values = [];
            for (let k in _items) {
                if (this.has(k)) {
                    values.push(_items[k]);
                }
            }
            return values;
        }

        clear() {
            items.set(this, {});
        }

        size() {
            const _items = items.get(this);
            return Object.keys(_items).length;
        }

        keys() {
            const _items = items.get(this);
            return Object.keys(_items);
        }

        // 传入fn的参数为当前遍历到的item的key和value两个参数
        each(fn) {
            const _items = items.get(this);
            for (let k in _items) {
                if (this.has(k)) {
                    fn(k, items[k]);
                }
            }
        }

        getItems() {
            return items.get(this);
        }

    }

    return UnorderedMap;
})();