
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, FileText, Users, Inbox, Upload, RefreshCw } from "lucide-react";

export default function EmptyStateShowcase() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">Empty State</h1>
          <Badge variant="default">Stable</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Helpful placeholders when there's no content to display, guiding users to their next action.
        </p>
      </div>

      {/* Basic Empty State */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Empty State</CardTitle>
          <CardDescription>Simple empty state with call to action</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No documents found</h3>
            <p className="text-muted-foreground mb-6 max-w-sm">
              You haven't created any documents yet. Create your first document to get started.
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Document
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search Results Empty State */}
      <Card>
        <CardHeader>
          <CardTitle>Search Results Empty State</CardTitle>
          <CardDescription>Empty state for search with no results</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Search className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No results found</h3>
            <p className="text-muted-foreground mb-6 max-w-sm">
              We couldn't find any results for "design system". Try adjusting your search terms.
            </p>
            <div className="flex gap-2 w-full max-w-sm">
              <Input placeholder="Try different keywords..." className="flex-1" />
              <Button variant="outline">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loading/Empty Inbox */}
      <Card>
        <CardHeader>
          <CardTitle>Inbox Empty State</CardTitle>
          <CardDescription>Congratulatory empty state for completed tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Inbox className="h-12 w-12 text-success mb-4" />
            <h3 className="text-lg font-semibold mb-2">Inbox Zero!</h3>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Great job! You've handled all your messages. Take a break or explore other features.
            </p>
            <div className="flex gap-2">
              <Button variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button>
                Explore Features
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team/Collaboration Empty State */}
      <Card>
        <CardHeader>
          <CardTitle>Team Empty State</CardTitle>
          <CardDescription>Empty state encouraging collaboration</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Users className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Build your team</h3>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Collaboration makes everything better. Invite team members to start working together.
            </p>
            <div className="flex gap-2">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Invite Team Members
              </Button>
              <Button variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* File Upload Empty State */}
      <Card>
        <CardHeader>
          <CardTitle>File Upload Empty State</CardTitle>
          <CardDescription>Interactive empty state for file uploads</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12">
            <div className="flex flex-col items-center justify-center text-center">
              <Upload className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Upload your files</h3>
              <p className="text-muted-foreground mb-6 max-w-sm">
                Drag and drop files here, or click to browse your computer.
              </p>
              <div className="flex gap-2">
                <Button>
                  Choose Files
                </Button>
                <Button variant="outline">
                  Browse Folder
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Supports JPG, PNG, PDF up to 10MB
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Design Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Design Guidelines</CardTitle>
          <CardDescription>Best practices for empty states</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-success">Best Practices</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Use encouraging, positive language</li>
                <li>• Provide clear next steps</li>
                <li>• Include relevant illustrations or icons</li>
                <li>• Keep copy concise and helpful</li>
                <li>• Match the tone to the context</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-info">Types</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• First-time user experience</li>
                <li>• No search results</li>
                <li>• Error states with recovery</li>
                <li>• Completed/success states</li>
                <li>• User-cleared content</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
