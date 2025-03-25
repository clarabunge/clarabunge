import { useId } from "react";

const Line = ({
  color = "#555",
  height = 14,
  className = "",
  style = {},
  wobbliness = 0.5,
  pointCount = 8,
}) => {
  const id = useId();
  const markerId = `arrow-marker-${id}`;

  const viewBoxWidth = 249;
  const viewBoxHeight = 14;
  const viewBoxX = 227;
  const viewBoxY = 342;

  const startX = viewBoxX + 5;
  const endX = viewBoxX + viewBoxWidth - 5;

  const baselineY = viewBoxY + viewBoxHeight / 2;

  const generatePoints = () => {
    const points = [];

    points.push([
      startX,
      baselineY + (Math.random() - 0.5) * wobbliness * viewBoxHeight,
    ]);

    const segmentWidth = (endX - startX) / (pointCount + 1);

    for (let i = 1; i <= pointCount; i++) {
      const x = startX + segmentWidth * i;
      const variationFactor = Math.sin((Math.PI * i) / (pointCount + 1));
      const y =
        baselineY +
        (Math.random() - 0.5) *
          wobbliness *
          viewBoxHeight *
          2 *
          variationFactor;
      points.push([x, y]);
    }

    points.push([
      endX,
      baselineY + (Math.random() - 0.5) * wobbliness * viewBoxHeight * 0.5,
    ]);

    return points;
  };

  const points = generatePoints();

  const createPathData = (points) => {
    if (points.length < 2) return "";

    let pathData = `M${points[0][0]},${points[0][1]}`;

    for (let i = 1; i < points.length; i++) {
      const prevPoint = points[i - 1];
      const currentPoint = points[i];

      const cp1x = prevPoint[0] + (currentPoint[0] - prevPoint[0]) / 3;
      const cp1y =
        prevPoint[1] + (Math.random() - 0.5) * wobbliness * viewBoxHeight;

      const cp2x = prevPoint[0] + (2 * (currentPoint[0] - prevPoint[0])) / 3;
      const cp2y =
        currentPoint[1] + (Math.random() - 0.5) * wobbliness * viewBoxHeight;

      pathData += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${currentPoint[0]},${currentPoint[1]}`;
    }

    return pathData;
  };

  const pathData = createPathData(points);

  return (
    <div className={className} style={{ width: "100%", ...style }}>
      <svg
        width="100%"
        height={height}
        viewBox={`${viewBoxX} ${viewBoxY} ${viewBoxWidth} ${viewBoxHeight}`}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <marker
            id={markerId}
            viewBox="0 0 6 6"
            refX="3"
            refY="3"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
            fill={color}
          >
            <path d="M 3 2.5 A 0.5 0.5 0 0 1 3 3.5" />
          </marker>
        </defs>

        <path
          d={pathData}
          style={{
            fill: "none",
            strokeWidth: 2,
            stroke: color,
            markerEnd: `url(#${markerId})`,
          }}
        />
      </svg>
    </div>
  );
};

export default Line;
