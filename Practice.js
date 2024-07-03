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

    findHeight() {
        if (this.root === null) {
            return -1
        }
        let height = -1
        let queue = []
        queue.push(this.root)
        while (queue.length) {
            height++
            for (let i = 0; i < queue.length; i++){
                const node = queue.shift()
                if (node.left) {
                    queue.push(node.left)
                }
                if (node.right) {
                    queue.push(node.right)
                }
            }
        }
        return height
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
bst.levelOrder()
console.log(bst.findHeight())