import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CodeModal } from '@/components/ui/code-modal';
import { Button } from '@/components/ui/button';
import { Code, Copy, Download, Package, Terminal, FileText } from 'lucide-react';

export default function DocumentationPage() {
  const installationCode = `npm install @vybeui/design-system

# or with yarn
yarn add @vybeui/design-system

# or with pnpm
pnpm add @vybeui/design-system`;

  const importCode = `import { Button, Card, Input } from '@vybeui/design-system';
import '@vybeui/design-system/dist/styles.css';

function App() {
  return (
    <div>
      <Card>
        <h1>Welcome to VybeUI</h1>
        <Button variant="primary">Get Started</Button>
      </Card>
    </div>
  );
}`;

  const tailwindConfigCode = `// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@vybeui/design-system/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B35',
        secondary: '#6B7280',
        // ... other VybeUI colors
      }
    }
  },
  plugins: []
}`;

  const componentUsageCode = `import { Button, Input, Card } from '@vybeui/design-system';

// Basic usage
<Button variant="primary" size="lg">
  Click me
</Button>

// With custom styling
<Input 
  placeholder="Enter your email"
  className="mb-4"
/>

// Card component
<Card className="p-6">
  <h2>Card Title</h2>
  <p>Card content goes here</p>
</Card>`;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Documentation</h1>
          <p className="text-lg text-muted-foreground">
            Complete guide for importing and using VybeUI components in your projects.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="default">Getting Started</Badge>
          <Badge variant="outline">Installation Guide</Badge>
        </div>
      </div>

      {/* Quick Start */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Terminal className="h-5 w-5" />
            Quick Start
          </CardTitle>
          <CardDescription>
            Get up and running with VybeUI in minutes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium">1. Install the package</h4>
            <CodeModal code={installationCode} title="Installation">
              <Button variant="outline" size="sm">
                <Code className="h-4 w-4 mr-2" />
                View Installation Code
              </Button>
            </CodeModal>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium">2. Import and use components</h4>
            <CodeModal code={importCode} title="Basic Import">
              <Button variant="outline" size="sm">
                <Code className="h-4 w-4 mr-2" />
                View Import Example
              </Button>
            </CodeModal>
          </div>
        </CardContent>
      </Card>

      {/* Installation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Installation
          </CardTitle>
          <CardDescription>
            Step-by-step installation instructions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Prerequisites</h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>• React 18.0 or higher</li>
                <li>• TypeScript (recommended)</li>
                <li>• Tailwind CSS 3.0 or higher</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Package Manager</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Choose your preferred package manager:
              </p>
              <CodeModal code={installationCode} title="Installation Options">
                <Button variant="outline" size="sm">
                  <Code className="h-4 w-4 mr-2" />
                  Installation Commands
                </Button>
              </CodeModal>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Configuration</CardTitle>
          <CardDescription>
            Configure Tailwind CSS and project settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Tailwind Configuration</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Update your tailwind.config.js to include VybeUI styles:
            </p>
            <CodeModal code={tailwindConfigCode} title="Tailwind Config">
              <Button variant="outline" size="sm">
                <Code className="h-4 w-4 mr-2" />
                View Tailwind Config
              </Button>
            </CodeModal>
          </div>
        </CardContent>
      </Card>

      {/* Usage Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Examples</CardTitle>
          <CardDescription>
            Common patterns and component usage
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Basic Components</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Here are some common usage patterns:
            </p>
            <CodeModal code={componentUsageCode} title="Component Usage">
              <Button variant="outline" size="sm">
                <Code className="h-4 w-4 mr-2" />
                View Usage Examples
              </Button>
            </CodeModal>
          </div>
        </CardContent>
      </Card>

      {/* Support */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Support & Resources
          </CardTitle>
          <CardDescription>
            Additional resources and help
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Component Library</h4>
              <p className="text-sm text-muted-foreground">
                Browse all available components with live examples and code snippets.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">GitHub Repository</h4>
              <p className="text-sm text-muted-foreground">
                Access source code, report issues, and contribute to the project.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
