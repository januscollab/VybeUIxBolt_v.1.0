import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { PhoneInput } from '@/components/ui/phone-input';
import { Button } from '@/components/ui/button';
import { CodeModal } from '@/components/ui/code-modal';
import { Copy, Phone, Code } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function PhoneInputShowcase() {
  const [numericValue, setNumericValue] = useState("+971557215200");
  const [flagValue, setFlagValue] = useState("+971557215200");


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

            <CodeModal 
              title="Numeric Phone Input Code"
              code={numericCode}
            />
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

            <CodeModal 
              title="Flag Phone Input Code"
              code={flagCode}
            />
          </div>
        </CardContent>
      </Card>

      {/* Usage Examples */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Usage Examples</h2>
        <p className="text-muted-foreground">
          Different configurations and use cases for phone input components
        </p>
        
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
      </div>

      {/* Guidelines */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Guidelines</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-green-600">✓ Core Features</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• International country code support (249 countries)</li>
              <li>• Two visual variants (numeric/flag)</li>
              <li>• Automatic number formatting</li>
              <li>• Country-specific validation</li>
              <li>• Keyboard-only digits input</li>
              <li>• Configurable default country</li>
              <li>• Full TypeScript support</li>
              <li>• Accessible form integration</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-600">📱 Best Practices</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Use flag variant for international forms</li>
              <li>• Use numeric variant for simple, clean designs</li>
              <li>• Set appropriate default country for your users</li>
              <li>• Provide clear placeholder examples</li>
              <li>• Always validate phone numbers server-side</li>
              <li>• Consider country-specific formatting rules</li>
              <li>• Test with various country codes</li>
              <li>• Ensure accessibility with proper labels</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}