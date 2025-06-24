import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Search, Code, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

// Import commonly used Lucide icons for the showcase
import {
  Home, User, Settings, Mail, Phone, Calendar, Clock, Download, Upload, Save,
  Edit, Delete, Plus, Minus, Check, X, ChevronLeft, ChevronRight,
  ArrowLeft, ArrowRight, ArrowUp, ArrowDown, Bell, Heart, Star, Share, Filter, Grid,
  List, Map, Camera, Image, Video, Music, File, Folder, Link, Lock, Unlock, Eye, EyeOff,
  Search as SearchIcon, RefreshCw, MoreHorizontal, MoreVertical, Menu, ShoppingCart, CreditCard,
  DollarSign, TrendingUp, TrendingDown, Activity, BarChart, PieChart, Zap, Lightbulb,
  Palette, Brush, Type, Layers, Move, RotateCcw, Maximize, Minimize, Monitor, Smartphone,
  Tablet, Wifi, Bluetooth, Battery, Volume2, VolumeX, PlayCircle, PauseCircle, StopCircle,
  SkipBack, SkipForward, Repeat, Shuffle, MessageCircle, Send, Paperclip, Bookmark,
  Tag, Flag, Globe, Users, UserPlus, UserMinus, Shield, Award, Gift, Coffee, Briefcase
} from "lucide-react";

export default function IconSystemComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showUsageExamples, setShowUsageExamples] = useState(false);
  const [showGuidelines, setShowGuidelines] = useState(false);

  const iconCategories = [
    {
      name: "Navigation",
      icons: [
        { name: "Home", component: Home, usage: "Main navigation, homepage links" },
        { name: "ArrowLeft", component: ArrowLeft, usage: "Back navigation, previous" },
        { name: "ArrowRight", component: ArrowRight, usage: "Forward navigation, next" },
        { name: "ChevronLeft", component: ChevronLeft, usage: "Carousel previous, collapse" },
        { name: "ChevronRight", component: ChevronRight, usage: "Carousel next, expand" },
        { name: "Menu", component: Menu, usage: "Mobile menu toggle, hamburger" },
        { name: "Search", component: SearchIcon, usage: "Search functionality" },
        { name: "Filter", component: Filter, usage: "Filter controls, sorting" },
      ]
    },
    {
      name: "Actions",
      icons: [
        { name: "Plus", component: Plus, usage: "Add new items, create actions" },
        { name: "Edit", component: Edit, usage: "Edit content, modify data" },
        { name: "Delete", component: Delete, usage: "Remove items, delete actions" },
        { name: "Save", component: Save, usage: "Save changes, persist data" },
        { name: "Copy", component: Copy, usage: "Copy to clipboard, duplicate" },
        { name: "Share", component: Share, usage: "Share content, social actions" },
        { name: "Download", component: Download, usage: "Download files, export" },
        { name: "Upload", component: Upload, usage: "Upload files, import" },
      ]
    },
    {
      name: "Interface",
      icons: [
        { name: "Check", component: Check, usage: "Success states, confirmations" },
        { name: "X", component: X, usage: "Close dialogs, error states" },
        { name: "Bell", component: Bell, usage: "Notifications, alerts" },
        { name: "Settings", component: Settings, usage: "Configuration, preferences" },
        { name: "MoreHorizontal", component: MoreHorizontal, usage: "Context menus, options" },
        { name: "Eye", component: Eye, usage: "Show password, view details" },
        { name: "EyeOff", component: EyeOff, usage: "Hide password, hide content" },
        { name: "Lock", component: Lock, usage: "Secure content, private items" },
      ]
    },
    {
      name: "Content",
      icons: [
        { name: "Image", component: Image, usage: "Image uploads, gallery" },
        { name: "Video", component: Video, usage: "Video content, media player" },
        { name: "File", component: File, usage: "Documents, file attachments" },
        { name: "Folder", component: Folder, usage: "File organization, directories" },
        { name: "Link", component: Link, usage: "External links, URLs" },
        { name: "Mail", component: Mail, usage: "Email, messages" },
        { name: "MessageCircle", component: MessageCircle, usage: "Chat, comments" },
        { name: "Calendar", component: Calendar, usage: "Dates, scheduling" },
      ]
    },
    {
      name: "Data & Analytics",
      icons: [
        { name: "BarChart", component: BarChart, usage: "Data visualization, statistics" },
        { name: "PieChart", component: PieChart, usage: "Distribution charts, percentages" },
        { name: "TrendingUp", component: TrendingUp, usage: "Growth, positive trends" },
        { name: "TrendingDown", component: TrendingDown, usage: "Decline, negative trends" },
        { name: "Activity", component: Activity, usage: "Real-time data, monitoring" },
        { name: "Zap", component: Zap, usage: "Automation, workflows, energy" },
        { name: "DollarSign", component: DollarSign, usage: "Pricing, revenue, financial" },
        { name: "Award", component: Award, usage: "Achievements, recognition" },
      ]
    },
    {
      name: "User & Social",
      icons: [
        { name: "User", component: User, usage: "Profile, account, individual user" },
        { name: "Users", component: Users, usage: "Teams, groups, multiple users" },
        { name: "UserPlus", component: UserPlus, usage: "Invite users, add team members" },
        { name: "Heart", component: Heart, usage: "Favorites, likes, loved items" },
        { name: "Star", component: Star, usage: "Ratings, featured content" },
        { name: "Shield", component: Shield, usage: "Security, protection, admin" },
        { name: "Globe", component: Globe, usage: "Public, worldwide, internet" },
        { name: "Briefcase", component: Briefcase, usage: "Business, work, professional" },
      ]
    }
  ];

  const iconSizes = [
    { name: "Extra Small", class: "h-3 w-3", size: "12px", usage: "Inline text, badges" },
    { name: "Small", class: "h-4 w-4", size: "16px", usage: "Buttons, form inputs" },
    { name: "Medium", class: "h-5 w-5", size: "20px", usage: "Navigation, cards" },
    { name: "Large", class: "h-6 w-6", size: "24px", usage: "Headers, prominent actions" },
    { name: "Extra Large", class: "h-8 w-8", size: "32px", usage: "Feature highlights, empty states" },
    { name: "2X Large", class: "h-10 w-10", size: "40px", usage: "Hero sections, illustrations" },
  ];

  const copyIconCode = (iconName: string) => {
    const code = `import { ${iconName} } from "lucide-react";\n\n<${iconName} className="h-4 w-4" />`;
    navigator.clipboard.writeText(code);
    toast({
      title: "Copied to clipboard",
      description: `${iconName} component code copied.`,
    });
  };

  const filteredCategories = iconCategories.map(category => ({
    ...category,
    icons: category.icons.filter(icon => 
      icon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      icon.usage.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.icons.length > 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">Icon System</h1>
          <Badge variant="default">Stable</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Comprehensive icon system using Lucide React icons with consistent sizing and semantic usage patterns.
        </p>
      </div>

      {/* Search */}
      <div className="space-y-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search icons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Icon Sizes */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Icon Sizes</h2>
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {iconSizes.map((size) => (
                <div key={size.name} className="text-center space-y-3">
                  <div className="flex justify-center">
                    <div className="bg-muted rounded-lg p-4 flex items-center justify-center">
                      <Home className={size.class} />
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-sm">{size.name}</div>
                    <div className="text-xs text-muted-foreground">{size.size}</div>
                    <code className="text-xs bg-muted px-1 py-0.5 rounded">{size.class}</code>
                  </div>
                  <div className="text-xs text-muted-foreground">{size.usage}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Icon Categories */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Icon Library</h2>
        {filteredCategories.map((category) => (
          <div key={category.name} className="space-y-4">
            <h3 className="text-lg font-medium">{category.name}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {category.icons.map((icon) => {
                const IconComponent = icon.component;
                return (
                  <Card key={icon.name} className="group hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="bg-muted rounded-lg p-3 flex items-center justify-center">
                            <IconComponent className="h-5 w-5" />
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyIconCode(icon.name)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                        <div>
                          <div className="font-medium text-sm">{icon.name}</div>
                          <div className="text-xs text-muted-foreground">{icon.usage}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Usage Examples */}
      <Collapsible open={showUsageExamples} onOpenChange={setShowUsageExamples}>
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            <div className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              Usage Examples
            </div>
            {showUsageExamples ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Button with Icon</CardTitle>
                <CardDescription>Icons in interactive elements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create New
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Status Indicators</CardTitle>
                <CardDescription>Icons for system states</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-success">
                    <Check className="h-4 w-4" />
                    <span className="text-sm">Task completed</span>
                  </div>
                  <div className="flex items-center gap-2 text-warning">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">In progress</span>
                  </div>
                  <div className="flex items-center gap-2 text-destructive">
                    <X className="h-4 w-4" />
                    <span className="text-sm">Failed</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Guidelines */}
      <Collapsible open={showGuidelines} onOpenChange={setShowGuidelines}>
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            <div className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              Icon Guidelines
            </div>
            {showGuidelines ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Icon Guidelines</CardTitle>
              <CardDescription>Best practices for consistent icon usage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium text-success">Best Practices</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Use consistent sizing throughout your interface</li>
                    <li>• Choose icons with similar visual weight</li>
                    <li>• Provide text labels for accessibility</li>
                    <li>• Use semantic meaning consistently</li>
                    <li>• Test icon clarity at small sizes</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium text-warning">Accessibility</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Include aria-labels for standalone icons</li>
                    <li>• Ensure sufficient color contrast</li>
                    <li>• Don't rely solely on icons for meaning</li>
                    <li>• Use role="img" for decorative icons</li>
                    <li>• Test with screen readers</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
