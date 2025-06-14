import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, Area, AreaChart, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export interface AdvancedChartProps {
  data: any[];
  type: 'donut' | 'stacked-bar' | 'area' | 'multi-line' | 'radar';
  height?: number;
  className?: string;
  colors?: string[];
}

export const AdvancedChart = React.forwardRef<HTMLDivElement, AdvancedChartProps>(
  ({ data, type, height = 300, className, colors = COLORS }, ref) => {
    const renderChart = () => {
      switch (type) {
        case 'donut':
          return (
            <ResponsiveContainer width="100%" height={height}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          );

        case 'stacked-bar':
          return (
            <ResponsiveContainer width="100%" height={height}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value1" stackId="a" fill={colors[0]} />
                <Bar dataKey="value2" stackId="a" fill={colors[1]} />
                <Bar dataKey="value3" stackId="a" fill={colors[2]} />
              </BarChart>
            </ResponsiveContainer>
          );

        case 'area':
          return (
            <ResponsiveContainer width="100%" height={height}>
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke={colors[0]} fill={colors[0]} fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          );

        case 'multi-line':
          return (
            <ResponsiveContainer width="100%" height={height}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value1" stroke={colors[0]} strokeWidth={2} />
                <Line type="monotone" dataKey="value2" stroke={colors[1]} strokeWidth={2} />
                <Line type="monotone" dataKey="value3" stroke={colors[2]} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          );

        default:
          return <div>Unsupported chart type</div>;
      }
    };

    return (
      <div ref={ref} className={cn("w-full", className)}>
        {renderChart()}
      </div>
    );
  }
);

AdvancedChart.displayName = "AdvancedChart";