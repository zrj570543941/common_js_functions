function BinarySearchTree () {
	// 用来创建一个新的节点的构造函数
	var Node = function (key) {
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
	var insertNode = function (beInsertedNode, currentBeInteratedNode) {
		if (beInsertedNode.key < currentBeInteratedNode.key) {
			if (currentBeInteratedNode.left === null ) {
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



	/*
		以下三个私有方法是用于二叉树的先中后续遍历之用的，详见后面相关代码
	*/
	var inOrderTraverseNode = function(node, callback) {
		inOrderTraverseNode(node.left, callback);
		callback(node);
		inOrderTraverseNode(node.right, callback);
	}
	var preOrderTraverseNode = function(node, callback) {
		callback(node);
		preOrderTraverseNode(node.left, callback);
		preOrderTraverseNode(node.right, callback);
	};
	var postOrderTraverseNode = function(node, callback) {
		postOrderTraverseNode(node.left, callback);
		callback(node);
		postOrderTraverseNode(node.right, callback);
	}





	
	// 向二叉搜索树中插入节点
	this.insert = function (key) {
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
	this.preOrderTraverse = function (callback) {		
		if (root !== null) {
			preOrderTraverseNode(root, callback);
		}
	};
	


	//中序遍历二叉树(不仅仅适用于二叉搜索树，也适用于普通二叉树)，参数解释同中序
	this.inOrderTraverse = function (callback) {		
		if (root !== null) {
			inOrderTraverseNode(root, callback);
		}
	};
	


	//后序遍历二叉树(不仅仅适用于二叉搜索树，也适用于普通二叉树)，参数解释同中序
	this.postOrderTraverse = function (callback) {		
		if (root !== null) {
			postOrderTraverseNode(root, callback);
		}
	};
	

}