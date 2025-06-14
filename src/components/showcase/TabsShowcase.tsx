import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, User, Shield, CreditCard, Palette, Globe, Database, Settings, FileText, BarChart, Users, Zap } from "lucide-react";
import { useState } from "react";

export default function TabsShowcase() {
  const [activeTab, setActiveTab] = useState("account");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold">Tabs Component</h1>
          <Badge variant="default">Stable</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Tab navigation with horizontal and vertical orientations for organizing related content.
        </p>
      </div>

      {/* Basic Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Tabs</CardTitle>
          <CardDescription>Standard horizontal tab navigation</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="tab1" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="tab1">Overview</TabsTrigger>
              <TabsTrigger value="tab2">Analytics</TabsTrigger>
              <TabsTrigger value="tab3">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Total Users</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12,543</div>
                    <p className="text-sm text-muted-foreground">+12% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Revenue</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$45,231</div>
                    <p className="text-sm text-muted-foreground">+8% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Orders</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,234</div>
                    <p className="text-sm text-muted-foreground">+23% from last month</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="tab2" className="space-y-4">
              <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Analytics dashboard would go here</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="tab3" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="notifications">Enable Notifications</Label>
                  <Switch 
                    id="notifications"
                    checked={notificationsEnabled}
                    onCheckedChange={setNotificationsEnabled}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Settings Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Settings Tabs</CardTitle>
          <CardDescription>Comprehensive settings interface with multiple categories</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
              <TabsTrigger value="account" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Account</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline">Security</span>
              </TabsTrigger>
              <TabsTrigger value="billing" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                <span className="hidden sm:inline">Billing</span>
              </TabsTrigger>
              <TabsTrigger value="preferences" className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                <span className="hidden sm:inline">Preferences</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="account" className="space-y-6 mt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="/placeholder.svg" alt="Profile" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button variant="outline">Change Photo</Button>
                    <p className="text-sm text-muted-foreground">JPG, GIF or PNG. 1MB max.</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="john@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" defaultValue="+1 (555) 123-4567" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea id="bio" placeholder="Tell us about yourself" />
                </div>

                <Button>Save Changes</Button>
              </div>
            </TabsContent>

            <TabsContent value="security" className="space-y-6 mt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
                
                <div className="border rounded-lg p-4 space-y-4">
                  <h4 className="font-medium">Two-Factor Authentication</h4>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account
                  </p>
                  <Button variant="outline">Enable 2FA</Button>
                </div>

                <div className="border rounded-lg p-4 space-y-4">
                  <h4 className="font-medium">Active Sessions</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-muted rounded">
                      <div>
                        <p className="font-medium">Current Session</p>
                        <p className="text-sm text-muted-foreground">Chrome on macOS</p>
                      </div>
                      <Badge variant="default">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-muted rounded">
                      <div>
                        <p className="font-medium">Mobile App</p>
                        <p className="text-sm text-muted-foreground">iPhone</p>
                      </div>
                      <Button variant="outline" size="sm">Sign Out</Button>
                    </div>
                  </div>
                </div>

                <Button>Update Security Settings</Button>
              </div>
            </TabsContent>

            <TabsContent value="billing" className="space-y-6 mt-6">
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium">Current Plan</h4>
                    <Badge>Pro Plan</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    $29/month - Billed monthly
                  </p>
                  <Button variant="outline">Upgrade Plan</Button>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-4">Payment Method</h4>
                  <div className="flex items-center justify-between p-3 bg-muted rounded">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5" />
                      <div>
                        <p className="font-medium">•••• •••• •••• 4242</p>
                        <p className="text-sm text-muted-foreground">Expires 12/24</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Update</Button>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-4">Billing History</h4>
                  <div className="space-y-2">
                    {Array.from({ length: 3 }, (_, i) => (
                      <div key={i} className="flex items-center justify-between p-2 border-b last:border-b-0">
                        <div>
                          <p className="font-medium">Pro Plan</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(2024, i, 1).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">$29.00</p>
                          <Button variant="ghost" size="sm">Download</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-6 mt-6">
              <div className="space-y-4">
                <div className="border rounded-lg p-4 space-y-4">
                  <h4 className="font-medium">Appearance</h4>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="darkMode">Dark Mode</Label>
                    <Switch 
                      id="darkMode"
                      checked={darkMode}
                      onCheckedChange={setDarkMode}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="border rounded-lg p-4 space-y-4">
                  <h4 className="font-medium">Notifications</h4>
                  <div className="space-y-3">
                    {[
                      { label: "Email notifications", id: "email" },
                      { label: "Push notifications", id: "push" },
                      { label: "SMS notifications", id: "sms" },
                      { label: "Marketing emails", id: "marketing" }
                    ].map((item) => (
                      <div key={item.id} className="flex items-center justify-between">
                        <Label htmlFor={item.id}>{item.label}</Label>
                        <Switch id={item.id} defaultChecked={item.id !== 'marketing'} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border rounded-lg p-4 space-y-4">
                  <h4 className="font-medium">Privacy</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="profileVisibility">Profile Visibility</Label>
                      <Select defaultValue="public">
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="friends">Friends Only</SelectItem>
                          <SelectItem value="private">Private</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="analytics">Analytics Tracking</Label>
                      <Switch id="analytics" defaultChecked />
                    </div>
                  </div>
                </div>

                <Button>Save Preferences</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Vertical Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Vertical Tabs</CardTitle>
          <CardDescription>Side navigation tab layout for complex interfaces</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-6">
            <div className="w-48 border-r pr-4">
              <div className="space-y-1">
                {[
                  { id: "general", label: "General", icon: Settings },
                  { id: "team", label: "Team", icon: Users },
                  { id: "integrations", label: "Integrations", icon: Zap },
                  { id: "api", label: "API", icon: Database },
                  { id: "docs", label: "Documentation", icon: FileText }
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <Button
                      key={item.id}
                      variant="ghost"
                      className="w-full justify-start"
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {item.label}
                    </Button>
                  );
                })}
              </div>
            </div>
            
            <div className="flex-1">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">General Settings</h3>
                  <p className="text-sm text-muted-foreground">
                    Manage your general account settings and preferences.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="projectName">Project Name</Label>
                    <Input id="projectName" defaultValue="My Awesome Project" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Describe your project"
                      defaultValue="This is an amazing project that does incredible things."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Project Visibility</Label>
                    <Select defaultValue="private">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4" />
                            Public
                          </div>
                        </SelectItem>
                        <SelectItem value="private">
                          <div className="flex items-center gap-2">
                            <Shield className="h-4 w-4" />
                            Private
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button>Save Changes</Button>
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
          <CardDescription>Best practices for tab implementation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-success">Best Practices</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Use clear, descriptive tab labels</li>
                <li>• Limit tabs to 7 or fewer when possible</li>
                <li>• Group related content logically</li>
                <li>• Provide visual feedback for active state</li>
                <li>• Consider mobile responsiveness</li>
                <li>• Maintain consistent tab ordering</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-warning">Accessibility</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Implement proper ARIA attributes</li>
                <li>• Support keyboard navigation</li>
                <li>• Provide focus indicators</li>
                <li>• Use semantic HTML structure</li>
                <li>• Test with screen readers</li>
                <li>• Ensure sufficient color contrast</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}