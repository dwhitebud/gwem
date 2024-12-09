'use client';

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const data = [
  { category: 'Equities', risk: 45 },
  { category: 'Fixed Income', risk: 20 },
  { category: 'Real Estate', risk: 15 },
  { category: 'Alternatives', risk: 12 },
  { category: 'Cash', risk: 8 },
];

export default function RiskBreakdown() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll('*').remove();

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create scales
    const x = d3
      .scaleBand()
      .range([0, width])
      .domain(data.map((d) => d.category))
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .range([height, 0])
      .domain([0, d3.max(data, (d) => d.risk) || 0]);

    // Add bars
    svg
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => x(d.category) || 0)
      .attr('width', x.bandwidth())
      .attr('y', (d) => y(d.risk))
      .attr('height', (d) => height - y(d.risk))
      .attr('fill', '#3b82f6');

    // Add the X Axis
    svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end');

    // Add the Y Axis
    svg.append('g').call(d3.axisLeft(y).ticks(5).tickFormat((d) => d + '%'));

    // Add Y axis label
    svg
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left)
      .attr('x', 0 - height / 2)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text('Risk Contribution (%)');
  }, []);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium leading-6 text-gray-900">
        Risk Distribution by Asset Class
      </h3>
      <div className="bg-white p-4 rounded-lg shadow">
        <svg ref={svgRef} className="w-full h-[400px]" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {data.map((item) => (
          <div
            key={item.category}
            className="bg-gray-50 p-4 rounded-lg"
          >
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500">
                {item.category}
              </span>
              <span className="text-sm font-semibold text-gray-900">
                {item.risk}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
