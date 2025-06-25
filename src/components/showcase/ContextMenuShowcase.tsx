
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
} from "@/components/ui/context-menu";
import { Copy, Download, Edit, Share, Trash2, Eye, Star } from "lucide-react";

export default function ContextMenuShowcase() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">Context Menu</h1>
          <Badge variant="default">Stable</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Right-click activated menus that provide contextual actions and shortcuts.
        </p>
      </div>

      {/* Basic Context Menu */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Context Menu</CardTitle>
          <CardDescription>Right-click on the area below to see the context menu</CardDescription>
        </CardHeader>
        <CardContent>
          <ContextMenu>
            <ContextMenuTrigger asChild>
              <div className="flex h-32 w-full items-center justify-center rounded-md border border-dashed text-sm bg-muted/50 hover:bg-muted/70 transition-colors">
                Right-click here to open context menu
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-56">
              <ContextMenuItem className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                View
                <ContextMenuShortcut>⌘V</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem className="flex items-center gap-2">
                <Edit className="h-4 w-4" />
                Edit
                <ContextMenuShortcut>⌘E</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem className="flex items-center gap-2">
                <Copy className="h-4 w-4" />
                Copy
                <ContextMenuShortcut>⌘C</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem className="flex items-center gap-2">
                <Share className="h-4 w-4" />
                Share
              </ContextMenuItem>
              <ContextMenuItem className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Download
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem className="flex items-center gap-2 text-destructive">
                <Trash2 className="h-4 w-4" />
                Delete
                <ContextMenuShortcut>⌘⌫</ContextMenuShortcut>
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </CardContent>
      </Card>

      {/* Advanced Context Menu with Submenus */}
      <Card>
        <CardHeader>
          <CardTitle>Advanced Context Menu</CardTitle>
          <CardDescription>Context menu with nested submenus and grouped actions</CardDescription>
        </CardHeader>
        <CardContent>
          <ContextMenu>
            <ContextMenuTrigger asChild>
              <div className="flex h-32 w-full items-center justify-center rounded-md border border-dashed text-sm bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-colors">
                Right-click for advanced context menu
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-56">
              <ContextMenuItem className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Quick View
                <ContextMenuShortcut>Space</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuSub>
                <ContextMenuSubTrigger className="flex items-center gap-2">
                  <Share className="h-4 w-4" />
                  Share
                </ContextMenuSubTrigger>
                <ContextMenuSubContent className="w-48">
                  <ContextMenuItem>Email Link</ContextMenuItem>
                  <ContextMenuItem>Copy Link</ContextMenuItem>
                  <ContextMenuItem>Share to Social</ContextMenuItem>
                </ContextMenuSubContent>
              </ContextMenuSub>
              <ContextMenuSub>
                <ContextMenuSubTrigger className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </ContextMenuSubTrigger>
                <ContextMenuSubContent className="w-48">
                  <ContextMenuItem>Export as PDF</ContextMenuItem>
                  <ContextMenuItem>Export as PNG</ContextMenuItem>
                  <ContextMenuItem>Export as SVG</ContextMenuItem>
                </ContextMenuSubContent>
              </ContextMenuSub>
              <ContextMenuSeparator />
              <ContextMenuItem className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                Add to Favorites
              </ContextMenuItem>
              <ContextMenuItem className="flex items-center gap-2">
                <Edit className="h-4 w-4" />
                Rename
                <ContextMenuShortcut>F2</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem className="flex items-center gap-2 text-destructive">
                <Trash2 className="h-4 w-4" />
                Move to Trash
                <ContextMenuShortcut>⌘⌫</ContextMenuShortcut>
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </CardContent>
      </Card>

      {/* Usage Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Guidelines</CardTitle>
          <CardDescription>Best practices for implementing context menus</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-success">Best Practices</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Keep menu items contextually relevant</li>
                <li>• Use keyboard shortcuts when applicable</li>
                <li>• Group related actions with separators</li>
                <li>• Provide clear visual hierarchy</li>
                <li>• Include destructive actions at the bottom</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-warning">Accessibility</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Support keyboard navigation</li>
                <li>• Provide alternative access methods</li>
                <li>• Use clear, descriptive labels</li>
                <li>• Ensure sufficient color contrast</li>
                <li>• Test with screen readers</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
