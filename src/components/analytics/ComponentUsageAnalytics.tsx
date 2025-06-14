import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Eye, Clock, Download } from "lucide-react";
import { useComponents, useCategories } from "@/hooks/useDesignSystem";

interface UsageData {
  componentId: string;
  componentName: string;
  views: number;
  downloads: number;
  lastAccessed: string;
  category: string;
  status: string;
}

// Mock analytics data - in a real app, this would come from your analytics service
const generateMockAnalytics = (components: any[] = []): UsageData[] => {
  return components.map(component => ({
    componentId: component.id,
    componentName: component.name,
    views: Math.floor(Math.random() * 1000) + 50,
    downloads: Math.floor(Math.random() * 500) + 10,
    lastAccessed: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    category: component.category?.name || 'Uncategorized',
    status: component.status
  }));
};

const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--muted))', '#8884d8', '#82ca9d', '#ffc658', '#ff7300'];

export function ComponentUsageAnalytics() {
  const { data: components } = useComponents();
  const { data: categories } = useCategories();
  const [analyticsData, setAnalyticsData] = useState<UsageData[]>([]);
  const [timeRange, setTimeRange] = useState('7d');

  useEffect(() => {
    if (components) {
      setAnalyticsData(generateMockAnalytics(components));
    }
  }, [components]);

  // Calculate insights
  const totalViews = analyticsData.reduce((sum, item) => sum + item.views, 0);
  const totalDownloads = analyticsData.reduce((sum, item) => sum + item.downloads, 0);
  const mostPopular = analyticsData.sort((a, b) => b.views - a.views).slice(0, 5);
  
  // Category usage data
  const categoryUsage = categories?.map(category => {
    const categoryComponents = analyticsData.filter(item => item.category === category.name);
    const categoryViews = categoryComponents.reduce((sum, item) => sum + item.views, 0);
    return {
      name: category.name,
      views: categoryViews,
      components: categoryComponents.length
    };
  }) || [];

  // Chart data
  const chartData = mostPopular.map(item => ({
    name: item.componentName.length > 15 ? item.componentName.substring(0, 15) + '...' : item.componentName,
    views: item.views,
    downloads: item.downloads
  }));

  const pieData = categoryUsage.map(category => ({
    name: category.name,
    value: category.views
  }));

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Downloads</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDownloads.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +8% from last week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Components</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{components?.length || 0}</div>
            <p className="text-xs text-muted-foreground">
              +3 new this week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Usage</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(totalViews / (components?.length || 1))}</div>
            <p className="text-xs text-muted-foreground">
              views per component
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={timeRange} onValueChange={setTimeRange} className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Usage Analytics</h2>
          <TabsList>
            <TabsTrigger value="7d">7 Days</TabsTrigger>
            <TabsTrigger value="30d">30 Days</TabsTrigger>
            <TabsTrigger value="90d">90 Days</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value={timeRange} className="space-y-6">
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Most Popular Components</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="views" fill="hsl(var(--primary))" />
                    <Bar dataKey="downloads" fill="hsl(var(--secondary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Usage by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Top Components List */}
          <Card>
            <CardHeader>
              <CardTitle>Component Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mostPopular.map((component, index) => (
                  <div key={component.componentId} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold">
                        #{index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold">{component.componentName}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {component.category}
                          </Badge>
                          <Badge variant={component.status === 'stable' ? 'default' : 'secondary'} className="text-xs">
                            {component.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="text-center">
                        <div className="font-semibold">{component.views}</div>
                        <div className="text-muted-foreground">views</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold">{component.downloads}</div>
                        <div className="text-muted-foreground">downloads</div>
                      </div>
                      <div className="w-24">
                        <Progress value={(component.views / Math.max(...analyticsData.map(d => d.views))) * 100} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Category Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Category Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryUsage.map((category) => (
                  <div key={category.name} className="p-4 border rounded-lg space-y-2">
                    <h4 className="font-semibold">{category.name}</h4>
                    <div className="text-2xl font-bold">{category.views}</div>
                    <div className="text-sm text-muted-foreground">
                      {category.components} components
                    </div>
                    <Progress value={(category.views / Math.max(...categoryUsage.map(c => c.views))) * 100} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}