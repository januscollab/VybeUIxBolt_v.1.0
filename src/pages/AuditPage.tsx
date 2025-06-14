import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertCircle, Clock, FileText, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const AuditPage = () => {
  const auditData = {
    overall: {
      completed: 42,
      total: 45,
      percentage: 93
    },
    sprints: [
      {
        name: "Sprint 6: Advanced Components",
        status: "complete",
        percentage: 100,
        items: [
          { name: "Rich Text Editor", status: "complete", route: "/component/rich-text-editor" },
          { name: "Code Block", status: "complete", route: "/component/code-block" },
          { name: "Rating Component", status: "complete", route: "/component/rating" },
          { name: "Advanced Charts", status: "complete", route: "/component/advanced-chart" },
          { name: "Map Component", status: "complete", route: "/component/map" },
          { name: "Captcha/Anti-spam", status: "complete", route: "/component/captcha" }
        ]
      },
      {
        name: "Sprint 7: Documentation & Guidelines",
        status: "complete", 
        percentage: 100,
        items: [
          { name: "Component Usage Guidelines", status: "complete", route: "/component/component-usage-guidelines" },
          { name: "Design System Documentation", status: "complete", route: "/design-system" },
          { name: "Best Practices Guide", status: "complete", route: "/component/component-usage-guidelines" },
          { name: "Component Analytics", status: "complete", route: "/component/component-analytics" }
        ]
      },
      {
        name: "Sprint 8: Integrations & Export",
        status: "complete",
        percentage: 100,
        items: [
          { name: "Figma Integration", status: "complete", route: "/component/figma-integration" },
          { name: "Export/Import System", status: "complete", route: "/analytics" },
          { name: "Design Token Management", status: "complete", route: "/analytics" },
          { name: "Component Library Export", status: "complete", route: "/analytics" }
        ]
      }
    ],
    missing: [
      { name: "Radio Button Showcase", status: "missing", route: "/component/radio-button" },
      { name: "Loading Spinner Showcase", status: "missing", route: "/component/loading-spinner" },
      { name: "Figma Client Configuration", status: "missing", route: "/settings" }
    ],
    components: {
      total: 45,
      implemented: 42,
      missing: 3
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "complete":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "missing":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case "in-progress":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "complete":
        return <Badge variant="default" className="bg-green-600">Complete</Badge>;
      case "missing":
        return <Badge variant="destructive">Missing</Badge>;
      case "in-progress":
        return <Badge variant="secondary">In Progress</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <FileText className="h-8 w-8" />
          Design System Audit
        </h1>
        <p className="text-muted-foreground mt-2">
          Comprehensive overview of implementation status and outstanding items.
        </p>
      </div>

      {/* Overall Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Progress</CardTitle>
          <CardDescription>
            Current implementation status across all sprints and components
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{auditData.overall.percentage}% Complete</span>
              <span className="text-sm text-muted-foreground">
                {auditData.overall.completed} of {auditData.overall.total} items
              </span>
            </div>
            <Progress value={auditData.overall.percentage} className="h-3" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-green-600">{auditData.components.implemented}</div>
                <div className="text-sm text-muted-foreground">Components Complete</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-red-600">{auditData.components.missing}</div>
                <div className="text-sm text-muted-foreground">Items Missing</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold">{auditData.components.total}</div>
                <div className="text-sm text-muted-foreground">Total Items</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sprint Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {auditData.sprints.map((sprint, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="text-lg">{sprint.name}</span>
                {getStatusBadge(sprint.status)}
              </CardTitle>
              <CardDescription>
                {sprint.percentage}% complete
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={sprint.percentage} className="mb-4" />
              <div className="space-y-2">
                {sprint.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(item.status)}
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={item.route}>
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Missing Items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-600" />
            Outstanding Items
          </CardTitle>
          <CardDescription>
            Items that need attention to reach 100% completion
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {auditData.missing.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50 dark:bg-red-950/20">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <span className="font-medium">{item.name}</span>
                  <Badge variant="destructive">Missing</Badge>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link to={item.route}>
                    View Page
                    <ExternalLink className="h-3 w-3 ml-2" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks to complete the design system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button asChild className="w-full">
              <Link to="/component/radio-button">
                Fix Radio Button
              </Link>
            </Button>
            <Button asChild className="w-full">
              <Link to="/component/loading-spinner">
                Fix Loading Spinner
              </Link>
            </Button>
            <Button asChild className="w-full">
              <Link to="/settings">
                Configure Figma
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link to="/analytics">
                Export System
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditPage;