class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    // If the root of the tree is null/empty, insert value at the root.
    if (this.root === null) {
      this.root = new Node(val);
      return this;
    }

    let current = this.root;
    while (true) {
      // If the new value is less than the current value, compare it to the left node.
      // If the left node is null/empty, place the new value there. Otherwise, repeat comparison. 
      if (val < current.val) {
        if (current.left === null) {
          current.left = new Node(val);
          return this;
        } else {
          current = current.left;
        }

      // If the new value is greater than the current value, compare it to the right node.
      // If the right node is null/empty, place the new value there. Otherwise, repeat comparison. 
      } else if (val > current.val) {
        if (current.right === null) {
          current.right = new Node(val);
          return this;
        } else {
          current = current.right;
        }
      }
    }

  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val, current = this.root) {
    // If the root of the tree is null/empty, insert value at the root.
    if (this.root === null) {
      this.root = new Node(val);
      return this;
    }

    // If the new value is less than the current value, compare it to the left node.
    // If the left node is null/empty, place the new value there. Otherwise, repeat comparison calling insertRecursively. 
    if (val < current.val) {
      if (current.left === null) {
        current.left = new Node(val);
        return this;
      }
      return this.insertRecursively(val, current.left);
    } else {
      // If the new value is greater than the current value, compare it to the right node.
      // If the right node is null/empty, place the new value there. Otherwise, repeat comparison calling insertRecursively. 
      if (current.right === null) {
        current.right = new Node(val);
        return this;
      }
      return this.insertRecursively(val, current.right);
    }
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let current = this.root;
    // If search value is less than current node, search left. If greater than, search right. Otherwise, it's found.
    while (current) {
        if (val === current.val) {
            return current;
        } else if (val < current.val) {
            current = current.left;
        } else {
            current = current.right;
        }
    }
    // If not found, return undefined.
    return undefined;
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, current = this.root) {
    // If no match found, returns undefined.
    if (!current) return undefined;

    // If new value equals the current node, return the current node. 
    if (val === current.val) return current;

    // If new value is less than the current node, search left. Otherwise search right. 
    if (val < current.val) {
      return this.findRecursively(val, current.left);
    } else {
      return this.findRecursively(val, current.right);
    }
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    let data = [];
    let current = this.root;

    // Go to the root node, the left side and then the right side.
    function traverse(node) {
      data.push(node.val);
      node.left && traverse(node.left);
      node.right && traverse(node.right);
    }
    traverse(current);
    return data;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    let data = [];
    let current = this.root;
    // Go to the left side, the root node and then the right side.
    function traverse(node) {
      node.left && traverse(node.left);
      data.push(node.val);
      node.right && traverse(node.right);
    }

    traverse(current);
    return data;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    let data = [];
    let current = this.root;

    // Go to the left side, the right side and then the root.
    function traverse(node) {
      node.left && traverse(node.left);
      node.right && traverse(node.right);
      data.push(node.val);
    }

    traverse(current);
    return data;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    let node = this.root;
    let queue = [];
    let data = [];

    //  Go to all nodes, level-by-level.
    queue.push(node);
    while (queue.length) {
      node = queue.shift();
      data.push(node.val);
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
    return data;
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  // Compare the depth of each side.
  isBalanced(current=this.root) {
    if (current === null) return;
    return maxDepth(current) - minDepth(current) <= 1;

    function minDepth(current) {
      if (current === null) return 0;
      return 1 + Math.min(minDepth(current.left), minDepth(current.right));
    }

    function maxDepth(current) {
      if (current === null) return 0;
      return 1 + Math.max(maxDepth(current.left), maxDepth(current.right));
    }
  }
    /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

    remove(val) {
      let nodeToRemove = this.root;
      let parent;
  
      while (nodeToRemove.val !== val) {
        parent = nodeToRemove;
        if (val < nodeToRemove.val) {
          nodeToRemove = nodeToRemove.left;
        } else {
          nodeToRemove = nodeToRemove.right;
        }
      }
  
      if (nodeToRemove !== this.root) {
        if (nodeToRemove.left === null && nodeToRemove.right === null) {
          if (parent.left === nodeToRemove) {
            parent.left = null;
          } else {
            parent.right = null;
          }
        } else if (nodeToRemove.left !== null && nodeToRemove.right !== null) {
          let rightParent = nodeToRemove;
          let right = nodeToRemove.right;
          if (right.left === null) {
            right.left = nodeToRemove.left;
            if (parent.left === nodeToRemove) {
              parent.left = right;
            } else {
              parent.right = right;
            }
          } else {
            while (right.left !== null) {
              rightParent = right;
              right = right.left;
            }
            if (parent.left === nodeToRemove) {
              parent.left.val = right.val;
            } else {
              parent.right.val = right.val;
            }
            if (right.right !== null) {
              rightParent.left = right.right;
            } else {
              rightParent.left = null;
            }
          }
        } else {
          if (parent.left === nodeToRemove) {
            if (nodeToRemove.right === null) {
              parent.left = nodeToRemove.left;
            } else {
              parent.left = nodeToRemove.right;
            }
          } else {
            if (nodeToRemove.right === null) {
              parent.right = nodeToRemove.left;
            } else {
              parent.right = nodeToRemove.right;
            }
          }
        }
      }
      return nodeToRemove;
    }
}
module.exports = BinarySearchTree;

/*
// Insert
let binarySearchTree = new BinarySearchTree();
binarySearchTree.insert(15);
binarySearchTree.insert(20);
binarySearchTree.insert(10);
binarySearchTree.insert(12);
binarySearchTree.root.value // 15
binarySearchTree.root.right.value // 20
binarySearchTree.root.left.right.value // 12

let binarySearchTree = new BinarySearchTree();
binarySearchTree.insert(15)
binarySearchTree.insert(20)
binarySearchTree.insert(10)
binarySearchTree.insert(12);
binarySearchTree.root.value // 15
binarySearchTree.root.right.value // 20
binarySearchTree.root.left.right.value // 12

// Insert Recursively
let binarySearchTree = new BinarySearchTree();
binarySearchTree.insertRecursively(15);
binarySearchTree.root.value // 15
binarySearchTree.root.left // null
binarySearchTree.root.right // null

let binarySearchTree = new BinarySearchTree();

binarySearchTree.insertRecursively(15);
binarySearchTree.insertRecursively(20);
binarySearchTree.insertRecursively(10);
binarySearchTree.insertRecursively(12);
binarySearchTree.root.value // 15
binarySearchTree.root.right.value // 20
binarySearchTree.root.left.right.value // 12

let binarySearchTree = new BinarySearchTree();
binarySearchTree.insertRecursively(15)
binarySearchTree.insertRecursively(20)
binarySearchTree.insertRecursively(10)
binarySearchTree.insertRecursively(12);
binarySearchTree.root.value // 15
binarySearchTree.root.right.value // 20
binarySearchTree.root.left.right.value // 12

// Find Iteratively
let binarySearchTree = new BinarySearchTree();
binarySearchTree.insert(15)
binarySearchTree.insert(20)
binarySearchTree.insert(10)
binarySearchTree.insert(12);
let foundNode = binarySearchTree.findIteratively(20);
foundNode.value // 20
foundNode.left // null
foundNode.right // null

let binarySearchTree = new BinarySearchTree();
binarySearchTree.insert(15)
binarySearchTree.insert(20)
binarySearchTree.insert(10)
binarySearchTree.insert(12);
let foundNode = binarySearchTree.findIteratively(120);
foundNode // undefined

// Find Recursively
let binarySearchTree = new BinarySearchTree();
binarySearchTree.insert(15)
binarySearchTree.insert(20)
binarySearchTree.insert(10)
binarySearchTree.insert(12);
let foundNode = binarySearchTree.findRecursively(20);
foundNode.value // 20
foundNode.left // null
foundNode.right // null

let binarySearchTree = new BinarySearchTree();
binarySearchTree.insert(15)
binarySearchTree.insert(20)
binarySearchTree.insert(10)
binarySearchTree.insert(12);
let foundNode = binarySearchTree.findRecursively(120);
foundNode // undefined

// Depth First Search (DFS) Preorder
let binarySearchTree = new BinarySearchTree();
binarySearchTree.insert(15)
binarySearchTree.insert(20)
binarySearchTree.insert(10)
binarySearchTree.insert(12)
binarySearchTree.insert(1)
binarySearchTree.insert(5)
binarySearchTree.insert(50);
binarySearchTree.dfsPreOrder() // [15, 10, 1, 5, 12, 20, 50]

// Depth First Search In Order
let binarySearchTree = new BinarySearchTree();
binarySearchTree.insert(15)
binarySearchTree.insert(20)
binarySearchTree.insert(10)
binarySearchTree.insert(12)
binarySearchTree.insert(1)
binarySearchTree.insert(5)
binarySearchTree.insert(50);
binarySearchTree.dfsInOrder() // [1, 5, 10, 12, 15, 20, 50]

// Depth First Search Post Order
let binarySearchTree = new BinarySearchTree();
binarySearchTree.insert(15)
binarySearchTree.insert(20)
binarySearchTree.insert(10)
binarySearchTree.insert(12)
binarySearchTree.insert(1)
binarySearchTree.insert(5)
binarySearchTree.insert(50);
binarySearchTree.dfsPostOrder() // [5, 1, 12, 10, 50, 20, 15]

// Breadth First Search (BFS)
let binarySearchTree = new BinarySearchTree();
binarySearchTree.insert(15)
binarySearchTree.insert(20)
binarySearchTree.insert(10)
binarySearchTree.insert(12)
binarySearchTree.insert(1)
binarySearchTree.insert(5)
binarySearchTree.insert(50);
binarySearchTree.bfs() // [15, 10, 20, 1, 12, 50, 5]

// Remove
let binarySearchTree = new BinarySearchTree();
binarySearchTree.insert(15)
binarySearchTree.insert(20)
binarySearchTree.insert(10)
binarySearchTree.insert(12)
binarySearchTree.insert(1)
binarySearchTree.insert(5)
binarySearchTree.insert(50);
binarySearchTree.remove(50);
binarySearchTree.root.right.value // 20
binarySearchTree.root.right.right // null

binarySearchTree.remove(5);
binarySearchTree.root.left.left.value // 1
binarySearchTree.root.left.left.right // null

let binarySearchTree = new BinarySearchTree();
binarySearchTree.insert(15)
binarySearchTree.insert(20)
binarySearchTree.insert(10)
binarySearchTree.insert(12)
binarySearchTree.insert(1)
binarySearchTree.insert(5)
binarySearchTree.insert(50);

binarySearchTree.remove(1);
binarySearchTree.root.left.left.value // 5
binarySearchTree.root.left.left.left // null
binarySearchTree.root.left.left.right // null

binarySearchTree.remove(20);
binarySearchTree.root.right.value // 50
binarySearchTree.root.right.right // null
binarySearchTree.root.right.left // null

let binarySearchTree = new BinarySearchTree();
binarySearchTree.insert(15)
binarySearchTree.insert(20)
binarySearchTree.insert(10)
binarySearchTree.insert(12)
binarySearchTree.insert(1)
binarySearchTree.insert(5)
binarySearchTree.insert(50)
binarySearchTree.insert(60)
binarySearchTree.insert(30)
binarySearchTree.insert(25)
binarySearchTree.insert(23)
binarySearchTree.insert(24)
binarySearchTree.insert(70);

binarySearchTree.remove(10);
binarySearchTree.root.left.value // 12
binarySearchTree.root.left.left.value // 1
binarySearchTree.root.left.left.right.value // 5

binarySearchTree.remove(50);
binarySearchTree.root.right.value // 20
binarySearchTree.root.right.right.value // 60
binarySearchTree.root.right.right.left.value // 30

let binarySearchTree = new BinarySearchTree();
binarySearchTree.insert(22)
binarySearchTree.insert(49)
binarySearchTree.insert(85)
binarySearchTree.insert(66)
binarySearchTree.insert(95)
binarySearchTree.insert(90)
binarySearchTree.insert(100)
binarySearchTree.insert(88)
binarySearchTree.insert(93)
binarySearchTree.insert(89)

binarySearchTree.remove(85);
binarySearchTree.root.right.right.value // 88
binarySearchTree.root.right.right.right.left.left.value // 89
*/