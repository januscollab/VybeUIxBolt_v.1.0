-- Add code examples to component variants
-- Update button variants with actual code examples

UPDATE public.component_variants 
SET code_example = 'import { Button } from "@/components/ui/button"

export function ButtonDemo() {
  return <Button>Click me</Button>
}'
WHERE name = 'Default' AND component_id IN (
  SELECT id FROM public.components WHERE slug = 'button-showcase'
);

UPDATE public.component_variants 
SET code_example = 'import { Button } from "@/components/ui/button"

export function ButtonDestructive() {
  return <Button variant="destructive">Delete</Button>
}'
WHERE name = 'Destructive' AND component_id IN (
  SELECT id FROM public.components WHERE slug = 'button-showcase'
);

UPDATE public.component_variants 
SET code_example = 'import { Button } from "@/components/ui/button"

export function ButtonOutline() {
  return <Button variant="outline">Outline</Button>
}'
WHERE name = 'Outline' AND component_id IN (
  SELECT id FROM public.components WHERE slug = 'button-showcase'
);

-- Add code examples for Card component
UPDATE public.component_variants 
SET code_example = 'import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function CardDemo() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content goes here.</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  )
}'
WHERE name = 'Basic Card' AND component_id IN (
  SELECT id FROM public.components WHERE slug = 'card-showcase'
);

-- Add code examples for Input component
UPDATE public.component_variants 
SET code_example = 'import { Input } from "@/components/ui/input"

export function InputDemo() {
  return <Input type="email" placeholder="Email" />
}'
WHERE name = 'Default' AND component_id IN (
  SELECT id FROM public.components WHERE slug = 'input-showcase'
);

-- Add code examples for Form component
UPDATE public.component_variants 
SET code_example = 'import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter username" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}'
WHERE name = 'Basic Form' AND component_id IN (
  SELECT id FROM public.components WHERE slug = 'form-showcase'
);