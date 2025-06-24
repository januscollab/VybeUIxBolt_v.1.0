
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  Search, Check, ChevronsUpDown, User, Users, Building, 
  MapPin, Star, Crown, Shield, Zap, Filter, X
} from "lucide-react";

export default function AdvancedSelectShowcase() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const users = [
    { id: "1", name: "Alice Johnson", email: "alice@company.com", avatar: "/placeholder.svg", role: "Admin", status: "online" },
    { id: "2", name: "Bob Smith", email: "bob@company.com", avatar: "", role: "Developer", status: "away" },
    { id: "3", name: "Carol Davis", email: "carol@company.com", avatar: "/placeholder.svg", role: "Designer", status: "offline" },
    { id: "4", name: "David Wilson", email: "david@company.com", avatar: "", role: "Manager", status: "online" },
  ];

  const teams = [
    { id: "frontend", name: "Frontend Team", members: 8, color: "primary" },
    { id: "backend", name: "Backend Team", members: 6, color: "secondary" },
    { id: "design", name: "Design Team", members: 4, color: "accent" },
    { id: "product", name: "Product Team", members: 5, color: "success" },
  ];

  const locations = [
    { id: "us", name: "United States", flag: "🇺🇸", timezone: "UTC-5" },
    { id: "uk", name: "United Kingdom", flag: "🇬🇧", timezone: "UTC+0" },
    { id: "de", name: "Germany", flag: "🇩🇪", timezone: "UTC+1" },
    { id: "jp", name: "Japan", flag: "🇯🇵", timezone: "UTC+9" },
  ];

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-success';
      case 'away': return 'bg-warning';
      case 'offline': return 'bg-muted-foreground';
      default: return 'bg-muted-foreground';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Admin': return Crown;
      case 'Manager': return Shield;
      case 'Developer': return User;
      case 'Designer': return Star;
      default: return User;
    }
  };

  return (
    <div className="space-y-8 showcase-component">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold">Advanced Select</h1>
          <Badge variant="default">Enhanced</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Advanced selection components with search, multi-select, and rich content display.
        </p>
      </div>

      {/* User Selection with Search */}
      <Card>
        <CardHeader>
          <CardTitle>User Selection with Search</CardTitle>
          <CardDescription>
            Select users with real-time search and status indicators
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="user-search">Select Team Members</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="user-search"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="border rounded-lg max-h-64 overflow-y-auto">
              {filteredUsers.map((user) => {
                const RoleIcon = getRoleIcon(user.role);
                const isSelected = selectedUsers.includes(user.id);
                
                return (
                  <div
                    key={user.id}
                    className="flex items-center space-x-3 p-3 hover:bg-muted/50 cursor-pointer"
                    onClick={() => {
                      if (isSelected) {
                        setSelectedUsers(prev => prev.filter(id => id !== user.id));
                      } else {
                        setSelectedUsers(prev => [...prev, user.id]);
                      }
                    }}
                  >
                    <Checkbox checked={isSelected} />
                    <div className="relative">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 ${getStatusColor(user.status)} rounded-full border-2 border-white`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium truncate">{user.name}</p>
                        <RoleIcon className="h-3 w-3 text-muted-foreground" />
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {user.role}
                    </Badge>
                  </div>
                );
              })}
            </div>

            {selectedUsers.length > 0 && (
              <div className="space-y-2">
                <Label>Selected Users ({selectedUsers.length})</Label>
                <div className="flex flex-wrap gap-2">
                  {selectedUsers.map(userId => {
                    const user = users.find(u => u.id === userId);
                    return user ? (
                      <Badge key={userId} variant="secondary" className="flex items-center gap-1">
                        {user.name}
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => setSelectedUsers(prev => prev.filter(id => id !== userId))}
                        />
                      </Badge>
                    ) : null;
                  })}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Team Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Team Selection</CardTitle>
          <CardDescription>
            Select from teams with member counts and visual indicators
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="team-select">Choose Team</Label>
            <Select value={selectedTeam} onValueChange={setSelectedTeam}>
              <SelectTrigger id="team-select">
                <SelectValue placeholder="Select a team" />
              </SelectTrigger>
              <SelectContent>
                {teams.map((team) => (
                  <SelectItem key={team.id} value={team.id}>
                    <div className="flex items-center gap-3 w-full">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full bg-${team.color}`} />
                        <span>{team.name}</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Users className="h-3 w-3" />
                        <span className="text-xs">{team.members}</span>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedTeam && (
            <div className="p-4 border rounded-lg bg-muted/50">
              {(() => {
                const team = teams.find(t => t.id === selectedTeam);
                return team ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full bg-${team.color}`} />
                      <div>
                        <p className="font-medium">{team.name}</p>
                        <p className="text-sm text-muted-foreground">{team.members} team members</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Users className="h-4 w-4 mr-1" />
                      View Team
                    </Button>
                  </div>
                ) : null;
              })()}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Location Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Location Selection</CardTitle>
          <CardDescription>
            Select locations with flags and timezone information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="location-select">Choose Location</Label>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger id="location-select">
                <SelectValue placeholder="Select a location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location.id} value={location.id}>
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{location.flag}</span>
                      <div>
                        <div className="font-medium">{location.name}</div>
                        <div className="text-xs text-muted-foreground">{location.timezone}</div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedLocation && (
            <div className="p-4 border rounded-lg bg-primary/5">
              {(() => {
                const location = locations.find(l => l.id === selectedLocation);
                return location ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{location.flag}</span>
                      <div>
                        <p className="font-medium">{location.name}</p>
                        <p className="text-sm text-muted-foreground">Timezone: {location.timezone}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-primary text-primary">
                      <MapPin className="h-3 w-3 mr-1" />
                      Selected
                    </Badge>
                  </div>
                ) : null;
              })()}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Implementation Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation Guidelines</CardTitle>
          <CardDescription>
            Best practices for building advanced selection components
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Enhanced Features</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Real-time search and filtering</li>
                <li>• Multi-selection with badges</li>
                <li>• Rich content with avatars and icons</li>
                <li>• Status indicators and metadata</li>
                <li>• Keyboard navigation support</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">User Experience</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Clear visual hierarchy</li>
                <li>• Responsive design patterns</li>
                <li>• Accessible markup and interactions</li>
                <li>• Consistent selection states</li>
                <li>• Intuitive removal actions</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
