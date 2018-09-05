import {Graph} from "./Graph"

// Test for the lulz



let myGraph = new Graph<number | string | boolean | Array<number>>();


myGraph.addVertex(12);
myGraph.addVertex("Birb");
myGraph.addVertex(true);


myGraph.connect(12, "Birb");
myGraph.connect(12, true);
myGraph.connect("Birb", true);

console.log("The vertices of the graph are: [" + 
	myGraph.getVertices() +"]");
console.log("The vertices adjacent to 12 are: [" + 
	myGraph.getAdjacentVertices(12) +"]");
console.log("The vertices adjacent to true are: [" + 
	myGraph.getAdjacentVertices(true) + "]");
console.log("The vertices adjacent to Birb are: [" + 
	myGraph.getAdjacentVertices("Birb") + "]");

if (myGraph.isRegular()) {
	console.log("This graph is a regular graph");
} else {
	console.log("This is not a regular graph");
}

if (myGraph.isComplete()) {
	console.log("This graph is complete");
} else {
	console.log("This graph isn't complete");
}

console.log("The transitive closure of 12 is [" + myGraph.transitiveClosure(12) + "]");
console.log("The transitive closure of Birb is [" + myGraph.transitiveClosure("Birb") + "]");
console.log("The transitive closure of true is [" + myGraph.transitiveClosure(true) + "]");

if (myGraph.isConnected()) {
	console.log("This graph is connected");
} else {
	console.log("This graph is not connected");
}

if (!myGraph.isTree()) {
	console.log("There is unrest in the forest, there is trouble with the trees.");
} else {
	console.log("For the maples want more sunlight, and the oaks ignore their pleas.");
}

myGraph = new Graph<string>();
// Let's build a happy little family
myGraph.addVertex("Pai");
myGraph.addVertex("Mãe");
myGraph.addVertex("Joven");

myGraph.addVertex("Sogro");
myGraph.addVertex("Sogra");
myGraph.addVertex("Moça")

myGraph.addVertex("BB");

myGraph.connect("Pai", "Joven");
myGraph.connect("Mãe", "Joven");

myGraph.connect("Sogro", "Moça");
myGraph.connect("Sogra", "Moça");

myGraph.connect("Joven", "BB");
myGraph.connect("Moça", "BB");

if (!myGraph.isTree()) {
	console.log("There is unrest in the forest, there is trouble with the trees.");
} else {
	console.log("For the maples want more sunlight, and the oaks ignore their pleas.");
}