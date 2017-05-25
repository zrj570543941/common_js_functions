let PriorityQueue = (function() {

    const items = new WeakMap();


    // 用来给每个将要传进来的elem附加优先级信息的构造函数
    class QueueElement {
        constructor(element, priority) {
            this.element = element;
            this.priority = priority;
        }
    }

    class PriorityQueue {
        constructor() {
            items.set(this, []);
        }

        /**
         * adds a new item (not support several items) to the queue by priority, 
         * 优先权较大(priority数字越大者)的会add到队列数组较前面的位置去   
         * @param  {any-type} element  将要要插入到队列中的元素
         * @param  {number} priority 数字越大者优先权越大
         * @return {undefined}          nothing
         */
        enqueue(element, priority) {
            let queueElement = new QueueElement(element, priority);
            let q = items.get(this);
            const Q_LEN = q.length;
            let added = false;

            for (let i = 0; i < Q_LEN; i++) {

                //这里其实也隐含了一个操作，那就是当for循环时碰到到一个优先级与当前要入队的元素优先级相同
                //的元素时，那就继续for循环，表示要遵循FIFO以及优先权较大者先出队两个规则
                if (queueElement.priority > q[i].priority) {
                    q.splice(i, 0, queueElement);
                    added = true;
                    break;
                }

            }

            //如果所有队列元素优先权大于当前要插入的元素或者当前队列为空，
            //那么直接在队列末尾插入元素
            if (!added) {
                q.push(queueElement);
            }
            console.log(q)
        }

        dequeue() {
            let q = items.get(this);
            let r = q.shift();
            // items.set(this, q);经测试证明并不需要这一步
            console.log(q)
            return r;
        }

        front() {
            let q = items.get(this);
            return q[0];
        }

        isEmpty() {
            return items.get(this).length === 0;
        }

        size() {
            let q = items.get(this);
            return q.length;
        }

        clear() {
            items.set(this, []);
        }

        toString() {
            let q = items.get(this);
            for (let i = 0; i < q.length; i++) {
                console.log(`${q[i].element}  - ${q[i].priority}`);
            }
        };

        print() {
            console.log(this.toString());
        }
    }
    return PriorityQueue;
})();