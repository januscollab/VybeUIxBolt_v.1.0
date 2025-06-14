import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Copy, Figma, FileCode, Save, Printer, Undo, Redo, Scissors, Clipboard } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function MenubarShowcase() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Code example has been copied to your clipboard.",
    });
  };

  const codeExamples = {
    basic: `import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";

<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>New Tab</MenubarItem>
      <MenubarItem>New Window</MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Share</MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Print</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`,
    advanced: `<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>
        New Tab <MenubarShortcut>⌘T</MenubarShortcut>
      </MenubarItem>
      <MenubarItem>
        New Window <MenubarShortcut>⌘N</MenubarShortcut>
      </MenubarItem>
      <MenubarItem disabled>New Incognito Window</MenubarItem>
      <MenubarSeparator />
      <MenubarSub>
        <MenubarSubTrigger>Share</MenubarSubTrigger>
        <MenubarSubContent>
          <MenubarItem>Email link</MenubarItem>
          <MenubarItem>Messages</MenubarItem>
          <MenubarItem>Notes</MenubarItem>
        </MenubarSubContent>
      </MenubarSub>
      <MenubarSeparator />
      <MenubarItem>
        Print... <MenubarShortcut>⌘P</MenubarShortcut>
      </MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`
  };

  const handleMenuAction = (action: string) => {
    toast({
      title: "Menu Action",
      description: `${action} clicked`,
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Menubar</h1>
            <p className="text-lg text-muted-foreground">
              Application-style menu bar with dropdowns, shortcuts, and nested menus.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <a href="https://www.figma.com/design" target="_blank" rel="noopener noreferrer">
                <Figma className="h-4 w-4 mr-2" />
                Figma
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="#storybook" target="_blank" rel="noopener noreferrer">
                <FileCode className="h-4 w-4 mr-2" />
                Storybook
              </a>
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="default">Stable</Badge>
          <Badge variant="outline">Navigation</Badge>
          <Badge variant="outline">Menu</Badge>
        </div>
      </div>

      {/* Basic Menubar */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Menubar</CardTitle>
          <CardDescription>
            Simple menubar with multiple menu sections.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="flex justify-center">
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger>File</MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem onClick={() => handleMenuAction("New Tab")}>
                      New Tab
                    </MenubarItem>
                    <MenubarItem onClick={() => handleMenuAction("New Window")}>
                      New Window
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem onClick={() => handleMenuAction("Share")}>
                      Share
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem onClick={() => handleMenuAction("Print")}>
                      Print
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger>Edit</MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem onClick={() => handleMenuAction("Undo")}>
                      <Undo className="mr-2 h-4 w-4" />
                      Undo
                    </MenubarItem>
                    <MenubarItem onClick={() => handleMenuAction("Redo")}>
                      <Redo className="mr-2 h-4 w-4" />
                      Redo
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem onClick={() => handleMenuAction("Cut")}>
                      <Scissors className="mr-2 h-4 w-4" />
                      Cut
                    </MenubarItem>
                    <MenubarItem onClick={() => handleMenuAction("Copy")}>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy
                    </MenubarItem>
                    <MenubarItem onClick={() => handleMenuAction("Paste")}>
                      <Clipboard className="mr-2 h-4 w-4" />
                      Paste
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger>View</MenubarTrigger>
                  <MenubarContent>
                    <MenubarCheckboxItem checked>
                      Always Show Bookmarks Bar
                    </MenubarCheckboxItem>
                    <MenubarCheckboxItem>
                      Always Show Full URLs
                    </MenubarCheckboxItem>
                    <MenubarSeparator />
                    <MenubarItem>
                      Reload
                    </MenubarItem>
                    <MenubarItem disabled>
                      Force Reload
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>
                      Toggle Fullscreen
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Code Example</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.basic)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.basic}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Advanced Menubar */}
      <Card>
        <CardHeader>
          <CardTitle>Advanced Menubar</CardTitle>
          <CardDescription>
            Menubar with keyboard shortcuts, submenus, and radio groups.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="flex justify-center">
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger>File</MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>
                      New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>
                      New Window <MenubarShortcut>⌘N</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem disabled>
                      New Incognito Window
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarSub>
                      <MenubarSubTrigger>Share</MenubarSubTrigger>
                      <MenubarSubContent>
                        <MenubarItem>Email link</MenubarItem>
                        <MenubarItem>Messages</MenubarItem>
                        <MenubarItem>Notes</MenubarItem>
                      </MenubarSubContent>
                    </MenubarSub>
                    <MenubarSeparator />
                    <MenubarItem>
                      <Save className="mr-2 h-4 w-4" />
                      Save <MenubarShortcut>⌘S</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>
                      <Printer className="mr-2 h-4 w-4" />
                      Print... <MenubarShortcut>⌘P</MenubarShortcut>
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger>Edit</MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>
                      Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>
                      Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarSub>
                      <MenubarSubTrigger>Find</MenubarSubTrigger>
                      <MenubarSubContent>
                        <MenubarItem>Search the web</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>Find...</MenubarItem>
                        <MenubarItem>Find Next</MenubarItem>
                        <MenubarItem>Find Previous</MenubarItem>
                      </MenubarSubContent>
                    </MenubarSub>
                    <MenubarSeparator />
                    <MenubarItem>Cut</MenubarItem>
                    <MenubarItem>Copy</MenubarItem>
                    <MenubarItem>Paste</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger>View</MenubarTrigger>
                  <MenubarContent>
                    <MenubarCheckboxItem>Always Show Bookmarks Bar</MenubarCheckboxItem>
                    <MenubarCheckboxItem checked>
                      Always Show Full URLs
                    </MenubarCheckboxItem>
                    <MenubarSeparator />
                    <MenubarItem inset>
                      Reload <MenubarShortcut>⌘R</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem disabled inset>
                      Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem inset>Toggle Fullscreen</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem inset>Hide Sidebar</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger>Profiles</MenubarTrigger>
                  <MenubarContent>
                    <MenubarRadioGroup value="benoit">
                      <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
                      <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
                      <MenubarRadioItem value="Luis">Luis</MenubarRadioItem>
                    </MenubarRadioGroup>
                    <MenubarSeparator />
                    <MenubarItem inset>Edit...</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem inset>Add Profile...</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Advanced Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.advanced)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.advanced}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Application-style Menubar */}
      <Card>
        <CardHeader>
          <CardTitle>Application Style</CardTitle>
          <CardDescription>
            Full application menubar with comprehensive menu structure.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="space-y-4">
              <div className="text-center text-sm text-muted-foreground">
                Application Header with Menubar
              </div>
              <div className="border rounded-lg bg-background p-4">
                <Menubar className="border-none">
                  <MenubarMenu>
                    <MenubarTrigger className="font-bold">MyApp</MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem>About MyApp</MenubarItem>
                      <MenubarSeparator />
                      <MenubarItem>Preferences...</MenubarItem>
                      <MenubarSeparator />
                      <MenubarItem>Hide MyApp</MenubarItem>
                      <MenubarItem>Hide Others</MenubarItem>
                      <MenubarItem>Show All</MenubarItem>
                      <MenubarSeparator />
                      <MenubarItem>Quit MyApp</MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>
                  <MenubarMenu>
                    <MenubarTrigger>File</MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem>New</MenubarItem>
                      <MenubarItem>Open...</MenubarItem>
                      <MenubarSeparator />
                      <MenubarItem>Save</MenubarItem>
                      <MenubarItem>Save As...</MenubarItem>
                      <MenubarItem>Revert to Saved</MenubarItem>
                      <MenubarSeparator />
                      <MenubarItem>Page Setup...</MenubarItem>
                      <MenubarItem>Print...</MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>
                  <MenubarMenu>
                    <MenubarTrigger>Edit</MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem>Undo</MenubarItem>
                      <MenubarItem>Redo</MenubarItem>
                      <MenubarSeparator />
                      <MenubarItem>Cut</MenubarItem>
                      <MenubarItem>Copy</MenubarItem>
                      <MenubarItem>Paste</MenubarItem>
                      <MenubarItem>Paste and Match Style</MenubarItem>
                      <MenubarItem>Delete</MenubarItem>
                      <MenubarItem>Select All</MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>
                  <MenubarMenu>
                    <MenubarTrigger>Window</MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem>Minimize</MenubarItem>
                      <MenubarItem>Zoom</MenubarItem>
                      <MenubarSeparator />
                      <MenubarItem>Bring All to Front</MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>
                  <MenubarMenu>
                    <MenubarTrigger>Help</MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem>Welcome Guide</MenubarItem>
                      <MenubarItem>Keyboard Shortcuts</MenubarItem>
                      <MenubarSeparator />
                      <MenubarItem>Contact Support</MenubarItem>
                      <MenubarItem>Report a Bug</MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Implementation Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation Guidelines</CardTitle>
          <CardDescription>
            Best practices for menubar design and user experience.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Features</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Keyboard navigation support</li>
                <li>• Nested submenu support</li>
                <li>• Checkbox and radio items</li>
                <li>• Keyboard shortcuts display</li>
                <li>• Accessible menu structure</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Best Practices</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Follow platform conventions</li>
                <li>• Group related actions logically</li>
                <li>• Use separators for organization</li>
                <li>• Provide keyboard shortcuts</li>
                <li>• Keep menu depth reasonable</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}