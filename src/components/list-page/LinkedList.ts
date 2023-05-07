class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

interface ILinkedList<T> {
  prepend: (element: T) => void;
  append: (element: T) => void;
  deleteHead: () => void;
  deleteTail: () => void;
  insertAt: (element: T, position: number) => void;
  deleteAt: (position: number) => void;
  getArrayValues: () => T[];
}

class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private tail: Node<T> | null;
  public size: number;
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  append(value: T) {
    const newNode = new Node(value);
    if (!this.head || !this.tail) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.size++;
  }

  prepend(value: T) {
    const newNode = new Node(value, this.head);
    this.head = newNode;
    if (!this.tail) {
      this.tail = newNode;
    }
    this.size++;
  }

  deleteHead() {
    if (!this.head) {
      return;
    }
    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }
    this.size--;
  }

  deleteTail() {
    if (!this.tail) {
      return;
    }
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    }
    if (this.head) {
      let currentNode: Node<T> = this.head;
      while (currentNode.next) {
        if (!currentNode.next.next) {
          currentNode.next = null;
        } else {
          currentNode = currentNode.next;
        }
      }
      this.tail = currentNode;
    }
    this.size--;
  }

  insertAt(value: T, index: number) {
    if (index < 0 || index > this.size) {
      return;
    } else {
      const newNode = new Node(value);
      if (index === 0) {
        newNode.next = this.head;
        this.head = newNode;
      } else if (index === this.size) {
        if (!this.head || !this.tail) {
          this.head = newNode;
          this.tail = newNode;
        } else {
          this.tail.next = newNode;
          this.tail = newNode;
        }
      } else {
        let curr: Node<T> | null = this.head;
        let currIndex = 0;
        while (currIndex < index - 1) {
          if (curr) {
            curr = curr.next;
            currIndex++;
          }
        }
        if (curr) {
          newNode.next = curr.next;
          curr.next = newNode;
        }
      }
      this.size++;
    }
  }

  deleteAt(index: number) {
    if (index < 0 || index > this.size) {
      return;
    } else {
      if (index === 0) {
        if (!this.head) {
          return;
        }
        if (this.head.next) {
          this.head = this.head.next;
        } else {
          this.head = null;
          this.tail = null;
        }
        this.size--;
      } else if (index === this.size - 1) {
        this.deleteTail();
      } else {
        let curr: Node<T> | null = this.head;
        let currIndex = 0;
        while (currIndex < index - 1) {
          if (curr) {
            curr = curr.next;
            currIndex++;
          }
        }
        if (curr && curr.next) {
          curr.next = curr.next.next;
          this.size--;
        }
      }
    }
  }

  getArrayValues() {
    const nodesValues = [];
    let currentNode = this.head;
    while (currentNode) {
      nodesValues.push(currentNode.value);
      currentNode = currentNode.next;
    }
    return nodesValues;
  }

  getLength() {
    return this.size;
  }

  isEmpty() {
    return this.size === 0;
  }
}

export const list = new LinkedList<string>();
list.append("0");
list.append("34");
list.append("8");
list.append("1");