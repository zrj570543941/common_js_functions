let LinkedList = (function() {
    //第一步：要私有化的属性或方法的放置区域
    let prevLastNode = new WeakMap(); //指向进行增删节点等操作前的最后一个节点
    let head = new WeakMap(); //head.get(this)表示将要指向第一个节点的引用
    let length = new WeakMap();

    function Node(elem) {
        this.element = elem;
        this.next = null;
    }

    class LinkedList {
        constructor() {
            prevLastNode.set(this, null);
            head.set(this, null);
            length.set(this, 0);
        }

        // adds a new item to the end of the list
        append(elem) {
            const NEW_NODE = new Node(elem);


            //如果当前列表为空，直接append到head引用上
            if (head.get(this) === null) {
                head.set(this, NEW_NODE);
            } else {

                //如果当前列表不为空，直接在最后一个节点上append节点即可
                prevLastNode.get(this).next = NEW_NODE;
            }

            prevLastNode.set(this, NEW_NODE);
            length.set(this, length.get(this) + 1);
        }

        //返回被删除的节点
        removeAt(pos) {
            const len_val = length.get(this);
            if (len_val === 0) {
                throw new Error('当前列表为空');
            } else if (pos >= len_val) {
                throw new Error('当前列表长度为' + len_val + '，你传入的pos值不能大于等于列表长度');
            } else if (pos < 0) {
                throw new Error('，你传入的pos值不能为负值');
            }


            let temp_val = null;

            //若删除头节点的特殊操作
            if (pos === 0) {
                temp_val = head.get(this);
                head.set(this, temp_val.next);
                length.set(this, len_val - 1);
                return temp_val;
            }

            //若不是删除头节点，操作就在下方
            let cur_iterating_pos = 0,
                cur_iterating_node = head.get(this);

            //因为这里是要删除指定pos的节点，所以需要通过循环找到它前面相邻的节点，
            //以便循环之后要进行删除操作
            while (cur_iterating_pos !== pos - 1) {

                cur_iterating_pos++;
                cur_iterating_node = cur_iterating_node.next;
            }

            //删除节点相关操作，找到前面的相邻节点后把它的next引用清空以删除pos上的节点
            //然后再把前面的相邻节点的next引用连接到当前要删除的pos的next上去以达到重链接效果
            temp_val = cur_iterating_node.next;
            cur_iterating_node.next = temp_val.next;

            length.set(this, len_val - 1);
            return temp_val;
        };

        // 这里可以insert到空列表或是尾节点之后那个相邻的位置上，这点不同于removeAt
        insert(pos, elem) {
            let len_val = length.get(this);
            if (pos > len_val) {
                throw new Error('当前列表长度为' + len_val + '，你传入的pos不能大于等于列表长度');
            } else if (pos < 0) {
                throw new Error('，你传入的pos值不能为负值');
            }

            const NEW_NODE = new Node(elem);
            let temp_val = null,
                head_val = head.get(this);

            //在头部插入值时
            if (pos === 0) {
                temp_val = head_val;
                head.set(this, NEW_NODE);
                NEW_NODE.next = temp_val;
                length.set(this, len_val + 1);
                return;
            }

            let cur_iterating_pos = 0,
                cur_iterating_node = head_val;

            // 插入到中间节点或是到与尾部相邻的后一个节点上面的操作是一样的
            //在头部以外任何位置插入值时先找到，先找到要插入位置的相邻的前一个节点以便
            //于进行插入操作
            while (cur_iterating_pos !== pos - 1) {
                cur_iterating_node = cur_iterating_node.next;
                cur_iterating_pos++;
            }

            //找到后进行插入值的操作
            temp_val = cur_iterating_node.next;
            cur_iterating_node.next = NEW_NODE;
            NEW_NODE.next = temp_val;
            length.set(this, len_val + 1);

        }

        remove(element) {

            let index = this.indexOf(element);
            return this.removeAt(index);
        }


        toString() {
            let cur_iterating_node = head.get(this),
                string = '';

            while (cur_iterating_node !== null) {
                string = string + cur_iterating_node.element + (cur_iterating_node.next ? ',' : '');
                cur_iterating_node = cur_iterating_node.next;
            }
            return string;
        }

        print() {
            console.log(this.toString());
        }

        indexOf(element) {
            let current = head.get(this),
                index = 0;

            while (current) {

                if (element === current.element) {
                    return index;

                }
                index++;

                current = current.next;
            }
            return -1;
        }

        isEmpty() {
            return length.get(this) === 0;
        }

        size() {
            return length.get(this);
        }

        // 此方法得慎用， 因为直接给予了外界随意改变链表的权利
        getHead() {
            return head.get(this);
        }

        each(fn) {
            const headVal = head.get(this);
            let cur_iterating_node = headVal;

            while (cur_iterating_node !== null) {
                fn(cur_iterating_node);
                cur_iterating_node = cur_iterating_node.next;
            }
        }

        // 遍历链表找到第一个符合fn body里的限制条件的链表节点并返回
        // 若没有找到返回null
        // fn接收的参数为当前遍历得到的节点，传进fn的方法必须得表示一个满足限制条件
        // 得返回truey否则返回falsy的方法
        find(fn) {
            const headVal = head.get(this);
            let cur_iterating_node = headVal;

            while (cur_iterating_node !== null) {
                if (fn(cur_iterating_node) == true) {
                    return cur_iterating_node;
                    break;
                }
                cur_iterating_node = cur_iterating_node.next;
            }

            //如果没找到符合条件的节点会返回
            return null;
        }

    }


    //最后这一步也很重要,return出构造函数
    return LinkedList;
})();

//原理：每传入一个key，都会通过loseloseHashCode方法找到
//相对应的key-value pairs的那个链表节点所在链表，这个链表在table数组中位置
//并且这里的table数组中每个元素是一个链表，这个key-value pairs都会以链表节点的形式存储到链表中去
//具体存储形式是每个链表节点的element属性会用ValuePair类来存储当前的key-value pairs
//这样做就能解决单纯通过loseloseHashCode方法找到数组位置并直接在数组元素上存value所引起的不同的keys位置互相冲突问题
let HashMap = (function() {
    //table.get(this)表示一个数组，每个数组元素会是或将会是一个链表(因为也有
    //可能是undefined，链表上存的element属性就是map中的key-value pairs
    const table = new WeakMap();

    //table数组每个数组元素上的链表的每个节点的element对于的value值都会是这个类型，用来
    //存储map中的每个key-value pairs
    class ValuePair {
        constructor(key, value) {
            this.key = key;
            this.value = value;
        }
        toString() {
            return '[' + this.key + ' - ' + this.value + ']';
        }
    };


    //原理：取得key每个字符的编码值并取总和并取余，这个值会被当做
    //被传入key对应的key-value pairs的那个链表节点所在链表，这个链表在table数组中位置
    const loseloseHashCode = function(key) {
        var hash = 0;
        for (var i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i);
        }
        return hash % 37; //取余是为了table数组过长防止这个37数字是任意的，可以是其他任意数字
    };


    class HashMap {
        constructor() {
            //初始化table数组
            table.set(this, []);
        }

        //通过loseloseHashCode找到key相对应的链表在table数组中的位置
        set(key, value) {
            let position = loseloseHashCode(key);
            const _table = table.get(this),
                newValuePair = new ValuePair(key, value);

            let tableItem = _table[position];

            if (_table[position] === undefined) {
                //这里之所以不用tableItem赋值是因为若用tableItem赋值会导致tableItem指向一个新的链表而非table数组上的某元素
                _table[position] = new LinkedList();
                _table[position].append(newValuePair);
            } else {
                // let sign = false; //当前链表中是否已存在一个节点具有相同的key
                let foundedListNode = tableItem.find((listNode) => {
                    return listNode.element.key === key;
                });

                if (foundedListNode) {
                    foundedListNode.element.value = value;
                } else {
                    tableItem.append(newValuePair);
                }

            }


            //_table[position] = value;
        }

        //读操作，读到返回相应value，否则返回undefined
        //原理是通过loseloseHashCode找到key相应的key-value pairs的那个链表节点所在链表
        //在table数组中的位置，然后遍历链表找到相应节点返回
        get(key) {
            let tableItem = table.get(this)[loseloseHashCode(key)];
            //加这一步是因为下面调用tableItem.find时若tableItem为undefined会报错
            if (tableItem === undefined) {
                return undefined;
            }
            let foundedListNode = tableItem.find((listNode) => {
                return listNode.element.key === key;
            });

            return foundedListNode === null ? undefined : foundedListNode.element.value;
        }

        remove(key) {

            const position = loseloseHashCode(key),
                _table = table.get(this);

            if (_table[position] !== undefined) {

                //iterate linked list to find key/value
                var current = _table[position].getHead();

                do {
                    if (current.element.key === key) {
                        _table[position].remove(current.element);
                        if (_table[position].isEmpty()) {
                            //这里并没有真正的在table数组中删掉一个数组元素而只是设为undefined是因为当删一个数组元素时
                            //会引起其他数组元素的位置变动，下次想要对其他values进行操作时就会发生意外
                            _table[position] = undefined;
                        }
                        return true;
                    }
                    current = current.next;
                } while (current);
            }

            return false;
        }
    }

    return HashMap;
})();