import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal } from "lucide-react";
import { useState } from "react";

export default function PaginationShowcase() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [jumpToPage, setJumpToPage] = useState("");
  const totalItems = 247;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const handleJumpToPage = () => {
    const page = parseInt(jumpToPage);
    if (page && page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setJumpToPage("");
    }
  };

  const getVisiblePages = (current: number, total: number) => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
      range.push(i);
    }

    if (current - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (current + delta < total - 1) {
      rangeWithDots.push('...', total);
    } else if (total > 1) {
      rangeWithDots.push(total);
    }

    return rangeWithDots;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold">Pagination Component</h1>
          <Badge variant="default">Stable</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Page navigation with numbered pages, controls, and various pagination styles for large datasets.
        </p>
      </div>

      {/* Basic Pagination */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Pagination</CardTitle>
          <CardDescription>Standard pagination with previous/next navigation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center gap-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(currentPage - 1);
                    }}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {getVisiblePages(currentPage, totalPages).map((page, index) => (
                  <PaginationItem key={index}>
                    {page === '...' ? (
                      <PaginationEllipsis />
                    ) : (
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(page as number);
                        }}
                        isActive={page === currentPage}
                      >
                        {page}
                      </PaginationLink>
                    )}
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(currentPage + 1);
                    }}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>

            <div className="text-sm text-muted-foreground">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} results
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compact Pagination */}
      <Card>
        <CardHeader>
          <CardTitle>Compact Pagination</CardTitle>
          <CardDescription>Minimal pagination for mobile or space-constrained layouts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>

            <div className="flex items-center gap-2 text-sm">
              <span>Page</span>
              <span className="font-medium">{currentPage}</span>
              <span>of</span>
              <span className="font-medium">{totalPages}</span>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Pagination */}
      <Card>
        <CardHeader>
          <CardTitle>Advanced Pagination</CardTitle>
          <CardDescription>Full-featured pagination with page size controls and jump-to-page</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Items per page */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Items per page:</span>
              <Select 
                value={itemsPerPage.toString()} 
                onValueChange={(value) => {
                  setItemsPerPage(parseInt(value));
                  setCurrentPage(1); // Reset to first page when changing page size
                }}
              >
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Main pagination */}
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <div className="flex items-center gap-1">
                {getVisiblePages(currentPage, totalPages).slice(0, 7).map((page, index) => (
                  <div key={index}>
                    {page === '...' ? (
                      <Button variant="ghost" size="sm" disabled>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        variant={page === currentPage ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(page as number)}
                      >
                        {page}
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Jump to page */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Go to:</span>
              <Input
                type="number"
                min="1"
                max={totalPages}
                value={jumpToPage}
                onChange={(e) => setJumpToPage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleJumpToPage();
                  }
                }}
                placeholder="Page"
                className="w-20"
              />
              <Button size="sm" onClick={handleJumpToPage}>
                Go
              </Button>
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} results
          </div>
        </CardContent>
      </Card>

      {/* Load More Pattern */}
      <Card>
        <CardHeader>
          <CardTitle>Load More Pattern</CardTitle>
          <CardDescription>Progressive loading for infinite scroll alternatives</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="grid gap-3">
              {Array.from({ length: 5 }, (_, i) => (
                <div key={i} className="p-4 border rounded-lg">
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-3 bg-muted rounded w-3/4"></div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button variant="outline">
                Load More Items
              </Button>
              <div className="text-sm text-muted-foreground mt-2">
                Showing 5 of 247 items
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table Integration */}
      <Card>
        <CardHeader>
          <CardTitle>Table Integration</CardTitle>
          <CardDescription>Pagination integrated with data tables</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border rounded-lg">
            <div className="p-4 border-b bg-muted/50">
              <h4 className="font-medium">User List</h4>
            </div>
            <div className="p-4 space-y-3">
              {Array.from({ length: itemsPerPage }, (_, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b last:border-b-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-muted rounded-full"></div>
                    <div>
                      <div className="font-medium">User {(currentPage - 1) * itemsPerPage + i + 1}</div>
                      <div className="text-sm text-muted-foreground">user{(currentPage - 1) * itemsPerPage + i + 1}@example.com</div>
                    </div>
                  </div>
                  <Badge variant="secondary">Active</Badge>
                </div>
              ))}
            </div>
            <div className="p-4 border-t bg-muted/50">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  {totalItems} total users
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <span className="text-sm px-3 py-1 bg-background border rounded">
                    {currentPage} / {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Usage Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Guidelines</CardTitle>
          <CardDescription>Best practices for pagination implementation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-success">Best Practices</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Show current page clearly</li>
                <li>• Provide context about total items</li>
                <li>• Use consistent navigation patterns</li>
                <li>• Consider mobile-friendly designs</li>
                <li>• Implement keyboard navigation</li>
                <li>• Maintain URL state for bookmarking</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-warning">Performance</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Use server-side pagination for large datasets</li>
                <li>• Implement proper loading states</li>
                <li>• Cache pages when appropriate</li>
                <li>• Consider virtual scrolling alternatives</li>
                <li>• Optimize page size based on content</li>
                <li>• Preload adjacent pages when possible</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}