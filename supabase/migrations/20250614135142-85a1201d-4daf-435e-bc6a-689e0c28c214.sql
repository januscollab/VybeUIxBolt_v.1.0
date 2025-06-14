-- Add brand customization to design system versions
ALTER TABLE public.design_system_versions 
ADD COLUMN brand_name TEXT,
ADD COLUMN logo_url TEXT;

-- Create storage bucket for brand assets
INSERT INTO storage.buckets (id, name, public) 
VALUES ('brand-assets', 'brand-assets', true);

-- Storage policies for brand assets
CREATE POLICY "Anyone can view brand assets" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'brand-assets');

CREATE POLICY "Admins can upload brand assets" 
ON storage.objects 
FOR INSERT 
WITH CHECK (
  bucket_id = 'brand-assets' 
  AND public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins can update brand assets" 
ON storage.objects 
FOR UPDATE 
USING (
  bucket_id = 'brand-assets' 
  AND public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins can delete brand assets" 
ON storage.objects 
FOR DELETE 
USING (
  bucket_id = 'brand-assets' 
  AND public.has_role(auth.uid(), 'admin')
);

-- Update default design system version with VybeUI branding
UPDATE public.design_system_versions 
SET brand_name = 'VybeUI' 
WHERE version_name = 'Default VybeUI Theme';