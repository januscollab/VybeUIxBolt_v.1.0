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
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold">CV-Inspired Components</h1>
          <Badge variant="default">Professional</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Professional components inspired by CV/resume design patterns for portfolio and profile applications.
        </p>
      </div>

      {/* Professional Profile Card */}
      <Card>
        <CardHeader>
          <CardTitle>Professional Profile Card</CardTitle>
          <CardDescription>Complete profile overview with score and quick actions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Profile Section */}
            <div className="flex-1">
              <div className="flex items-start gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="text-lg">JD</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div>
                    <h3 className="text-xl font-semibold">John Doe</h3>
                    <p className="text-muted-foreground">Senior Frontend Developer</p>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      john@example.com
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      +1 (555) 123-4567
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      San Francisco, CA
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview CV
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export PDF
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Score Section */}
            <div className="md:w-80">
              <Card>
                <CardContent className="p-4">
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-bold text-green-600">{profileScore}%</div>
                    <p className="text-sm text-muted-foreground">Profile Strength</p>
                    <Progress value={profileScore} className="w-full" />
                  </div>
                  <Separator className="my-4" />
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Profile Views</span>
                      <span className="font-medium">247 this week</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Applications</span>
                      <span className="font-medium">12 active</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Response Rate</span>
                      <span className="font-medium text-green-600">68%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skills Matrix */}
      <Card>
        <CardHeader>
          <CardTitle>Skills Assessment Matrix</CardTitle>
          <CardDescription>Visual representation of skills with progress indicators</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-medium">{skill.name}</span>
                    <Badge variant="outline" className="ml-2 text-xs">
                      {skill.category}
                    </Badge>
                  </div>
                  <span className="text-sm font-medium">{skill.level}%</span>
                </div>
                <Progress value={skill.level} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Beginner</span>
                  <span>Expert</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2 pt-4">
            <Button size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Skill
            </Button>
            <Button size="sm" variant="outline">
              <Target className="h-4 w-4 mr-2" />
              Take Assessment
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Achievement System */}
      <Card>
        <CardHeader>
          <CardTitle>Achievement System</CardTitle>
          <CardDescription>Gamified progress tracking and milestones</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-start gap-3 p-4 rounded-lg border">
                <div className={`p-2 rounded-full ${
                  achievement.status === 'completed' 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-orange-100 text-orange-600'
                }`}>
                  <achievement.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{achievement.title}</h4>
                    {achievement.status === 'completed' && (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    )}
                    {achievement.status === 'in-progress' && (
                      <Clock className="h-4 w-4 text-orange-600" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Button variant="outline">
              <Trophy className="h-4 w-4 mr-2" />
              View All Achievements
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Professional Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Professional Timeline</CardTitle>
          <CardDescription>Career progression and education history</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-border"></div>
            <div className="space-y-6">
              {timeline.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                    item.type === 'work' 
                      ? 'bg-blue-100 border-blue-500 text-blue-600' 
                      : 'bg-green-100 border-green-500 text-green-600'
                  }`}>
                    {item.type === 'work' ? (
                      <Briefcase className="h-4 w-4" />
                    ) : (
                      <GraduationCap className="h-4 w-4" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
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
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Experience
            </Button>
            <Button size="sm" variant="outline">
              <GraduationCap className="h-4 w-4 mr-2" />
              Add Education
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* File Upload Component */}
      <Card>
        <CardHeader>
          <CardTitle>Document Upload System</CardTitle>
          <CardDescription>Professional file upload with progress tracking</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center space-y-4">
            <div className="flex justify-center">
              <Upload className="h-12 w-12 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-medium">Upload your CV/Resume</h3>
              <p className="text-sm text-muted-foreground">
                Drag and drop your file here, or click to browse
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Supports PDF, DOC, DOCX (max 10MB)
              </p>
            </div>
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Choose File
            </Button>
          </div>
          
          {uploadProgress > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Uploading resume.pdf...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <FileText className="h-8 w-8 text-blue-600" />
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">John_Doe_Resume.pdf</p>
                <p className="text-sm text-muted-foreground">2.4 MB • Uploaded today</p>
              </div>
              <Button size="sm" variant="ghost">
                <Download className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <FileText className="h-8 w-8 text-green-600" />
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">Cover_Letter.pdf</p>
                <p className="text-sm text-muted-foreground">1.8 MB • 2 days ago</p>
              </div>
              <Button size="sm" variant="ghost">
                <Download className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <FileText className="h-8 w-8 text-purple-600" />
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">Portfolio.pdf</p>
                <p className="text-sm text-muted-foreground">5.2 MB • 1 week ago</p>
              </div>
              <Button size="sm" variant="ghost">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analytics Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Analytics</CardTitle>
          <CardDescription>Track your profile performance and engagement</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Profile Views</p>
                    <p className="text-2xl font-bold">1,247</p>
                    <p className="text-xs text-green-600 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      +12% from last week
                    </p>
                  </div>
                  <Eye className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Applications</p>
                    <p className="text-2xl font-bold">23</p>
                    <p className="text-xs text-green-600 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      +8% from last week
                    </p>
                  </div>
                  <FileText className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Response Rate</p>
                    <p className="text-2xl font-bold">68%</p>
                    <p className="text-xs text-red-600 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3 rotate-180" />
                      -3% from last week
                    </p>
                  </div>
                  <Zap className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Profile Score</p>
                    <p className="text-2xl font-bold">85%</p>
                    <p className="text-xs text-green-600 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      +5% from last week
                    </p>
                  </div>
                  <Award className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Code Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Code Examples</CardTitle>
          <CardDescription>Implementation examples for CV-inspired components</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium">Skills Progress Component</h4>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`const SkillItem = ({ name, level, category }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <div>
        <span className="font-medium">{name}</span>
        <Badge variant="outline" className="ml-2">
          {category}
        </Badge>
      </div>
      <span className="text-sm font-medium">{level}%</span>
    </div>
    <Progress value={level} className="h-2" />
  </div>
);`}</code>
            </pre>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Achievement Badge</h4>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`const Achievement = ({ title, description, icon: Icon, status }) => (
  <div className="flex items-start gap-3 p-4 rounded-lg border">
    <div className={\`p-2 rounded-full \${
      status === 'completed' 
        ? 'bg-green-100 text-green-600' 
        : 'bg-orange-100 text-orange-600'
    }\`}>
      <Icon className="h-5 w-5" />
    </div>
    <div className="flex-1">
      <h4 className="font-medium">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
);`}</code>
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}