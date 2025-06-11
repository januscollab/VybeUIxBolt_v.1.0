-- Insert Zapier-inspired design tokens
INSERT INTO public.design_tokens (name, token_type, value, description, category_id, sort_order) VALUES

-- Core brand colors
('Primary Orange', 'color', '{"hex": "#FF4A00", "hsl": "16 100% 50%", "rgb": "255 74 0"}', 'Primary brand color - Zapier Orange', (SELECT id FROM public.categories WHERE slug = 'foundations'), 1),
('Error Red', 'color', '{"hex": "#E63946", "hsl": "356 77% 58%", "rgb": "230 57 70"}', 'Error/destructive color', (SELECT id FROM public.categories WHERE slug = 'foundations'), 2),
('Success Green', 'color', '{"hex": "#06D6A0", "hsl": "160 92% 44%", "rgb": "6 214 160"}', 'Success color', (SELECT id FROM public.categories WHERE slug = 'foundations'), 3),
('Warning Yellow', 'color', '{"hex": "#FFD23F", "hsl": "49 100% 62%", "rgb": "255 210 63"}', 'Warning color', (SELECT id FROM public.categories WHERE slug = 'foundations'), 4),
('Info Blue', 'color', '{"hex": "#118AB2", "hsl": "196 82% 39%", "rgb": "17 138 178"}', 'Info color', (SELECT id FROM public.categories WHERE slug = 'foundations'), 5),

-- Typography tokens
('Body Font', 'typography', '{"family": "Inter", "weights": [400, 500, 600, 700], "fallback": "system-ui, sans-serif"}', 'Primary font family - Inter for body text', (SELECT id FROM public.categories WHERE slug = 'foundations'), 10),
('Display Font', 'typography', '{"family": "Cal Sans", "weights": [400, 600, 700], "fallback": "Inter, system-ui, sans-serif"}', 'Display font family - Cal Sans for headings', (SELECT id FROM public.categories WHERE slug = 'foundations'), 11),

-- Spacing scale
('Base Spacing', 'spacing', '{"scale": [2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128], "unit": "px"}', 'Base spacing scale', (SELECT id FROM public.categories WHERE slug = 'foundations'), 20),

-- Border radius
('Border Radius', 'radius', '{"sm": "4px", "md": "6px", "lg": "8px", "xl": "12px", "2xl": "16px", "full": "9999px"}', 'Border radius tokens', (SELECT id FROM public.categories WHERE slug = 'foundations'), 30),

-- Shadows
('Box Shadows', 'shadow', '{"sm": "0 1px 2px 0 rgb(0 0 0 / 0.05)", "md": "0 4px 6px -1px rgb(0 0 0 / 0.1)", "lg": "0 10px 15px -3px rgb(0 0 0 / 0.1)", "xl": "0 20px 25px -5px rgb(0 0 0 / 0.1)"}', 'Box shadow tokens', (SELECT id FROM public.categories WHERE slug = 'foundations'), 40),

-- Motion
('Animation Timing', 'motion', '{"fast": "150ms", "base": "250ms", "slow": "350ms", "ease": "cubic-bezier(0.4, 0, 0.2, 1)"}', 'Animation duration and easing', (SELECT id FROM public.categories WHERE slug = 'foundations'), 50);

-- Insert some foundational components
INSERT INTO public.components (name, slug, description, category_id, status, sort_order) VALUES

-- Foundations components
('Color Palette', 'color-palette', 'Complete color system with brand, semantic, and neutral colors', (SELECT id FROM public.categories WHERE slug = 'foundations'), 'stable', 1),
('Typography Scale', 'typography-scale', 'Font families, sizes, and typographic hierarchy', (SELECT id FROM public.categories WHERE slug = 'foundations'), 'stable', 2),
('Spacing System', 'spacing-system', 'Consistent spacing scale and layout primitives', (SELECT id FROM public.categories WHERE slug = 'foundations'), 'stable', 3),
('Elevation & Shadows', 'elevation-shadows', 'Box shadows and elevation system', (SELECT id FROM public.categories WHERE slug = 'foundations'), 'stable', 4),

-- Core UI components  
('Button', 'button', 'Primary interaction component with multiple variants', (SELECT id FROM public.categories WHERE slug = 'core-ui'), 'stable', 1),
('Input Field', 'input-field', 'Text input with validation states and labels', (SELECT id FROM public.categories WHERE slug = 'core-ui'), 'stable', 2),
('Badge', 'badge', 'Status indicators and labels', (SELECT id FROM public.categories WHERE slug = 'core-ui'), 'stable', 3),

-- Experimental components
('AI Command Palette', 'ai-command-palette', 'Intelligent command interface with AI suggestions', (SELECT id FROM public.categories WHERE slug = 'experimental'), 'draft', 1),
('Collaborative Cursor', 'collaborative-cursor', 'Real-time user presence indicators', (SELECT id FROM public.categories WHERE slug = 'experimental'), 'draft', 2),
('Smart Form Autosave', 'smart-form-autosave', 'Intelligent form saving with visual feedback', (SELECT id FROM public.categories WHERE slug = 'experimental'), 'draft', 3);