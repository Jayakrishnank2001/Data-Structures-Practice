class Node {
    constructor(value) {
        this.value = value
        this.next = null
    }
}

class LinkedList {
    constructor() {
        this.head = null
        this.tail = null
    }
    append(value) {
        const node = new Node(value)
        if (this.head === null) {
            this.head = node
            this.tail = node
        } else {
            this.tail.next = node
            this.tail = node
        }
    }
    prepend(value) {
        const node = new Node(value)
        if (this.head === null) {
            this.head = node
            this.tail = node
        } else {
            node.next = this.head
            this.head = node
        }
    }
    isEmpty() {
        return this.head === null
    }
    search(value) {
        let current = this.head
        while (current) {
            if (current.value === value) {
                return true
            }
            current = current.next
        }
        return false
    }
    display() {
        let current = this.head
        while (current) {
            console.log(current.value)
            current = current.next
        }
    }
    getLength() {
        let length = 0
        let current = this.head
        while (current) {
            length++
            current = current.next
        }
        return length
    }
    reverse() {
        let current = this.head
        let previous = null
        let next = null
        while (current) {
            next = current.next
            current.next = previous
            previous = current
            current = next
        }
        this.head = previous
    }
    arrayToLinkedList(arr) {
        const linkedList = new LinkedList()
        for (let value of arr) {
            linkedList.append(value)
        }
        return linkedList
    }
    removeLastNode() {
        if (!this.head) {
            return null
        }
        if (!this.head.next) {
            this.head = null
            return
        }
        let current = this.head
        while (current.next.next) {
            current = current.next
        }
        current.next = null
    }
    removeFirstNode() {
        if (!this.head) {
            return null
        } else if (!this.head.next) {
            this.head = null
            return
        } else {
            this.head = this.head.next
        }
    }
    removeNode(value) {
        if (!this.head) {
            return null
        }
        let current = this.head
        while (current) {
            if (current.next.value === value) {
                current.next = current.next.next
                return
            }
            current = current.next
        }
    }
    insertNodeAfter(value, insertValue) {
        if (!this.head) {
            return null
        }
        const node = new Node(insertValue)
        let current = this.head
        while (current) {
            if (current.value === value) {
                node.next = current.next
                current.next = node
            }
            current = current.next
        }
    }
    insertNodeBefore(value, insertValue) {
        if (!this.head) {
            return null
        }
        const node = new Node(insertValue)
        if (this.head.value === value) {
            node.next = this.head
            this.head = node
            return
        }
        let current = this.head
        while (current.next) {
            if (current.next.value === value) {
                node.next = current.next
                current.next = node
                return
            }
            current = current.next
        }
        return null
    }
    toArray() {
        const result = []
        let current = this.head
        while (current) {
            result.push(current.value)
            current = current.next
        }
        return result
    }
    twoPowerSum() {
        let current = this.head
        let sum = 0
        while (current) {
            if (current.value > 0 && (current.value & (current.value - 1)) === 0) {
                sum += current.value
            }
            current = current.next
        }
        return sum
    }
    removeDuplicates(){
        if(!this.head){
            return null
        }
        const set=new Set()
        let current=this.head
        let previous=null
        while(current){
            if(set.has(current.value)){
                previous.next=current.next
            }else{
                set.add(current.value)
                previous=current
            }
            current=current.next
        }
    }
    isPalindrome() {
        if (!this.head || !this.head.next) {
            return true
        }
        let stack = []
        let current = this.head
        while (current) {
            stack.push(current.value)
            current=current.next
        }
        current = this.head
        while (current) {
            if (current.value !== stack.pop()) {
                return false
            }
            current=current.next
        }
        return true
    }
    reverseRecursion(node) {
        if (!node || !node.next) {
            return node
        }
        let newHead = this.reverseRecursion(node.next)
        node.next.next = node
        node.next = null
        return newHead
    }
    reverseLinkedlist() {
        this.head=this.reverseRecursion(this.head)
    }

}

const linkedList = new LinkedList()
linkedList.append(5)
linkedList.append(6)
linkedList.prepend(3)
linkedList.append(3)
console.log(linkedList.search(4))
linkedList.display()
linkedList.insertNodeAfter(5, 8)
linkedList.display()
linkedList.insertNodeBefore(5, 9)
linkedList.display()
console.log(linkedList.toArray())
console.log(linkedList.twoPowerSum())
linkedList.removeDuplicates()
linkedList.display()
