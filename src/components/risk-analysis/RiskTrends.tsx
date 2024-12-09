'use client';

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const historicalData = [
  { date: '2023-01', value: 1.1 },
  { date: '2023-02', value: 1.15 },
  { date: '2023-03', value: 1.2 },
  { date: '2023-04', value: 1.18 },
  { date: '2023-05', value: 1.25 },
  { date: '2023-06', value: 1.22 },
  { date: '2023-07', value: 1.28 },
  { date: '2023-08', value: 1.3 },
  { date: '2023-09', value: 1.27 },
  { date: '2023-10', value: 1.32 },
  { date: '2023-11', value: 1.35 },
  { date: '2023-12', value: 1.33 },
].map(d => ({
  ...d,
  date: new Date(d.date)
}));

export default function RiskTrends() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll('*').remove();

    const margin = { top: 20, right: 30, bottom: 30, left: 60 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create scales
    const dateExtent = d3.extent(historicalData, d => d.date);
    const x = d3
      .scaleTime()
      .domain(dateExtent as [Date, Date])
      .range([0, width]);

    const minValue = d3.min(historicalData, d => d.value);
    const maxValue = d3.max(historicalData, d => d.value);
    const y = d3
      .scaleLinear()
      .domain([
        minValue !== undefined ? minValue * 0.9 : 0,
        maxValue !== undefined ? maxValue * 1.1 : 1
      ])
      .range([height, 0]);

    // Create line generator
    const line = d3
      .line<typeof historicalData[0]>()
      .x(d => x(d.date))
      .y(d => y(d.value));

    // Add the line path
    svg
      .append('path')
      .datum(historicalData)
      .attr('fill', 'none')
      .attr('stroke', '#3b82f6')
      .attr('stroke-width', 2)
      .attr('d', line);

    // Add dots
    svg
      .selectAll('.dot')
      .data(historicalData)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('cx', d => x(d.date))
      .attr('cy', d => y(d.value))
      .attr('r', 4)
      .attr('fill', '#3b82f6');

    // Add the X Axis
    svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(6));

    // Add the Y Axis
    svg
      .append('g')
      .call(d3.axisLeft(y));

    // Add Y axis label
    svg
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left)
      .attr('x', 0 - height / 2)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text('Portfolio Beta');

  }, []);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium leading-6 text-gray-900">
        Historical Risk Trends
      </h3>
      <div className="bg-white p-4 rounded-lg shadow overflow-x-auto">
        <svg ref={svgRef} className="w-full h-[400px]" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-500 mb-2">
            Risk Trend Analysis
          </h4>
          <p className="text-sm text-gray-700">
            Portfolio beta has shown an upward trend over the past year, 
            indicating increased market sensitivity. Consider rebalancing if 
            this exceeds your risk tolerance.
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-500 mb-2">
            Key Statistics
          </h4>
          <dl className="grid grid-cols-2 gap-4">
            <div>
              <dt className="text-xs text-gray-500">Average Beta</dt>
              <dd className="text-sm font-medium text-gray-900">1.24</dd>
            </div>
            <div>
              <dt className="text-xs text-gray-500">Beta Range</dt>
              <dd className="text-sm font-medium text-gray-900">1.1 - 1.35</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
