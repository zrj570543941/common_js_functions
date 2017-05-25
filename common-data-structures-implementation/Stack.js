var Stack = (function() {
    var items = new WeakMap();
    class Stack {
        constructor() {
            items.set(this, []);
        }

        // adds a new item (or several items) to the top of the stack
        push(elem) {
            let s = items.get(this);
            s.push(elem);
        }

        // removes the top item from the stack. It also returns the removed element
        pop() {
            let s = items.get(this);
            return s.pop();
        };

        // returns the top element from the stack. The stack is not modified
        peek() {
            let s = items.get(this);
            return s[s.length - 1];
        };

        // returns true if the stack does not contain any elements, 
        // and false if the size of the stack is bigger than 0
        isEmpty() {
            let s = items.get(this);
            return s.length === 0;
        }

        //returns the number of elements that the stack contains
        size() {
            let s = items.get(this);
            return s.length;
        }

        //clear all the elems in the items array
        clear() {
            items.set(this, []);
        }

        //return all the elems in the items array in a string form
        toString() {
            return items.get(this).toString();
        }

        print() {
            console.log(this.toString());
        }
    }
    return Stack;
})();