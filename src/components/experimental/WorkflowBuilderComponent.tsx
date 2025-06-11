import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge as StatusBadge } from "@/components/ui/badge";
import { 
  Zap, Plus, ArrowRight, Settings, Play, Pause, Trash2, Copy, 
  Mail, Calendar, Database, Webhook, Filter, Clock, Users, FileText,
  Globe, MessageSquare, ShoppingCart, CreditCard, BarChart, Bell
} from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface WorkflowStep {
  id: string;
  type: 'trigger' | 'action' | 'filter' | 'delay';
  app: string;
  action: string;
  config: Record<string, any>;
  isActive: boolean;
}

export default function WorkflowBuilderComponent() {
  const [workflow, setWorkflow] = useState<WorkflowStep[]>([
    {
      id: '1',
      type: 'trigger',
      app: 'Gmail',
      action: 'New Email Received',
      config: { filter: 'from:important@company.com' },
      isActive: true
    },
    {
      id: '2',
      type: 'filter',
      app: 'Filter',
      action: 'Only Continue If',
      config: { condition: 'Subject contains "urgent"' },
      isActive: true
    },
    {
      id: '3',
      type: 'action',
      app: 'Slack',
      action: 'Send Message',
      config: { channel: '#urgent-alerts', message: 'New urgent email received' },
      isActive: true
    }
  ]);

  const [isRunning, setIsRunning] = useState(false);

  const availableApps = [
    { name: 'Gmail', icon: Mail, category: 'Email', triggers: ['New Email', 'Email Starred'], actions: ['Send Email', 'Create Draft'] },
    { name: 'Slack', icon: MessageSquare, category: 'Communication', triggers: ['New Message', 'Mention'], actions: ['Send Message', 'Create Channel'] },
    { name: 'Google Calendar', icon: Calendar, category: 'Productivity', triggers: ['New Event', 'Event Updated'], actions: ['Create Event', 'Update Event'] },
    { name: 'Airtable', icon: Database, category: 'Database', triggers: ['New Record', 'Record Updated'], actions: ['Create Record', 'Update Record'] },
    { name: 'Shopify', icon: ShoppingCart, category: 'E-commerce', triggers: ['New Order', 'Product Updated'], actions: ['Create Product', 'Update Inventory'] },
    { name: 'Stripe', icon: CreditCard, category: 'Payments', triggers: ['Payment Succeeded', 'Subscription Created'], actions: ['Create Customer', 'Send Invoice'] },
    { name: 'Webhooks', icon: Webhook, category: 'Developer', triggers: ['Webhook Received'], actions: ['Send Webhook'] },
    { name: 'Analytics', icon: BarChart, category: 'Data', triggers: ['Goal Completed', 'Traffic Spike'], actions: ['Track Event', 'Generate Report'] }
  ];

  const getStepIcon = (type: string) => {
    switch (type) {
      case 'trigger': return Zap;
      case 'action': return Play;
      case 'filter': return Filter;
      case 'delay': return Clock;
      default: return Settings;
    }
  };

  const getStepColor = (type: string) => {
    switch (type) {
      case 'trigger': return 'bg-zapier-orange';
      case 'action': return 'bg-primary';
      case 'filter': return 'bg-warning';
      case 'delay': return 'bg-info';
      default: return 'bg-muted';
    }
  };

  const addStep = (afterId: string) => {
    const newStep: WorkflowStep = {
      id: Date.now().toString(),
      type: 'action',
      app: 'Gmail',
      action: 'Send Email',
      config: {},
      isActive: true
    };
    
    const index = workflow.findIndex(step => step.id === afterId);
    const newWorkflow = [...workflow];
    newWorkflow.splice(index + 1, 0, newStep);
    setWorkflow(newWorkflow);
  };

  const runWorkflow = () => {
    setIsRunning(true);
    toast({
      title: "Workflow Started",
      description: "Your automation workflow is now running...",
    });
    
    setTimeout(() => {
      setIsRunning(false);
      toast({
        title: "Workflow Completed",
        description: "All steps executed successfully!",
      });
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">Workflow Builder</h1>
          <Badge variant="outline" className="border-orange-500 text-orange-600">
            Experimental
          </Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Visual workflow builder for creating automation workflows with drag-and-drop simplicity.
        </p>
      </div>

      <Tabs defaultValue="builder" className="space-y-6">
        <TabsList>
          <TabsTrigger value="builder">Workflow Builder</TabsTrigger>
          <TabsTrigger value="apps">Available Apps</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="builder" className="space-y-6">
          {/* Workflow Controls */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Email to Slack Urgent Alerts
                  </CardTitle>
                  <CardDescription>Automatically forward urgent emails to Slack</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge variant={isRunning ? "default" : "secondary"}>
                    {isRunning ? "Running" : "Paused"}
                  </StatusBadge>
                  <Button 
                    onClick={runWorkflow}
                    disabled={isRunning}
                    className="ml-2"
                  >
                    {isRunning ? (
                      <>
                        <Pause className="h-4 w-4 mr-2" />
                        Running...
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Test Workflow
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Workflow Steps */}
          <div className="space-y-4">
            {workflow.map((step, index) => {
              const StepIcon = getStepIcon(step.type);
              return (
                <div key={step.id} className="relative">
                  <Card className="group hover:shadow-md transition-all duration-200">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        {/* Step Icon */}
                        <div className={`p-3 rounded-lg ${getStepColor(step.type)} text-white flex-shrink-0`}>
                          <StepIcon className="h-5 w-5" />
                        </div>

                        {/* Step Content */}
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="capitalize">
                              {step.type}
                            </Badge>
                            <span className="font-medium">{step.app}</span>
                          </div>
                          <div className="text-lg font-semibold">{step.action}</div>
                          <div className="text-sm text-muted-foreground">
                            {step.type === 'trigger' && 'When this happens...'}
                            {step.type === 'action' && 'Do this...'}
                            {step.type === 'filter' && 'Only continue if...'}
                            {step.type === 'delay' && 'Wait for...'}
                          </div>
                        </div>

                        {/* Step Actions */}
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Configuration Preview */}
                      {Object.keys(step.config).length > 0 && (
                        <div className="mt-4 p-3 bg-muted rounded-lg">
                          <div className="text-sm font-medium mb-2">Configuration:</div>
                          <div className="text-sm text-muted-foreground">
                            {Object.entries(step.config).map(([key, value]) => (
                              <div key={key} className="flex gap-2">
                                <span className="capitalize">{key}:</span>
                                <span className="font-mono">{String(value)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Add Step Button */}
                  {index < workflow.length - 1 && (
                    <div className="flex justify-center my-2">
                      <ArrowRight className="h-6 w-6 text-muted-foreground" />
                    </div>
                  )}
                  
                  <div className="flex justify-center my-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addStep(step.id)}
                      className="group-hover:opacity-100 opacity-0 transition-opacity"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Step
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="apps" className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Available Applications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableApps.map((app) => {
                const AppIcon = app.icon;
                return (
                  <Card key={app.name} className="group hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-muted rounded-lg">
                          <AppIcon className="h-6 w-6" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{app.name}</CardTitle>
                          <CardDescription>{app.category}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <div className="text-sm font-medium mb-1">Triggers:</div>
                        <div className="flex flex-wrap gap-1">
                          {app.triggers.map((trigger) => (
                            <Badge key={trigger} variant="outline" className="text-xs">
                              {trigger}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium mb-1">Actions:</div>
                        <div className="flex flex-wrap gap-1">
                          {app.actions.map((action) => (
                            <Badge key={action} variant="secondary" className="text-xs">
                              {action}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Workflow Templates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="group hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Lead Notification System
                  </CardTitle>
                  <CardDescription>Notify team when new leads are captured</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div>1. Form submission received</div>
                    <div>2. Add to CRM database</div>
                    <div>3. Send Slack notification</div>
                    <div>4. Create follow-up task</div>
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    Use Template
                  </Button>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    Order Processing
                  </CardTitle>
                  <CardDescription>Automate order fulfillment workflow</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div>1. New order received</div>
                    <div>2. Check inventory levels</div>
                    <div>3. Create shipping label</div>
                    <div>4. Send confirmation email</div>
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Feature Highlights */}
      <Card>
        <CardHeader>
          <CardTitle>Workflow Builder Features</CardTitle>
          <CardDescription>Advanced automation capabilities</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-success">Powerful Features</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Visual drag-and-drop workflow builder</li>
                <li>• 1000+ app integrations available</li>
                <li>• Real-time workflow testing and debugging</li>
                <li>• Conditional logic and branching</li>
                <li>• Error handling and retry mechanisms</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-info">Use Cases</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Customer onboarding automation</li>
                <li>• Lead nurturing campaigns</li>
                <li>• Data synchronization between apps</li>
                <li>• Notification and alerting systems</li>
                <li>• Content publishing workflows</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}