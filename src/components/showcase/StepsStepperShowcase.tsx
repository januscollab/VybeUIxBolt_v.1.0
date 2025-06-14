import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Figma, FileCode, Check, Circle, ChevronRight, User, CreditCard, Package, Truck } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function StepsStepperShowcase() {
  const [currentStep, setCurrentStep] = useState(2);
  const [completedSteps, setCompletedSteps] = useState([1]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Code example has been copied to your clipboard.",
    });
  };

  const steps = [
    { id: 1, title: "Account Details", description: "Enter your personal information", icon: User },
    { id: 2, title: "Payment", description: "Choose your payment method", icon: CreditCard },
    { id: 3, title: "Review", description: "Review your order details", icon: Package },
    { id: 4, title: "Confirmation", description: "Order placed successfully", icon: Truck }
  ];

  const workflowSteps = [
    { id: 1, title: "Draft", status: "completed" },
    { id: 2, title: "Review", status: "current" },
    { id: 3, title: "Approval", status: "pending" },
    { id: 4, title: "Published", status: "pending" }
  ];

  const codeExamples = {
    basic: `const steps = [
  { id: 1, title: "Step 1", completed: true },
  { id: 2, title: "Step 2", current: true },
  { id: 3, title: "Step 3", completed: false }
];

<div className="flex items-center">
  {steps.map((step, index) => (
    <div key={step.id} className="flex items-center">
      <div className={cn(
        "flex items-center justify-center w-8 h-8 rounded-full border-2",
        step.completed ? "bg-primary border-primary text-primary-foreground" :
        step.current ? "border-primary text-primary" :
        "border-muted text-muted-foreground"
      )}>
        {step.completed ? <Check className="w-4 h-4" /> : step.id}
      </div>
      {index < steps.length - 1 && (
        <div className="flex-1 h-0.5 bg-muted mx-4" />
      )}
    </div>
  ))}
</div>`,
    vertical: `<div className="space-y-4">
  {steps.map((step, index) => (
    <div key={step.id} className="flex">
      <div className="flex flex-col items-center mr-4">
        <div className={cn(
          "flex items-center justify-center w-8 h-8 rounded-full",
          getStepStyles(step)
        )}>
          {step.completed ? <Check className="w-4 h-4" /> : step.id}
        </div>
        {index < steps.length - 1 && (
          <div className="w-0.5 h-8 bg-muted mt-2" />
        )}
      </div>
      <div className="flex-1 pb-8">
        <h3 className="font-medium">{step.title}</h3>
        <p className="text-sm text-muted-foreground">{step.description}</p>
      </div>
    </div>
  ))}
</div>`,
    interactive: `const [currentStep, setCurrentStep] = useState(1);

const nextStep = () => {
  if (currentStep < steps.length) {
    setCurrentStep(currentStep + 1);
    setCompletedSteps([...completedSteps, currentStep]);
  }
};

const prevStep = () => {
  if (currentStep > 1) {
    setCurrentStep(currentStep - 1);
  }
};`
  };

  const getStepStatus = (stepId: number) => {
    if (completedSteps.includes(stepId)) return "completed";
    if (stepId === currentStep) return "current";
    return "pending";
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCompletedSteps([...completedSteps, currentStep]);
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setCompletedSteps(completedSteps.filter(step => step !== currentStep - 1));
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Steps Stepper</h1>
            <p className="text-lg text-muted-foreground">
              Multi-step process navigation with progress indication and state management.
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
          <Badge variant="outline">Navigation</Badge>
          <Badge variant="outline">Forms</Badge>
        </div>
      </div>

      {/* Horizontal Stepper */}
      <Card>
        <CardHeader>
          <CardTitle>Horizontal Stepper</CardTitle>
          <CardDescription>
            Linear progress indicator showing step completion in a horizontal layout.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="space-y-6">
              {/* Basic Horizontal */}
              <div>
                <h4 className="font-medium mb-4">Basic Steps</h4>
                <div className="flex items-center">
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center flex-1">
                      <div className="flex flex-col items-center">
                        <div className={cn(
                          "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors",
                          getStepStatus(step.id) === "completed" ? "bg-primary border-primary text-primary-foreground" :
                          getStepStatus(step.id) === "current" ? "border-primary text-primary bg-background" :
                          "border-muted-foreground text-muted-foreground bg-background"
                        )}>
                          {getStepStatus(step.id) === "completed" ? 
                            <Check className="w-4 h-4" /> : 
                            <span className="text-sm font-medium">{step.id}</span>
                          }
                        </div>
                        <div className="mt-2 text-center">
                          <div className="text-sm font-medium">{step.title}</div>
                          <div className="text-xs text-muted-foreground">{step.description}</div>
                        </div>
                      </div>
                      {index < steps.length - 1 && (
                        <div className={cn(
                          "flex-1 h-0.5 mx-4 transition-colors",
                          completedSteps.includes(step.id) ? "bg-primary" : "bg-muted"
                        )} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Controls */}
              <div className="flex justify-between pt-4">
                <Button 
                  variant="outline" 
                  onClick={prevStep}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>
                <Button 
                  onClick={nextStep}
                  disabled={currentStep === steps.length}
                >
                  {currentStep === steps.length ? "Complete" : "Next"}
                  {currentStep < steps.length && <ChevronRight className="w-4 h-4 ml-2" />}
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
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

      {/* Vertical Stepper */}
      <Card>
        <CardHeader>
          <CardTitle>Vertical Stepper</CardTitle>
          <CardDescription>
            Vertical layout stepper with detailed descriptions and icons for each step.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div className={cn(
                      "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors",
                      getStepStatus(step.id) === "completed" ? "bg-primary border-primary text-primary-foreground" :
                      getStepStatus(step.id) === "current" ? "border-primary text-primary bg-background" :
                      "border-muted-foreground text-muted-foreground bg-background"
                    )}>
                      {getStepStatus(step.id) === "completed" ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <step.icon className="w-5 h-5" />
                      )}
                    </div>
                    {index < steps.length - 1 && (
                      <div className={cn(
                        "w-0.5 h-12 mt-2 transition-colors",
                        completedSteps.includes(step.id) ? "bg-primary" : "bg-muted"
                      )} />
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={cn(
                        "font-medium",
                        getStepStatus(step.id) === "current" ? "text-primary" : ""
                      )}>
                        {step.title}
                      </h3>
                      {getStepStatus(step.id) === "current" && (
                        <Badge variant="outline" className="text-xs">Current</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                    {getStepStatus(step.id) === "current" && (
                      <div className="mt-3 p-3 bg-background rounded border">
                        <p className="text-sm">Complete this step to continue with {step.title.toLowerCase()}.</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Vertical Stepper Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.vertical)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.vertical}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Workflow Stepper */}
      <Card>
        <CardHeader>
          <CardTitle>Workflow Stepper</CardTitle>
          <CardDescription>
            Workflow status indicator with different states and approval processes.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="space-y-6">
              <h4 className="font-medium">Document Approval Workflow</h4>
              <div className="flex items-center justify-between">
                {workflowSteps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div className={cn(
                        "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors",
                        step.status === "completed" ? "bg-green-500 border-green-500 text-white" :
                        step.status === "current" ? "border-blue-500 text-blue-500 bg-background" :
                        "border-gray-300 text-gray-400 bg-background"
                      )}>
                        {step.status === "completed" ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Circle className="w-3 h-3 fill-current" />
                        )}
                      </div>
                      <div className="mt-2 text-center">
                        <div className={cn(
                          "text-sm font-medium",
                          step.status === "current" ? "text-blue-600" : 
                          step.status === "completed" ? "text-green-600" : 
                          "text-gray-500"
                        )}>
                          {step.title}
                        </div>
                        <div className="text-xs capitalize text-muted-foreground">
                          {step.status}
                        </div>
                      </div>
                    </div>
                    {index < workflowSteps.length - 1 && (
                      <div className={cn(
                        "w-16 h-0.5 mx-4 transition-colors",
                        step.status === "completed" ? "bg-green-500" : "bg-gray-300"
                      )} />
                    )}
                  </div>
                ))}
              </div>

              {/* Workflow Actions */}
              <div className="bg-background p-4 rounded border">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium">Currently in Review</h5>
                    <p className="text-sm text-muted-foreground">Document is being reviewed by the team</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Reject</Button>
                    <Button size="sm">Approve</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Interactive Stepper Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.interactive)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.interactive}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Supabase Integration */}
      <Card>
        <CardHeader>
          <CardTitle>Supabase Integration</CardTitle>
          <CardDescription>
            Stepper components with persistent state and workflow tracking.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Database Integration</h4>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>• Workflow state persistence and tracking</li>
              <li>• Multi-user approval processes</li>
              <li>• Step completion timestamps</li>
              <li>• Role-based step access control</li>
              <li>• Progress analytics and reporting</li>
            </ul>
          </div>
          
          <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">Workflow Patterns</h4>
            <div className="text-sm text-green-800 dark:text-green-200 space-y-1">
              <code className="block">// Workflow steps</code>
              <code className="block">workflow_steps: id, name, order, status, completed_at</code>
              <code className="block">// User progress</code>
              <code className="block">user_progress: user_id, workflow_id, current_step</code>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Accessibility & Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Accessibility & Guidelines</CardTitle>
          <CardDescription>
            Best practices for implementing accessible stepper components.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Accessibility Features</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• ARIA progressbar and step indicators</li>
                <li>• Keyboard navigation between steps</li>
                <li>• Screen reader step announcements</li>
                <li>• Focus management and indicators</li>
                <li>• High contrast step states</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Best Practices</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Clearly indicate current and completed steps</li>
                <li>• Provide step descriptions and context</li>
                <li>• Allow navigation to previous steps</li>
                <li>• Show overall progress percentage</li>
                <li>• Handle error states appropriately</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}