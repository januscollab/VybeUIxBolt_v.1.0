import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Menu, Settings, Plus, Calendar, Image, MessageSquare, Phone, Star } from "lucide-react";
import { useState } from "react";

export default function DrawerShowcase() {
  const [drawerValue, setDrawerValue] = useState([50]);
  const [enableNotifications, setEnableNotifications] = useState(false);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold">Drawer Component</h1>
          <Badge variant="default">Stable</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Slide-out panel from screen edges optimized for mobile interactions and secondary content.
        </p>
      </div>

      {/* Basic Drawers */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Drawers</CardTitle>
          <CardDescription>Standard bottom-up drawers for mobile-first interactions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex gap-4 flex-wrap">
            <Drawer>
              <DrawerTrigger asChild>
                <Button>
                  <Menu className="h-4 w-4 mr-2" />
                  Open Menu
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                  <DrawerHeader>
                    <DrawerTitle>Quick Actions</DrawerTitle>
                    <DrawerDescription>
                      Choose an action to perform
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="p-4 pb-0 space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Plus className="h-4 w-4 mr-2" />
                      Create New
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Button>
                  </div>
                  <DrawerFooter>
                    <Button variant="outline">Close</Button>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>

            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                  <DrawerHeader>
                    <DrawerTitle>App Settings</DrawerTitle>
                    <DrawerDescription>
                      Configure your app preferences
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="p-4 pb-0 space-y-4">
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
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notifications">Notifications</Label>
                      <Switch
                        id="notifications"
                        checked={enableNotifications}
                        onCheckedChange={setEnableNotifications}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Volume: {drawerValue[0]}%</Label>
                      <Slider
                        value={drawerValue}
                        onValueChange={setDrawerValue}
                        max={100}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  </div>
                  <DrawerFooter>
                    <Button>Save Settings</Button>
                    <Button variant="outline">Cancel</Button>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </CardContent>
      </Card>

      {/* Form Drawers */}
      <Card>
        <CardHeader>
          <CardTitle>Form Drawers</CardTitle>
          <CardDescription>Drawers with forms for data input and editing</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex gap-4 flex-wrap">
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Contact
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                  <DrawerHeader>
                    <DrawerTitle>Add New Contact</DrawerTitle>
                    <DrawerDescription>
                      Enter contact information below
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="p-4 pb-0 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="john@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input id="company" placeholder="Acme Corp" />
                    </div>
                  </div>
                  <DrawerFooter>
                    <Button>Add Contact</Button>
                    <Button variant="outline">Cancel</Button>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>

            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                  <DrawerHeader>
                    <DrawerTitle>Send Message</DrawerTitle>
                    <DrawerDescription>
                      Compose a new message
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="p-4 pb-0 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="recipient">To</Label>
                      <Input id="recipient" placeholder="Select recipient" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="Message subject" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea 
                        id="message" 
                        placeholder="Type your message here..."
                        className="min-h-[100px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DrawerFooter>
                    <Button>Send Message</Button>
                    <Button variant="outline">Save Draft</Button>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Content */}
      <Card>
        <CardHeader>
          <CardTitle>Interactive Drawers</CardTitle>
          <CardDescription>Drawers with complex interactive content</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex gap-4 flex-wrap">
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline">
                  <Star className="h-4 w-4 mr-2" />
                  Rate Experience
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                  <DrawerHeader>
                    <DrawerTitle>Rate Your Experience</DrawerTitle>
                    <DrawerDescription>
                      Help us improve by sharing your feedback
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="p-4 pb-0 space-y-4">
                    <div className="space-y-2">
                      <Label>Overall Rating</Label>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Button
                            key={star}
                            variant="ghost"
                            size="sm"
                            className="p-1 h-8 w-8"
                          >
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="feedback">Additional Comments</Label>
                      <Textarea 
                        id="feedback" 
                        placeholder="Tell us more about your experience..."
                        className="min-h-[80px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ui">User Interface</SelectItem>
                          <SelectItem value="performance">Performance</SelectItem>
                          <SelectItem value="features">Features</SelectItem>
                          <SelectItem value="support">Support</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DrawerFooter>
                    <Button>Submit Feedback</Button>
                    <Button variant="outline">Maybe Later</Button>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>

            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline">
                  <Image className="h-4 w-4 mr-2" />
                  Upload Media
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                  <DrawerHeader>
                    <DrawerTitle>Upload Media</DrawerTitle>
                    <DrawerDescription>
                      Add photos or videos to your gallery
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="p-4 pb-0 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="media">Select Files</Label>
                      <Input 
                        id="media" 
                        type="file" 
                        multiple 
                        accept="image/*,video/*"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="album">Album</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose album" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="personal">Personal</SelectItem>
                          <SelectItem value="work">Work</SelectItem>
                          <SelectItem value="travel">Travel</SelectItem>
                          <SelectItem value="family">Family</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea 
                        id="description" 
                        placeholder="Describe your media..."
                        className="min-h-[60px]"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="public">Make Public</Label>
                      <Switch id="public" />
                    </div>
                  </div>
                  <DrawerFooter>
                    <Button>Upload Media</Button>
                    <Button variant="outline">Cancel</Button>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </CardContent>
      </Card>

      {/* Best Practices */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Guidelines</CardTitle>
          <CardDescription>Best practices for drawer implementation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-success">Best Practices</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Use for mobile-optimized interactions</li>
                <li>• Keep content focused and scannable</li>
                <li>• Provide clear action buttons</li>
                <li>• Use appropriate sizing for content</li>
                <li>• Include proper touch targets</li>
                <li>• Test on various screen sizes</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-warning">Accessibility</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Ensure keyboard navigation support</li>
                <li>• Use proper ARIA labels</li>
                <li>• Provide focus management</li>
                <li>• Include escape key handling</li>
                <li>• Test with screen readers</li>
                <li>• Maintain logical tab order</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}