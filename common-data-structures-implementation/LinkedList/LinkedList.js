let LinkedList = (function() {
    //第一步：要私有化的属性或方法的放置区域
    let prevLastNode = new WeakMap(); //指向进行增删节点等操作前的最后一个节点
    let head = new WeakMap(); //将要指向第一个节点的引用
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
            console.log(head.get(this))
        }

        removeAt(pos) {
            const len_val = length.get(this);
            if (len_val === 0) {
                throw new Error('当前列表为空');
            } else if (pos >= len_val) {
                throw new Error('当前列表长度为' + len_val + '，你传入的pos值不能大于等于列表长度');
            } else if (pos < 0) {
                throw new Error('，你传入的pos值不能为负值');
            }


            //若删除头节点的特殊操作
            if (pos === 0) {
                head.set(this, head.get(this).next);
                length.set(this, len_val - 1);
                return;
            }

            //若不是删除头节点，操作就在下方
            let cur_iterating_pos = 0,
                cur_iterating_node = head.get(this),
                temp_val = null;

            //因为这里是要删除指定pos的节点，所以需要通过循环找到它前面相邻的节点，
            //以便循环之后要进行删除操作
            while (cur_iterating_pos !== pos - 1) {

                cur_iterating_pos++;
                cur_iterating_node = cur_iterating_node.next;
            }

            //删除节点相关操作，找到前面的相邻节点后把它的next引用清空以删除pos上的节点
            //然后再把前面的相邻节点的next引用连接到当前要删除的pos的next上去以达到重链接效果
            temp_val = cur_iterating_node.next.next;
            cur_iterating_node.next = null;
            cur_iterating_node.next = temp_val;

            length.set(this, len_val - 1);
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
        };

        size() {
            return length.get(this);
        };

        // 此方法得慎用， 因为直接给予了外界随意改变链表的权利
        getHead() {
            return head.get(this);
        };

    }


    //最后这一步也很重要,return出构造函数
    return LinkedList;
})();