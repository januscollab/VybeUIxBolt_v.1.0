
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Upload, Download, Star, Trophy, Award, CheckCircle, Clock, 
  User, Mail, Phone, MapPin, Briefcase, GraduationCap, 
  Calendar, FileText, Eye, Edit3, Zap, Target, TrendingUp, Plus
} from "lucide-react";
import { useState } from "react";

export default function CVInspiredShowcase() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [profileScore, setProfileScore] = useState(85);

  // CV-style data
  const skills = [
    { name: "React", level: 90, category: "Frontend" },
    { name: "TypeScript", level: 85, category: "Programming" },
    { name: "Node.js", level: 80, category: "Backend" },
    { name: "Design Systems", level: 95, category: "Design" },
    { name: "Project Management", level: 75, category: "Management" },
  ];

  const achievements = [
    { title: "Profile Completion", description: "100% profile completed", icon: CheckCircle, status: "completed" },
    { title: "Skills Assessment", description: "Verified 5+ skills", icon: Star, status: "completed" },
    { title: "Portfolio Upload", description: "Added portfolio items", icon: Upload, status: "completed" },
    { title: "References Added", description: "3 professional references", icon: User, status: "in-progress" },
  ];

  const timeline = [
    { date: "2024", title: "Senior Frontend Developer", company: "Tech Corp", type: "work" },
    { date: "2023", title: "Frontend Developer", company: "StartupXYZ", type: "work" },
    { date: "2022", title: "Master's in Computer Science", company: "University", type: "education" },
    { date: "2021", title: "Junior Developer", company: "Dev Agency", type: "work" },
  ];

  return (
    <div className="space-y-8 showcase-component">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold">CV-Inspired Components</h1>
          <Badge variant="default">Professional</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Professional profile components inspired by modern CV and resume layouts for career platforms.
        </p>
      </div>

      {/* Profile Header */}
      <Card>
        <CardHeader>
          <CardTitle>Professional Profile Header</CardTitle>
          <CardDescription>
            Comprehensive profile overview with completion scoring and quick actions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-2xl font-bold">John Doe</h3>
                <p className="text-lg text-muted-foreground">Senior Frontend Developer</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    San Francisco, CA
                  </div>
                  <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    john.doe@email.com
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    +1 (555) 123-4567
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Profile Completion</span>
                  <span className="text-sm text-muted-foreground">{profileScore}%</span>
                </div>
                <Progress value={profileScore} className="h-2" />
              </div>

              <div className="flex gap-2">
                <Button size="sm" className="gap-1">
                  <Edit3 className="h-4 w-4" />
                  Edit Profile
                </Button>
                <Button size="sm" variant="outline" className="gap-1">
                  <Eye className="h-4 w-4" />
                  View Public
                </Button>
                <Button size="sm" variant="outline" className="gap-1">
                  <Download className="h-4 w-4" />
                  Download CV
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skills Assessment */}
      <Card>
        <CardHeader>
          <CardTitle>Skills & Expertise</CardTitle>
          <CardDescription>
            Interactive skills visualization with proficiency levels and categories
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {skills.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{skill.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {skill.category}
                    </Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">{skill.level}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={skill.level} className="flex-1 h-2" />
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-3 w-3 ${
                          star <= Math.floor(skill.level / 20) 
                            ? 'text-warning fill-warning' 
                            : 'text-muted-foreground'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Skill Assessment</h4>
              <p className="text-sm text-muted-foreground">Take assessments to verify your skills</p>
            </div>
            <Button variant="outline" size="sm" className="gap-1">
              <Target className="h-4 w-4" />
              Take Assessment
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Achievement System */}
      <Card>
        <CardHeader>
          <CardTitle>Professional Achievements</CardTitle>
          <CardDescription>
            Track progress and unlock achievements in your professional journey
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              const isCompleted = achievement.status === 'completed';
              
              return (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${
                    isCompleted 
                      ? 'bg-success/10 border-success/20' 
                      : 'bg-muted/50 border-muted'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${
                      isCompleted 
                        ? 'bg-success text-success-foreground' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{achievement.title}</h4>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      <Badge 
                        variant={isCompleted ? "default" : "secondary"} 
                        className="mt-2 text-xs"
                      >
                        {isCompleted ? 'Completed' : 'In Progress'}
                      </Badge>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="flex items-center gap-3">
              <Trophy className="h-5 w-5 text-primary" />
              <div>
                <h4 className="font-medium text-primary">Achievement Unlocked!</h4>
                <p className="text-sm text-primary/80">You've completed your profile setup. Keep up the great work!</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Career Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Career Timeline</CardTitle>
          <CardDescription>
            Visual representation of professional experience and education
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border"></div>
            <div className="space-y-6">
              {timeline.map((item, index) => (
                <div key={index} className="relative flex items-start gap-4">
                  <div className={`relative z-10 w-8 h-8 rounded-full border-4 border-background flex items-center justify-center ${
                    item.type === 'work' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-accent text-accent-foreground'
                  }`}>
                    {item.type === 'work' ? (
                      <Briefcase className="h-3 w-3" />
                    ) : (
                      <GraduationCap className="h-3 w-3" />
                    )}
                  </div>
                  <div className="flex-1 pb-6">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{item.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {item.date}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.company}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center pt-4">
            <Button variant="outline" size="sm" className="gap-1">
              <Plus className="h-4 w-4" />
              Add Experience
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Portfolio Showcase */}
      <Card>
        <CardHeader>
          <CardTitle>Portfolio & Projects</CardTitle>
          <CardDescription>
            Showcase your best work with visual previews and project details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((project) => (
              <div key={project} className="border rounded-lg overflow-hidden group hover:shadow-md transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <div className="text-center">
                    <FileText className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <p className="text-sm font-medium">Project {project}</p>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-medium">E-commerce Platform</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Modern React application with TypeScript and Tailwind CSS
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex gap-1">
                      <Badge variant="secondary" className="text-xs">React</Badge>
                      <Badge variant="secondary" className="text-xs">TypeScript</Badge>
                    </div>
                    <Button size="sm" variant="ghost" className="gap-1">
                      <Eye className="h-3 w-3" />
                      View
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
            <Upload className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
            <h4 className="font-medium mb-1">Upload Portfolio Item</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Drag and drop files or click to browse
            </p>
            <Button variant="outline" size="sm">
              Choose Files
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Professional Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Professional Metrics</CardTitle>
          <CardDescription>
            Track your professional growth and market positioning
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <TrendingUp className="h-6 w-6 mx-auto mb-2 text-success" />
              <div className="text-2xl font-bold">95%</div>
              <div className="text-xs text-muted-foreground">Profile Views</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Star className="h-6 w-6 mx-auto mb-2 text-warning" />
              <div className="text-2xl font-bold">4.9</div>
              <div className="text-xs text-muted-foreground">Rating</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <User className="h-6 w-6 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">24</div>
              <div className="text-xs text-muted-foreground">Connections</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Zap className="h-6 w-6 mx-auto mb-2 text-accent" />
              <div className="text-2xl font-bold">12</div>
              <div className="text-xs text-muted-foreground">Projects</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
