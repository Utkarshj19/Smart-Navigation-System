Project Overview
The Smart Navigation System is an interactive web-based visualizer that demonstrates how graph algorithms find paths between locations. It allows users to create custom graphs by placing nodes and edges on a canvas and then visualizes how different algorithms explore and compute paths.
The system simulates real-world navigation concepts like shortest path finding using both traversal-based and heuristic-based algorithms. It provides step-by-step animation to help understand how algorithms work internally.  			

Objectives-
Implement graph-based pathfinding algorithms in an interactive environment
Visualize how algorithms traverse and explore nodes step-by-step
Compare uninformed (BFS, DFS) and informed (A*) approaches
Demonstrate shortest path computation using Floyd–Warshall
Build an intuitive UI for learning and experimentation

Algorithms Used-
Breadth First Search (BFS) → Level-wise traversal
Depth First Search (DFS) → Deep exploration
A (A-Star)* → Heuristic-based shortest path
Floyd–Warshall → All-pairs shortest path

System Design-
1)Graph Representation-
Nodes → Represent locations (points on canvas)
Edges → Represent connections between nodes
Weights → Currently uniform (weight = 1 for all edges)

Features-
Interactive graph creation (add nodes & edges)
Select source and destination nodes
Real-time edge preview while creating connections
Step-by-step animation of algorithm execution
Visual distinction of:
Current node (🟡 Yellow)
Visited nodes (🔴 Red)
Source (🟢 Green)
Destination (🟠 Orange)
Shortest path visualization (🟢 Green edges)
Floyd-based path approximation visualization


Visualization Details-
Canvas-based rendering using HTML5
Animated traversal using async delays
Dynamic UI feedback (button highlighting, hover effects)
Live edge preview during graph creation


Comparison of Algorithms
Algorithm	Type	Speed	Accuracy	Behavior
BFS	Unweighted	Fast	Medium	Finds shortest path in terms of edges
DFS	Unweighted	Medium	Low	Explores deeply, not optimal
A*	Heuristic	Fast	High	Uses distance heuristic for efficient pathfinding
Floyd	Dynamic Prog	Slow	High	Computes shortest paths between all node pairs


Important Note
All edges currently have equal weight (1)
Therefore:
BFS and A* may produce similar paths
Floyd computes shortest paths based on number of edges
This is a simplified simulation, not a fully weighted navigation system

How to Use-
Select Add Node and click on canvas
Select Add Edge and connect nodes
Select Source and Destination
Run any algorithm:
BFS / DFS → Traversal animation
A* → Path + traversal
Floyd → Shortest path approximation

Time Complexity
BFS: O(V + E)
DFS: O(V + E)
A*: Depends on heuristic (typically faster than Dijkstra)
Floyd–Warshall: O(V³)

-Applications
Pathfinding visualization tools
Educational tools for DAA concepts
Game AI navigation
Network routing simulations

Conclusion
This project demonstrates how graph algorithms operate through real-time visualization. It highlights differences between traversal and heuristic-based methods and provides an intuitive way to understand pathfinding logic.

Technologies Used-
Frontend: HTML, CSS, JavaScript (Canvas API)
Backend Logic: JavaScript modules
Concepts: Graphs, Search Algorithms, Heuristics, Visualization
