import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CodeModal } from "@/components/ui/code-modal";
import { Button } from "@/components/ui/button";
import { Download, Copy, Package, Terminal, FileText } from "lucide-react";

export default function DocumentationPage() {
  const installationCode = `npm install @your-design-system/components
# or
yarn add @your-design-system/components
# or
pnpm add @your-design-system/components`;

  const importExample = `import { Button, Card, Input } from '@your-design-system/components';
import '@your-design-system/components/styles.css';

export function MyComponent() {
  return (
    <Card>
      <Input placeholder="Enter text..." />
      <Button>Submit</Button>
    </Card>
  );
}`;

  const tailwindConfig = `// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@your-design-system/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ff6900',
          foreground: '#ffffff',
        },
        // ... other colors
      },
    },
  },
  plugins: [],
}`;

  const nextjsSetup = `// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@your-design-system/components'],
}

module.exports = nextConfig`;

  const viteSetup = `// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@your-design-system/components'],
  },
})`;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Documentation</h1>
          <p className="text-lg text-muted-foreground">
            Learn how to integrate our design system into your projects.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="default">v1.0.0</Badge>
          <Badge variant="outline">React</Badge>
          <Badge variant="outline">TypeScript</Badge>
          <Badge variant="outline">Tailwind CSS</Badge>
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
            Get up and running with our design system in minutes.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium">1. Install the package</h4>
            <CodeModal title="Installation" code={installationCode}>
              <Button variant="outline" size="sm">
                <Copy className="h-4 w-4 mr-2" />
                View Installation
              </Button>
            </CodeModal>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <h4 className="font-medium">2. Import and use components</h4>
            <CodeModal title="Basic Usage" code={importExample}>
              <Button variant="outline" size="sm">
                <Copy className="h-4 w-4 mr-2" />
                View Usage Example
              </Button>
            </CodeModal>
          </div>
        </CardContent>
      </Card>

      {/* Framework Integration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Next.js Setup</CardTitle>
            <CardDescription>Configure for Next.js projects</CardDescription>
          </CardHeader>
          <CardContent>
            <CodeModal title="Next.js Configuration" code={nextjsSetup}>
              <Button variant="outline" className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                View Next.js Config
              </Button>
            </CodeModal>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vite Setup</CardTitle>
            <CardDescription>Configure for Vite projects</CardDescription>
          </CardHeader>
          <CardContent>
            <CodeModal title="Vite Configuration" code={viteSetup}>
              <Button variant="outline" className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                View Vite Config
              </Button>
            </CodeModal>
          </CardContent>
        </Card>
      </div>

      {/* Tailwind Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Tailwind CSS Configuration</CardTitle>
          <CardDescription>
            Configure Tailwind CSS to work with our design system colors and tokens.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CodeModal title="Tailwind Configuration" code={tailwindConfig}>
            <Button variant="outline">
              <Copy className="h-4 w-4 mr-2" />
              View Tailwind Config
            </Button>
          </CodeModal>
        </CardContent>
      </Card>

      {/* Component Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Component Categories</CardTitle>
          <CardDescription>
            Explore our organized component library by category.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Foundation</h4>
              <p className="text-sm text-muted-foreground">Design tokens, colors, typography</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Core UI</h4>
              <p className="text-sm text-muted-foreground">Essential interface components</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Forms & Input</h4>
              <p className="text-sm text-muted-foreground">Form controls and inputs</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Navigation</h4>
              <p className="text-sm text-muted-foreground">Navigation and menu components</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Layout & Structure</h4>
              <p className="text-sm text-muted-foreground">Layout and structural elements</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Rich Text Editor</h4>
              <p className="text-sm text-muted-foreground">Rich text editing tools</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Support */}
      <Card>
        <CardHeader>
          <CardTitle>Support & Resources</CardTitle>
          <CardDescription>
            Need help? Here are some resources to get you started.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Community</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Join our community for discussions and support.
              </p>
              <Button variant="outline" size="sm">
                Join Discord
              </Button>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">GitHub</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Report issues, contribute, or view the source code.
              </p>
              <Button variant="outline" size="sm">
                View Repository
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
