import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, InfoIcon, AlertTriangleIcon, CheckCircleIcon, AlertCircleIcon } from 'lucide-react';

interface BannerProps {
  variant: 'info' | 'warning' | 'success' | 'error';
  children: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
}

function Banner({ variant, children, dismissible = false, onDismiss }: BannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const variants = {
    info: {
      bg: 'bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800',
      text: 'text-blue-800 dark:text-blue-200',
      icon: InfoIcon
    },
    warning: {
      bg: 'bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800',
      text: 'text-yellow-800 dark:text-yellow-200',
      icon: AlertTriangleIcon
    },
    success: {
      bg: 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800',
      text: 'text-green-800 dark:text-green-200',
      icon: CheckCircleIcon
    },
    error: {
      bg: 'bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800',
      text: 'text-red-800 dark:text-red-200',
      icon: AlertCircleIcon
    }
  };

  const config = variants[variant];
  const Icon = config.icon;

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  return (
    <div className={`border rounded-lg p-4 ${config.bg} ${config.text}`}>
      <div className="flex items-start gap-3">
        <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
        <div className="flex-1">{children}</div>
        {dismissible && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDismiss}
            className={`h-6 w-6 p-0 ${config.text} hover:bg-black/10`}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

export default function BannerShowcase() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Banner</CardTitle>
          <CardDescription>
            Prominent messaging for important announcements
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Basic Banners</h4>
            
            <Banner variant="info">
              <div>
                <div className="font-medium">New feature available</div>
                <div className="text-sm mt-1">
                  We've added dark mode support to all components. Try it out in your settings.
                </div>
              </div>
            </Banner>

            <Banner variant="warning">
              <div>
                <div className="font-medium">Maintenance scheduled</div>
                <div className="text-sm mt-1">
                  Our services will be temporarily unavailable on Sunday, March 15th from 2-4 AM EST.
                </div>
              </div>
            </Banner>

            <Banner variant="success">
              <div>
                <div className="font-medium">Payment successful</div>
                <div className="text-sm mt-1">
                  Your subscription has been renewed successfully. Thank you for your continued support.
                </div>
              </div>
            </Banner>

            <Banner variant="error">
              <div>
                <div className="font-medium">Action required</div>
                <div className="text-sm mt-1">
                  Your account will be suspended in 3 days. Please update your payment method to continue using our services.
                </div>
              </div>
            </Banner>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium">Dismissible Banners</h4>
            
            <Banner variant="info" dismissible>
              <div>
                <div className="font-medium">Cookie notice</div>
                <div className="text-sm mt-1">
                  We use cookies to improve your experience. By continuing to use our site, you accept our cookie policy.
                </div>
              </div>
            </Banner>

            <Banner variant="warning" dismissible>
              <div>
                <div className="font-medium">Browser not supported</div>
                <div className="text-sm mt-1">
                  For the best experience, please use a modern browser like Chrome, Firefox, or Safari.
                </div>
              </div>
            </Banner>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium">Banner with Actions</h4>
            
            <Banner variant="info">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Update available</div>
                  <div className="text-sm mt-1">
                    Version 2.0 is ready to install with new features and improvements.
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button size="sm" variant="outline" className="text-blue-700 border-blue-300 hover:bg-blue-100">
                    Later
                  </Button>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Update now
                  </Button>
                </div>
              </div>
            </Banner>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}