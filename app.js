"use strict";
class Graph {
    constructor() {
        this.adjacencyList = new Map();
    }
    addVertex(vertex) {
        this.adjacencyList.set(vertex, []);
    }
    removeVertex(vertex) {
    }
    connect(v1, v2) {
        let v1List = this.adjacencyList.get(v1);
        if (v1List != undefined) {
            v1List.push(v2);
        }
    }
    disconnect(v1, v2) {
    }
    order() {
        return this.adjacencyList.size;
    }
}
let myGraph = new Graph();
myGraph.addVertex(10);
myGraph.addVertex(12);
myGraph.connect(10, 12);
console.log(myGraph.adjacencyList.get(10));
