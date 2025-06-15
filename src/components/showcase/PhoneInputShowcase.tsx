import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { PhoneInput } from '@/components/ui/phone-input';
import { Button } from '@/components/ui/button';
import { Copy, Phone } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function PhoneInputShowcase() {
  const [numericValue, setNumericValue] = useState("+971557215200");
  const [flagValue, setFlagValue] = useState("+971557215200");

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Code example has been copied to your clipboard.",
    });
  };

  const numericCode = `import { PhoneInput } from '@/components/ui/phone-input';

function MyComponent() {
  const [phone, setPhone] = useState("");

  return (
    <PhoneInput
      value={phone}
      onChange={setPhone}
      variant="numeric"
      defaultCountry="AE"
      placeholder="557215200"
    />
  );
}`;

  const flagCode = `import { PhoneInput } from '@/components/ui/phone-input';

function MyComponent() {
  const [phone, setPhone] = useState("");

  return (
    <PhoneInput
      value={phone}
      onChange={setPhone}
      variant="flag"
      defaultCountry="AE"
      placeholder="557215200"
    />
  );
}`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">Phone Input</h1>
          <Badge variant="default">Stable</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          International phone number input components with country code selection and validation.
        </p>
      </div>

      {/* Numeric Variant */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Numeric Country Codes
          </CardTitle>
          <CardDescription>
            Phone input with numeric country codes dropdown - clean and minimal design
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Phone Number</Label>
              <PhoneInput
                value={numericValue}
                onChange={setNumericValue}
                variant="numeric"
                defaultCountry="AE"
                placeholder="557215200"
              />
              <p className="text-sm text-muted-foreground">
                Current value: {numericValue || "None"}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Code Example</h4>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(numericCode)}
                >
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </Button>
              </div>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{numericCode}</code>
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Flag Variant */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Country Flags with Codes
          </CardTitle>
          <CardDescription>
            Phone input with country flags and codes - enhanced visual identification
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Phone Number</Label>
              <PhoneInput
                value={flagValue}
                onChange={setFlagValue}
                variant="flag"
                defaultCountry="AE"
                placeholder="557215200"
              />
              <p className="text-sm text-muted-foreground">
                Current value: {flagValue || "None"}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Code Example</h4>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(flagCode)}
                >
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </Button>
              </div>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{flagCode}</code>
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Usage Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Examples</CardTitle>
          <CardDescription>
            Different configurations and use cases for phone input components
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">Default Settings</h4>
              <div className="space-y-2">
                <Label>UAE Default</Label>
                <PhoneInput
                  variant="numeric"
                  defaultCountry="AE"
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">US Default with Flags</h4>
              <div className="space-y-2">
                <Label>US Default</Label>
                <PhoneInput
                  variant="flag"
                  defaultCountry="US"
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Disabled State</h4>
              <div className="space-y-2">
                <Label>Disabled Input</Label>
                <PhoneInput
                  variant="numeric"
                  defaultCountry="AE"
                  placeholder="557215200"
                  disabled
                />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Different Placeholder</h4>
              <div className="space-y-2">
                <Label>Custom Placeholder</Label>
                <PhoneInput
                  variant="flag"
                  defaultCountry="GB"
                  placeholder="20 1234 5678"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <Card>
        <CardHeader>
          <CardTitle>Features</CardTitle>
          <CardDescription>
            Key features and capabilities of the phone input components
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-green-600">✓ Core Features</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• International country code support</li>
                <li>• Two visual variants (numeric/flag)</li>
                <li>• Automatic number formatting</li>
                <li>• Country-specific validation</li>
                <li>• Keyboard-only digits input</li>
                <li>• Configurable default country</li>
                <li>• Full TypeScript support</li>
                <li>• Accessible form integration</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-blue-600">📱 Supported Countries</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• UAE, Saudi Arabia, Kuwait</li>
                <li>• United States, Canada</li>
                <li>• United Kingdom, Germany</li>
                <li>• India, Pakistan, Egypt</li>
                <li>• Australia, France, Spain</li>
                <li>• And many more...</li>
                <li>• Easy to extend with more countries</li>
                <li>• Flag emoji support</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}