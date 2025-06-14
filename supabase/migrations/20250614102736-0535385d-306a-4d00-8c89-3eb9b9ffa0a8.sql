-- Add figma-export component to the database
INSERT INTO components (
  name,
  slug, 
  description,
  category_id,
  status,
  is_experimental,
  sort_order
) VALUES (
  'Figma Export',
  'figma-export',
  'Export design system data and structure for Figma integration',
  'e8cefdb1-6802-4a69-a3c4-43a4c177a93f', -- Foundations category
  'stable',
  false,
  100
);