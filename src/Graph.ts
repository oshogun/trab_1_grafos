
export class Graph<T> {
	protected adjacencyList: Map<T, Array<T>>;

	constructor() {
		this.adjacencyList = new Map<T, Array<T>>();
	}
	
	addVertex(vertex:T) {
		this.adjacencyList.set(vertex, []);
	}

	removeVertex(vertex: T){
		const vertexList = this.adjacencyList.get(vertex);
		if (vertexList != undefined) {
			for (const entry of vertexList) {
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
			if (v1List === undefined) {
				throw new Error("Invalid vertex: " + v1);
			}
			if (v2List === undefined) {
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
			if (v1List === undefined) {
				throw new Error("Invalid vertex: " + v1);
			}
			if (v2List === undefined) {
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
		for(const vertex of this.getVertices()) {
			if(this.getDegree(vertex) != degree) {
				return false;
			}
		}
		return true;
	}

	isComplete():boolean {
		const n = this.order() - 1;
		for (const vertex of this.getVertices()) {
			if (this.getDegree(vertex) != n) {
				return false;
			}
		}
		return true;
	}
	transitiveClosure(vertex: T):Array<T> {
		return this.findTransitiveClosure(vertex, []);
	}

	isConnected():boolean {
		const vertices = this.getVertices();
		const transClosure = this.transitiveClosure(this.oneVertex());
		return this.compareSets(vertices, transClosure);
	}

	isTree():boolean {
		const v = this.oneVertex();
		return this.isConnected() && !this.hasCycleWith(v, v, []);
	}

	protected findTransitiveClosure(vertex:T, alreadyVisited:Array<T>):Array<T> {
		if(vertex === undefined) {
			throw new Error("Invalid vertex: " + vertex);
		}
		alreadyVisited.push(vertex);
		for (const v of this.getAdjacentVertices(vertex)) {
			if (!alreadyVisited.includes(v)) {
				this.findTransitiveClosure(v, alreadyVisited);
			}
		}
		return alreadyVisited;
	}

	protected compareSets(s1:Array<T>, s2:Array<T>):boolean {
		const missing = s1.filter(item => s2.indexOf(item) < 0);
		return missing.length === 0;
	}

	protected hasCycleWith(current:T, previous:T, alreadyVisited:Array<T>):boolean {
		if (alreadyVisited.includes(current)) {
			return true;
		}
		alreadyVisited.push(current);
		for (const adj of this.getAdjacentVertices(current)) {
			if (adj != previous) {
				if (this.hasCycleWith(adj, current, alreadyVisited)) {
					return true
				}
			}
		}
		const index = alreadyVisited.indexOf(current);
		alreadyVisited.splice(index, 1);

		return false;
	}

}