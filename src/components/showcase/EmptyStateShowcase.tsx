import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { InboxIcon, SearchIcon, PlusIcon, FolderIcon } from 'lucide-react';

export default function EmptyStateShowcase() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Empty State</CardTitle>
          <CardDescription>
            Helpful content when no data is available
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* No Messages */}
          <div className="text-center py-8">
            <InboxIcon className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No messages yet</h3>
            <p className="text-muted-foreground mb-4 max-w-sm mx-auto">
              When you receive messages, they'll appear here. Start a conversation to get things going.
            </p>
            <Button>
              <PlusIcon className="h-4 w-4 mr-2" />
              Send your first message
            </Button>
          </div>

          <div className="border-t pt-8">
            {/* No Search Results */}
            <div className="text-center py-8">
              <SearchIcon className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No results found</h3>
              <p className="text-muted-foreground mb-4 max-w-sm mx-auto">
                We couldn't find anything matching your search. Try different keywords or check your spelling.
              </p>
              <div className="flex gap-2 justify-center">
                <Button variant="outline">Clear search</Button>
                <Button>Browse all items</Button>
              </div>
            </div>
          </div>

          <div className="border-t pt-8">
            {/* No Files */}
            <div className="text-center py-8">
              <FolderIcon className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">This folder is empty</h3>
              <p className="text-muted-foreground mb-4 max-w-sm mx-auto">
                Upload files or create new folders to organize your content.
              </p>
              <div className="flex gap-2 justify-center">
                <Button variant="outline">
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Create folder
                </Button>
                <Button>
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Upload files
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}