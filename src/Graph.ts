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
		if (adjacentVertices != undefined) 
			return adjacentVertices;
		else 
			throw new Error("Invalid vertex");
	}
	getDegree(vertex:T):number {
		return this.getAdjacentVertices(vertex).length;
	}

	isRegular():boolean {
		const degree = this.getDegree(this.oneVertex());
		for(let vertex of this.getVertices()) {
			if(this.getDegree(vertex) != degree) {
				return false;
			}
		}
		return true;
	}

	isComplete():boolean {
		const n = this.order() - 1;
		for (let vertex of this.getVertices()) {
			if (this.getDegree(vertex) != n) {
				return false;
			}
		}
		return true;
	}
}


// Test for the lulz



const myNewGraph = new Graph<number | string | boolean>();

myNewGraph.addVertex(12);
myNewGraph.addVertex("Birb");
myNewGraph.addVertex(true);

myNewGraph.connect(12, "Birb");
myNewGraph.connect(12, true);
myNewGraph.connect("Birb", true);

console.log("The vertices of the graph are: [" + myNewGraph.getVertices() +"]");
console.log("The vertices adjacent to 12 are: [" + myNewGraph.getAdjacentVertices(12) +"]");
console.log("The vertices adjacent to true are: [" + myNewGraph.getAdjacentVertices(true) + "]");
console.log("The vertices adjacent to Birb are: [" + myNewGraph.getAdjacentVertices("Birb") + "]");

if (myNewGraph.isRegular()) {
	console.log("This graph is a regular graph");
} else {
	console.log("This is not a regular graph");
}

if (myNewGraph.isComplete()) {
	console.log("This graph is complete");
} else {
	console.log("This graph isn't complete");
}