import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Mail, Lock, Eye, EyeOff, User, Calendar, Phone } from "lucide-react";
import { useState } from "react";

export default function InputShowcase() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold">Input Components</h1>
          <Badge variant="default">Stable</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Form input components for collecting user data with validation and different types.
        </p>
      </div>

      {/* Basic Inputs */}
      <Card>
        <CardHeader>
          <CardTitle>Input Types</CardTitle>
          <CardDescription>Different input types for various data collection needs</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="text">Text Input</Label>
              <Input id="text" placeholder="Enter text..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Input</Label>
              <Input id="email" type="email" placeholder="Enter email..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password Input</Label>
              <Input id="password" type="password" placeholder="Enter password..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="number">Number Input</Label>
              <Input id="number" type="number" placeholder="Enter number..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tel">Phone Input</Label>
              <Input id="tel" type="tel" placeholder="Enter phone..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="url">URL Input</Label>
              <Input id="url" type="url" placeholder="Enter URL..." />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Input with Icons */}
      <Card>
        <CardHeader>
          <CardTitle>Inputs with Icons</CardTitle>
          <CardDescription>Enhanced inputs with icon indicators</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="search">Search with Icon</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="search" placeholder="Search..." className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email-icon">Email with Icon</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="email-icon" type="email" placeholder="Enter email..." className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="user-icon">Username with Icon</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="user-icon" placeholder="Enter username..." className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password-toggle">Password with Toggle</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="password-toggle" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Enter password..." 
                  className="pl-10 pr-10" 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Input States */}
      <Card>
        <CardHeader>
          <CardTitle>Input States</CardTitle>
          <CardDescription>Different states for user feedback</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="normal">Normal State</Label>
              <Input id="normal" placeholder="Normal input..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="disabled">Disabled State</Label>
              <Input id="disabled" placeholder="Disabled input..." disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="error" className="text-destructive">Error State</Label>
              <Input id="error" placeholder="Error input..." className="border-destructive focus-visible:ring-destructive" />
              <p className="text-sm text-destructive">This field is required</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="success" className="text-green-600">Success State</Label>
              <Input id="success" placeholder="Success input..." className="border-green-500 focus-visible:ring-green-500" />
              <p className="text-sm text-green-600">Looks good!</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Specialized Inputs */}
      <Card>
        <CardHeader>
          <CardTitle>Specialized Inputs</CardTitle>
          <CardDescription>Inputs for specific use cases</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="date">Date Input</Label>
              <Input id="date" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time Input</Label>
              <Input id="time" type="time" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="file">File Input</Label>
              <Input id="file" type="file" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="range">Range Input</Label>
              <Input id="range" type="range" min="0" max="100" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Code Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Code Examples</CardTitle>
          <CardDescription>Implementation examples</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium">Basic Input</h4>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="Enter email..." />
</div>`}</code>
            </pre>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Input with Icon</h4>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`<div className="relative">
  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
  <Input placeholder="Search..." className="pl-10" />
</div>`}</code>
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}