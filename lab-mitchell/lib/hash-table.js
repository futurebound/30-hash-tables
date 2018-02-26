'use strict';

const SLL = require('./sll');

const HashTable = module.exports = function(size=1024) {
  this.size = size;
  this.buckets = [...Array(this.size)];
};

HashTable.prototype.hashKey = function(key) {
  let hash = key.split('').reduce((a, b) => a + b.charCodeAt(0), 0) % this.size;
  return hash;
};

HashTable.prototype.set = function(key, value) {
  if(!this.buckets[this.hashKey(key)]) {
    let sll = new SLL().insertEnd(value);
    return console.log(this.buckets[this.hashKey(key)] = sll);
  }

  if(this.buckets[this.hashKey(key)]) {
    this.buckets[this.hashKey(key)].insertEnd(value);
  }
};

HashTable.prototype.get = function(key) {
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
  let address = this.hashKey(key);

  return this.buckets[address] ? delete this.buckets[address] : new Error('Invalid Key.');
};


