import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

// Add debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default function IntroAnimation({ status }) {
  const [nodes, setNodes] = useState([]);
  const [connections, setConnections] = useState([]);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });
  const containerRef = useRef(null);
  const nodePositions = useRef({});
  const [forceRender, setForceRender] = useState(0);
  const animationFrameRef = useRef(null);
  const exitingNodes = useRef(new Set());

  // Initialize nodes and connections
  useEffect(() => {
    if (containerRef.current && status === "start") {
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      setDimensions({ width, height });

      // Create nodes
      const nodeCount = 12;
      const newNodes = [];

      for (let i = 0; i < nodeCount; i++) {
        // Create nodes in the center area (25% to 75% of the container)
        const x = width * 0.25 + Math.random() * width * 0.5;
        const y = height * 0.25 + Math.random() * height * 0.5;

        newNodes.push({
          id: i,
          x,
          y,
          connections: [],
          size: Math.random() * 4 + 1, // Random size between 5-15
          delay: i * 0.15, // Stagger the appearance
          offsetX: Math.random() * 160 - 30, // Random movement range
          offsetY: Math.random() * 160 - 30,
        });

        // Initialize node position reference
        nodePositions.current[i] = { x, y };
      }

      // Create connections (each node connects to 1-3 other nodes)
      const newConnections = [];
      newNodes.forEach((node) => {
        const connectionCount = Math.floor(Math.random() * 3) + 1;
        const possibleTargets = newNodes
          .filter((n) => n.id !== node.id && !node.connections.includes(n.id))
          .sort(() => Math.random() - 0.5)
          .slice(0, connectionCount);

        possibleTargets.forEach((target) => {
          const connectionId = `${node.id}-${target.id}`;
          const reverseId = `${target.id}-${node.id}`;

          // Avoid duplicate connections
          if (
            !newConnections.some(
              (c) => c.id === connectionId || c.id === reverseId,
            )
          ) {
            newConnections.push({
              id: connectionId,
              from: node.id,
              to: target.id,
              delay: node.delay + 0.5 + Math.random() * 0.5, // Delay lines after nodes appear
              visible: false,
            });

            node.connections.push(target.id);
            target.connections.push(node.id);
          }
        });
      });

      setNodes(newNodes);
      setConnections(newConnections);

      // Make connections visible after their delay
      newConnections.forEach((connection) => {
        setTimeout(() => {
          setConnections((prev) =>
            prev.map((conn) =>
              conn.id === connection.id ? { ...conn, visible: true } : conn,
            ),
          );
        }, connection.delay * 1000);
      });
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [status]);

  // Handle end state - exit animation
  useEffect(() => {
    if (status === "end" && nodes.length > 0) {
      // Start exit animation sequence
      const reversedNodes = [...nodes].reverse();

      // Exit nodes in reverse order
      reversedNodes.forEach((node, index) => {
        setTimeout(() => {
          // Mark node as exiting
          exitingNodes.current.add(node.id);

          // Update node state
          setNodes((prev) =>
            prev.map((n) => (n.id === node.id ? { ...n, exiting: true } : n)),
          );
        }, index * 80); // Staggered exit
      });
    }
  }, [status, nodes]);

  // Update animation frame for line connections
  useEffect(() => {
    if ((status === "start" || status === "middle") && nodes.length > 0) {
      const positions = {};
      let time = 0;

      const updateFrame = () => {
        time += 0.005;

        // Update node positions for floating effect
        nodes.forEach((node) => {
          if (!node.exiting) {
            const newX =
              node.x + Math.sin(time + node.id) * node.offsetX * 0.35;
            const newY =
              node.y + Math.cos(time + node.id * 0.7) * node.offsetY * 0.35;

            nodePositions.current[node.id] = { x: newX, y: newY };
          }
        });

        setForceRender((prev) => prev + 1);
        animationFrameRef.current = requestAnimationFrame(updateFrame);
      };

      animationFrameRef.current = requestAnimationFrame(updateFrame);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [status, nodes]);

  // Handle window resize
  useEffect(() => {
    const handleResizeImpl = () => {
      if (containerRef.current) {
        const newWidth = containerRef.current.clientWidth;
        const newHeight = containerRef.current.clientHeight;

        // Update dimensions
        setDimensions({
          width: newWidth,
          height: newHeight,
        });

        // Reposition nodes based on new dimensions
        if (nodes.length > 0) {
          const widthRatio = newWidth / (dimensions.width || 1);
          const heightRatio = newHeight / (dimensions.height || 1);

          // Update node positions
          const updatedNodes = nodes.map((node) => {
            const scaledX = node.x * widthRatio;
            const scaledY = node.y * heightRatio;

            // Update the node position reference
            nodePositions.current[node.id] = { x: scaledX, y: scaledY };

            return {
              ...node,
              x: scaledX,
              y: scaledY,
              // Scale the offset values proportionally
              offsetX: node.offsetX * widthRatio,
              offsetY: node.offsetY * heightRatio,
            };
          });

          setNodes(updatedNodes);
        }
      }
    };

    // Debounce the resize handler to improve performance
    const handleResize = debounce(handleResizeImpl, 150);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [nodes, dimensions.width, dimensions.height]);

  // Check if a connection should be visible
  const isConnectionVisible = (connection) => {
    // If the connection was never visible, it should remain invisible
    if (!connection.visible) return false;

    // If either connected node is exiting, the connection should disappear
    return (
      !exitingNodes.current.has(connection.from) &&
      !exitingNodes.current.has(connection.to)
    );
  };

  // Don't render anything during loading
  //   if (status === "loading") return null;

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
    >
      <svg width={dimensions.width} height={dimensions.height}>
        {/* Connections */}
        {connections.map((connection) => {
          const fromPos = nodePositions.current[connection.from];
          const toPos = nodePositions.current[connection.to];

          if (!fromPos || !toPos) return null;

          const visible = isConnectionVisible(connection);

          return (
            <motion.line
              key={connection.id}
              x1={fromPos.x}
              y1={fromPos.y}
              x2={toPos.x}
              y2={toPos.y}
              stroke="rgba(255, 255, 255, 0.3)"
              strokeWidth={1}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: visible ? 1 : 0,
                opacity: visible ? 0.6 : 0,
              }}
              transition={{
                duration: 0.4,
                ease: "easeInOut",
              }}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => {
          const pos = nodePositions.current[node.id] || {
            x: node.x,
            y: node.y,
          };

          return (
            <motion.circle
              key={node.id}
              cx={pos.x}
              cy={pos.y}
              r={node.size}
              fill="white"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: node.exiting ? 0 : 1,
                opacity: node.exiting ? 0 : 1,
              }}
              transition={{
                duration: 0.4,
                delay: node.exiting ? 0 : node.delay,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}
