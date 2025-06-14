import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Eye, Mouse, Clock, Users } from 'lucide-react';

interface ComponentAnalytics {
  component_name: string;
  view_count: number;
  click_count: number;
  avg_time_spent: number;
  unique_users: number;
  last_accessed: string;
}

export default function ComponentAnalyticsShowcase() {
  const [analytics, setAnalytics] = useState<ComponentAnalytics[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('7d');

  useEffect(() => {
    loadAnalytics();
  }, [timeRange]);

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      // Simulate loading analytics data
      const mockData: ComponentAnalytics[] = [
        { component_name: 'Button', view_count: 1247, click_count: 892, avg_time_spent: 12.5, unique_users: 156, last_accessed: '2024-01-15T10:30:00Z' },
        { component_name: 'Card', view_count: 983, click_count: 445, avg_time_spent: 8.2, unique_users: 134, last_accessed: '2024-01-15T09:45:00Z' },
        { component_name: 'Input', view_count: 756, click_count: 623, avg_time_spent: 15.3, unique_users: 98, last_accessed: '2024-01-15T11:20:00Z' },
        { component_name: 'Modal', view_count: 432, click_count: 298, avg_time_spent: 22.1, unique_users: 87, last_accessed: '2024-01-15T08:15:00Z' },
        { component_name: 'Table', view_count: 387, click_count: 234, avg_time_spent: 18.7, unique_users: 72, last_accessed: '2024-01-14T16:30:00Z' },
        { component_name: 'Form', view_count: 298, click_count: 187, avg_time_spent: 35.2, unique_users: 65, last_accessed: '2024-01-14T14:22:00Z' }
      ];
      
      setAnalytics(mockData);
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalViews = analytics.reduce((sum, item) => sum + item.view_count, 0);
  const totalClicks = analytics.reduce((sum, item) => sum + item.click_count, 0);
  const avgEngagement = totalViews > 0 ? (totalClicks / totalViews * 100).toFixed(1) : '0';

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'];

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Component Analytics</h1>
            <p className="text-lg text-muted-foreground">
              Track component usage patterns and user engagement metrics.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant={timeRange === '24h' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange('24h')}
            >
              24h
            </Button>
            <Button 
              variant={timeRange === '7d' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange('7d')}
            >
              7d
            </Button>
            <Button 
              variant={timeRange === '30d' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange('30d')}
            >
              30d
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="default">Analytics</Badge>
          <Badge variant="outline">Insights</Badge>
        </div>
      </div>

      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Total Views</span>
            </div>
            <div className="text-2xl font-bold">{totalViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12.5%</span> from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Mouse className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Total Clicks</span>
            </div>
            <div className="text-2xl font-bold">{totalClicks.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8.3%</span> from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Engagement</span>
            </div>
            <div className="text-2xl font-bold">{avgEngagement}%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600">-2.1%</span> from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Active Users</span>
            </div>
            <div className="text-2xl font-bold">287</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+15.7%</span> from last period
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Usage Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Component Usage Overview</CardTitle>
          <CardDescription>
            View and interaction counts across all components
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="component_name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="view_count" fill="#0088FE" name="Views" />
              <Bar dataKey="click_count" fill="#00C49F" name="Clicks" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Usage Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Component Popularity</CardTitle>
            <CardDescription>
              Distribution of component views
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={analytics}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="view_count"
                  nameKey="component_name"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {analytics.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Component Performance</CardTitle>
            <CardDescription>
              Detailed metrics for each component
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {analytics.slice(0, 4).map((component, index) => (
              <div key={component.component_name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{component.component_name}</span>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{component.view_count} views</span>
                    <span>{component.avg_time_spent}s avg</span>
                  </div>
                </div>
                <Progress 
                  value={(component.view_count / totalViews) * 100} 
                  className="h-2"
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Detailed Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Analytics</CardTitle>
          <CardDescription>
            Complete breakdown of component usage statistics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Component</th>
                  <th className="text-right p-2">Views</th>
                  <th className="text-right p-2">Clicks</th>
                  <th className="text-right p-2">Engagement</th>
                  <th className="text-right p-2">Avg Time</th>
                  <th className="text-right p-2">Users</th>
                </tr>
              </thead>
              <tbody>
                {analytics.map((component) => (
                  <tr key={component.component_name} className="border-b">
                    <td className="p-2 font-medium">{component.component_name}</td>
                    <td className="p-2 text-right">{component.view_count.toLocaleString()}</td>
                    <td className="p-2 text-right">{component.click_count.toLocaleString()}</td>
                    <td className="p-2 text-right">
                      {((component.click_count / component.view_count) * 100).toFixed(1)}%
                    </td>
                    <td className="p-2 text-right">{component.avg_time_spent}s</td>
                    <td className="p-2 text-right">{component.unique_users}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}