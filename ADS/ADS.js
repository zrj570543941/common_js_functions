(function() {

    //初始化ADS命名空间
    if (!window.ADS) {
        window['ADS'] = {};
    }

    // 用来检测当前库是否与当前浏览器兼容
    function isCompatible(other) {
        if (other === false ||
            !Array.prototype.push ||
            !document.createElement ||
            !document.getElementsByTagName) {

            return false;
        }
        return true;
    }
    window.ADS.isCompatible = isCompatible;

    /**
     * document.getElementById(); replacement.
     */
    function $() {
        var elements = [],
            element;

        // 遍历所有形参
        for (var i = 0; i < arguments.length; i++) {
            element = arguments[i];

            // 如果某形参为字符串类型，就假设它表示一个id
            if (typeof element === 'string') {
                element = document.getElementById(element);
            }

            //如果只有传进了一个形参，直接返回该元素
            if (arguments.length === 1) {
                return element;
            }

            elements.push(element);
        }

        //若传进了多个形参，就返回一个dom对象数组集合
        return elements;
    }
    window['ADS']['$'] = $;

    /**
     * Register an event listener on an element
     * @param {elemNode} node     代表一个普通的dom元素节点
     * @param {string} type     要绑定的事件类型
     * @param {function} listener 要绑定的事务处理函数的名称，注意必须是有名函数，被传入的第一个参数为e对象
     */
    function addEvent(node, type, listener) {
        // Check compatibility using the earlier method
        // to ensure graceful degradation
        if (!isCompatible()) {
            return false;
        }

        if (node.addEventListener) {
            // W3C method
            node.addEventListener(type, listener, false);
            return true;
        } else if (node.attachEvent) {
            // MSIE method
            // 之所以多下面一步是为了在removeEvent时能够正确的引用到要删除的handler
            node[type + listener] = function() {
                listener(window.event);
            };
            node.attachEvent('on' + type, node[type + listener]);
            return true;
        }

        // Didn't have either so return false
        return false;
    };
    window['ADS']['addEvent'] = addEvent;

    /**
     * remove an event listener on an element
     * @param {elemNode} node     代表一个普通的dom元素节点
     * @param {string} type     要删除的handler对应的事件类型
     * @param {function} listener 要删除的事务处理函数的名称，注意必须是有名函数，被传入的第一个参数为e对象
     */
    function removeEvent(node, type, listener) {
        // Check compatibility using the earlier method
        // to ensure graceful degradation
        if (!isCompatible()) {
            return false;
        }

        if (node.removeEventListener) {
            // W3C method
            node.removeEventListener(type, listener, false);
            return true;
        } else if (node.detachEvent) {
            // MSIE method
            node.detachEvent('on' + type, node[type + listener]);
            node[type + listener] = null;
            return true;
        }

        // Didn't have either so return false
        return false;
    };

    /**
     * 查找当前parentNode下所有符合classNames的元素集合
     * @param  {string} classNames 一个用空格隔开的类名集字符串集合
     * @param  {elemNode} parentNode 要查找的类名集合的范围，比如就想查找一个ul下的
     * @return {nodeList or array}            符合条件的元素集合
     */
    function getElementsByClassName(classNames, parentNode) {


        if (parentNode.getElementsByClassName) {
            return parentNode.getElementsByClassName(classNames);
        }

        var allDecendantElems = parentNode.getElementsByTagName('*'),
            matchingElems = [],
            classNamesArr = classNames.split(' '),
            everyDecendantClassNamesArr, //parent每个后代元素节点的类名的数组集合
            sign = false; //用于检测是否每个元素节点的className属性值包含所有classNamesArr里的元素的标志

        for (var i = 0; i < allDecendantElems.length; i++) {
            everyDecendantClassNamesArr = allDecendantElems[i].className.split(' ');

            //检测每个元素节点的className属性值是否包含所有classNamesArr里的元素值，是的话sign为true，否的话为false
            for (var j = 0; j < classNamesArr.length; j++) {
                if (everyDecendantClassNamesArr.indexOf(classNamesArr[j]) < 0) {
                    sign = false;
                    break;
                } else {
                    sign = true;
                }
            }

            //当前元素节点包含有所有的classNames时，就代表当前元素节点符合条件
            if (sign === true) {
                matchingElems.push(allDecendantElems[i]);
            }

        }

        return matchingElems;

    }
    window['ADS']['getElementsByClassName'] = getElementsByClassName;

    /**
     * Toggle the style display value between none and the default
     * @param  {elemNode} node  想要操作的dom节点
     * @param  {string} value 在可见时的display值
     * @return {boolean}       
     */
    function toggleDisplay(node, value) {
        if (node.style.display != 'none') {
            node.style.display = 'none';
        } else {
            node.style.display = value || '';
        }
        return true;
    }
    window['ADS']['toggleDisplay'] = toggleDisplay;


    /**
     * Insert a DOM node after another DOM-node
     * @param  {any-dom-type} node          将要插入到refrerencenode之前的节点
     * @param  {any-dom-type} referenceNode 指明要插入到哪个节点的后面   
     * @return {nothing}               
     */
    function insertAfter(node, referenceNode) {
        return referenceNode.parentNode.insertBefore(node, referenceNode.nextSibling);
    };
    window['ADS']['insertAfter'] = insertAfter;

    /**
     * Remove all teh child nodes from an element
     * @param  {any-dom-type} parent 将要被清空后代节点的节点
     * @return {any-don-type}        用于支持连缀操作
     */
    function removeChildren(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
        //支持连缀操作
        return parent;
    }
    window['ADS']['removeChildren'] = removeChildren;

    /**
     * Insert a new node as the first child.
     * @param  {any-dom-type} parent   将要被插入的父级节点
     * @param  {any-dom-type} newChild 将要插入并当做parent的第一个子节点的节点
     * @return {[type]}          [description]
     */
    function prependChild(parent, newChild) {
        if (parent.firstChild) {
            // There is already a child so insert before the first one
            parent.insertBefore(newChild, parent.firstChild);
        } else {
            // No children so just append
            parent.appendChild(newChild);
        }
        // Return the parent again so you can stack the methods
        return parent;
    }
    window['ADS']['prependChild'] = prependChild;
}());