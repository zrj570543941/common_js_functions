let Queue = (function() {
    var items = new WeakMap();
    class Queue {
        constructor() {
            items.set(this, []);
        }

        // adds a new item (or several items) at the back of the queue
        enqueue(elem) {
            let q = items.get(this);
            q.push(elem);
        }

        // removes the first item from the queue
        dequeue() {
            let q = items.get(this);
            return q.shift();
        }

        // returns the first element from the queue
        front() {
            let q = items.get(this);
            return q[0];
        }

        // returns true if the queue does not contain any elements, and false if the queue is bigger than 0
        isEmpty() {
            let q = items.get(this);
            return q.length === 0;
        }

        // returns the number of elements the queue contains
        size() {
            let q = items.get(this);
            return q.length;
        }

        // delete all the elems in the queue
        clear() {
            items.set(this, []);
        }

        // return all the elems in the queue array in a string form
        toString() {
            let q = items.get(this);
            return q.toString();
        }

        print() {
            console.log(this.toString());
        }

    }
    return Queue;
})();