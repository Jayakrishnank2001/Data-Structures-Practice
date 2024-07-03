//stack using array
class Stack {
    constructor() {
        this.items = []
    }
    push(element) {
        this.items.push(element)
    }
    isEmpty() {
        return this.items.length === 0
    }
    peek() {
        if (this.isEmpty()) {
            return 'Stack is empty'
        }
        return this.items[this.items.length - 1]
    }
    size() {
        return this.items.length
    }
    pop() {
        if (this.isEmpty()) {
            return 'Underflow'
        } else {
            return this.items.pop()
        }
    }
    print() {
        console.log(this.items)
    }
}
const stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
console.log("Stack after pushing elements:");
stack.print();
console.log("Pop:", stack.pop());
console.log("Peek:", stack.peek());
console.log("Stack after popping and peeking:");
stack.print();

//Stack using LinkedList
class Node {
    constructor(value) {
        this.value = value
        this.next = null
    }
}
class Stack {
    constructor() {
        this.top = null
        this.size = 0
    }
    push(element) {
        const node = new Node(element)
        node.next = this.top
        this.top = node
        this.size++
    }
    isEmpty() {
        return this.size === 0
    }
    getSize() {
        return this.size
    }
    pop() {
        if (this.isEmpty()) {
            return 'Underflow'
        } else {
            const poppedNode = this.top
            this.top = this.top.next
            this.size--
            return poppedNode.value
        }
    }
    peek() {
        if (this.isEmpty()) {
            return 'Stack is Empty'
        } else {
            return this.top.value
        }
    }
    print() {
        let current = this.top
        let result = ''
        while (current) {
            result += current.value + ' '
            current = current.next
        }
        console.log(result.trim())
    }
}
const newstack = new Stack();
newstack.push(1);
newstack.push(2);
newstack.push(3);
console.log("Stack after pushing elements:");
newstack.print();
console.log("Pop:", newstack.pop());
console.log("Peek:", newstack.peek());
console.log("Stack after popping and peeking:");
newstack.print();

//Queue using array
class Queue {
    constructor() {
        this.items = []
    }
    enqueue(element) {
        this.items.push(element)
    }
    isEmpty() {
        return this.items.length === 0
    }
    front() {
        if (this.isEmpty()) {
            return 'Queue is empty'
        }
        return this.items[0]
    }
    dequeue() {
        if (this.isEmpty()) {
            return 'underflow'
        } else {
            return this.items.shift()
        }
    }
    size() {
        return this.items.length
    }
    print() {
        console.log(this.items)
    }
}
const queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
console.log("Queue after enqueuing elements:");
queue.print();
console.log("Dequeue:", queue.dequeue());
console.log("Front:", queue.front());
console.log("Queue after dequeuing and front operations:");
queue.print();

//Queue using LinkedList
class Node {
    constructor(value) {
        this.value = value
        this.next = null
    }
}
class Queue {
    constructor() {
        this.rear = null
        this.front = null
        this.size = 0
    }
    enqueue(element) {
        const node = new Node(element)
        if (this.isEmpty()) {
            this.front = node
            this.rear = node
        } else {
            this.rear.next = node
            this.rear = node
        }
        this.size++
    }
    isEmpty() {
        return this.size === 0
    }
    getSize() {
        return this.size
    }
    print() {
        let result = ''
        let current = this.front
        while (current) {
            result += current.value + ' '
            current = current.next
        }
        console.log(result.trim())
    }
    dequeue() {
        if (this.isEmpty()) {
            return 'Underflow'
        } else {
            const dequeuedNode = this.front
            this.front = this.front.next
            if (!this.front) {
                this.rear = null
            }
            this.size--
            return dequeuedNode.value
        }
    }
    frontElement() {
        if (this.isEmpty()) {
            return 'Queue is empty'
        } else {
            return this.front.value
        }
    }
}
const newQueue = new Queue();
newQueue.enqueue(1);
newQueue.enqueue(2);
newQueue.enqueue(3);
console.log("Queue after enqueuing elements:");
newQueue.print();
console.log("Dequeue:", newQueue.dequeue());
console.log("Front:", newQueue.frontElement());
console.log("Queue after dequeuing and front operations:");
newQueue.print();





