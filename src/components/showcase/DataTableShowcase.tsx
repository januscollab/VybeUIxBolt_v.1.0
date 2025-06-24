
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Search, Filter, Download, MoreHorizontal, ArrowUpDown, 
  Eye, Edit, Trash2, Users, TrendingUp, AlertCircle
} from "lucide-react";

export default function DataTableShowcase() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const data = [
    { id: "1", name: "Alice Johnson", email: "alice@company.com", role: "Admin", status: "active", lastLogin: "2024-01-15" },
    { id: "2", name: "Bob Smith", email: "bob@company.com", role: "User", status: "inactive", lastLogin: "2024-01-10" },
    { id: "3", name: "Carol Davis", email: "carol@company.com", role: "Editor", status: "active", lastLogin: "2024-01-14" },
    { id: "4", name: "David Wilson", email: "david@company.com", role: "User", status: "pending", lastLogin: "2024-01-12" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="success" className="text-xs">Active</Badge>;
      case 'inactive':
        return <Badge variant="secondary" className="text-xs">Inactive</Badge>;
      case 'pending':
        return <Badge variant="warning" className="text-xs">Pending</Badge>;
      default:
        return <Badge variant="outline" className="text-xs">{status}</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'Admin':
        return <Badge variant="destructive" className="text-xs">Admin</Badge>;
      case 'Editor':
        return <Badge variant="default" className="text-xs">Editor</Badge>;
      case 'User':
        return <Badge variant="outline" className="text-xs">User</Badge>;
      default:
        return <Badge variant="outline" className="text-xs">{role}</Badge>;
    }
  };

  const filteredData = data.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8 showcase-component">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold">Data Table</h1>
          <Badge variant="default">Enhanced</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Advanced data tables with sorting, filtering, pagination, and bulk actions.
        </p>
      </div>

      {/* Advanced Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>User Management Table</CardTitle>
          <CardDescription>
            Complete data table with search, filters, and bulk operations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Search Users</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full sm:w-48">
              <Label htmlFor="status-filter">Filter by Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger id="status-filter">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedRows.length > 0 && (
            <div className="flex items-center gap-2 p-3 bg-primary/10 border border-primary/20 rounded-lg">
              <span className="text-sm font-medium text-primary">
                {selectedRows.length} selected
              </span>
              <Button size="sm" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
              <Button size="sm" variant="outline" className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
            </div>
          )}

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedRows.length === filteredData.length}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedRows(filteredData.map(item => item.id));
                        } else {
                          setSelectedRows([]);
                        }
                      }}
                    />
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" className="h-auto p-0 font-medium">
                      Name
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedRows.includes(item.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedRows(prev => [...prev, item.id]);
                          } else {
                            setSelectedRows(prev => prev.filter(id => id !== item.id));
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell className="text-muted-foreground">{item.email}</TableCell>
                    <TableCell>{getRoleBadge(item.role)}</TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell className="text-muted-foreground">{item.lastLogin}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Table Footer */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {filteredData.length} of {data.length} results
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" disabled>
                Previous
              </Button>
              <Button size="sm" variant="outline">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Table Analytics</CardTitle>
          <CardDescription>
            Key metrics and insights from your data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Total Users</span>
              </div>
              <p className="text-2xl font-bold">{data.length}</p>
              <p className="text-xs text-muted-foreground">Across all roles</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-success" />
                <span className="text-sm font-medium">Active Users</span>
              </div>
              <p className="text-2xl font-bold text-success">
                {data.filter(item => item.status === 'active').length}
              </p>
              <p className="text-xs text-muted-foreground">Currently active</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-warning" />
                <span className="text-sm font-medium">Pending</span>
              </div>
              <p className="text-2xl font-bold text-warning">
                {data.filter(item => item.status === 'pending').length}
              </p>
              <p className="text-xs text-muted-foreground">Awaiting approval</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Implementation Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation Guidelines</CardTitle>
          <CardDescription>
            Best practices for building data tables
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Performance</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Implement virtual scrolling for large datasets</li>
                <li>• Use pagination or infinite loading</li>
                <li>• Debounce search inputs</li>
                <li>• Optimize re-renders with useMemo</li>
                <li>• Consider server-side filtering</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">User Experience</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Provide clear sorting indicators</li>
                <li>• Show loading states during operations</li>
                <li>• Enable keyboard navigation</li>
                <li>• Make actions discoverable</li>
                <li>• Maintain selection state</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
