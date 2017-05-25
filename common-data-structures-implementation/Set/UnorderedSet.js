var UnorderdSet = (function() {
    let items = new WeakMap();
    class UnorderdSet {
        constructor() {
            items.set(this, {});
        }

        has(value) {
            return value in items.get(this).hasOwnProperty(value);
        }

        add(value) {
            if (!this.has(value)) {
                items.get(this)[value] = value;
                return true;
            } else {
                return false;
            }
        }

        delete(value) {
            if (this.has(value)) {
                delete items.get(this)[value];
                return true;
            } else {
                return false;
            }
        }

        clear() {
            items.set(this, {});
        }

        size() {
            return Object.keys(items.get(this)).length;
        }

        getAllValues() {
            const keys = Object.keys(items.get(this)),
                keysLen = keys.length,
                _items = items.get(this);
            let values = [];
            for (let i = 0; i < keysLen; i++) {
                value.push(_items[keys[i]]);
            }
            return values;
        }

        getItems() {
            return items.get(this);
        }

        //并集运算，Given two sets, this returns a new set with elements from both the given sets
        union(anotherSet) {
            //取得当前set的所有值
            let _curSetValues = this.getAllValues(),
                _curSetValuesLen = _curSetValues.length;


            // 取得另外一个set的所有值
            let _anotherSetValues = anotherSet.getAllValues,
                _anotherSetValuesLen = _anotherSetValues.length;

            // 把当前set的所有值复制到newSet上
            for (let i = 0; i < _curSetValuesLen; i++) {
                newSet.add(_curSetValues[i]);
            }

            //再把另一个set中的值合并到newSet中，这里的add方法自己包含有去重逻辑
            for (var i = 0; i < _anotherSetValuesLen; i++) {
                newSet.add(_anotherSetValues[i]);
            }

            return newSet;
        }

        //交集运算，Given two sets, this returns a new set with the elements that exist in both sets
        intersection(anotherSet) {
            let intersectionSet = new Set();

            let values = this.values();
            for (let i = 0; i < values.length; i++) {
                if (anotherSet.has(values[i])) {
                    intersectionSet.add(values[i]);
                }
            }

            return intersectionSet;
        }

        //补集运算，Given two sets, this returns a new set with all the elements that exist
        //in the first set and do not exist in the second set
        difference(anotherSet) {
            let differenceSet = new Set();

            let values = this.values();
            for (let i = 0; i < values.length; i++) {
                if (!anotherSet.has(values[i])) {
                    differenceSet.add(values[i]);
                }
            }

            return differenceSet;
        };

        //看otherSet是否是当前set的子集
        subset(otherSet) {

            if (this.size() > otherSet.size()) {
                return false;
            } else {
                let values = this.values();
                for (let i = 0; i < values.length; i++) {
                    if (!otherSet.has(values[i])) {
                        return false;
                    }
                }
                return true;
            }
        };



    }
    return UnorderdSet;
})();