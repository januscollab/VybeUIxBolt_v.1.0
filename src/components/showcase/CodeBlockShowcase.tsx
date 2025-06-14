import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CodeBlock } from '@/components/ui/code-block';
import { CodeModal } from '@/components/ui/code-modal';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';

export default function CodeBlockShowcase() {
  const jsExample = `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Usage example
console.log(fibonacci(10)); // Output: 55`;

  const tsExample = `interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

class UserService {
  private users: User[] = [];

  async createUser(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const user: User = {
      id: crypto.randomUUID(),
      ...userData,
      createdAt: new Date()
    };
    
    this.users.push(user);
    return user;
  }
}`;

  const pythonExample = `def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    return quick_sort(left) + middle + quick_sort(right)

# Example usage
numbers = [3, 6, 8, 10, 1, 2, 1]
sorted_numbers = quick_sort(numbers)
print(sorted_numbers)`;

  const implementationCode = `import { CodeBlock } from '@/components/ui/code-block';

function Example() {
  const code = \`function hello() {
  console.log("Hello, World!");
}\`;

  return (
    <CodeBlock
      code={code}
      language="javascript"
      filename="example.js"
      showLineNumbers
    />
  );
}`;

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Code Block</h1>
            <p className="text-lg text-muted-foreground">
              Display code with syntax highlighting, copy functionality, and optional line numbers.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="default">New</Badge>
          <Badge variant="outline">Developer</Badge>
        </div>
      </div>

      {/* JavaScript Example */}
      <Card>
        <CardHeader>
          <CardTitle>JavaScript Code</CardTitle>
          <CardDescription>
            Code block with filename and copy functionality
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CodeBlock
            code={jsExample}
            language="javascript"
            filename="fibonacci.js"
          />
        </CardContent>
      </Card>

      {/* TypeScript with Line Numbers */}
      <Card>
        <CardHeader>
          <CardTitle>TypeScript with Line Numbers</CardTitle>
          <CardDescription>
            Code block displaying line numbers for better reference
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CodeBlock
            code={tsExample}
            language="typescript"
            filename="user-service.ts"
            showLineNumbers
          />
        </CardContent>
      </Card>

      {/* Python Example */}
      <Card>
        <CardHeader>
          <CardTitle>Python Algorithm</CardTitle>
          <CardDescription>
            Multi-language support with syntax highlighting
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CodeBlock
            code={pythonExample}
            language="python"
            filename="quicksort.py"
            showLineNumbers
          />
        </CardContent>
      </Card>

      {/* Simple Code Block */}
      <Card>
        <CardHeader>
          <CardTitle>Simple Code Block</CardTitle>
          <CardDescription>
            Minimal code block without additional features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CodeBlock
            code="npm install @vybeui/components"
            language="bash"
            copyable={false}
          />
        </CardContent>
      </Card>

      {/* Implementation */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation</CardTitle>
          <CardDescription>How to use the Code Block component</CardDescription>
        </CardHeader>
        <CardContent>
          <CodeModal code={implementationCode} title="Code Block Example">
            <Button variant="outline">
              <Copy className="h-4 w-4 mr-2" />
              View Code
            </Button>
          </CodeModal>
        </CardContent>
      </Card>
    </div>
  );
}