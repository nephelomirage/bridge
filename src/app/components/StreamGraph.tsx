import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import * as d3 from "d3";

interface StreamGraphData {
  dynasty: string;
  imagery: string;
  count: number;
  proportion: number;
}

interface StreamGraphProps {
  data: StreamGraphData[];
}

// 更清新、更浅的pastel配色方案
const IMAGERY_COLORS = {
  "行旅交通": "#FFB88C", // Soft peach
  "时令节序": "#FFB3D9", // Soft pink
  "自然山水": "#A8E6CF", // Mint green
  "离别与相思": "#C7CEEA", // Lavender
  "草木生灵": "#B4E7CE", // Pale green
  "人居市井": "#FFD89B", // Pale gold
};

export function StreamGraph({ data }: StreamGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    content: { dynasty: string; imagery: string; count: number; proportion: number };
  } | null>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const margin = { top: 80, right: 40, bottom: 60, left: 40 }; // Increased bottom margin
    const width = container.clientWidth - margin.left - margin.right;
    const height = 850 - margin.top - margin.bottom; // Increased total height for full display

    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("width", container.clientWidth)
      .attr("height", 850)
      .on("mouseleave", () => {
        setTooltip(null);
        setHoveredCategory(null);
      });

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    // Process data
    const dynasties = Array.from(new Set(data.map((d) => d.dynasty)));
    const imageryCategories = Object.keys(IMAGERY_COLORS);

    // Create data structure for stack layout
    const stackData = dynasties.map((dynasty) => {
      const dynastyData: any = { dynasty };
      imageryCategories.forEach((imagery) => {
        const item = data.find((d) => d.dynasty === dynasty && d.imagery === imagery);
        dynastyData[imagery] = item ? item.count : 0;
      });
      return dynastyData;
    });

    // Scales
    const x = d3
      .scalePoint()
      .domain(dynasties)
      .range([0, width])
      .padding(0.5);

    const maxCount = d3.max(stackData, (d) =>
      d3.sum(imageryCategories, (key) => d[key])
    ) || 0;

    const y = d3.scaleLinear().domain([0, maxCount]).range([height, 0]);

    // Stack generator
    const stack = d3
      .stack()
      .keys(imageryCategories)
      .order(d3.stackOrderNone)
      .offset(d3.stackOffsetWiggle);

    const series = stack(stackData as any);

    // Calculate actual min and max values after wiggle offset
    let minValue = Infinity;
    let maxValue = -Infinity;
    series.forEach((layer) => {
      layer.forEach((d) => {
        if (d[0] < minValue) minValue = d[0];
        if (d[1] > maxValue) maxValue = d[1];
      });
    });

    // Adjust y scale to fit the actual data range tightly
    const yAdjusted = d3.scaleLinear()
      .domain([minValue, maxValue])
      .range([height, 0]);

    // Area generator
    const area = d3
      .area<any>()
      .x((d) => x(d.data.dynasty) || 0)
      .y0((d) => yAdjusted(d[0]))
      .y1((d) => yAdjusted(d[1]))
      .curve(d3.curveCatmullRom.alpha(0.5));

    // Add defs for patterns and filters
    const defs = svg.append("defs");

    // Create gradients for each imagery category
    imageryCategories.forEach((imagery, index) => {
      const baseColor = IMAGERY_COLORS[imagery as keyof typeof IMAGERY_COLORS];
      const gradientId = `gradient-${index}`;

      const gradient = defs
        .append("linearGradient")
        .attr("id", gradientId)
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "0%")
        .attr("y2", "100%");

      // Create a lighter version for the top
      const lighterColor = d3.color(baseColor)?.brighter(0.8)?.toString() || baseColor;
      // Create a slightly darker version for the bottom
      const darkerColor = d3.color(baseColor)?.darker(0.3)?.toString() || baseColor;

      gradient
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", lighterColor)
        .attr("stop-opacity", 0.9);

      gradient
        .append("stop")
        .attr("offset", "50%")
        .attr("stop-color", baseColor)
        .attr("stop-opacity", 0.95);

      gradient
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", darkerColor)
        .attr("stop-opacity", 0.9);
    });

    // Add glow filter
    const filter = defs.append("filter").attr("id", "glow");
    filter
      .append("feGaussianBlur")
      .attr("stdDeviation", "4")
      .attr("result", "coloredBlur");
    const feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "coloredBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    // Draw streams with enhanced strokes and gradients
    const streams = g
      .selectAll(".stream")
      .data(series)
      .join("path")
      .attr("class", "stream")
      .attr("d", area)
      .attr("fill", (d, i) => `url(#gradient-${i})`)
      .attr("opacity", 0.9)
      .attr("stroke", (d) => {
        // Darker version of the fill color for stroke
        const color = IMAGERY_COLORS[d.key as keyof typeof IMAGERY_COLORS];
        return d3.color(color)?.darker(0.8)?.toString() || color;
      })
      .attr("stroke-width", 1.5)
      .attr("stroke-linejoin", "round")
      .style("cursor", "pointer")
      .on("mouseenter", function (event, d) {
        setHoveredCategory(d.key);
        d3.select(this).attr("opacity", 1).attr("stroke-width", 2.5);
      })
      .on("mouseleave", function () {
        setHoveredCategory(null);
        setTooltip(null);
        d3.select(this).attr("opacity", 0.9).attr("stroke-width", 1.5);
      })
      .on("mousemove", function (event, d) {
        const [mouseX, mouseY] = d3.pointer(event, container);
        const closestDynasty = dynasties.reduce((prev, curr) => {
          const prevDist = Math.abs((x(prev) || 0) - (mouseX - margin.left));
          const currDist = Math.abs((x(curr) || 0) - (mouseX - margin.left));
          return currDist < prevDist ? curr : prev;
        });

        const item = data.find(
          (item) => item.dynasty === closestDynasty && item.imagery === d.key
        );

        if (item) {
          setTooltip({
            x: mouseX,
            y: mouseY,
            content: item,
          });
        }
      });

    // X Axis
    const xAxis = g
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).tickSize(0))
      .call((g) => g.select(".domain").remove());

    xAxis
      .selectAll("text")
      .attr("fill", "white")
      .attr("font-size", "24px")
      .attr("font-weight", "700")
      .attr("font-family", "'Source Han Serif SC', 'Noto Serif SC', serif")
      .attr("dy", "1.5em")
      .style("text-shadow", "0 2px 8px rgba(0, 0, 0, 0.8), 0 0 4px rgba(0, 0, 0, 0.6)");

    // Legend - Horizontal layout above the graph
    const legend = svg
      .append("g")
      .attr("transform", `translate(${margin.left + width / 2}, ${margin.top - 40})`); // Position legend right above the graph

    // Calculate total width needed for all legend items
    const legendItemSpacing = 140; // Reduced spacing between items
    const totalLegendWidth = imageryCategories.length * legendItemSpacing;
    const legendStartX = -totalLegendWidth / 2;

    imageryCategories.forEach((imagery, i) => {
      const legendRow = legend
        .append("g")
        .attr("transform", `translate(${legendStartX + i * legendItemSpacing}, 0)`)
        .style("cursor", "pointer")
        .on("mouseenter", () => setHoveredCategory(imagery))
        .on("mouseleave", () => setHoveredCategory(null));

      legendRow
        .append("rect")
        .attr("width", 28)
        .attr("height", 28)
        .attr("rx", 7)
        .attr("fill", IMAGERY_COLORS[imagery as keyof typeof IMAGERY_COLORS])
        .attr("stroke", () => {
          const color = IMAGERY_COLORS[imagery as keyof typeof IMAGERY_COLORS];
          return d3.color(color)?.darker(0.5)?.toString() || color;
        })
        .attr("stroke-width", 2)
        .attr("opacity", 0.9);

      legendRow
        .append("text")
        .attr("x", 36)
        .attr("y", 20)
        .attr("fill", "white")
        .attr("font-size", "20px")
        .attr("font-weight", "500")
        .attr("font-family", "'Source Han Serif SC', 'Noto Serif SC', serif")
        .style("text-shadow", "0 2px 8px rgba(0, 0, 0, 0.8), 0 0 4px rgba(0, 0, 0, 0.6)")
        .text(imagery);
    });

    // Add glow effect to hovered category
    if (hoveredCategory) {
      streams
        .filter((d) => d.key === hoveredCategory)
        .attr("opacity", 1)
        .attr("stroke-width", 2.5)
        .attr("filter", "url(#glow)");

      streams.filter((d) => d.key !== hoveredCategory).attr("opacity", 0.35);
    } else {
      streams.attr("opacity", 0.9).attr("stroke-width", 1.5).attr("filter", null);
    }

    const handleResize = () => {
      if (!containerRef.current || !svgRef.current) return;
      // Re-render on resize
      const event = new Event("resize");
      window.dispatchEvent(event);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [data, hoveredCategory]);

  return (
    <div ref={containerRef} className="relative w-full overflow-visible">
      <svg ref={svgRef} className="w-full overflow-visible" />
      {tooltip && (
        <motion.div
          className="pointer-events-none absolute z-50 rounded-lg border border-white/30 bg-black/90 px-4 py-3 shadow-xl backdrop-blur-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          style={{
            left: tooltip.x + 15,
            top: tooltip.y - 50,
          }}
        >
          <div className="space-y-1">
            <p
              className="text-sm font-bold text-white"
              style={{ fontFamily: "'Source Han Serif SC', 'Noto Serif SC', serif" }}
            >
              {tooltip.content.dynasty}
            </p>
            <p
              className="text-sm text-white/80"
              style={{ fontFamily: "'Source Han Serif SC', 'Noto Serif SC', serif" }}
            >
              {tooltip.content.imagery}
            </p>
            <p
              className="text-xs text-white/60"
              style={{ fontFamily: "'Source Han Serif SC', 'Noto Serif SC', serif" }}
            >
              数量: {tooltip.content.count}
            </p>
            <p
              className="text-xs text-white/60"
              style={{ fontFamily: "'Source Han Serif SC', 'Noto Serif SC', serif" }}
            >
              占比: {tooltip.content.proportion.toFixed(2)}%
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
