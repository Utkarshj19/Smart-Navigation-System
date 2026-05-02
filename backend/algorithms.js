// BFS
export async function bfs(graph, start) {
    let visited = new Set();
    let queue = [start];
    let order = [];

    while (queue.length) {
        let node = queue.shift();
        if (visited.has(node)) continue;

        visited.add(node);
        order.push(node);

        for (let n of graph.getNeighbors(node)) {
            queue.push(n.node);
        }
    }

    return order;
}

// DFS
export async function dfs(graph, start) {
    let visited = new Set();
    let order = [];

    function go(node) {
        if (visited.has(node)) return;
        visited.add(node);
        order.push(node);

        for (let n of graph.getNeighbors(node)) {
            go(n.node);
        }
    }

    go(start);
    return order;
}

// A*
export async function aStar(graph, start, goal) {
    let open = [start];
    let g = {};
    let f = {};
    let parent = {};

    graph.nodes.forEach((_, i) => {
        g[i] = Infinity;
        f[i] = Infinity;
    });

    g[start] = 0;
    f[start] = heuristic(graph, start, goal);

    while (open.length) {
        open.sort((a,b)=>f[a]-f[b]);
        let cur = open.shift();

        if (cur === goal) break;

        for (let n of graph.getNeighbors(cur)) {
            let temp = g[cur] + n.w;

            if (temp < g[n.node]) {
                parent[n.node] = cur;
                g[n.node] = temp;
                f[n.node] = temp + heuristic(graph, n.node, goal);

                if (!open.includes(n.node)) open.push(n.node);
            }
        }
    }

    let path = [];
    let cur = goal;
    while (cur !== undefined) {
        path.push(cur);
        cur = parent[cur];
    }

    return path.reverse();
}

function heuristic(graph, a, b) {
    let dx = graph.nodes[a].x - graph.nodes[b].x;
    let dy = graph.nodes[a].y - graph.nodes[b].y;
    return Math.sqrt(dx*dx + dy*dy);
}

// Floyd Warshall
export function floydWarshall(graph) {
    let n = graph.nodes.length;
    let dist = Array.from({length:n},()=>Array(n).fill(Infinity));

    for (let i=0;i<n;i++) dist[i][i]=0;

    graph.edges.forEach(e=>{
        dist[e.from][e.to]=e.weight;
        dist[e.to][e.from]=e.weight;
    });

    for (let k=0;k<n;k++)
        for (let i=0;i<n;i++)
            for (let j=0;j<n;j++)
                if (dist[i][j] > dist[i][k]+dist[k][j])
                    dist[i][j] = dist[i][k]+dist[k][j];

    return dist;
}