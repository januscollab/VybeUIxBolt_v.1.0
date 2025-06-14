import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Copy, Figma, FileCode, Calendar as CalendarIcon, Clock, MapPin } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

export default function CalendarShowcase() {
  const [date, setDate] = useState<Date>();
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined } | undefined>();
  const [multipleDates, setMultipleDates] = useState<Date[]>([]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Code example has been copied to your clipboard.",
    });
  };

  const codeExamples = {
    basic: `import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

const [date, setDate] = useState<Date>();

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  className="rounded-md border"
/>`,
    datePicker: `import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
      <CalendarIcon className="mr-2 h-4 w-4" />
      {date ? format(date, "PPP") : <span>Pick a date</span>}
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-auto p-0" align="start">
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      initialFocus
      className="pointer-events-auto"
    />
  </PopoverContent>
</Popover>`,
    range: `<Calendar
  mode="range"
  selected={dateRange}
  onSelect={setDateRange}
  numberOfMonths={2}
  className="rounded-md border"
/>`
  };

  const events = [
    { date: new Date(2024, 11, 15), title: "Team Meeting", time: "10:00 AM" },
    { date: new Date(2024, 11, 18), title: "Project Review", time: "2:00 PM" },
    { date: new Date(2024, 11, 22), title: "Client Call", time: "11:30 AM" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Calendar</h1>
            <p className="text-lg text-muted-foreground">
              Date selection component with single, multiple, and range selection modes.
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
          <Badge variant="outline">Date</Badge>
          <Badge variant="outline">Selection</Badge>
        </div>
      </div>

      {/* Basic Calendar */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Calendar</CardTitle>
          <CardDescription>
            Simple calendar with single date selection.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border bg-background"
              />
            </div>
            {date && (
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Selected date: <span className="font-medium">{format(date, "PPP")}</span>
                </p>
              </div>
            )}
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

      {/* Date Picker */}
      <Card>
        <CardHeader>
          <CardTitle>Date Picker</CardTitle>
          <CardDescription>
            Calendar in a popover for form inputs and date selection.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="flex justify-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Date Picker Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.datePicker)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.datePicker}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Range Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Date Range Selection</CardTitle>
          <CardDescription>
            Calendar with range selection for booking and scheduling.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="flex justify-center">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
                className="rounded-md border bg-background"
              />
            </div>
            {(dateRange?.from || dateRange?.to) && (
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">
                  {dateRange?.from && (
                    <>From: <span className="font-medium">{format(dateRange.from, "PPP")}</span></>
                  )}
                  {dateRange?.from && dateRange?.to && <span className="mx-2">•</span>}
                  {dateRange?.to && (
                    <>To: <span className="font-medium">{format(dateRange.to, "PPP")}</span></>
                  )}
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-medium">Range Selection Code</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(codeExamples.range)}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{codeExamples.range}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Calendar with Events */}
      <Card>
        <CardHeader>
          <CardTitle>Calendar with Events</CardTitle>
          <CardDescription>
            Calendar displaying events and appointments.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border bg-background"
                  modifiers={{
                    hasEvent: events.map(event => event.date)
                  }}
                  modifiersStyles={{
                    hasEvent: { backgroundColor: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }
                  }}
                />
              </div>
              <div className="space-y-4">
                <h4 className="font-medium">Upcoming Events</h4>
                <div className="space-y-3">
                  {events.map((event, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg border bg-background">
                      <div className="flex-shrink-0 w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
                        <CalendarIcon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="text-sm font-medium">{event.title}</h5>
                        <div className="flex items-center space-x-2 mt-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{event.time}</span>
                          <span>•</span>
                          <span>{format(event.date, "MMM d, yyyy")}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Implementation Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation Guidelines</CardTitle>
          <CardDescription>
            Best practices for calendar components and date selection.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Features</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Single, multiple, and range selection</li>
                <li>• Keyboard navigation support</li>
                <li>• Customizable date modifiers</li>
                <li>• Accessibility compliant</li>
                <li>• Internationalization support</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Best Practices</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Use appropriate selection mode</li>
                <li>• Provide clear visual feedback</li>
                <li>• Handle disabled dates gracefully</li>
                <li>• Consider mobile interactions</li>
                <li>• Validate date ranges</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}