import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Rating } from '@/components/ui/rating';
import { CodeModal } from '@/components/ui/code-modal';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';

export default function RatingShowcase() {
  const [userRating, setUserRating] = useState(4);
  const [productRating, setProductRating] = useState(3.5);

  const implementationCode = `import { Rating } from '@/components/ui/rating';

function ProductRating() {
  const [rating, setRating] = useState(0);

  return (
    <Rating
      value={rating}
      onChange={setRating}
      max={5}
      allowHalf
    />
  );
}`;

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Rating</h1>
            <p className="text-lg text-muted-foreground">
              Interactive star rating component with support for half ratings and read-only display.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="default">New</Badge>
          <Badge variant="outline">Interactive</Badge>
        </div>
      </div>

      {/* Interactive Rating */}
      <Card>
        <CardHeader>
          <CardTitle>Interactive Rating</CardTitle>
          <CardDescription>
            Click on stars to set a rating value
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm font-medium">Rate this product:</p>
            <Rating
              value={userRating}
              onChange={setUserRating}
              max={5}
            />
          </div>
        </CardContent>
      </Card>

      {/* Different Sizes */}
      <Card>
        <CardHeader>
          <CardTitle>Different Sizes</CardTitle>
          <CardDescription>
            Rating components in various sizes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm font-medium">Small (4.5/5):</p>
            <Rating value={4.5} readOnly size="sm" allowHalf />
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium">Medium (3.8/5):</p>
            <Rating value={3.8} readOnly size="md" allowHalf />
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium">Large (5/5):</p>
            <Rating value={5} readOnly size="lg" />
          </div>
        </CardContent>
      </Card>

      {/* Half Rating Support */}
      <Card>
        <CardHeader>
          <CardTitle>Half Rating Support</CardTitle>
          <CardDescription>
            Interactive rating with half-star precision
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">Product Rating:</p>
            <Rating
              value={productRating}
              onChange={setProductRating}
              max={5}
              allowHalf
            />
          </div>
        </CardContent>
      </Card>

      {/* Read-only Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Read-only Display</CardTitle>
          <CardDescription>
            Display ratings without interaction
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Excellent (5 stars):</p>
              <Rating value={5} readOnly />
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium">Good (4.2 stars):</p>
              <Rating value={4.2} readOnly allowHalf />
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium">Average (3 stars):</p>
              <Rating value={3} readOnly />
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium">Poor (1.5 stars):</p>
              <Rating value={1.5} readOnly allowHalf />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Custom Max Rating */}
      <Card>
        <CardHeader>
          <CardTitle>Custom Maximum</CardTitle>
          <CardDescription>
            Rating with different maximum values
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">Rate out of 10:</p>
            <Rating value={7} readOnly max={10} />
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium">Rate out of 3:</p>
            <Rating value={2} readOnly max={3} />
          </div>
        </CardContent>
      </Card>

      {/* Implementation */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation</CardTitle>
          <CardDescription>How to use the Rating component</CardDescription>
        </CardHeader>
        <CardContent>
          <CodeModal code={implementationCode} title="Rating Example">
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