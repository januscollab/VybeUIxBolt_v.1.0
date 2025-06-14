import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Filter, Download, MoreHorizontal, ArrowUpDown, Eye, Edit, Trash2, Plus, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { useState, useMemo } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  department: string;
  joinDate: string;
  avatar?: string;
}

const sampleUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "active",
    department: "Engineering",
    joinDate: "2023-01-15",
    avatar: "/placeholder.svg"
  },
  {
    id: "2", 
    name: "Sarah Smith",
    email: "sarah@example.com",
    role: "Designer",
    status: "active",
    department: "Design",
    joinDate: "2023-02-20"
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com", 
    role: "Developer",
    status: "inactive",
    department: "Engineering",
    joinDate: "2023-03-10"
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@example.com",
    role: "Manager",
    status: "pending",
    department: "Product",
    joinDate: "2023-04-05"
  },
  {
    id: "5",
    name: "Alex Wilson",
    email: "alex@example.com",
    role: "Developer",
    status: "active",
    department: "Engineering", 
    joinDate: "2023-05-12"
  },
  {
    id: "6",
    name: "Lisa Brown",
    email: "lisa@example.com",
    role: "Designer",
    status: "active",
    department: "Design",
    joinDate: "2023-06-18"
  },
  {
    id: "7",
    name: "David Lee",
    email: "david@example.com",
    role: "Developer", 
    status: "inactive",
    department: "Engineering",
    joinDate: "2023-07-22"
  },
  {
    id: "8",
    name: "Maria Garcia",
    email: "maria@example.com",
    role: "Manager",
    status: "active",
    department: "Marketing",
    joinDate: "2023-08-30"
  }
];

export default function DataTableShowcase() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [sortConfig, setSortConfig] = useState<{key: keyof User; direction: 'asc' | 'desc'} | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const filteredAndSortedUsers = useMemo(() => {
    let filtered = sampleUsers.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.role.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || user.status === statusFilter;
      const matchesDepartment = departmentFilter === "all" || user.department === departmentFilter;
      
      return matchesSearch && matchesStatus && matchesDepartment;
    });

    if (sortConfig) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [searchTerm, statusFilter, departmentFilter, sortConfig]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredAndSortedUsers.slice(startIndex, startIndex + pageSize);
  }, [filteredAndSortedUsers, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredAndSortedUsers.length / pageSize);

  const handleSort = (key: keyof User) => {
    setSortConfig(current => {
      if (current?.key === key) {
        return {
          key,
          direction: current.direction === 'asc' ? 'desc' : 'asc'
        };
      }
      return { key, direction: 'asc' };
    });
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(new Set(paginatedUsers.map(user => user.id)));
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleSelectRow = (userId: string, checked: boolean) => {
    const newSelected = new Set(selectedRows);
    if (checked) {
      newSelected.add(userId);
    } else {
      newSelected.delete(userId);
    }
    setSelectedRows(newSelected);
  };

  const getStatusBadge = (status: User['status']) => {
    const variants = {
      active: "default" as const,
      inactive: "secondary" as const,
      pending: "outline" as const
    };
    
    const colors = {
      active: "text-green-700 bg-green-50 border-green-200 dark:bg-green-950 dark:text-green-400",
      inactive: "text-gray-700 bg-gray-50 border-gray-200 dark:bg-gray-950 dark:text-gray-400", 
      pending: "text-yellow-700 bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-400"
    };

    return (
      <Badge variant={variants[status]} className={colors[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold">Data Table Component</h1>
          <Badge variant="default">Stable</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Sortable, filterable table with pagination, row selection, and advanced data management features.
        </p>
      </div>

      {/* Advanced Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>Advanced Data Table</CardTitle>
          <CardDescription>Full-featured data table with sorting, filtering, pagination, and actions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Table Controls */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-full sm:w-64"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>

              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-full sm:w-36">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="Product">Product</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </div>
          </div>

          {/* Selected Row Actions */}
          {selectedRows.size > 0 && (
            <div className="flex items-center gap-2 p-2 bg-muted rounded-lg">
              <span className="text-sm text-muted-foreground">
                {selectedRows.size} row{selectedRows.size > 1 ? 's' : ''} selected
              </span>
              <Button variant="outline" size="sm">
                Bulk Edit
              </Button>
              <Button variant="outline" size="sm">
                Export Selected
              </Button>
              <Button variant="destructive" size="sm">
                Delete Selected
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
                      checked={paginatedUsers.length > 0 && selectedRows.size === paginatedUsers.length}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('name')}
                      className="h-auto p-0 font-medium"
                    >
                      User
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('role')}
                      className="h-auto p-0 font-medium"
                    >
                      Role
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('status')}
                      className="h-auto p-0 font-medium"
                    >
                      Status
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('department')}
                      className="h-auto p-0 font-medium"
                    >
                      Department
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('joinDate')}
                      className="h-auto p-0 font-medium"
                    >
                      Join Date
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedUsers.map((user) => (
                  <TableRow key={user.id} className="hover:bg-muted/50">
                    <TableCell>
                      <Checkbox
                        checked={selectedRows.has(user.id)}
                        onCheckedChange={(checked) => handleSelectRow(user.id, checked as boolean)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{user.role}</Badge>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(user.status)}
                    </TableCell>
                    <TableCell>{user.department}</TableCell>
                    <TableCell>{new Date(user.joinDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Rows per page:</span>
              <Select value={pageSize.toString()} onValueChange={(value) => {
                setPageSize(parseInt(value));
                setCurrentPage(1);
              }}>
                <SelectTrigger className="w-16">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, filteredAndSortedUsers.length)} of {filteredAndSortedUsers.length} results
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <span className="text-sm px-3 py-1 bg-muted rounded">
                {currentPage} of {totalPages}
              </span>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Usage Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Guidelines</CardTitle>
          <CardDescription>Best practices for data table implementation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-success">Best Practices</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Implement progressive disclosure</li>
                <li>• Use consistent sorting indicators</li>
                <li>• Provide clear filtering options</li>
                <li>• Include bulk action capabilities</li>
                <li>• Optimize for mobile viewing</li>
                <li>• Show loading states appropriately</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-warning">Performance</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Implement virtual scrolling for large datasets</li>
                <li>• Use server-side pagination when possible</li>
                <li>• Debounce search input</li>
                <li>• Cache sorted and filtered results</li>
                <li>• Optimize column rendering</li>
                <li>• Consider data lazy loading</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}