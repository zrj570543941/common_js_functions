let UndirectedGraph = (function() {
    //an array to store the names of all the vertices of the graph
    let vertices = new WeakMap();
    // The dictionary will use the name of the vertex as a key and the list of 
    // adjacent vertices as a value
    // 这里需要特别指出的是，adjList上的v1数组中有v2元素，
    // 是表示可以从v1到v2，但v2不一定能到v1
    // 所以若想表示v1和v2互通，就要在v1数组上存在v2，v2数组上存在v1，这样才能模拟一个无向图
    let adjList = new WeakMap();
    class UndirectedGraph {
        constructor() {
            vertices.set(this, []);
            adjList.set(this, new Map());
        }

        //往图中新增一个节点
        addVertex(v) {
            const _adjList = adjList.get(this),
                _vertices = vertices.get(this);


            if (_vertices.indexOf(v) >= 0 || _adjList.has(v)) {
                throw new new Error('当前图已存在相应节点');
            }

            // 在vertices数组里不存在当前节点时才新增节点
            _vertices.push(v);
            //在adjList的map中新增一个属性为v且初始化为[]
            _adjList.set(v, []);
        }

        addEdge(v1, v2) {

            if (vertices.get(this).indexOf(v1) === -1 ||
                vertices.get(this).indexOf(v1) === -1) {
                throw new new Error('当前图上至少不存在两个节点中的其中一个');
            }

            const _adjList = adjList.get(this),
                _v1List = _adjList.get(v1),
                _v2List = _adjList.get(v2);

            if (_v1List.indexOf(v2) >= 0 || _v2List.indexOf(v1) >= 0) {
                throw new new Error('当前图上的v1和v2之前就已连通');
            }

            _v1List.push(v2);
            _v2List.push(v1);
        }

        toString() {
            const _vertices = vertices.get(this),
                _verticesLen = _vertices.length,
                _adjList = adjList.get(this);

            let s = '';
            for (let i = 0; i < _verticesLen; i++) { //{10}
                s += _vertices[i] + ' -> ';
                const neighbors = _adjList.get(_vertices[i]),
                    neighborsLen = neighbors.length; //{11}

                for (let j = 0; j < neighborsLen; j++) { //{12}
                    s += neighbors[j] + ' ';
                }
                s += '\n'; //{13}
            }
            return s;
        }

        //第三步，所有原型上的方法或者不在原型上的私有方法能够通过----私有属性名称.get(this)或set(this)的方式
        //读写私有属性值，但外界是读写不到的
    }

    //最后这一步也很重要,return出构造函数
    return UndirectedGraph;
})();

var graph = new UndirectedGraph();
var myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']; //{7}
for (var i = 0; i < myVertices.length; i++) { //{8}
    graph.addVertex(myVertices[i]);
}
graph.addEdge('A', 'B'); //{9}
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('C', 'D');
graph.addEdge('C', 'G');
graph.addEdge('D', 'G');
graph.addEdge('D', 'H');
graph.addEdge('B', 'E');
graph.addEdge('B', 'F');
graph.addEdge('E', 'I');

console.log(graph.toString());