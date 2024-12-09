import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Entity, EntityRelationship } from '../types/entities';

interface EntityGraphProps {
  entities: Entity[];
  relationships: EntityRelationship[];
}

interface D3Node extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  type: Entity['type'];
}

interface D3Link extends d3.SimulationLinkDatum<D3Node> {
  sourceId: string;
  targetId: string;
  type: EntityRelationship['type'];
  percentage?: number;
}

export default function EntityGraph({ entities, relationships }: EntityGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !entities.length) return;

    const width = 800;
    const height = 600;

    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

    // Transform data for D3
    const nodes: D3Node[] = entities.map(entity => ({
      id: entity.id,
      name: entity.name,
      type: entity.type,
      x: width / 2 + Math.random() * 100 - 50,
      y: height / 2 + Math.random() * 100 - 50,
    }));

    const links: D3Link[] = relationships.map(rel => ({
      source: nodes.find(n => n.id === rel.sourceId)!,
      target: nodes.find(n => n.id === rel.targetId)!,
      sourceId: rel.sourceId,
      targetId: rel.targetId,
      type: rel.type,
      percentage: rel.percentage,
    }));

    // Create the simulation
    const simulation: d3.Simulation<D3Node, D3Link> = d3.forceSimulation<D3Node>(nodes)
      .force("link", d3.forceLink<D3Node, D3Link>(links)
        .id(d => d.id)
        .distance(100))
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2));

    // Create arrow marker for directed links
    svg.append("defs").selectAll("marker")
      .data(["arrow"])
      .join("marker")
      .attr("id", d => d)
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 30)
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("fill", "#999")
      .attr("d", "M0,-5L10,0L0,5");

    // Draw links
    const link = svg.append("g")
      .attr("class", "links")
      .selectAll<SVGLineElement, D3Link>("line")
      .data(links)
      .join("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", 2)
      .attr("marker-end", "url(#arrow)");

    // Create node groups
    const nodeGroups = svg.append("g")
      .attr("class", "nodes")
      .selectAll<SVGGElement, D3Node>("g")
      .data(nodes)
      .join("g");

    // Setup drag behavior
    const dragBehavior = d3.drag<SVGGElement, D3Node>()
      .on("start", (event: d3.D3DragEvent<SVGGElement, D3Node, D3Node>) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      })
      .on("drag", (event: d3.D3DragEvent<SVGGElement, D3Node, D3Node>) => {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      })
      .on("end", (event: d3.D3DragEvent<SVGGElement, D3Node, D3Node>) => {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      });

    nodeGroups.call(dragBehavior as any);

    // Add circles for nodes
    nodeGroups.append("circle")
      .attr("r", 20)
      .attr("fill", d => getEntityColor(d.type));

    // Add labels
    nodeGroups.append("text")
      .text(d => d.name)
      .attr("x", 25)
      .attr("y", 5)
      .attr("font-size", "12px")
      .attr("fill", "#025584");

    // Add percentage labels on links
    const linkLabels = svg.append("g")
      .attr("class", "link-labels")
      .selectAll<SVGTextElement, D3Link>("text")
      .data(links)
      .join("text")
      .attr("font-size", "10px")
      .attr("fill", "#666")
      .text(d => d.percentage ? `${d.percentage}%` : '');

    // Update positions on each tick
    simulation.on("tick", () => {
      link
        .attr("x1", d => (d.source as D3Node).x!)
        .attr("y1", d => (d.source as D3Node).y!)
        .attr("x2", d => (d.target as D3Node).x!)
        .attr("y2", d => (d.target as D3Node).y!);

      nodeGroups.attr("transform", d => `translate(${d.x},${d.y})`);

      linkLabels
        .attr("x", d => ((d.source as D3Node).x! + (d.target as D3Node).x!) / 2)
        .attr("y", d => ((d.source as D3Node).y! + (d.target as D3Node).y!) / 2);
    });

    // Cleanup function
    return () => {
      simulation.stop();
    };
  }, [entities, relationships]);

  return (
    <div className="w-full h-full border rounded-lg bg-white p-4">
      <svg ref={svgRef} width="100%" height="100%" />
    </div>
  );
}

// Helper function to get color based on entity type
function getEntityColor(type: Entity['type']): string {
  switch (type) {
    case 'trust':
      return '#00D47E'; // Bright Green for Trust
    case 'llc':
      return '#025584'; // Deep Teal for LLC
    case 'corporation':
      return '#02558499'; // 60% Teal for Corporation
    default:
      return '#94A3B8'; // Default color from our status indicators
  }
}
