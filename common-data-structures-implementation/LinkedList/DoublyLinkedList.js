let DoublyLinkedList = (function() {
    let head = new WeakMap(); //将要指向第一个节点的引用
    var tail = new WeakMap();
    let length = new WeakMap();
    let _THIS;

    class Node {
        constructor(elem) {
            this.element = elem;
            this.next = null;
            this.prev = null;
        }
    }

    //传入要找的节点的pos值然后找到相应node返回
    function findTargetNode(targetNodePos) {
        let lenVal = length.get(_THIS);
        let iterate_dir = targetNodePos / lenVal <= 0.5 ? 'forward' : 'reverse',
            cur_iterating_node = iterate_dir === 'forward' ? head.get(_THIS) : tail.get(_THIS),
            cur_iterating_pos = iterate_dir === 'forward' ? 0 : lenVal - 1;


        // 并且根据要删除的pos是离头还是尾更近绝对是从正向还是
        // 反向找要删除的节点
        if (iterate_dir === 'forward') {
            while (cur_iterating_pos !== targetNodePos) {
                cur_iterating_pos++;
                cur_iterating_node = cur_iterating_node.next;
            }
        } else {
            while (cur_iterating_pos !== targetNodePos) {
                cur_iterating_pos--;
                cur_iterating_node = cur_iterating_node.prev;
            }
        }

        return cur_iterating_node;
    }

    class DoublyLinkedList {
        constructor() {
            tail.set(this, null);
            head.set(this, null);
            length.set(this, 0);
            _THIS = this;
        }

        // adds a new item to the end of the list
        append(elem) {
            const NEW_NODE = new Node(elem);
            let headVal = head.get(this),
                tailVal = tail.get(this);


            //如果当前列表为空，直接append到head引用上
            if (headVal === null) {
                head.set(this, NEW_NODE);
                tail.set(this, NEW_NODE);
            } else {
                //如果当前列表不为空
                tailVal.next = NEW_NODE;
                NEW_NODE.prev = tailVal;
                tail.set(this, NEW_NODE);
            }

            length.set(this, length.get(this) + 1);
            console.log(head.get(this), length.get(this));
        }

        removeAt(pos) {
            const lenVal = length.get(this);
            //注意这里跟insert方法不同，不可以在列表为空时传入0或传入pos值等于列表长度的值
            if (lenVal === 0) {
                throw new Error('当前列表为空');
            } else if (pos >= lenVal) {
                throw new Error('当前列表长度为' + lenVal + '，你传入的pos值不能大于等于列表长度');
            } else if (pos < 0) {
                throw new Error('，你传入的pos值不能为负值');
            }

            let be_deleted_node = null;

            //若删除的是头或尾部节点的特殊操作
            if (pos === 0 || pos === lenVal - 1) {

                //若删除的是头节点的特殊操作
                if (pos === 0) {
                    let headVal = head.get(this);

                    be_deleted_node = headVal;

                    //若列表仅有一个长度
                    if (lenVal === 1) {
                        head.set(this, null);
                    } else {
                        //若列表大于1个长度的操作
                        head.set(this, headVal.next);
                        head.get(this).prev = null;
                    }
                    // length.set(this, lenVal - 1);
                    //return;之所以去掉return是因为可能要删除的节点同时是尾和头节点，使下面
                    //关于处理尾节点的操作也能执行
                }

                //若删除的是尾节点的特殊操作
                if (pos === lenVal - 1) {
                    let tailVal = tail.get(this);

                    be_deleted_node = tailVal;

                    //若列表仅有一个长度
                    if (lenVal === 1) {
                        tail.set(this, null);
                    } else {
                        //若列表大于1个长度的操作
                        tail.set(this, tailVal.prev);
                        tail.get(this).next = null;
                    }
                }

                length.set(this, lenVal - 1);
                return be_deleted_node; //这里放return是因为要删除的节点不可能既是头或尾节点也是中间的节点
            }

            // 若要删除的不是删除头或尾节点， 操作就在下方
            // 并且根据要删除的pos是离头还是尾更近绝对是从正向还是
            // 反向找要删除的节点
            let cur_iterating_node = findTargetNode(pos),
                temp_val = null;



            //删除普通中间的节点相关操作
            temp_val = cur_iterating_node.prev;
            temp_val.next = cur_iterating_node.next;
            cur_iterating_node.next.prev = temp_val;

            length.set(this, lenVal - 1);
            return cur_iterating_node;
        }

        // 这里可以insert到空列表或是尾节点之后那个相邻的位置上，这点不同于removeAt
        insert(pos, elem) {
            let lenVal = length.get(this);
            //注意这里跟removeAt方法不同，可以在列表为空时传入0或传入pos值等于列表长度的值
            if (pos > lenVal) {
                throw new Error('当前列表长度为' + lenVal + '，你传入的pos不能大于等于列表长度');
            } else if (pos < 0) {
                throw new Error('，你传入的pos值不能为负值');
            }


            const NEW_NODE = new Node(elem);

            //若要插入作为列表尾节点或头节点的特殊操作
            if (pos === 0 || pos === lenVal) {

                //若要插入作为列表尾节点的特殊操作
                if (pos === 0) {

                    //列表为空且pos=0时得操作
                    if (lenVal === 0) {
                        head.set(this, NEW_NODE);
                    } else {
                        //列表长度大于等于1时的操作
                        let oldHeadVal = head.get(this);
                        head.set(this, NEW_NODE);
                        NEW_NODE.next = oldHeadVal;
                        oldHeadVal.prev = NEW_NODE;
                    }

                }
                // return; //这里不放return是因为要插入的节点可能既是头节点也是尾节点

                //若要插入作为列表尾节点的特殊操作
                if (pos === lenVal) {

                    //列表为空且pos=lenVal时得操作
                    if (lenVal === 0) {
                        tail.set(this, NEW_NODE);
                    } else {
                        //列表长度大于等于1时的操作
                        let oldTailVal = tail.get(this);
                        tail.set(this, NEW_NODE);
                        NEW_NODE.prev = oldTailVal;
                        oldTailVal.next = NEW_NODE;
                    }
                }

                length.set(this, lenVal + 1);
                return; //这里放return是因为要插入的节点不可能既作为头节点也作为尾节点也作为中间节点
            }



            // 插入作为中间节点时的操作
            let cur_iterating_node = findTargetNode(pos);
            let temp_val = null;

            //找到后进行插入值的操作
            temp_val = cur_iterating_node.prev;
            temp_val.next = NEW_NODE;
            NEW_NODE.prev = temp_val;
            NEW_NODE.next = cur_iterating_node;
            cur_iterating_node.prev = NEW_NODE;
            length.set(this, lenVal + 1);
        }

        remove(element) {

            let index = this.indexOf(element);
            return this.removeAt(index);
        }

        indexOf(element) {

            let current = this.getHead(),
                index = -1;

            //check first item
            if (element == current.element) {
                return 0;
            }

            index++;

            //check in the middle of the list
            while (current.next) {

                if (element == current.element) {
                    return index;
                }

                current = current.next;
                index++;
            }

            //check last item
            if (element == current.element) {
                return index;
            }

            return -1;
        }

        isEmpty() {
            return this.size() === 0;
        }

        size() {
            return length.get(this);
        }

        toString() {

            let current = this.getHead(),
                s = current ? current.element : '';

            while (current && current.next) {
                current = current.next;
                s += ', ' + current.element;
            }

            return s;
        }

        inverseToString() {

            let current = this.getTail(),
                s = current ? current.element : '';

            while (current && current.prev) {
                current = current.prev;
                s += ', ' + current.element;
            }

            return s;
        }

        print() {
            console.log(this.toString());
        }

        printInverse() {
            console.log(this.inverseToString());
        }

        getHead() {
            return head.get(this);
        }

        getTail() {
            return tail.get(this);
        }

    }


    //最后这一步也很重要,return出构造函数
    return DoublyLinkedList;
})();


var a = new DoublyLinkedList();
a.append(0)
a.append(1)
a.append(2)
    // a.append(3)
a.append(4)
a.insert(0, -1);