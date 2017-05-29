function BinarySearchTree() {
    // 用来创建一个新的节点的构造函数
    var Node = function(key) {
        this.left = null;
        this.right = null;
        this.key = key;
    }

    // 初始化根节点为空
    var root = null;

    //若当前二叉搜索树的root节点不为空，则会调用此函数来插入节点
    //思想是层级小者最优先插入节点，次之是靠左边者节点优先插入节点
    /*
    	参数解释：beInsertedNode：将要被插入的新的节点
    	currentBeInteratedNode：当前被遍历到的节点，可能它的左侧或右侧会被插入新的节点
    */
    var insertNode = function(beInsertedNode, currentBeInteratedNode) {
        if (beInsertedNode.key < currentBeInteratedNode.key) {
            if (currentBeInteratedNode.left === null) {
                currentBeInteratedNode.left = beInsertedNode;
            } else {
                insertNode(beInsertedNode, currentBeInteratedNode.left)
            }
        } else {
            if (currentBeInteratedNode.right === null) {
                currentBeInteratedNode.right = beInsertedNode;
            } else {
                insertNode(beInsertedNode, currentBeInteratedNode.right);
            }

        }
    }

    //作用：在根节点为node的树上面找到key等于传入这个方法的key的那个节点并返回
    //原理：对于遍历中遇到的每个节点，判断要寻找的key与当前node的key是否相等，若相等，表示相应节点找到了，
    //若没找到，则判断要寻找的key与当前node的key的大小关系，比当前node的key小就找当前node的左边子树。
    //否则，找右边子树，若直到叶节点都没找到，则表示当前key并不存在于当前树中    
    var searchNode = function(node, key) {
        // 若一直遍历到叶节点都没找到，则表示当前key并不存在于当前树中
        if (node === null) {
            return null;
        }

        const nodeKey = node.key,
            callee = arguments.callee;

        if (nodeKey === key) {
            return node;
        } else if (key < nodeKey) {
            return callee(node.left, key);
        } else {
            return callee(node.right, key);
        }
    };

    //作用：在根节点为node的树上面找到key最小的节点返回
    //原理：最小值一定存在于最左边的叶节点上，所以一直往left方向找就行
    var findMinNode = function(node) {
        //若当前树为空，则无最值
        if (node === null) {
            return null;
        }

        //找到无左孩子节点的节点为止
        while (node.left !== null) {
            node = node.left;
        }

        return node;
    };

    //作用：在根节点为node的树上面找到key最大的节点返回
    //原理：最大值一定存在于最右边的叶节点上，所以一直往right方向找就行
    var findMaxNode = function(node) {
        //若当前树为空，则无最值
        if (node === null) {
            return null;
        }

        //找到无左孩子节点的节点为止
        while (node.right !== null) {
            node = node.right;
        }

        return node;
    };



    /*
    	以下三个私有方法是用于二叉树的先中后续遍历之用的，详见后面相关代码
    */
    var inOrderTraverseNode = function(node, callback) {
        if (node !== null) {
            inOrderTraverseNode(node.left, callback);
            callback(node);
            inOrderTraverseNode(node.right, callback);
        }
    }
    var preOrderTraverseNode = function(node, callback) {
        if (node !== null) {
            callback(node);
            preOrderTraverseNode(node.left, callback);
            preOrderTraverseNode(node.right, callback);
        }
    };
    var postOrderTraverseNode = function(node, callback) {
        if (node !== null) {
            postOrderTraverseNode(node.left, callback);
            callback(node);
            postOrderTraverseNode(node.right, callback);
        }
    };

    var removeNode = function(node, key) {

        if (node === null) {
            return null;
        }

        if (key < node.key) {
            node.left = removeNode(node.left, key);
            return node;

        } else if (key > node.key) {
            node.right = removeNode(node.right, key);
            return node;

        } else { //key is equal to node.item

            //handle 3 special conditions
            //1 - a leaf node
            //2 - a node with only 1 child
            //3 - a node with 2 children

            //case 1
            if (node.left === null && node.right === null) {
                node = null;
                return node;
            }

            //case 2
            if (node.left === null) {
                node = node.right;
                return node;

            } else if (node.right === null) {
                node = node.left;
                return node;
            }

            //case 3
            var aux = findMinNode(node.right);
            node.key = aux.key;
            node.right = removeNode(node.right, aux.key);
            return node;
        }
    };



    // 向二叉搜索树中插入节点
    this.insert = function(key) {
        var newNode = new Node(key);
        if (root === null) {
            root = newNode;
        } else {
            insertNode(newNode, root);
        }
    }



    //以下为三种遍历二叉搜索树的方法
    /*参数解释
    callback：一个节点被遍历出来后，定义想要如何操作这个节点的回调函数，传入的是节点的键值
    */


    //先序遍历二叉树(不仅仅适用于二叉搜索树，也适用于普通二叉树)，参数解释同中序
    this.preOrderTraverse = function(callback) {
        preOrderTraverseNode(root, callback);
    };



    //中序遍历二叉树(不仅仅适用于二叉搜索树，也适用于普通二叉树)，参数解释同中序
    this.inOrderTraverse = function(callback) {
        inOrderTraverseNode(root, callback);
    };



    //后序遍历二叉树(不仅仅适用于二叉搜索树，也适用于普通二叉树)，参数解释同中序
    this.postOrderTraverse = function(callback) {
        postOrderTraverseNode(root, callback);
    };

    //若存在最小值返回最小key，否则返回false
    this.min = function() {
        return findMinNode(root) === null ? false : findMinNode(root).key;
    }

    //若存在最大值返回最大key，否则返回false
    this.max = function() {
        return findMaxNode(root) === null ? false : findMaxNode(root).key;
    }

    // 判断一个值在树中是否存在，找到相应节点返回true，否则返回false
    this.exist = function(key) {
        //从root开始向下找
        return Boolean(searchNode(root, key));
    }

    this.remove = function(key) {
        root = removeNode(root, key);
    };


}