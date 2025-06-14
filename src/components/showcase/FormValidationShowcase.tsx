import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Copy, Figma, FileCode, AlertCircle, CheckCircle2, Info } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  age: z.number().min(18, "Must be at least 18 years old").max(120, "Must be less than 120 years old"),
  country: z.string().min(1, "Please select a country"),
  bio: z.string().max(500, "Bio must not exceed 500 characters"),
  terms: z.boolean().refine(val => val === true, "You must accept the terms and conditions"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof formSchema>;

export default function FormValidationShowcase() {
  const [showCode, setShowCode] = useState(false);
  const [liveValidation, setLiveValidation] = useState({
    email: "",
    password: "",
    emailValid: false,
    passwordValid: false,
  });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      age: undefined,
      country: "",
      bio: "",
      terms: false,
    },
  });

  const onSubmit = (data: FormData) => {
    toast({
      title: "Form submitted successfully!",
      description: "All validation checks passed.",
    });
    console.log(data);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Code example has been copied to your clipboard.",
    });
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const handleLiveEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setLiveValidation(prev => ({
      ...prev,
      email,
      emailValid: validateEmail(email),
    }));
  };

  const handleLivePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setLiveValidation(prev => ({
      ...prev,
      password,
      passwordValid: validatePassword(password),
    }));
  };

  const codeExample = `import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
});

const form = useForm({
  resolver: zodResolver(formSchema),
  defaultValues: {
    email: "",
    password: "",
    name: "",
  },
});

<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)}>
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input {...field} type="email" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </form>
</Form>`;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Form Validation</h1>
            <p className="text-lg text-muted-foreground">
              Comprehensive form validation with real-time feedback, error handling, and accessibility.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <a href="https://www.figma.com/design" target="_blank" rel="noopener noreferrer">
                <Figma className="h-4 w-4 mr-2" />
                Figma
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="#storybook" target="_blank" rel="noopener noreferrer">
                <FileCode className="h-4 w-4 mr-2" />
                Storybook
              </a>
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="default">Stable</Badge>
          <Badge variant="outline">React Hook Form</Badge>
          <Badge variant="outline">Zod Schema</Badge>
        </div>
      </div>

      {/* Live Validation */}
      <Card>
        <CardHeader>
          <CardTitle>Live Validation</CardTitle>
          <CardDescription>Real-time validation feedback as users type</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="live-email">Email Address</Label>
                <div className="relative">
                  <Input
                    id="live-email"
                    type="email"
                    placeholder="Enter your email"
                    value={liveValidation.email}
                    onChange={handleLiveEmailChange}
                    className={`pr-10 ${
                      liveValidation.email 
                        ? liveValidation.emailValid 
                          ? "border-green-500" 
                          : "border-red-500"
                        : ""
                    }`}
                  />
                  {liveValidation.email && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {liveValidation.emailValid ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  )}
                </div>
                {liveValidation.email && !liveValidation.emailValid && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    Please enter a valid email address
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="live-password">Password</Label>
                <div className="relative">
                  <Input
                    id="live-password"
                    type="password"
                    placeholder="Enter your password"
                    value={liveValidation.password}
                    onChange={handleLivePasswordChange}
                    className={`pr-10 ${
                      liveValidation.password 
                        ? liveValidation.passwordValid 
                          ? "border-green-500" 
                          : "border-red-500"
                        : ""
                    }`}
                  />
                  {liveValidation.password && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {liveValidation.passwordValid ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  Password strength: {liveValidation.password.length}/8 characters
                </div>
                {liveValidation.password && !liveValidation.passwordValid && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    Password must be at least 8 characters long
                  </p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Complete Form with Validation */}
      <Card>
        <CardHeader>
          <CardTitle>Complete Form Validation</CardTitle>
          <CardDescription>Full form with comprehensive validation using React Hook Form and Zod</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="john@example.com" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormDescription>
                          Must be at least 8 characters long
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            {...field} 
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="us">United States</SelectItem>
                            <SelectItem value="uk">United Kingdom</SelectItem>
                            <SelectItem value="ca">Canada</SelectItem>
                            <SelectItem value="au">Australia</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about yourself..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        {field.value?.length || 0}/500 characters
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          I accept the terms and conditions
                        </FormLabel>
                        <FormDescription>
                          You agree to our Terms of Service and Privacy Policy.
                        </FormDescription>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Create Account
                </Button>
              </form>
            </Form>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Code Example</h4>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCode(!showCode)}
              >
                {showCode ? "Hide" : "Show"} Code
              </Button>
              {showCode && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(codeExample)}
                >
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </Button>
              )}
            </div>
          </div>
          {showCode && (
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{codeExample}</code>
            </pre>
          )}
        </CardContent>
      </Card>

      {/* Error States */}
      <Card>
        <CardHeader>
          <CardTitle>Error States</CardTitle>
          <CardDescription>Different ways to display validation errors</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="space-y-4">
              {/* Inline Error */}
              <div className="space-y-2">
                <Label htmlFor="error-email">Email (Inline Error)</Label>
                <Input
                  id="error-email"
                  type="email"
                  placeholder="Enter email"
                  className="border-red-500"
                  defaultValue="invalid-email"
                />
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  Please enter a valid email address
                </p>
              </div>

              {/* Success State */}
              <div className="space-y-2">
                <Label htmlFor="success-email">Email (Success State)</Label>
                <Input
                  id="success-email"
                  type="email"
                  placeholder="Enter email"
                  className="border-green-500"
                  defaultValue="user@example.com"
                />
                <p className="text-sm text-green-600 flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  Email is valid
                </p>
              </div>

              {/* Warning State */}
              <div className="space-y-2">
                <Label htmlFor="warning-input">Username (Warning)</Label>
                <Input
                  id="warning-input"
                  placeholder="Enter username"
                  className="border-yellow-500"
                  defaultValue="user123"
                />
                <p className="text-sm text-yellow-600 flex items-center gap-1">
                  <Info className="h-3 w-3" />
                  This username is already taken, but you can still use it
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Usage Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Guidelines</CardTitle>
          <CardDescription>Best practices for form validation implementation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-success">Best Practices</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Validate on submit, provide feedback on blur</li>
                <li>• Use clear, actionable error messages</li>
                <li>• Show success states for positive feedback</li>
                <li>• Validate progressively, not all at once</li>
                <li>• Preserve user input during validation</li>
                <li>• Use appropriate input types and constraints</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-warning">Accessibility</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Associate labels with form controls</li>
                <li>• Use aria-describedby for error messages</li>
                <li>• Ensure sufficient color contrast</li>
                <li>• Provide text alternatives for icons</li>
                <li>• Support keyboard navigation</li>
                <li>• Announce errors to screen readers</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}