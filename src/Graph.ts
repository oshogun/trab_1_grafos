class Graph<T> {
	private adjacencyList: Map<T, Array<T>>;

	constructor() {
		this.adjacencyList = new Map<T, Array<T>>();
	}
	
	addVertex(vertex:T) {
		this.adjacencyList.set(vertex, []);
	}

	removeVertex(vertex: T){
		const vertexList = this.adjacencyList.get(vertex);
		if (vertexList != undefined) {
			for (let entry of vertexList) {
				this.disconnect(vertex, entry);
			}
		}
		this.adjacencyList.delete(vertex);
	}

	connect(v1:T, v2:T) {
		const v1List = this.adjacencyList.get(v1);
		const v2List = this.adjacencyList.get(v2);
		if (v1List != undefined && v2List != undefined) {
			v1List.push(v2);
			v2List.push(v1);
		} else {
			if (v1List == undefined) {
				throw new Error("Invalid vertex: " + v1);
			}
			if (v2List == undefined) {
				throw new Error("Invalid vertex: " + v2);
			}
		}
	}

	disconnect(v1:T, v2:T) {
		const v1List = this.adjacencyList.get(v1);
		const v2List = this.adjacencyList.get(v2);
		if (v1List != undefined && v2List != undefined) {
			const v1index = v1List.indexOf(v2);
			const v2index = v2List.indexOf(v1);
			if (v1index > -1) {
				v1List.splice(v1index, 1);
			}
			if (v2index > -1) {
				v2List.splice(v2index, 1);
			}
		} else {
			if (v1List == undefined) {
				throw new Error("Invalid vertex: " + v1);
			}
			if (v2List == undefined) {
				throw new Error("Invalid vertex: " + v2);
			}
		}
	}

	order():number {
		return this.adjacencyList.size;
	}

	getVertices():Array<T> {
		return [... this.adjacencyList.keys()];
	}

	oneVertex():T {
		const rand = Math.floor(Math.random() * this.adjacencyList.size);
		return this.getVertices()[rand];
	}

	getAdjacentVertices(vertex:T):Array<T> {
		const adjacentVertices = this.adjacencyList.get(vertex);
		if (adjacentVertices != undefined) return adjacentVertices;
		else throw new Error("Invalid vertex");
	}
	getDegree(vertex:T):number {
		return this.getAdjacentVertices(vertex).length;
	}
}


// Test for the lulz

const myGraph = new Graph<number>();

myGraph.addVertex(10);
myGraph.addVertex(12);
myGraph.addVertex(34);
myGraph.connect(10, 12);
myGraph.connect(12, 34);
console.log("The adjacency list of node 10 is [" + myGraph.getAdjacentVertices(10) + "]");
console.log("The adjacency list of node 12 is [" + myGraph.getAdjacentVertices(12)+ "]");
console.log("The adjacency list of node 34 is [" + myGraph.getAdjacentVertices(34) + "]");
console.log("Node 10 has " + myGraph.getDegree(10) + " adjacent node(s)");
console.log("Node 12 has " + myGraph.getDegree(12) + " adjacent node(s)");
console.log("Now disconnecting 12 and 34");
myGraph.disconnect(12, 34);

console.log("The adjacency list of node 12 is [" + myGraph.getAdjacentVertices(12)+ "]");
console.log("The adjacency list of node 34 is [" + myGraph.getAdjacentVertices(34) + "]");

console.log("A list of all the vertices in the graph: " + myGraph.getVertices());
console.log("Deleting node 10");
myGraph.removeVertex(10);
console.log("The adjacency list of node 12 is [" + myGraph.getAdjacentVertices(12)+ "]");
console.log("The adjacency list of node 34 is [" + myGraph.getAdjacentVertices(34) + "]");
console.log("A list of all the vertices in the graph: " + myGraph.getVertices());
console.log("Here's a random vertex: " + myGraph.oneVertex());


const myCars = new Graph<string>();

myCars.addVertex("Porsche Carrera GT");
myCars.addVertex("Toyota Sprinter Trueno AE86 Eurobeato Edition");
myCars.addVertex("Toyota GT86");
myCars.addVertex("Porsche 911 Carrera RS");
myCars.addVertex("Lamborghini Countach");
myCars.addVertex("Lamborghini Gallardo");

myCars.connect("Porsche Carrera GT", "Porsche 911 Carrera RS");
myCars.connect("Toyota Sprinter Trueno AE86 Eurobeato Edition", "Toyota GT86");
myCars.connect("Lamborghini Countach", "Lamborghini Gallardo");
console.log("Here's my full garage: " + "[" + myCars.getVertices() + "]");
console.log("Here are my Porsches: Porsche Carrera GT" + ", " +
	 myCars.getAdjacentVertices("Porsche Carrera GT"));
console.log("Here are my weeb cars: Toyota GT86" + ", " +
	 myCars.getAdjacentVertices("Toyota GT86"));
console.log("Here are my Lamborghinis: Lamborghini Countach" + ", " +
	 myCars.getAdjacentVertices("Lamborghini Countach"));