
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { 
  Star, MessageSquare, ThumbsUp, ThumbsDown, Send, 
  CheckCircle, AlertCircle, Info, Heart, Flag
} from "lucide-react";

export default function FeedbackShowcase() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedbackType, setFeedbackType] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const renderStars = (currentRating: number, interactive: boolean = false) => {
    return [...Array(5)].map((_, index) => {
      const starValue = index + 1;
      return (
        <Star
          key={index}
          className={`h-6 w-6 cursor-pointer transition-colors ${
            starValue <= (interactive ? (hoveredRating || rating) : currentRating)
              ? 'fill-warning text-warning'
              : 'text-muted-foreground'
          }`}
          onClick={() => interactive && setRating(starValue)}
          onMouseEnter={() => interactive && setHoveredRating(starValue)}
          onMouseLeave={() => interactive && setHoveredRating(0)}
        />
      );
    });
  };

  const feedbackExamples = [
    {
      id: 1,
      user: "Sarah M.",
      rating: 5,
      comment: "Absolutely love this feature! Makes my workflow so much easier.",
      type: "Feature Request",
      status: "reviewed",
      date: "2024-01-15"
    },
    {
      id: 2,
      user: "John D.",
      rating: 4,
      comment: "Great improvement, but could use some minor tweaks in the UI.",
      type: "UI Feedback",
      status: "in-progress",
      date: "2024-01-14"
    },
    {
      id: 3,
      user: "Alex K.",
      rating: 3,
      comment: "It's okay, but I expected more customization options.",
      type: "General",
      status: "pending",
      date: "2024-01-13"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'reviewed':
        return <Badge variant="success" className="text-xs">Reviewed</Badge>;
      case 'in-progress':
        return <Badge variant="warning" className="text-xs">In Progress</Badge>;
      case 'pending':
        return <Badge variant="secondary" className="text-xs">Pending</Badge>;
      default:
        return <Badge variant="outline" className="text-xs">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-8 showcase-component">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold">Feedback System</h1>
          <Badge variant="default">Interactive</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Comprehensive feedback collection with ratings, comments, and sentiment analysis.
        </p>
      </div>

      {/* Rating System */}
      <Card>
        <CardHeader>
          <CardTitle>Star Rating System</CardTitle>
          <CardDescription>
            Interactive star ratings with hover effects and validation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Label>Rate your experience:</Label>
              <div className="flex gap-1">
                {renderStars(rating, true)}
              </div>
              {rating > 0 && (
                <span className="text-sm text-muted-foreground">
                  {rating} out of 5 stars
                </span>
              )}
            </div>

            {rating > 0 && (
              <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                <p className="text-sm text-primary">
                  {rating >= 4 ? "Thanks for the great rating! 🌟" :
                   rating >= 3 ? "We appreciate your feedback! 👍" :
                   "We'd love to hear how we can improve! 💬"}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Feedback Form */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Feedback Form</CardTitle>
          <CardDescription>
            Comprehensive feedback collection with categorization
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!submitted ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="user-name">Your Name</Label>
                  <Input id="user-name" placeholder="Enter your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="user-email">Email (optional)</Label>
                  <Input id="user-email" type="email" placeholder="your@email.com" />
                </div>
              </div>

              <div className="space-y-3">
                <Label>Feedback Type</Label>
                <RadioGroup value={feedbackType} onValueChange={setFeedbackType}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bug" id="bug" />
                    <Label htmlFor="bug" className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-destructive" />
                      Bug Report
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="feature" id="feature" />
                    <Label htmlFor="feature" className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-primary" />
                      Feature Request
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ui" id="ui" />
                    <Label htmlFor="ui" className="flex items-center gap-2">
                      <Info className="h-4 w-4 text-accent" />
                      UI/UX Feedback
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="general" id="general" />
                    <Label htmlFor="general" className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      General Feedback
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="feedback-message">Your Feedback</Label>
                <Textarea
                  id="feedback-message"
                  placeholder="Tell us what you think... We value your input!"
                  className="min-h-32"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="follow-up" />
                <Label htmlFor="follow-up" className="text-sm">
                  I'd like to receive updates on this feedback
                </Label>
              </div>

              <Button 
                className="w-full" 
                onClick={() => setSubmitted(true)}
                disabled={!feedbackType}
              >
                <Send className="h-4 w-4 mr-2" />
                Submit Feedback
              </Button>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-success/10 p-3">
                  <CheckCircle className="h-8 w-8 text-success" />
                </div>
              </div>
              <h3 className="text-lg font-medium mb-2">Thank you for your feedback!</h3>
              <p className="text-muted-foreground mb-4">
                We've received your submission and will review it shortly.
              </p>
              <Button variant="outline" onClick={() => setSubmitted(false)}>
                Submit Another Feedback
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Feedback Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Feedback</CardTitle>
          <CardDescription>
            Examples of user feedback with status tracking
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {feedbackExamples.map((feedback) => (
            <div key={feedback.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{feedback.user}</span>
                    <div className="flex gap-1">
                      {renderStars(feedback.rating)}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{feedback.comment}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  {getStatusBadge(feedback.status)}
                  <span className="text-xs text-muted-foreground">{feedback.date}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  {feedback.type}
                </Badge>
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <ThumbsUp className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <ThumbsDown className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Flag className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Feedback Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>Feedback Analytics</CardTitle>
          <CardDescription>
            Insights and metrics from user feedback
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">Average Rating</h4>
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  {renderStars(4)}
                </div>
                <span className="text-2xl font-bold">4.2</span>
                <span className="text-sm text-muted-foreground">out of 5</span>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium">Response Rate</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Feedback Collection</span>
                  <span>78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Feedback Categories</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 border rounded-lg">
                <AlertCircle className="h-6 w-6 mx-auto mb-2 text-destructive" />
                <p className="text-sm font-medium">Bug Reports</p>
                <p className="text-2xl font-bold text-destructive">12</p>
              </div>
              <div className="text-center p-3 border rounded-lg">
                <Star className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Features</p>
                <p className="text-2xl font-bold text-primary">8</p>
              </div>
              <div className="text-center p-3 border rounded-lg">
                <Info className="h-6 w-6 mx-auto mb-2 text-accent" />
                <p className="text-sm font-medium">UI/UX</p>
                <p className="text-2xl font-bold text-accent">15</p>
              </div>
              <div className="text-center p-3 border rounded-lg">
                <Heart className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm font-medium">General</p>
                <p className="text-2xl font-bold">23</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
