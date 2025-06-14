import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CalendarIcon, Clock, MapPin, Users } from "lucide-react";
import { useState } from "react";
import { format, addDays, subDays } from "date-fns";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const eventFormSchema = z.object({
  eventDate: z.date({
    required_error: "Event date is required.",
  }),
  startTime: z.string({
    required_error: "Start time is required.",
  }),
  endTime: z.string({
    required_error: "End time is required.",
  }),
});

export default function DatePickerShowcase() {
  const [singleDate, setSingleDate] = useState<Date>();
  const [rangeDate, setRangeDate] = useState<{from: Date, to?: Date}>();
  const [multipleDate, setMultipleDate] = useState<Date[]>([]);
  const [restrictedDate, setRestrictedDate] = useState<Date>();

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
  });

  function onSubmit(data: z.infer<typeof eventFormSchema>) {
    console.log("Form submitted:", data);
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold">Date Picker Component</h1>
          <Badge variant="default">Stable</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Calendar-based date selection with range support, restrictions, and form integration.
        </p>
      </div>

      {/* Basic Date Pickers */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Date Pickers</CardTitle>
          <CardDescription>Standard single date selection with various trigger styles</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Single Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !singleDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {singleDate ? format(singleDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={singleDate}
                    onSelect={setSingleDate}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Date with Time</Label>
              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "flex-1 justify-start text-left font-normal",
                        !singleDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {singleDate ? format(singleDate, "MMM dd") : "Date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={singleDate}
                      onSelect={setSingleDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                <Button variant="outline" className="flex-1">
                  <Clock className="mr-2 h-4 w-4" />
                  9:00 AM
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Quick Presets</Label>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setSingleDate(new Date())}
                >
                  Today
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setSingleDate(addDays(new Date(), 1))}
                >
                  Tomorrow
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Date Range Picker */}
      <Card>
        <CardHeader>
          <CardTitle>Date Range Picker</CardTitle>
          <CardDescription>Select date ranges for bookings, reporting, and filtering</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Select Date Range</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !rangeDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {rangeDate?.from ? (
                    rangeDate.to ? (
                      <>
                        {format(rangeDate.from, "LLL dd, y")} -{" "}
                        {format(rangeDate.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(rangeDate.from, "LLL dd, y")
                    )
                  ) : (
                    "Pick a date range"
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={rangeDate?.from}
                  selected={rangeDate}
                  onSelect={setRangeDate}
                  numberOfMonths={2}
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setRangeDate({
                from: subDays(new Date(), 7),
                to: new Date()
              })}
            >
              Last 7 days
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setRangeDate({
                from: subDays(new Date(), 30),
                to: new Date()
              })}
            >
              Last 30 days
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setRangeDate({
                from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                to: new Date()
              })}
            >
              This month
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Features */}
      <Card>
        <CardHeader>
          <CardTitle>Advanced Features</CardTitle>
          <CardDescription>Multiple dates, restrictions, and custom configurations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Multiple Dates (Max 5)</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      multipleDate.length === 0 && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {multipleDate.length > 0
                      ? `${multipleDate.length} date${multipleDate.length > 1 ? 's' : ''} selected`
                      : "Pick multiple dates"
                    }
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="multiple"
                    selected={multipleDate}
                    onSelect={(dates) => {
                      if (dates && dates.length <= 5) {
                        setMultipleDate(dates);
                      }
                    }}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              {multipleDate.length > 0 && (
                <div className="text-sm text-muted-foreground">
                  Selected: {multipleDate.map(date => format(date, "MMM dd")).join(", ")}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Restricted Dates (Weekends Disabled)</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !restrictedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {restrictedDate ? format(restrictedDate, "PPP") : "Pick a weekday"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={restrictedDate}
                    onSelect={setRestrictedDate}
                    disabled={(date) => {
                      const day = date.getDay();
                      return day === 0 || day === 6; // Disable weekends
                    }}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form Integration */}
      <Card>
        <CardHeader>
          <CardTitle>Form Integration</CardTitle>
          <CardDescription>Date picker integrated with form validation</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="eventDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Event Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        Select the date for your event
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Time</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="09:00">9:00 AM</SelectItem>
                          <SelectItem value="10:00">10:00 AM</SelectItem>
                          <SelectItem value="11:00">11:00 AM</SelectItem>
                          <SelectItem value="12:00">12:00 PM</SelectItem>
                          <SelectItem value="13:00">1:00 PM</SelectItem>
                          <SelectItem value="14:00">2:00 PM</SelectItem>
                          <SelectItem value="15:00">3:00 PM</SelectItem>
                          <SelectItem value="16:00">4:00 PM</SelectItem>
                          <SelectItem value="17:00">5:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Time</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="10:00">10:00 AM</SelectItem>
                          <SelectItem value="11:00">11:00 AM</SelectItem>
                          <SelectItem value="12:00">12:00 PM</SelectItem>
                          <SelectItem value="13:00">1:00 PM</SelectItem>
                          <SelectItem value="14:00">2:00 PM</SelectItem>
                          <SelectItem value="15:00">3:00 PM</SelectItem>
                          <SelectItem value="16:00">4:00 PM</SelectItem>
                          <SelectItem value="17:00">5:00 PM</SelectItem>
                          <SelectItem value="18:00">6:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="event-title">Event Title</Label>
                  <Input id="event-title" placeholder="Enter event title" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="location" placeholder="Enter location" className="pl-9" />
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button type="submit">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Create Event
                </Button>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Usage Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Guidelines</CardTitle>
          <CardDescription>Best practices for date picker implementation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-success">Best Practices</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Use clear date format displays</li>
                <li>• Provide keyboard navigation support</li>
                <li>• Include helpful presets for common selections</li>
                <li>• Validate date ranges and restrictions</li>
                <li>• Consider timezone implications</li>
                <li>• Test across different locales</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-warning">Accessibility</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Ensure calendar is keyboard navigable</li>
                <li>• Provide proper ARIA labels</li>
                <li>• Support screen reader announcements</li>
                <li>• Include date format instructions</li>
                <li>• Test with assistive technologies</li>
                <li>• Use semantic HTML structure</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}