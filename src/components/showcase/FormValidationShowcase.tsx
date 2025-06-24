
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  CheckCircle, AlertCircle, Info, Eye, EyeOff, 
  User, Mail, Lock, Phone, Calendar
} from "lucide-react";

export default function FormValidationShowcase() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    birthdate: "",
    country: "",
    newsletter: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'username':
        if (!value) return "Username is required";
        if (value.length < 3) return "Username must be at least 3 characters";
        if (!/^[a-zA-Z0-9_]+$/.test(value)) return "Username can only contain letters, numbers, and underscores";
        return "";
      
      case 'email':
        if (!value) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email address";
        return "";
      
      case 'password':
        if (!value) return "Password is required";
        if (value.length < 8) return "Password must be at least 8 characters";
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) return "Password must contain uppercase, lowercase, and number";
        return "";
      
      case 'confirmPassword':
        if (!value) return "Please confirm your password";
        if (value !== formData.password) return "Passwords do not match";
        return "";
      
      case 'phone':
        if (!value) return "Phone number is required";
        if (!/^\+?[\d\s-()]+$/.test(value)) return "Please enter a valid phone number";
        return "";
      
      case 'birthdate':
        if (!value) return "Birthdate is required";
        const age = new Date().getFullYear() - new Date(value).getFullYear();
        if (age < 13) return "You must be at least 13 years old";
        return "";
      
      case 'country':
        if (!value) return "Please select your country";
        return "";
      
      default:
        return "";
    }
  };

  const handleInputChange = (name: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (typeof value === 'string') {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach(key => {
      if (key !== 'newsletter') {
        const error = validateField(key, formData[key as keyof typeof formData] as string);
        if (error) newErrors[key] = error;
      }
    });

    setErrors(newErrors);
    setIsSubmitted(Object.keys(newErrors).length === 0);
  };

  const getFieldStatus = (fieldName: string) => {
    const value = formData[fieldName as keyof typeof formData] as string;
    const error = errors[fieldName];
    
    if (!value) return null;
    if (error) return 'error';
    return 'success';
  };

  const getFieldIcon = (fieldName: string) => {
    const status = getFieldStatus(fieldName);
    if (status === 'success') return <CheckCircle className="h-4 w-4 text-success" />;
    if (status === 'error') return <AlertCircle className="h-4 w-4 text-destructive" />;
    return null;
  };

  const passwordStrength = () => {
    const password = formData.password;
    if (!password) return { strength: 0, label: "", color: "" };
    
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z\d]/.test(password)) score++;
    
    if (score <= 2) return { strength: score * 20, label: "Weak", color: "destructive" };
    if (score <= 3) return { strength: score * 20, label: "Fair", color: "warning" };
    if (score <= 4) return { strength: score * 20, label: "Good", color: "primary" };
    return { strength: 100, label: "Strong", color: "success" };
  };

  return (
    <div className="space-y-8 showcase-component">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold">Form Validation</h1>
          <Badge variant="default">Interactive</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Comprehensive form validation with real-time feedback and accessibility features.
        </p>
      </div>

      {/* Registration Form */}
      <Card>
        <CardHeader>
          <CardTitle>User Registration Form</CardTitle>
          <CardDescription>
            Complete form with validation, password strength, and error handling
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {isSubmitted ? (
            <Alert className="border-success bg-success/10">
              <CheckCircle className="h-4 w-4 text-success" />
              <AlertDescription className="text-success">
                Registration successful! Welcome to our platform.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-6">
              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="username" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Username
                </Label>
                <div className="relative">
                  <Input
                    id="username"
                    value={formData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    className={`pr-10 ${
                      getFieldStatus('username') === 'error' ? 'border-destructive' :
                      getFieldStatus('username') === 'success' ? 'border-success' : ''
                    }`}
                    placeholder="Enter your username"
                  />
                  <div className="absolute right-3 top-3">
                    {getFieldIcon('username')}
                  </div>
                </div>
                {errors.username && (
                  <p className="text-sm text-destructive">{errors.username}</p>
                )}
                {formData.username && !errors.username && (
                  <p className="text-sm text-success">Username is available!</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`pr-10 ${
                      getFieldStatus('email') === 'error' ? 'border-destructive' :
                      getFieldStatus('email') === 'success' ? 'border-success' : ''
                    }`}
                    placeholder="your@email.com"
                  />
                  <div className="absolute right-3 top-3">
                    {getFieldIcon('email')}
                  </div>
                </div>
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={`pr-20 ${
                      getFieldStatus('password') === 'error' ? 'border-destructive' :
                      getFieldStatus('password') === 'success' ? 'border-success' : ''
                    }`}
                    placeholder="Enter your password"
                  />
                  <div className="absolute right-3 top-3 flex items-center gap-1">
                    {getFieldIcon('password')}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                {formData.password && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Password strength:</span>
                      <span className={`font-medium text-${passwordStrength().color}`}>
                        {passwordStrength().label}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all bg-${passwordStrength().color}`}
                        style={{ width: `${passwordStrength().strength}%` }}
                      />
                    </div>
                  </div>
                )}
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className={`pr-10 ${
                      getFieldStatus('confirmPassword') === 'error' ? 'border-destructive' :
                      getFieldStatus('confirmPassword') === 'success' ? 'border-success' : ''
                    }`}
                    placeholder="Confirm your password"
                  />
                  <div className="absolute right-3 top-3">
                    {getFieldIcon('confirmPassword')}
                  </div>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-destructive">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Additional Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={
                      getFieldStatus('phone') === 'error' ? 'border-destructive' :
                      getFieldStatus('phone') === 'success' ? 'border-success' : ''
                    }
                    placeholder="+1 (555) 123-4567"
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive">{errors.phone}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthdate" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Birthdate
                  </Label>
                  <Input
                    id="birthdate"
                    type="date"
                    value={formData.birthdate}
                    onChange={(e) => handleInputChange('birthdate', e.target.value)}
                    className={
                      getFieldStatus('birthdate') === 'error' ? 'border-destructive' :
                      getFieldStatus('birthdate') === 'success' ? 'border-success' : ''
                    }
                  />
                  {errors.birthdate && (
                    <p className="text-sm text-destructive">{errors.birthdate}</p>
                  )}
                </div>
              </div>

              {/* Country Selection */}
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                  <SelectTrigger className={
                    getFieldStatus('country') === 'error' ? 'border-destructive' :
                    getFieldStatus('country') === 'success' ? 'border-success' : ''
                  }>
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="de">Germany</SelectItem>
                    <SelectItem value="fr">France</SelectItem>
                  </SelectContent>
                </Select>
                {errors.country && (
                  <p className="text-sm text-destructive">{errors.country}</p>
                )}
              </div>

              {/* Newsletter Checkbox */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="newsletter"
                  checked={formData.newsletter}
                  onCheckedChange={(checked) => handleInputChange('newsletter', checked as boolean)}
                />
                <Label htmlFor="newsletter" className="text-sm">
                  Subscribe to our newsletter for updates and tips
                </Label>
              </div>

              <Button onClick={handleSubmit} className="w-full">
                Create Account
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Validation Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Validation Best Practices</CardTitle>
          <CardDescription>
            Guidelines for implementing effective form validation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2 text-success">Do</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Provide real-time validation feedback</li>
                <li>• Use clear, helpful error messages</li>
                <li>• Show success states for valid fields</li>
                <li>• Make required fields obvious</li>
                <li>• Test with screen readers</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-destructive">Don't</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Validate too aggressively on first focus</li>
                <li>• Use vague error messages</li>
                <li>• Hide validation behind submission</li>
                <li>• Make forms unnecessarily complex</li>
                <li>• Forget mobile considerations</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
