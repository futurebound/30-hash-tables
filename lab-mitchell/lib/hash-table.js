'use strict';

const SLL = require('./sll');

const HashTable = module.exports = function(size=1024) { //if no size value passed in, default 1024
  this.size = size;
  this.buckets = [...Array(this.size)]; //creates an array with the given size
  // => [SLL, SLL, SLL] so you'd access by going key.head.value etc
};

HashTable.prototype.hashKey = function(key) {
  //splits into array of characters then reduce into ASCII character codes, then modulus (%) by size of buckets
  let hash = key.split('').reduce((a, b) => a + b.charCodeAt(0), 0) % this.size; //returns a numeric value that will point to an index in this array
  return hash;
};

HashTable.prototype.set = function(key, value) {
  // ASSIGNMENT: Implement the collision detection and handle that through a SLL
  // STRETCH: Implement with buckets as binary trees
  
  if(!this.buckets[this.hashKey(key)]) {
    let sll = new SLL().insertEnd(value);
    return console.log(this.buckets[this.hashKey(key)] = sll);
  }

  if(this.buckets[this.hashKey(key)]) {
    this.buckets[this.hashKey(key)].insertEnd(value);
  }
};

HashTable.prototype.get = function(key) {
  // ASSIGMENT: Implement the lookup for buckets and their respective data strctures
  if(this.buckets[this.hashKey(key)].head.next) {
    let current = this.buckets[this.hashKey(key)].head;
    while(current) {
      if(current.value === key) return current;
      current = current.next;
    }
    return null;
  }

  return this.buckets[this.hashKey(key)];
};

HashTable.prototype.remove = function(key) {
  let address = this.hashKey(key); //gets us TO bucket, then process of search/traversal 

  return this.buckets[address] ? delete this.buckets[address] : new Error('Invalid Key.'); //could also do null instead of new Error depending on what yo're tryna do
};


