
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";

export default function DatePickerShowcase() {
  const [date, setDate] = useState<Date>();
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [birthDate, setBirthDate] = useState<Date>();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">Date Picker</h1>
          <Badge variant="default">Stable</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Calendar-based date selection components with various configurations and formats.
        </p>
      </div>

      {/* Basic Date Picker */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Date Picker</CardTitle>
          <CardDescription>Simple date selection with calendar popup</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Select Date</Label>
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
            {date && (
              <div className="text-sm text-muted-foreground">
                Selected: {format(date, "EEEE, MMMM do, yyyy")}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Date Range Picker */}
      <Card>
        <CardHeader>
          <CardTitle>Date Range Picker</CardTitle>
          <CardDescription>Select a range of dates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Select Date Range</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[300px] justify-start text-left font-normal",
                      !dateRange?.from && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange?.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL dd, y")} -{" "}
                          {format(dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            {dateRange?.from && (
              <div className="text-sm text-muted-foreground">
                {dateRange.to 
                  ? `Range: ${format(dateRange.from, "MMM dd")} - ${format(dateRange.to, "MMM dd, yyyy")}`
                  : `Start: ${format(dateRange.from, "MMM dd, yyyy")}`
                }
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Date of Birth Picker */}
      <Card>
        <CardHeader>
          <CardTitle>Date of Birth Picker</CardTitle>
          <CardDescription>Date picker with age restrictions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Date of Birth</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      !birthDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {birthDate ? format(birthDate, "PPP") : <span>Enter birth date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={birthDate}
                    onSelect={setBirthDate}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            {birthDate && (
              <div className="text-sm text-muted-foreground">
                Age: {Math.floor((new Date().getTime() - birthDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000))} years old
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Inline Calendar */}
      <Card>
        <CardHeader>
          <CardTitle>Inline Calendar</CardTitle>
          <CardDescription>Always visible calendar component</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </div>
        </CardContent>
      </Card>

      {/* Multiple Date Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Multiple Date Selection</CardTitle>
          <CardDescription>Select multiple individual dates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Select Multiple Dates</Label>
              <div className="border rounded-lg p-4">
                <Calendar
                  mode="multiple"
                  className="rounded-md"
                />
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Useful for appointment scheduling, event planning, or availability selection.
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Date and Time Picker */}
      <Card>
        <CardHeader>
          <CardTitle>Date & Time Picker</CardTitle>
          <CardDescription>Combined date and time selection</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PP") : <span>Pick date</span>}
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
              
              <div className="space-y-2">
                <Label>Time</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="time"
                    className="pl-10"
                    defaultValue="14:30"
                  />
                </div>
              </div>
            </div>
            
            <div className="p-3 bg-muted rounded-lg">
              <div className="text-sm font-medium">Selected DateTime</div>
              <div className="text-sm text-muted-foreground">
                {date ? format(date, "EEEE, MMMM do, yyyy") : "No date selected"} at 2:30 PM
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Date Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Date Shortcuts</CardTitle>
          <CardDescription>Preset date options for common selections</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDate(new Date())}
              >
                Today
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const tomorrow = new Date();
                  tomorrow.setDate(tomorrow.getDate() + 1);
                  setDate(tomorrow);
                }}
              >
                Tomorrow
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const nextWeek = new Date();
                  nextWeek.setDate(nextWeek.getDate() + 7);
                  setDate(nextWeek);
                }}
              >
                Next Week
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const nextMonth = new Date();
                  nextMonth.setMonth(nextMonth.getMonth() + 1);
                  setDate(nextMonth);
                }}
              >
                Next Month
              </Button>
            </div>
            
            {date && (
              <div className="p-3 bg-muted rounded-lg">
                <div className="text-sm">
                  Selected: {format(date, "EEEE, MMMM do, yyyy")}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Date Picker Guidelines</CardTitle>
          <CardDescription>Best practices for date selection components</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-success">Best Practices</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Use appropriate date formats for locale</li>
                <li>• Provide keyboard navigation support</li>
                <li>• Set reasonable date constraints</li>
                <li>• Include clear visual feedback</li>
                <li>• Consider timezone implications</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-info">Accessibility</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Support screen readers</li>
                <li>• Provide keyboard shortcuts</li>
                <li>• Use proper ARIA labels</li>
                <li>• Ensure sufficient color contrast</li>
                <li>• Allow manual date input</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
