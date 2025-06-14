import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Copy, Figma, FileCode, Shield, Smartphone, Lock } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export default function InputOTPShowcase() {
  const [value4, setValue4] = useState("");
  const [value6, setValue6] = useState("");
  const [value8, setValue8] = useState("");

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Code example has been copied to your clipboard.",
    });
  };

  const codeExamples = {
    basic: `import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const [value, setValue] = useState("");

<InputOTP maxLength={6} value={value} onChange={setValue}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`,
    separator: `<InputOTP maxLength={6} value={value} onChange={setValue}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`,
    pattern: `// Only allow digits
<InputOTP
  maxLength={6}
  pattern={REGEXP_ONLY_DIGITS}
  value={value}
  onChange={setValue}
>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`
  };

  const handleComplete = (type: string, value: string) => {
    toast({
      title: "OTP Complete",
      description: `${type} OTP entered: ${value}`,
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Input OTP</h1>
            <p className="text-lg text-muted-foreground">
              One-time password input component for authentication and verification.
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
          <Badge variant="outline">Input</Badge>
          <Badge variant="outline">Security</Badge>
        </div>
      </div>

      {/* Basic OTP Input */}
      <Card>
        <CardHeader>
          <CardTitle>Basic OTP Input</CardTitle>
          <CardDescription>
            Simple 6-digit OTP input for verification codes.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="flex flex-col items-center space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-medium">Enter Verification Code</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Please enter the 6-digit code sent to your phone
                </p>
              </div>
              <InputOTP 
                maxLength={6} 
                value={value6} 
                onChange={(value) => {
                  setValue6(value);
                  if (value.length === 6) {
                    handleComplete("6-digit", value);
                  }
                }}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              {value6 && (
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Entered: <span className="font-mono">{value6}</span>
                  </p>
                </div>
              )}
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

      {/* OTP with Separator */}
      <Card>
        <CardHeader>
          <CardTitle>OTP with Separator</CardTitle>
          <CardDescription>
            OTP input with visual separator for better readability.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="flex flex-col items-center space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-medium flex items-center justify-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Verification
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Enter the code from your authenticator app
                </p>
              </div>
              <InputOTP 
                maxLength={6} 
                value={value6} 
                onChange={(value) => {
                  setValue6(value);
                  if (value.length === 6) {
                    handleComplete("Separated", value);
                  }
                }}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Separator Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.separator)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.separator}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Different Lengths */}
      <Card>
        <CardHeader>
          <CardTitle>Different OTP Lengths</CardTitle>
          <CardDescription>
            OTP inputs with various lengths for different use cases.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="space-y-8">
              
              {/* 4-digit PIN */}
              <div className="flex flex-col items-center space-y-3">
                <div className="text-center">
                  <h4 className="font-medium flex items-center justify-center gap-2">
                    <Lock className="h-4 w-4" />
                    4-Digit PIN
                  </h4>
                  <p className="text-xs text-muted-foreground">For quick access</p>
                </div>
                <InputOTP 
                  maxLength={4} 
                  value={value4} 
                  onChange={(value) => {
                    setValue4(value);
                    if (value.length === 4) {
                      handleComplete("4-digit PIN", value);
                    }
                  }}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              {/* 8-digit code */}
              <div className="flex flex-col items-center space-y-3">
                <div className="text-center">
                  <h4 className="font-medium flex items-center justify-center gap-2">
                    <Smartphone className="h-4 w-4" />
                    8-Digit Backup Code
                  </h4>
                  <p className="text-xs text-muted-foreground">Recovery authentication</p>
                </div>
                <InputOTP 
                  maxLength={8} 
                  value={value8} 
                  onChange={(value) => {
                    setValue8(value);
                    if (value.length === 8) {
                      handleComplete("8-digit backup", value);
                    }
                  }}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                    <InputOTPSlot index={6} />
                    <InputOTPSlot index={7} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

            </div>
          </div>
        </CardContent>
      </Card>

      {/* Authentication Flow */}
      <Card>
        <CardHeader>
          <CardTitle>Complete Authentication Flow</CardTitle>
          <CardDescription>
            Real-world example with error handling and loading states.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="max-w-md mx-auto space-y-6">
              
              <div className="text-center space-y-2">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Two-Factor Authentication</h3>
                <p className="text-sm text-muted-foreground">
                  We've sent a verification code to your registered mobile number ending in ****1234
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-center">
                  <InputOTP maxLength={6} value={value6} onChange={setValue6}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                <div className="flex justify-center">
                  <Button 
                    className="w-full max-w-xs" 
                    disabled={value6.length !== 6}
                  >
                    Verify Code
                  </Button>
                </div>

                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Didn't receive the code?
                  </p>
                  <Button variant="ghost" size="sm">
                    Resend code
                  </Button>
                </div>
              </div>

            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Pattern Validation Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.pattern)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.pattern}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Implementation Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation Guidelines</CardTitle>
          <CardDescription>
            Best practices for OTP input components and security.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Features</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Auto-focus on input</li>
                <li>• Keyboard navigation</li>
                <li>• Pattern validation</li>
                <li>• Paste support</li>
                <li>• Accessible labels</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Best Practices</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Clear visual feedback</li>
                <li>• Appropriate input length</li>
                <li>• Resend functionality</li>
                <li>• Error state handling</li>
                <li>• Auto-submit when complete</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}