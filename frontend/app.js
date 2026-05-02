import { Graph } from "../backend/graph.js";
import { bfs, dfs, aStar, floydWarshall } from "../backend/algorithms.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let graph = new Graph();

let mode = "node";
let selected = null;
let source = null;
let dest = null;

let mouseX = 0;
let mouseY = 0;

// ================= MODE BUTTON =================
window.setMode = (m, btn) => {
    mode = m;

    document.querySelectorAll("button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
};

// ================= MOUSE MOVE =================
canvas.onmousemove = function(e) {
    let rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;

    draw();
};

// ================= CLICK HANDLER =================
canvas.onclick = function(e) {
    let rect = canvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    if (mode === "node") {
        graph.addNode(x, y);
    } else {
        let index = graph.getNode(x, y);
        if (index === -1) return;

        if (mode === "edge") {
            if (selected === null) selected = index;
            else {
                graph.addEdge(selected, index, 1);
                selected = null;
            }
        }

        if (mode === "source") source = index;
        if (mode === "dest") dest = index;
    }

    draw();
};

// ================= DRAW GRAPH =================
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // edges
    graph.edges.forEach(e => {
        let a = graph.nodes[e.from];
        let b = graph.nodes[e.to];

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = "#888";
        ctx.lineWidth = 2;
        ctx.stroke();
    });

    // nodes
    graph.nodes.forEach((n, i) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 10, 0, Math.PI * 2);

        if (i === source) ctx.fillStyle = "green";
        else if (i === dest) ctx.fillStyle = "orange";
        else ctx.fillStyle = "cyan";

        ctx.fill();

        ctx.fillStyle = "white";
        ctx.fillText(i, n.x - 4, n.y - 15);
    });

    // preview edge
    if (mode === "edge" && selected !== null) {
        let a = graph.nodes[selected];

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(mouseX, mouseY);
        ctx.strokeStyle = "yellow";
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.stroke();
        ctx.setLineDash([]);
    }
}

// ================= RUN ALGORITHM =================
window.runAlgo = async (type) => {

    draw();

    if (source === null) {
        alert("Select source");
        return;
    }

    if (type === "bfs") {
        let order = await bfs(graph, source);
        await animateTraversal(order);
    }

    if (type === "dfs") {
        let order = await dfs(graph, source);
        await animateTraversal(order);
    }

    if (type === "astar") {
        if (dest === null) {
            alert("Select destination");
            return;
        }

        let path = await aStar(graph, source, dest);

        await animateTraversal(path);
        await animatePath(path);
    }

    if (type === "floyd") {

        if (dest === null) {
            alert("Select destination");
            return;
        }

        let dist = floydWarshall(graph);

        let current = source;
        let path = [current];

        while (current !== dest) {

            let neighbors = graph.getNeighbors(current);

            let nextNode = null;
            let best = Infinity;

            for (let n of neighbors) {
                if (dist[n.node][dest] < best) {
                    best = dist[n.node][dest];
                    nextNode = n.node;
                }
            }

            if (nextNode === null) break;

            path.push(nextNode);
            current = nextNode;
        }

        await animatePath(path);
    }
};

// ================= ANIMATION =================
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function animateTraversal(order) {
    let visited = new Set();

    for (let i = 0; i < order.length; i++) {

        visited.add(order[i]);

        draw();

        visited.forEach(idx => {
            let node = graph.nodes[idx];
            ctx.beginPath();
            ctx.arc(node.x, node.y, 12, 0, Math.PI * 2);
            ctx.fillStyle = "red";
            ctx.fill();
        });

        let node = graph.nodes[order[i]];
        ctx.beginPath();
        ctx.arc(node.x, node.y, 15, 0, Math.PI * 2);
        ctx.fillStyle = "yellow";
        ctx.fill();

        await sleep(500);
    }
}

async function animatePath(path) {
    draw();

    for (let i = 0; i < path.length - 1; i++) {

        let a = graph.nodes[path[i]];
        let b = graph.nodes[path[i + 1]];

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = "lime";
        ctx.lineWidth = 4;
        ctx.stroke();

        await sleep(400);
    }
}

// ================= INIT =================
draw();