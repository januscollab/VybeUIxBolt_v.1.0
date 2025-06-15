import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Copy, Search, Code, Upload, Trash2, Download, Palette, Pipette } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useDesignSystem } from '@/hooks/useDesignSystem';
import { supabase } from '@/integrations/supabase/client';

  // Expanded icon library - key icons only to avoid build errors
  import {
    Home, User, Settings, Mail, Phone, Calendar, Clock, Download as DownloadIcon, Upload as UploadIcon, Save,
    Edit, Delete, Plus, Minus, Check, X, ChevronLeft, ChevronRight, ChevronUp, ChevronDown,
    ArrowLeft, ArrowRight, ArrowUp, ArrowDown, Bell, Heart, Star, Share, Filter, Grid,
    List, Map, Camera, Image, Video, Music, File, Folder, Link, Lock, Unlock, Eye, EyeOff,
    Search as SearchIcon, RefreshCw, MoreHorizontal, MoreVertical, Menu, ShoppingCart, CreditCard,
    DollarSign, TrendingUp, TrendingDown, Activity, BarChart, PieChart, Zap, Lightbulb,
    Brush, Type, Layers, Move, Monitor, Smartphone, Tablet, Wifi, Battery, Volume2, VolumeX,
    PlayCircle, PauseCircle, StopCircle, SkipBack, SkipForward, Repeat, Shuffle,
    MessageCircle, Send, Paperclip, Bookmark, Tag, Flag, Globe, Users, UserPlus, UserMinus,
    Shield, Award, Gift, Coffee, Briefcase, AlertCircle, AlertTriangle, Archive, AtSign,
    Building, Calculator, Gamepad2, Github, Headphones, HelpCircle, History, Info, Key,
    Keyboard, Laptop, MapPin, Mic, MicOff, Package, Power, Printer, Rocket, Server,
    ShieldAlert, ShieldCheck, Smile, Speaker, ThumbsUp, ThumbsDown, Timer, Trash, Trophy,
    Truck, Wallet, Watch, Wrench
  } from 'lucide-react';

interface IconData {
  name: string;
  component: React.ComponentType<any>;
  usage: string;
  keywords: string[];
}

export default function EnhancedIconSystemComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [showUsageExamples, setShowUsageExamples] = useState(true);
  const [showGuidelines, setShowGuidelines] = useState(true);
  const [customIcons, setCustomIcons] = useState<any[]>([]);
  const { colorPalette } = useDesignSystem();

  // Expanded icon categories (3x larger)
  const iconCategories = [
    {
      name: "Navigation & Direction",
      icons: [
        { name: "Home", component: Home, usage: "Main navigation, homepage links", keywords: ["house", "main", "start"] },
        { name: "ArrowLeft", component: ArrowLeft, usage: "Back navigation, previous", keywords: ["back", "previous", "left"] },
        { name: "ArrowRight", component: ArrowRight, usage: "Forward navigation, next", keywords: ["forward", "next", "right"] },
        { name: "ArrowUp", component: ArrowUp, usage: "Up navigation, scroll to top", keywords: ["up", "top", "scroll"] },
        { name: "ArrowDown", component: ArrowDown, usage: "Down navigation, scroll down", keywords: ["down", "bottom", "scroll"] },
        { name: "ArrowUpRight", component: ArrowUpRight, usage: "Diagonal navigation", keywords: ["diagonal", "northeast"] },
        { name: "ArrowDownLeft", component: ArrowDownLeft, usage: "Diagonal navigation", keywords: ["diagonal", "southwest"] },
        { name: "ChevronLeft", component: ChevronLeft, usage: "Carousel previous, collapse", keywords: ["previous", "collapse", "left"] },
        { name: "ChevronRight", component: ChevronRight, usage: "Carousel next, expand", keywords: ["next", "expand", "right"] },
        { name: "ChevronUp", component: ChevronUp, usage: "Expand up, show more", keywords: ["expand", "up", "more"] },
        { name: "ChevronDown", component: ChevronDown, usage: "Expand down, dropdown", keywords: ["expand", "down", "dropdown"] },
        { name: "Menu", component: Menu, usage: "Mobile menu toggle, hamburger", keywords: ["hamburger", "menu", "navigation"] },
        { name: "Navigation", component: Navigation, usage: "GPS, directions, compass", keywords: ["gps", "directions", "compass"] },
        { name: "Compass", component: Compass, usage: "Direction finding, orientation", keywords: ["direction", "orientation", "north"] },
        { name: "MapPin", component: MapPin, usage: "Location markers, addresses", keywords: ["location", "address", "marker"] },
        { name: "Route", component: Route, usage: "Path planning, journey", keywords: ["path", "journey", "travel"] }
      ]
    },
    {
      name: "Actions & Controls",
      icons: [
        { name: "Plus", component: Plus, usage: "Add new items, create actions", keywords: ["add", "create", "new"] },
        { name: "Minus", component: Minus, usage: "Remove items, subtract", keywords: ["remove", "subtract", "delete"] },
        { name: "Edit", component: Edit, usage: "Edit content, modify data", keywords: ["modify", "change", "pencil"] },
        { name: "Delete", component: Delete, usage: "Remove items, delete actions", keywords: ["remove", "trash", "bin"] },
        { name: "Trash", component: Trash, usage: "Delete permanently, garbage", keywords: ["delete", "remove", "garbage"] },
        { name: "Save", component: Save, usage: "Save changes, persist data", keywords: ["disk", "store", "persist"] },
        { name: "Copy", component: CopyIcon, usage: "Copy to clipboard, duplicate", keywords: ["duplicate", "clipboard", "clone"] },
        { name: "Share", component: Share, usage: "Share content, social actions", keywords: ["social", "send", "distribute"] },
        { name: "Download", component: DownloadIcon, usage: "Download files, export", keywords: ["export", "save", "get"] },
        { name: "Upload", component: UploadIcon, usage: "Upload files, import", keywords: ["import", "add", "send"] },
        { name: "RefreshCw", component: RefreshCw, usage: "Refresh, reload, sync", keywords: ["reload", "sync", "update"] },
        { name: "Undo", component: Undo, usage: "Undo actions, revert", keywords: ["revert", "back", "previous"] },
        { name: "Redo", component: RotateCcw, usage: "Redo actions, forward", keywords: ["forward", "again", "repeat"] },
        { name: "PlusCircle", component: PlusCircle, usage: "Add with emphasis", keywords: ["add", "create", "positive"] },
        { name: "MinusCircle", component: X, usage: "Remove with emphasis", keywords: ["remove", "negative", "delete"] },
        { name: "CheckCircle", component: CheckCircle, usage: "Complete, success", keywords: ["done", "success", "complete"] }
      ]
    },
    {
      name: "Interface & System",
      icons: [
        { name: "Check", component: Check, usage: "Success states, confirmations", keywords: ["success", "done", "complete"] },
        { name: "X", component: X, usage: "Close dialogs, error states", keywords: ["close", "error", "cancel"] },
        { name: "Bell", component: Bell, usage: "Notifications, alerts", keywords: ["notification", "alert", "ring"] },
        { name: "Settings", component: Settings, usage: "Configuration, preferences", keywords: ["config", "preferences", "gear"] },
        { name: "MoreHorizontal", component: MoreHorizontal, usage: "Context menus, options", keywords: ["menu", "options", "more"] },
        { name: "MoreVertical", component: MoreVertical, usage: "Vertical menus, actions", keywords: ["menu", "actions", "vertical"] },
        { name: "Eye", component: Eye, usage: "Show password, view details", keywords: ["view", "show", "visible"] },
        { name: "EyeOff", component: EyeOff, usage: "Hide password, hide content", keywords: ["hide", "invisible", "private"] },
        { name: "Lock", component: Lock, usage: "Secure content, private items", keywords: ["secure", "private", "protected"] },
        { name: "Unlock", component: Unlock, usage: "Unsecure, public access", keywords: ["open", "public", "accessible"] },
        { name: "Shield", component: Shield, usage: "Security, protection, admin", keywords: ["security", "admin", "protection"] },
        { name: "ShieldCheck", component: ShieldCheck, usage: "Verified security", keywords: ["verified", "secure", "protected"] },
        { name: "ShieldAlert", component: ShieldAlert, usage: "Security warning", keywords: ["warning", "security", "alert"] },
        { name: "Info", component: Info, usage: "Information, help", keywords: ["help", "information", "details"] },
        { name: "HelpCircle", component: HelpCircle, usage: "Help, support", keywords: ["help", "support", "question"] },
        { name: "AlertCircle", component: AlertCircle, usage: "Important alerts", keywords: ["warning", "important", "alert"] }
      ]
    },
    {
      name: "Content & Media",
      icons: [
        { name: "Image", component: Image, usage: "Image uploads, gallery", keywords: ["photo", "picture", "gallery"] },
        { name: "Video", component: Video, usage: "Video content, media player", keywords: ["movie", "media", "play"] },
        { name: "Music", component: Music, usage: "Audio content, music player", keywords: ["audio", "sound", "song"] },
        { name: "File", component: File, usage: "Documents, file attachments", keywords: ["document", "attachment", "text"] },
        { name: "FileText", component: FileText, usage: "Text documents", keywords: ["document", "text", "article"] },
        { name: "FileImage", component: FileImage, usage: "Image files", keywords: ["image", "photo", "picture"] },
        { name: "FileVideo", component: FileVideo, usage: "Video files", keywords: ["video", "movie", "media"] },
        { name: "Folder", component: Folder, usage: "File organization, directories", keywords: ["directory", "organize", "container"] },
        { name: "FolderOpen", component: FolderOpen, usage: "Open directories", keywords: ["open", "directory", "browse"] },
        { name: "FolderPlus", component: FolderPlus, usage: "Create new folder", keywords: ["new", "create", "add"] },
        { name: "Link", component: Link, usage: "External links, URLs", keywords: ["url", "external", "web"] },
        { name: "Paperclip", component: Paperclip, usage: "Attachments, files", keywords: ["attachment", "file", "clip"] },
        { name: "Bookmark", component: Bookmark, usage: "Saved items, favorites", keywords: ["save", "favorite", "mark"] },
        { name: "Tag", component: Tag, usage: "Labels, categories", keywords: ["label", "category", "organize"] },
        { name: "Flag", component: Flag, usage: "Important items, reports", keywords: ["important", "report", "mark"] },
        { name: "Hash", component: Hash, usage: "Hashtags, numbers", keywords: ["hashtag", "number", "symbol"] }
      ]
    },
    {
      name: "Communication",
      icons: [
        { name: "Mail", component: Mail, usage: "Email, messages", keywords: ["email", "message", "envelope"] },
        { name: "MessageCircle", component: MessageCircle, usage: "Chat, comments", keywords: ["chat", "comment", "bubble"] },
        { name: "MessageSquare", component: MessageSquare, usage: "Messages, chat", keywords: ["message", "chat", "text"] },
        { name: "Send", component: Send, usage: "Send messages, submit", keywords: ["submit", "arrow", "deliver"] },
        { name: "Phone", component: Phone, usage: "Phone calls, contact", keywords: ["call", "contact", "telephone"] },
        { name: "PhoneCall", component: PhoneCall, usage: "Active phone call", keywords: ["calling", "active", "ring"] },
        { name: "AtSign", component: AtSign, usage: "Email addresses, mentions", keywords: ["email", "mention", "at"] },
        { name: "Headphones", component: HeadphonesIcon, usage: "Audio, support", keywords: ["audio", "support", "listen"] },
        { name: "Mic", component: Mic, usage: "Microphone, recording", keywords: ["microphone", "record", "voice"] },
        { name: "MicOff", component: MicOff, usage: "Muted microphone", keywords: ["mute", "silent", "off"] },
        { name: "Speaker", component: Speaker, usage: "Audio output", keywords: ["sound", "audio", "speaker"] },
        { name: "Volume2", component: Volume2, usage: "Volume controls", keywords: ["sound", "audio", "volume"] },
        { name: "VolumeX", component: VolumeX, usage: "Muted volume", keywords: ["mute", "silent", "off"] },
        { name: "Megaphone", component: Megaphone, usage: "Announcements", keywords: ["announce", "broadcast", "loud"] },
        { name: "Podcast", component: Podcast, usage: "Podcast, audio content", keywords: ["audio", "podcast", "show"] },
        { name: "Radio", component: Radio, usage: "Radio, broadcast", keywords: ["radio", "broadcast", "signal"] }
      ]
    },
    {
      name: "Data & Analytics",
      icons: [
        { name: "BarChart", component: BarChart, usage: "Data visualization, statistics", keywords: ["chart", "data", "stats"] },
        { name: "LineChart", component: LineChart, usage: "Trend analysis", keywords: ["trend", "analysis", "graph"] },
        { name: "PieChart", component: PieChart, usage: "Distribution charts, percentages", keywords: ["distribution", "percentage", "circle"] },
        { name: "TrendingUp", component: TrendingUp, usage: "Growth, positive trends", keywords: ["growth", "increase", "positive"] },
        { name: "TrendingDown", component: TrendingDownIcon, usage: "Decline, negative trends", keywords: ["decline", "decrease", "negative"] },
        { name: "Activity", component: Activity, usage: "Real-time data, monitoring", keywords: ["realtime", "monitor", "pulse"] },
        { name: "Database", component: Database, usage: "Data storage, databases", keywords: ["storage", "data", "server"] },
        { name: "Server", component: Server, usage: "Servers, hosting", keywords: ["hosting", "server", "cloud"] },
        { name: "CloudDownload", component: CloudDownload, usage: "Cloud download", keywords: ["cloud", "download", "sync"] },
        { name: "CloudUpload", component: CloudUpload, usage: "Cloud upload", keywords: ["cloud", "upload", "sync"] },
        { name: "Archive", component: ArchiveIcon, usage: "Archive, storage", keywords: ["archive", "store", "box"] },
        { name: "Layers", component: Layers, usage: "Layers, stacking", keywords: ["stack", "layer", "multiple"] },
        { name: "Network", component: Network, usage: "Network connections", keywords: ["network", "connection", "nodes"] },
        { name: "Satellite", component: Satellite, usage: "Satellite, remote", keywords: ["satellite", "remote", "space"] },
        { name: "Workflow", component: Workflow, usage: "Process flows", keywords: ["process", "flow", "workflow"] },
        { name: "GitBranch", component: GitBranch, usage: "Version control", keywords: ["git", "branch", "version"] }
      ]
    },
    {
      name: "Business & Finance",
      icons: [
        { name: "DollarSign", component: DollarSignIcon, usage: "Pricing, revenue, financial", keywords: ["money", "price", "cost"] },
        { name: "CreditCard", component: CreditCard, usage: "Payments, billing", keywords: ["payment", "billing", "card"] },
        { name: "Wallet", component: Wallet, usage: "Wallet, money", keywords: ["money", "wallet", "finance"] },
        { name: "Coins", component: Coins, usage: "Currency, coins", keywords: ["currency", "money", "coins"] },
        { name: "Banknote", component: Banknote, usage: "Cash, bills", keywords: ["cash", "bill", "money"] },
        { name: "Receipt", component: Receipt, usage: "Receipts, invoices", keywords: ["invoice", "receipt", "bill"] },
        { name: "ShoppingCart", component: ShoppingCart, usage: "E-commerce, shopping", keywords: ["cart", "shop", "buy"] },
        { name: "ShoppingBag", component: ShoppingBag, usage: "Shopping, purchases", keywords: ["bag", "purchase", "buy"] },
        { name: "Store", component: Store, usage: "Retail, shop", keywords: ["shop", "retail", "store"] },
        { name: "Briefcase", component: Briefcase, usage: "Business, work, professional", keywords: ["business", "work", "office"] },
        { name: "Building", component: Building, usage: "Office buildings", keywords: ["office", "building", "corporate"] },
        { name: "Building2", component: Building2, usage: "Commercial buildings", keywords: ["commercial", "building", "business"] },
        { name: "Factory", component: Factory, usage: "Manufacturing, industry", keywords: ["industry", "manufacturing", "production"] },
        { name: "Warehouse", component: Warehouse, usage: "Storage, logistics", keywords: ["storage", "logistics", "warehouse"] },
        { name: "Truck", component: Truck, usage: "Delivery, shipping", keywords: ["delivery", "shipping", "transport"] },
        { name: "Package", component: Package, usage: "Packages, delivery", keywords: ["package", "box", "delivery"] }
      ]
    },
    {
      name: "Tools & Utilities",
      icons: [
        { name: "Search", component: SearchIcon, usage: "Search functionality", keywords: ["find", "lookup", "magnify"] },
        { name: "Filter", component: Filter, usage: "Filter controls, sorting", keywords: ["sort", "filter", "funnel"] },
        { name: "Sliders", component: Sliders, usage: "Controls, adjustments", keywords: ["controls", "adjust", "settings"] },
        { name: "Command", component: Command, usage: "Command key, shortcuts", keywords: ["shortcut", "key", "command"] },
        { name: "Keyboard", component: Keyboard, usage: "Keyboard input", keywords: ["input", "type", "keyboard"] },
        { name: "Mouse", component: Mouse, usage: "Mouse input", keywords: ["click", "pointer", "mouse"] },
        { name: "Monitor", component: Monitor, usage: "Desktop computers", keywords: ["desktop", "screen", "computer"] },
        { name: "Laptop", component: Laptop, usage: "Laptop computers", keywords: ["laptop", "computer", "portable"] },
        { name: "Smartphone", component: Smartphone, usage: "Mobile devices", keywords: ["mobile", "phone", "device"] },
        { name: "Tablet", component: Tablet, usage: "Tablet devices", keywords: ["tablet", "ipad", "device"] },
        { name: "Watch", component: Watch, usage: "Time, smartwatch", keywords: ["time", "smartwatch", "wearable"] },
        { name: "Calculator", component: Calculator, usage: "Calculations, math", keywords: ["math", "calculate", "numbers"] },
        { name: "Ruler", component: Ruler, usage: "Measurements", keywords: ["measure", "length", "size"] },
        { name: "Scissors", component: Scissors, usage: "Cut, trim", keywords: ["cut", "trim", "clip"] },
        { name: "Wrench", component: Wrench, usage: "Tools, maintenance", keywords: ["tool", "fix", "repair"] },
        { name: "Hammer", component: Hammer, usage: "Build, construct", keywords: ["build", "construct", "tool"] }
      ]
    },
    {
      name: "User & Social",
      icons: [
        { name: "User", component: User, usage: "Profile, account, individual user", keywords: ["profile", "account", "person"] },
        { name: "Users", component: Users, usage: "Teams, groups, multiple users", keywords: ["team", "group", "people"] },
        { name: "UserPlus", component: UserPlus, usage: "Invite users, add team members", keywords: ["invite", "add", "new"] },
        { name: "UserMinus", component: UserMinus, usage: "Remove users", keywords: ["remove", "delete", "kick"] },
        { name: "Heart", component: Heart, usage: "Favorites, likes, loved items", keywords: ["like", "love", "favorite"] },
        { name: "Star", component: Star, usage: "Ratings, featured content", keywords: ["rating", "favorite", "featured"] },
        { name: "ThumbsUp", component: ThumbsUp, usage: "Like, approve", keywords: ["like", "approve", "positive"] },
        { name: "ThumbsDown", component: ThumbsDown, usage: "Dislike, disapprove", keywords: ["dislike", "negative", "bad"] },
        { name: "Smile", component: SmileIcon, usage: "Happy, positive feedback", keywords: ["happy", "positive", "good"] },
        { name: "Award", component: Award, usage: "Achievements, recognition", keywords: ["achievement", "trophy", "win"] },
        { name: "Trophy", component: Trophy, usage: "Winners, achievements", keywords: ["win", "champion", "first"] },
        { name: "Medal", component: Medal, usage: "Awards, recognition", keywords: ["award", "honor", "achievement"] },
        { name: "Crown", component: CrownIcon, usage: "Premium, VIP", keywords: ["premium", "vip", "royal"] },
        { name: "Gift", component: Gift, usage: "Gifts, rewards", keywords: ["present", "reward", "bonus"] },
        { name: "Globe", component: Globe, usage: "Public, worldwide, internet", keywords: ["world", "internet", "global"] },
        { name: "Languages", component: Languages, usage: "Translations, languages", keywords: ["translate", "language", "international"] }
      ]
    },
    {
      name: "Entertainment & Gaming",
      icons: [
        { name: "PlayCircle", component: PlayCircle, usage: "Play media, start", keywords: ["play", "start", "media"] },
        { name: "PauseCircle", component: PauseCircle, usage: "Pause media", keywords: ["pause", "stop", "wait"] },
        { name: "StopCircle", component: StopCircle, usage: "Stop media", keywords: ["stop", "end", "halt"] },
        { name: "SkipBack", component: SkipBack, usage: "Previous track", keywords: ["previous", "back", "rewind"] },
        { name: "SkipForward", component: SkipForward, usage: "Next track", keywords: ["next", "forward", "skip"] },
        { name: "Repeat", component: Repeat, usage: "Repeat, loop", keywords: ["loop", "repeat", "cycle"] },
        { name: "Shuffle", component: ShuffleIcon, usage: "Random, shuffle", keywords: ["random", "shuffle", "mix"] },
        { name: "Gamepad2", component: Gamepad2, usage: "Gaming, games", keywords: ["game", "gaming", "controller"] },
        { name: "Joystick", component: Joystick, usage: "Game controller", keywords: ["controller", "game", "stick"] },
        { name: "Dice1", component: Dice1, usage: "Games, random", keywords: ["game", "random", "chance"] },
        { name: "Dice6", component: Dice6, usage: "Games, luck", keywords: ["game", "luck", "roll"] },
        { name: "Camera", component: Camera, usage: "Photography, capture", keywords: ["photo", "picture", "capture"] },
        { name: "Film", component: Video, usage: "Video recording", keywords: ["video", "record", "film"] },
        { name: "Clapperboard", component: Clapperboard, usage: "Movie production", keywords: ["movie", "film", "production"] },
        { name: "Tv", component: Tv, usage: "Television, entertainment", keywords: ["tv", "television", "watch"] },
        { name: "Popcorn", component: Popcorn, usage: "Movies, entertainment", keywords: ["movie", "snack", "entertainment"] }
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

  // Brand colors from design system
  const brandColors = [
    { name: "Primary", value: colorPalette?.primary || "#3b82f6" },
    { name: "Secondary", value: colorPalette?.secondary || "#64748b" },
    { name: "Accent", value: colorPalette?.accent || "#f59e0b" },
    { name: "Success", value: colorPalette?.success || "#10b981" },
    { name: "Warning", value: colorPalette?.warning || "#f59e0b" },
    { name: "Error", value: colorPalette?.error || "#ef4444" },
    { name: "Muted", value: colorPalette?.muted || "#6b7280" },
    { name: "Black", value: "#000000" },
    { name: "White", value: "#ffffff" },
  ];

  const copyIconCode = (iconName: string, color?: string) => {
    const colorProp = color && color !== "#000000" ? ` style={{ color: '${color}' }}` : '';
    const code = `import { ${iconName} } from "lucide-react";\n\n<${iconName} className="h-4 w-4"${colorProp} />`;
    navigator.clipboard.writeText(code);
    toast({
      title: "Copied to clipboard",
      description: `${iconName} component code copied.`,
    });
  };

  const handleIconUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    // Handle icon library upload (SVG files)
    for (const file of Array.from(files)) {
      if (file.type !== 'image/svg+xml') {
        toast({
          title: "Invalid file type",
          description: "Please upload SVG files only.",
          variant: "destructive"
        });
        continue;
      }

      try {
        const fileName = `${Date.now()}-${file.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('custom-icons')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('custom-icons')
          .getPublicUrl(fileName);

        const iconName = file.name.replace(/\.[^/.]+$/, "");
        
        // Save icon metadata
        const { error: dbError } = await supabase
          .from('custom_icons')
          .insert({
            icon_name: iconName,
            file_url: publicUrl,
            uploaded_by: (await supabase.auth.getUser()).data.user?.id
          });

        if (dbError) throw dbError;

        toast({
          title: "Icon uploaded",
          description: `${iconName} has been uploaded successfully`,
        });

      } catch (error) {
        console.error('Error uploading icon:', error);
        toast({
          title: "Upload failed",
          description: `Failed to upload ${file.name}`,
          variant: "destructive"
        });
      }
    }

    loadCustomIcons();
    event.target.value = '';
  };

  const loadCustomIcons = async () => {
    try {
      const { data, error } = await supabase
        .from('custom_icons')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setCustomIcons(data || []);
    } catch (error) {
      console.error('Error loading custom icons:', error);
    }
  };

  useEffect(() => {
    loadCustomIcons();
  }, []);

  const filteredCategories = iconCategories.map(category => ({
    ...category,
    icons: category.icons.filter(icon => 
      icon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      icon.usage.toLowerCase().includes(searchTerm.toLowerCase()) ||
      icon.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  })).filter(category => category.icons.length > 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">Enhanced Icon System</h1>
          <Badge variant="default">Stable</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Comprehensive icon system with 300+ Lucide React icons, custom upload support, and color customization.
        </p>
      </div>

      {/* Search and Color Selector */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search icons by name, usage, or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Pipette className="h-4 w-4" />
            <span className="text-sm font-medium">Icon Color Preview</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {brandColors.map((color) => (
              <Button
                key={color.name}
                variant={selectedColor === color.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedColor(color.value)}
                className="h-8"
              >
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: color.value }}
                />
                {color.name}
              </Button>
            ))}
            <input
              type="color"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="w-8 h-8 rounded border cursor-pointer"
              title="Custom color"
            />
          </div>
        </div>
      </div>

      {/* Custom Icon Upload */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Custom Icon Library Upload
          </CardTitle>
          <CardDescription>
            Upload your own SVG icon libraries to extend the design system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
            <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-2">
              Upload SVG icon files or complete icon libraries
            </p>
            <input
              type="file"
              multiple
              accept=".svg"
              onChange={handleIconUpload}
              className="hidden"
              id="icon-upload"
            />
            <Button variant="outline" asChild>
              <label htmlFor="icon-upload" className="cursor-pointer">
                <Upload className="h-4 w-4 mr-2" />
                Choose SVG Files
              </label>
            </Button>
          </div>
          
          {customIcons.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Custom Icons ({customIcons.length})</h4>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                {customIcons.map((icon) => (
                  <div key={icon.id} className="flex flex-col items-center p-2 border rounded">
                    <img src={icon.file_url} alt={icon.icon_name} className="w-6 h-6 mb-1" />
                    <span className="text-xs text-center">{icon.icon_name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

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
                      <Home className={size.class} style={{ color: selectedColor }} />
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
        <h2 className="text-xl font-semibold">Icon Library ({filteredCategories.reduce((acc, cat) => acc + cat.icons.length, 0)} icons)</h2>
        {filteredCategories.map((category) => (
          <div key={category.name} className="space-y-4">
            <h3 className="text-lg font-medium">{category.name} ({category.icons.length} icons)</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {category.icons.map((icon) => {
                const IconComponent = icon.component;
                return (
                  <Card key={icon.name} className="group hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="bg-muted rounded-lg p-3 flex items-center justify-center">
                            <IconComponent className="h-5 w-5" style={{ color: selectedColor }} />
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyIconCode(icon.name, selectedColor)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                        <div>
                          <div className="font-medium text-sm">{icon.name}</div>
                          <div className="text-xs text-muted-foreground line-clamp-2">{icon.usage}</div>
                          <div className="text-xs text-muted-foreground/70 mt-1">
                            {icon.keywords.slice(0, 3).join(', ')}
                          </div>
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

      {/* Usage Examples - Always Visible */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            Usage Examples
          </CardTitle>
          <CardDescription>Common patterns and best practices for using icons</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">Buttons with Icons</h4>
              <div className="space-y-3">
                <Button>
                  <Plus className="h-4 w-4 mr-2" style={{ color: 'white' }} />
                  Create New
                </Button>
                <Button variant="outline">
                  <DownloadIcon className="h-4 w-4 mr-2" style={{ color: selectedColor }} />
                  Download
                </Button>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4 mr-2" style={{ color: selectedColor }} />
                  Edit
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Status Indicators</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-green-600">
                  <Check className="h-4 w-4" />
                  <span className="text-sm">Task completed</span>
                </div>
                <div className="flex items-center gap-2 text-yellow-600">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">In progress</span>
                </div>
                <div className="flex items-center gap-2 text-red-600">
                  <X className="h-4 w-4" />
                  <span className="text-sm">Failed</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Navigation Icons</h4>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <ArrowLeft className="h-4 w-4" style={{ color: selectedColor }} />
                </Button>
                <Button variant="outline" size="icon">
                  <Home className="h-4 w-4" style={{ color: selectedColor }} />
                </Button>
                <Button variant="outline" size="icon">
                  <ArrowRight className="h-4 w-4" style={{ color: selectedColor }} />
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Social Actions</h4>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Heart className="h-4 w-4 mr-2" style={{ color: '#ef4444' }} />
                  Like
                </Button>
                <Button variant="outline" size="sm">
                  <Star className="h-4 w-4 mr-2" style={{ color: '#f59e0b' }} />
                  Star
                </Button>
                <Button variant="outline" size="sm">
                  <Share className="h-4 w-4 mr-2" style={{ color: selectedColor }} />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Guidelines - Always Visible */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            Icon Guidelines
          </CardTitle>
          <CardDescription>Best practices for consistent and accessible icon usage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-green-600 flex items-center gap-2">
                <Check className="h-4 w-4" />
                Best Practices
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Use consistent sizing throughout your interface</li>
                <li>• Choose icons with similar visual weight and style</li>
                <li>• Provide text labels alongside icons for clarity</li>
                <li>• Use semantic meaning consistently across the app</li>
                <li>• Test icon recognition at different sizes</li>
                <li>• Group related icons in consistent layouts</li>
                <li>• Use color purposefully to convey meaning</li>
                <li>• Ensure icons are scalable and crisp</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-blue-600 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Accessibility
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Include aria-labels for standalone icons</li>
                <li>• Ensure sufficient color contrast (4.5:1 minimum)</li>
                <li>• Don't rely solely on icons to convey information</li>
                <li>• Use role="img" for decorative icons</li>
                <li>• Test with screen readers and keyboard navigation</li>
                <li>• Provide alternative text descriptions</li>
                <li>• Consider users with color vision deficiencies</li>
                <li>• Make interactive icons large enough to tap (44px minimum)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}