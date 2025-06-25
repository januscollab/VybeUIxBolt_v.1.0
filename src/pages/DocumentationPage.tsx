
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CodeModal } from "@/components/ui/code-modal";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocalDesignSystem } from "@/hooks/useLocalDesignSystem";
import { Download, Copy, Package, Terminal, FileText, ExternalLink, Palette, Code2 } from "lucide-react";

export default function DocumentationPage() {
  const { colorPalette, typography, brandName, exportSettings } = useLocalDesignSystem();
  const [copySuccess, setCopySuccess] = useState(false);

  const handleExportTokens = () => {
    const designTokens = {
      colors: colorPalette,
      typography: typography,
      metadata: {
        brandName,
        exportedAt: new Date().toISOString(),
        version: "1.0.0"
      }
    };
    
    const blob = new Blob([JSON.stringify(designTokens, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${brandName.toLowerCase()}-design-tokens.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyTokens = async () => {
    const designTokens = {
      colors: colorPalette,
      typography: typography
    };
    
    try {
      await navigator.clipboard.writeText(JSON.stringify(designTokens, null, 2));
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy tokens:', err);
    }
  };

  const installationCode = `npm install @januscollab/janus-design-system
# or
yarn add @januscollab/janus-design-system
# or
pnpm add @januscollab/janus-design-system`;

  const reactUsage = `import { Button, Card, Input } from '@januscollab/janus-design-system';
import '@januscollab/janus-design-system/styles.css';

export function MyComponent() {
  return (
    <Card className="p-6">
      <Input placeholder="Enter your email..." />
      <Button variant="default" className="mt-4">
        Subscribe
      </Button>
    </Card>
  );
}`;

  const vueUsage = `<template>
  <div>
    <janus-card class="p-6">
      <janus-input placeholder="Enter your email..." />
      <janus-button variant="default" class="mt-4">
        Subscribe
      </janus-button>
    </janus-card>
  </div>
</template>

<script>
import { JanusCard, JanusInput, JanusButton } from '@januscollab/janus-design-system/vue';

export default {
  components: {
    JanusCard,
    JanusInput,
    JanusButton
  }
}
</script>`;

  const htmlUsage = `<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://unpkg.com/@januscollab/janus-design-system/dist/styles.css">
</head>
<body>
  <div class="janus-card p-6">
    <input class="janus-input" placeholder="Enter your email..." />
    <button class="janus-button janus-button--default mt-4">
      Subscribe
    </button>
  </div>

  <script src="https://unpkg.com/@januscollab/janus-design-system/dist/janus.min.js"></script>
</body>
</html>`;

  const tailwindConfig = `// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@januscollab/janus-design-system/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '${colorPalette.primary}',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '${colorPalette.secondary}',
          foreground: '#ffffff',
        },
        accent: {
          DEFAULT: '${colorPalette.accent}',
          foreground: '#ffffff',
        },
        background: '${colorPalette.background}',
        foreground: '${colorPalette.text}',
        success: '${colorPalette.success}',
        warning: '${colorPalette.warning}',
        destructive: '${colorPalette.error}',
      },
      fontFamily: {
        primary: ['${typography.primary?.family}', 'sans-serif'],
        secondary: ['${typography.secondary?.family}', 'monospace'],
      }
    },
  },
  plugins: [],
}`;

  const cssVariables = `:root {
  /* Colors */
  --primary: ${colorPalette.primary};
  --secondary: ${colorPalette.secondary};
  --accent: ${colorPalette.accent};
  --background: ${colorPalette.background};
  --foreground: ${colorPalette.text};
  --success: ${colorPalette.success};
  --warning: ${colorPalette.warning};
  --error: ${colorPalette.error};
  
  /* Typography */
  --font-primary: '${typography.primary?.family}', sans-serif;
  --font-secondary: '${typography.secondary?.family}', monospace;
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  
  /* Border Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
}`;

  const nextjsSetup = `// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@januscollab/janus-design-system'],
  experimental: {
    optimizePackageImports: ['@januscollab/janus-design-system']
  }
}

module.exports = nextConfig

// pages/_app.js or app/layout.js
import '@januscollab/janus-design-system/styles.css'

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}`;

  const viteSetup = `// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@januscollab/janus-design-system'],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: \`@import "@januscollab/janus-design-system/tokens";\`
      }
    }
  }
})`;

  const componentExample = `import { useState } from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent,
  Button,
  Input,
  Badge,
  Alert
} from '@januscollab/janus-design-system';

export function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('John Doe');

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          User Profile
          <Badge variant={isEditing ? "warning" : "success"}>
            {isEditing ? "Editing" : "Saved"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isEditing ? (
          <>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
            <div className="flex gap-2">
              <Button onClick={() => setIsEditing(false)}>
                Save
              </Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="text-lg font-medium">{name}</p>
            <Button onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          </>
        )}
        
        <Alert>
          This is a sample component built with ${brandName} Design System
        </Alert>
      </CardContent>
    </Card>
  );
}`;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Integration Guide</h1>
          <p className="text-lg text-muted-foreground">
            Learn how to integrate {brandName} Design System into your projects with comprehensive examples and ready-to-use code.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="default">v1.0.0</Badge>
          <Badge variant="outline">React</Badge>
          <Badge variant="outline">Vue</Badge>
          <Badge variant="outline">TypeScript</Badge>
          <Badge variant="outline">Tailwind CSS</Badge>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4">
        <Button onClick={handleExportTokens}>
          <Download className="h-4 w-4 mr-2" />
          Export Design Tokens
        </Button>
        <Button variant="outline" onClick={handleCopyTokens}>
          <Copy className="h-4 w-4 mr-2" />
          {copySuccess ? "Copied!" : "Copy Tokens"}
        </Button>
        <Button 
          variant="outline"
          onClick={() => window.open('https://github.com/januscollab/janus-design-system', '_blank')}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          View on GitHub
        </Button>
      </div>

      {/* Installation & Usage */}
      <Tabs defaultValue="react" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="react">React / Next.js</TabsTrigger>
          <TabsTrigger value="vue">Vue.js</TabsTrigger>
          <TabsTrigger value="html">HTML / CDN</TabsTrigger>
        </TabsList>
        
        <TabsContent value="react" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Terminal className="h-5 w-5" />
                Installation
              </CardTitle>
              <CardDescription>Install the design system package via npm</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeModal title="React Installation" code={installationCode}>
                <Button variant="outline">
                  <Copy className="h-4 w-4 mr-2" />
                  View Installation
                </Button>
              </CodeModal>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Basic Usage</CardTitle>
              <CardDescription>Import and use components in your React application</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeModal title="React Basic Usage" code={reactUsage}>
                <Button variant="outline">
                  <Code2 className="h-4 w-4 mr-2" />
                  View Example
                </Button>
              </CodeModal>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Complete Component Example</CardTitle>
              <CardDescription>Real-world example showing multiple components working together</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeModal title="Complete React Example" code={componentExample}>
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  View Full Example
                </Button>
              </CodeModal>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vue" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Vue.js Integration</CardTitle>
              <CardDescription>Use our components in Vue.js applications</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeModal title="Vue Usage Example" code={vueUsage}>
                <Button variant="outline">
                  <Code2 className="h-4 w-4 mr-2" />
                  View Vue Example
                </Button>
              </CodeModal>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="html" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>HTML / CDN Integration</CardTitle>
              <CardDescription>Use our design system with plain HTML via CDN</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeModal title="HTML CDN Usage" code={htmlUsage}>
                <Button variant="outline">
                  <Code2 className="h-4 w-4 mr-2" />
                  View HTML Example
                </Button>
              </CodeModal>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Framework Configuration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Next.js Configuration</CardTitle>
            <CardDescription>Setup for Next.js projects with SSR support</CardDescription>
          </CardHeader>
          <CardContent>
            <CodeModal title="Next.js Setup" code={nextjsSetup}>
              <Button variant="outline" className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                View Next.js Config
              </Button>
            </CodeModal>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vite Configuration</CardTitle>
            <CardDescription>Optimize Vite build for our design system</CardDescription>
          </CardHeader>
          <CardContent>
            <CodeModal title="Vite Setup" code={viteSetup}>
              <Button variant="outline" className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                View Vite Config
              </Button>
            </CodeModal>
          </CardContent>
        </Card>
      </div>

      {/* Design Tokens */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Tailwind CSS Configuration
            </CardTitle>
            <CardDescription>Configure Tailwind with our design tokens</CardDescription>
          </CardHeader>
          <CardContent>
            <CodeModal title="Tailwind Config with Design Tokens" code={tailwindConfig}>
              <Button variant="outline" className="w-full">
                <Copy className="h-4 w-4 mr-2" />
                View Tailwind Config
              </Button>
            </CodeModal>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>CSS Custom Properties</CardTitle>
            <CardDescription>Use design tokens as CSS variables</CardDescription>
          </CardHeader>
          <CardContent>
            <CodeModal title="CSS Variables" code={cssVariables}>
              <Button variant="outline" className="w-full">
                <Copy className="h-4 w-4 mr-2" />
                View CSS Variables
              </Button>
            </CodeModal>
          </CardContent>
        </Card>
      </div>

      {/* Component Categories Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Component Categories</CardTitle>
          <CardDescription>
            Explore our organized component library by category with usage examples.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg hover:bg-accent/5 transition-colors">
              <h4 className="font-medium mb-2">Foundation</h4>
              <p className="text-sm text-muted-foreground mb-3">Design tokens, colors, typography</p>
              <code className="text-xs bg-muted px-2 py-1 rounded">import {`{ Button }`} from 'janus'</code>
            </div>
            <div className="p-4 border rounded-lg hover:bg-accent/5 transition-colors">
              <h4 className="font-medium mb-2">Core UI</h4>
              <p className="text-sm text-muted-foreground mb-3">Essential interface components</p>
              <code className="text-xs bg-muted px-2 py-1 rounded">import {`{ Card }`} from 'janus'</code>
            </div>
            <div className="p-4 border rounded-lg hover:bg-accent/5 transition-colors">
              <h4 className="font-medium mb-2">Forms & Input</h4>
              <p className="text-sm text-muted-foreground mb-3">Form controls and inputs</p>
              <code className="text-xs bg-muted px-2 py-1 rounded">import {`{ Input }`} from 'janus'</code>
            </div>
            <div className="p-4 border rounded-lg hover:bg-accent/5 transition-colors">
              <h4 className="font-medium mb-2">Navigation</h4>
              <p className="text-sm text-muted-foreground mb-3">Navigation and menu components</p>
              <code className="text-xs bg-muted px-2 py-1 rounded">import {`{ Breadcrumb }`} from 'janus'</code>
            </div>
            <div className="p-4 border rounded-lg hover:bg-accent/5 transition-colors">
              <h4 className="font-medium mb-2">Layout & Structure</h4>
              <p className="text-sm text-muted-foreground mb-3">Layout and structural elements</p>
              <code className="text-xs bg-muted px-2 py-1 rounded">import {`{ Separator }`} from 'janus'</code>
            </div>
            <div className="p-4 border rounded-lg hover:bg-accent/5 transition-colors">
              <h4 className="font-medium mb-2">Experimental</h4>
              <p className="text-sm text-muted-foreground mb-3">Cutting-edge experimental components</p>
              <code className="text-xs bg-muted px-2 py-1 rounded">import {`{ Badge }`} from 'janus/experimental'</code>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Migration & Support */}
      <Card>
        <CardHeader>
          <CardTitle>Migration & Support</CardTitle>
          <CardDescription>
            Need help migrating from another design system or getting started?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Migration Tools</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Automated tools to help migrate from Material-UI, Ant Design, or Bootstrap.
              </p>
              <Button variant="outline" size="sm">
                Download Migration Guide
              </Button>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Community Support</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Join our community for discussions, support, and contributions.
              </p>
              <Button variant="outline" size="sm">
                Join Discord
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
