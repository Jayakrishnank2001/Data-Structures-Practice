//Hash Table
class HashTable {
  constructor(size) {
    this.size = size;
    this.table = new Array(size).fill(null).map(() => [])
  }
  hash(key) {
    let hashValue = 0;
    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }
    return hashValue % this.size;
  }
  set(key, value) {
    const index = this.hash(key);
    this.table[index].push({ key, value });
  }
  get(key) {
    const index = this.hash(key);
    const bucket = this.table[index];
    for (const entry of bucket) {
      if (entry.key === key) {
        return entry.value;
      }
    }
    return undefined;
  }
  remove(key) {
    const index = this.hash(key);
    const bucket = this.table[index];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        bucket.splice(i, 1);
        return true;
      }
    }
    return false;
  }
  print() {
    console.log("Hash Table:");
    for (let i = 0; i < this.size; i++) {
      console.log(`${i}:`, this.table[i]);
    }
  }
}
const myHashTable = new HashTable(20);
myHashTable.set("name", "John");
myHashTable.set("age", 25);
myHashTable.set("city", "New York");
myHashTable.print();
console.log("Value for 'name':", myHashTable.get("name"));

//Tree 
class Node {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
  }
}
class binarySearchTree {
  constructor() {
    this.root = null
  }
  isEmpty() {
    return this.root === null
  }
  insert(value) {
    const node = new Node(value)
    if (this.isEmpty()) {
      this.root = node
    } else {
      this.insertNode(this.root, node)
    }
  }
  insertNode(root, node) {
    if (node.value < root.value) {
      if (root.left === null) {
        root.left = node
      } else {
        this.insertNode(root.left, node)
      }
    } else {
      if (root.right === null) {
        root.right = node
      } else {
        this.insertNode(root.right, node)
      }
    }
  }
  search(root, value) {
    if (!root) {
      return false
    } else {
      if (root.value === value) {
        return true
      } else if (value < root.value) {
        return this.search(root.left, value)
      } else {
        return this.search(root.right, value)
      }
    }
  }
  preOrder(root) {
    if (root) {
      console.log(root.value)
      this.preOrder(root.left)
      this.preOrder(root.right)
    }
  }
  inOrder(root) {
    if (root) {
      this.inOrder(root.left)
      console.log(root.value)
      this.inOrder(root.right)
    }
  }
  postOrder(root) {
    if (root) {
      this.postOrder(root.left)
      this.postOrder(root.right)
      console.log(root.value)
    }
  }
  levelOrder() {
    const queue = []
    queue.push(this.root)
    while (queue.length) {
      let curr = queue.shift()
      console.log(curr.value)
      if (curr.left) {
        queue.push(curr.left)
      }
      if (curr.right) {
        queue.push(curr.right)
      }
    }
  }
  min(root) {
    if (!root.left) {
      return root.value
    } else {
      return this.min(root.left)
    }
  }
  max(root) {
    if (!root.right) {
      return root.value
    } else {
      return this.max(root.right)
    }
  }
  delete(value) {
    this.root = this.deleteNode(this.root, value)
  }
  deleteNode(root, value) {
    if (root === null) {
      return root
    }
    if (value < root.value) {
      root.left = this.deleteNode(root.left, value)
    } else if (value > root.value) {
      root.right = this.deleteNode(root.right, value)
    } else {
      if (!root.left && !root.right) {
        return null
      }
      if (!root.left) {
        return root.right
      } else if (!root.right) {
        return root.left
      }
      root.value = this.min(root.right)
      root.right = this.deleteNode(root.right, root.value)
    }
    return root
  }
  isBST(node, min, max) {
    if (!node) {
      return true
    }
    if (node.value < min || node.value > max) {
      return false
    }
    return (this.isBST(node.left, min, node.value) && this.isBST(node.right, node.value, max))
  }
  closestValueBST(root, target) {
    let closestValue = root.value
    let currentNode = root
    while (currentNode !== null) {
      if (Math.abs(target - currentNode.value) < Math.abs(target - closestValue)) {
        closestValue = currentNode.value
      }
      if (target < currentNode.value) {
        currentNode = currentNode.left
      } else if (target > currentNode.value) {
        currentNode = currentNode.right
      } else {
        return target
      }
    }
    return closestValue
  }
}
const bst = new binarySearchTree()
console.log("Tree isEmpty?", bst.isEmpty())
bst.insert(10)
bst.insert(15)
bst.insert(5)
bst.insert(3)
bst.insert(7)
console.log(bst.search(bst.root, 10))
console.log(bst.search(bst.root, 20))
bst.levelOrder()
console.log("minimum : ", bst.min(bst.root))
console.log("maximum : ", bst.max(bst.root))
bst.delete(15)
bst.levelOrder()
console.log(bst.isBST(bst.root))
console.log(bst.closestValueBST(bst.root, 7))

//HEAP data structure
class MaxHeap {
  constructor() {
    this.heap = []
  }
  insert(value) {
    this.heap.push(value)
    this.bubbleUp(this.heap.length - 1)
  }
  remove() {
    if (this.heap.length === 0) {
      return null
    }
    const maxValue = this.heap[0]
    const lastValue = this.heap.pop()
    if (this.heap.length > 0) {
      this.heap[0] = lastValue
      this.sinkDown(0)
    }
    return maxValue
  }
  build(array) {
    this.heap = array
    for (let i = Math.floor((array.length / 2) - 1); i >= 0; i--) {
      this.sinkDown(i)
    }
  }
  bubbleUp(index) {
    const value = this.heap[index]
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2)
      const parentValue = this.heap[parentIndex]
      if (value <= parentValue) {
        break
      }
      this.heap[parentIndex] = value
      this.heap[index] = parentValue
      index = parentIndex
    }
  }
  sinkDown(index) {
    const length = this.heap.length
    const value = this.heap[index]
    while (true) {
      let leftChildIndex = 2 * index + 1
      let rightChildIndex = 2 * index + 2
      let swapIndex = null
      if (leftChildIndex < length) {
        const leftChildValue = this.heap[leftChildIndex]
        if (leftChildValue > value) {
          swapIndex = leftChildIndex
        }
      }
      if (rightChildIndex < length) {
        const rightChildValue = this.heap[rightChildIndex]
        if (
          (swapIndex === null && rightChildValue > value) ||
          (swapIndex !== null && rightChildValue > this.heap[swapIndex])
        ) {
          swapIndex = rightChildIndex
        }
      }
      if (swapIndex === null) {
        break
      }
      this.heap[index] = this.heap[swapIndex]
      this.heap[swapIndex] = value
      index = swapIndex
    }
  }
}
const maxHeap = new MaxHeap()
maxHeap.insert(10)
maxHeap.insert(8)
maxHeap.insert(12)
maxHeap.insert(6)
console.log(maxHeap.heap)
console.log(maxHeap.remove())
console.log(maxHeap.heap)
const array = [15, 20, 7, 11, 2]
maxHeap.build(array)
console.log(maxHeap.heap)

//---HEAP SORT---//

function heapSort(arr) {
  buildMaxHeap(arr);
  for (let i = arr.length - 1; i > 0; i--) {
    swap(arr, 0, i);
    heapify(arr, 0, i);
  }
  return arr;
}
function buildMaxHeap(arr) {
  const n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, i, n);
  }
}
function heapify(arr, i, n) {
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  let largest = i;
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }
  if (largest !== i) {
    swap(arr, i, largest);
    heapify(arr, largest, n);
  }
}
function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
const arr = [4, 10, 3, 5, 1];
console.log(heapSort(arr));


//Trie
class trieNode {
  constructor() {
    this.children = {}
    this.isEndOFNode = false
  }
}
class Trie {
  constructor() {
    this.root = new trieNode()
  }
  insert(word) {
    let node = this.root
    for (let i = 0; i < word.length; i++) {
      const char = word[i]
      if (!node.children[char]) {
        node.children[char] = new trieNode()
      }
      node = node.children[char]
    }
    node.isEndOFNode = true;
  }
  search(word) {
    let node = this.root
    for (let i = 0; i < word.length; i++) {
      const char = word[i]
      if (!node.children[char]) {
        return false;
      }
      node = node.children[char]
    }
    return node.isEndOFNode
  } 
  startswith(prefix) {
    let node = this.root
    for (let i = 0; i < prefix.length; i++) {
      const char = prefix[i]
      if (!node.children[char]) {
        return false;
      }
      node = node.children[char]
    }
    return true;
  }
  delete(word) {
    if (this.search(word) === false) {
      console.log(word, " is not in the trie");
      return
    }
    let node = this.root;
    for (let i = 0; i < word.length; i++) {
      const char = word[i]
      if (node.children[char] === null) {
        return
      }
      node = node.children[char]
    }
    node.isEndOFNode = false
  }
}
const trie = new Trie()
//trie.insert("apple")
trie.insert("banana")
trie.insert("app")
console.log(trie.startswith("ap"))
console.log(trie.search("apple"))
trie.delete("apple")
console.log(trie.search("apple"))
console.log(trie.search("app"))
console.log(trie.search("orange"))

//Graph
class Graph {
  constructor() {
    this.adjacencyList = {}
  }
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = new Set()
    }
  }
  addEdge(vertex1, vertex2) {
    if (!this.adjacencyList[vertex1]) {
      this.addVertex(vertex1)
    }
    if (!this.adjacencyList[vertex2]) {
      this.addVertex(vertex2)
    }
    this.adjacencyList[vertex1].add(vertex2)
    this.adjacencyList[vertex2].add(vertex1)
  }
  removeEdge(vertex1, vertex2) {
    this.adjacencyList[vertex1].delete(vertex2)
    this.adjacencyList[vertex2].delete(vertex1)
  }
  removeVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      return
    }
    for (let adjacentVertex of this.adjacencyList[vertex]) {
      this.removeEdge(vertex, adjacentVertex)
    }
    delete this.adjacencyList[vertex]
  }
  hasEdge(vertex1, vertex2) {
    return (
      this.adjacencyList[vertex1].has(vertex2) &&
      this.adjacencyList[vertex2].has(vertex1)
    )
  }
  bfs(startingVertex) {
    const visited = {}
    const queue = []
    const result = []
    visited[startingVertex] = true
    queue.push(startingVertex)
    while (queue.length > 0) {
      const currentVertex = queue.shift()
      result.push(currentVertex)
      for (const adjacentVertex of this.adjacencyList[currentVertex]) {
        if (!visited[adjacentVertex]) {
          visited[adjacentVertex] = true
          queue.push(adjacentVertex)
        }
      }
    }
    console.log("BFS traversal:", result)
  }
  dfs(startingVertex) {
    const visited = {}
    const result = []
    const stack = []
    stack.push(startingVertex)
    while (stack.length) {
      const vertex = stack.pop()
      if (!visited[vertex]) {
        visited[vertex] = true
        result.push(vertex)
        for (const adjacentVertex of this.adjacencyList[vertex]) {
          if (!visited[adjacentVertex]) {
            stack.push(adjacentVertex)
          }
        }
      }
    }
    console.log("DFS traversal:", result);
  }
  display() {
    for (const vertex in this.adjacencyList) {
      console.log(vertex + " -> " + [...this.adjacencyList[vertex]])
    }
  }
}
const graph = new Graph()
graph.addVertex(0)
graph.addVertex(1)
graph.addVertex(2)
graph.addVertex(3)
graph.addVertex(4)
graph.addVertex(5)
graph.addVertex(5)
graph.addVertex(6)
graph.addEdge(0, 1)
graph.addEdge(0, 3)
graph.addEdge(1, 3)
graph.addEdge(1, 2)
graph.addEdge(1, 5)
graph.addEdge(1, 6)
graph.addEdge(3, 2)
graph.addEdge(3, 4)
graph.addEdge(2, 5)
graph.addEdge(2, 4)
graph.addEdge(4, 6)
graph.display()
console.log(graph.hasEdge(5, 4))
console.log(graph.hasEdge(2, 5))
graph.bfs(0)
graph.dfs(0)

