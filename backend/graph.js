export class Graph {
    constructor() {
        this.nodes = [];
        this.edges = [];
    }

    addNode(x, y) {
        this.nodes.push({x, y});
    }

    addEdge(a, b, w) {
        this.edges.push({from: a, to: b, weight: w});
    }

    getNode(x, y) {
        for (let i = 0; i < this.nodes.length; i++) {
            let dx = this.nodes[i].x - x;
            let dy = this.nodes[i].y - y;
            if (Math.sqrt(dx*dx + dy*dy) < 15) return i;
        }
        return -1;
    }

    getNeighbors(node) {
        let res = [];
        this.edges.forEach(e => {
            if (e.from === node) res.push({node: e.to, w: e.weight});
            if (e.to === node) res.push({node: e.from, w: e.weight});
        });
        return res;
    }
}