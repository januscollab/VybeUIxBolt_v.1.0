import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, AlertCircle, CheckCircle, Copy, Figma, FileCode } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export default function FormFieldShowcase() {
  const [date, setDate] = useState<Date>();
  const [switchChecked, setSwitchChecked] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState<boolean>(false);
  const [radioValue, setRadioValue] = useState("option1");

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Code example has been copied to your clipboard.",
    });
  };

  const codeExamples = {
    basic: `<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input 
    id="email" 
    type="email" 
    placeholder="Enter your email" 
  />
</div>`,
    withValidation: `<div className="space-y-2">
  <Label htmlFor="password">Password</Label>
  <Input 
    id="password" 
    type="password" 
    className="border-red-500" 
  />
  <p className="text-sm text-red-500 flex items-center gap-1">
    <AlertCircle className="h-4 w-4" />
    Password must be at least 8 characters
  </p>
</div>`,
    success: `<div className="space-y-2">
  <Label htmlFor="username">Username</Label>
  <Input 
    id="username" 
    className="border-green-500" 
    placeholder="johndoe" 
  />
  <p className="text-sm text-green-600 flex items-center gap-1">
    <CheckCircle className="h-4 w-4" />
    Username is available
  </p>
</div>`
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Form Field</h1>
            <p className="text-lg text-muted-foreground">
              Flexible form field components with validation states and comprehensive input types.
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
          <Badge variant="outline">Form</Badge>
          <Badge variant="outline">Supabase Ready</Badge>
        </div>
      </div>

      {/* Basic Form Fields */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Form Fields</CardTitle>
          <CardDescription>
            Standard form input components with labels and proper accessibility.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Text Input */}
            <div className="space-y-2">
              <Label htmlFor="text-input">Text Input</Label>
              <Input id="text-input" placeholder="Enter text here" />
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <Label htmlFor="email-input">Email</Label>
              <Input id="email-input" type="email" placeholder="user@example.com" />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <Label htmlFor="password-input">Password</Label>
              <Input id="password-input" type="password" placeholder="••••••••" />
            </div>

            {/* Number Input */}
            <div className="space-y-2">
              <Label htmlFor="number-input">Number</Label>
              <Input id="number-input" type="number" placeholder="0" />
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <h4 className="font-medium">Code Example</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.basic)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.basic}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Validation States */}
      <Card>
        <CardHeader>
          <CardTitle>Validation States</CardTitle>
          <CardDescription>
            Form fields with error, success, and warning states for user feedback.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Default State */}
            <div className="space-y-2">
              <Label htmlFor="default-field">Default</Label>
              <Input id="default-field" placeholder="Normal input" />
              <p className="text-sm text-muted-foreground">Helper text goes here</p>
            </div>

            {/* Error State */}
            <div className="space-y-2">
              <Label htmlFor="error-field">Error State</Label>
              <Input 
                id="error-field" 
                className="border-destructive focus-visible:ring-destructive" 
                placeholder="Invalid input" 
              />
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                This field is required
              </p>
            </div>

            {/* Success State */}
            <div className="space-y-2">
              <Label htmlFor="success-field">Success State</Label>
              <Input 
                id="success-field" 
                className="border-green-500 focus-visible:ring-green-500" 
                placeholder="Valid input" 
              />
              <p className="text-sm text-green-600 flex items-center gap-1">
                <CheckCircle className="h-4 w-4" />
                Looks good!
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <h4 className="font-medium">Error State Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.withValidation)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.withValidation}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Advanced Form Components */}
      <Card>
        <CardHeader>
          <CardTitle>Advanced Form Components</CardTitle>
          <CardDescription>
            Complex form inputs including selects, checkboxes, radios, and date pickers.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Textarea */}
            <div className="space-y-2">
              <Label htmlFor="textarea">Textarea</Label>
              <Textarea 
                id="textarea" 
                placeholder="Enter your message here..." 
                className="min-h-[100px]"
              />
            </div>

            {/* Select */}
            <div className="space-y-2">
              <Label>Select Option</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Choose an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                  <SelectItem value="option3">Option 3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date Picker */}
            <div className="space-y-2">
              <Label>Date Picker</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Switch */}
            <div className="space-y-2">
              <Label htmlFor="switch">Switch Toggle</Label>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="switch" 
                  checked={switchChecked}
                  onCheckedChange={setSwitchChecked}
                />
                <Label htmlFor="switch">Enable notifications</Label>
              </div>
            </div>
          </div>

          {/* Checkbox Group */}
          <div className="space-y-3">
            <Label>Checkbox Group</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="checkbox1" 
                  checked={checkboxChecked}
                  onCheckedChange={(checked) => setCheckboxChecked(checked === true)}
                />
                <Label htmlFor="checkbox1">I agree to the terms and conditions</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="checkbox2" />
                <Label htmlFor="checkbox2">Subscribe to newsletter</Label>
              </div>
            </div>
          </div>

          {/* Radio Group */}
          <div className="space-y-3">
            <Label>Radio Group</Label>
            <RadioGroup value={radioValue} onValueChange={setRadioValue}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option1" id="r1" />
                <Label htmlFor="r1">Option 1</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option2" id="r2" />
                <Label htmlFor="r2">Option 2</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option3" id="r3" />
                <Label htmlFor="r3">Option 3</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      {/* Supabase Integration */}
      <Card>
        <CardHeader>
          <CardTitle>Supabase Integration</CardTitle>
          <CardDescription>
            Form fields integrated with Supabase for real-time validation and data persistence.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Integration Features</h4>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>• Real-time form validation with Supabase schemas</li>
              <li>• Automatic data persistence and state management</li>
              <li>• Built-in authentication field validation</li>
              <li>• File upload integration with Supabase Storage</li>
              <li>• Form auto-save functionality</li>
            </ul>
          </div>
          
          <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">Tailwind Integration</h4>
            <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
              <li>• Design tokens mapped to Tailwind classes</li>
              <li>• Consistent spacing and typography scales</li>
              <li>• Dark mode support with semantic tokens</li>
              <li>• Responsive design patterns built-in</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Usage Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Guidelines</CardTitle>
          <CardDescription>
            Best practices for implementing form fields in your applications.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Do's</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Always include proper labels for accessibility</li>
                <li>• Use appropriate input types (email, tel, etc.)</li>
                <li>• Provide clear validation feedback</li>
                <li>• Group related fields logically</li>
                <li>• Use consistent spacing and alignment</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Don'ts</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Don't use placeholder text as labels</li>
                <li>• Avoid overwhelming users with too many fields</li>
                <li>• Don't hide important validation rules</li>
                <li>• Avoid unclear or confusing error messages</li>
                <li>• Don't force unnecessary field requirements</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}