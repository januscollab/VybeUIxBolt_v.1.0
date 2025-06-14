-- Add comprehensive documentation content for all components
-- First, let's add some sample documentation entries for existing components

-- Overview documentation for Button component
INSERT INTO public.documentation (component_id, section, title, content, sort_order) 
SELECT id, 'overview', 'Button Overview', 
'<p>The Button component is a fundamental UI element that triggers actions or events when clicked. It supports various visual styles, sizes, and states to accommodate different use cases in your application.</p>
<h4>Key Features:</h4>
<ul>
<li>Multiple variants (default, destructive, outline, secondary, ghost, link)</li>
<li>Different sizes (default, sm, lg, icon)</li>
<li>Loading and disabled states</li>
<li>Full accessibility support with ARIA attributes</li>
<li>Keyboard navigation support</li>
</ul>', 1
FROM public.components WHERE slug = 'button-showcase' LIMIT 1;

-- Usage documentation for Button component
INSERT INTO public.documentation (component_id, section, title, content, sort_order)
SELECT id, 'usage', 'When to Use Buttons',
'<h4>Primary Actions</h4>
<p>Use the default button variant for primary actions that are the main focus of a page or section.</p>
<h4>Secondary Actions</h4>
<p>Use outline or secondary variants for supporting actions that are less prominent.</p>
<h4>Destructive Actions</h4>
<p>Use the destructive variant for actions that cannot be undone or have significant consequences.</p>
<h4>Best Practices</h4>
<ul>
<li>Use clear, action-oriented labels</li>
<li>Limit primary buttons to one per section</li>
<li>Group related actions together</li>
<li>Consider button hierarchy and visual weight</li>
</ul>', 1
FROM public.components WHERE slug = 'button-showcase' LIMIT 1;

-- Accessibility documentation for Button component
INSERT INTO public.documentation (component_id, section, title, content, sort_order)
SELECT id, 'accessibility', 'Button Accessibility Guidelines',
'<h4>ARIA Support</h4>
<p>All button variants include proper ARIA attributes and semantic HTML elements.</p>
<h4>Keyboard Navigation</h4>
<ul>
<li><code>Enter</code> or <code>Space</code> - Activates the button</li>
<li><code>Tab</code> - Moves focus to the next focusable element</li>
<li><code>Shift + Tab</code> - Moves focus to the previous focusable element</li>
</ul>
<h4>Focus Management</h4>
<p>Buttons receive visible focus indicators and maintain proper focus order.</p>
<h4>Screen Reader Support</h4>
<p>Button labels are announced clearly, including state information for disabled or loading buttons.</p>', 1
FROM public.components WHERE slug = 'button-showcase' LIMIT 1;

-- Add documentation for Card component
INSERT INTO public.documentation (component_id, section, title, content, sort_order)
SELECT id, 'overview', 'Card Overview',
'<p>Cards are flexible containers that group related content and actions. They provide a clean way to organize information and make content easily scannable.</p>
<h4>Components</h4>
<ul>
<li><code>Card</code> - Main container</li>
<li><code>CardHeader</code> - Top section for titles and metadata</li>
<li><code>CardContent</code> - Main content area</li>
<li><code>CardFooter</code> - Bottom section for actions</li>
</ul>', 1
FROM public.components WHERE slug = 'card-showcase' LIMIT 1;

-- Add documentation for Input component
INSERT INTO public.documentation (component_id, section, title, content, sort_order)
SELECT id, 'overview', 'Input Overview',
'<p>Input components allow users to enter and edit text. They support various types including text, email, password, and number inputs.</p>
<h4>Features</h4>
<ul>
<li>Built-in validation states</li>
<li>Placeholder text support</li>
<li>Disabled and readonly states</li>
<li>Icon integration</li>
<li>Form integration with react-hook-form</li>
</ul>', 1
FROM public.components WHERE slug = 'input-showcase' LIMIT 1;

-- Add usage documentation for Form components
INSERT INTO public.documentation (component_id, section, title, content, sort_order)
SELECT id, 'usage', 'Form Best Practices',
'<h4>Form Structure</h4>
<p>Use proper form structure with labels, validation, and error handling.</p>
<h4>Validation</h4>
<ul>
<li>Provide immediate feedback for validation errors</li>
<li>Use clear, actionable error messages</li>
<li>Validate on blur and submit</li>
</ul>
<h4>Accessibility</h4>
<ul>
<li>Associate labels with form controls</li>
<li>Use proper ARIA attributes for errors</li>
<li>Maintain logical tab order</li>
</ul>', 1
FROM public.components WHERE slug = 'form-showcase' LIMIT 1;