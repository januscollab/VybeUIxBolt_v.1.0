-- Create storage bucket for brand assets (if it doesn't exist)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('brand-assets', 'brand-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for brand assets  
CREATE POLICY "Brand assets are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'brand-assets');

CREATE POLICY "Admin users can upload brand assets" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'brand-assets' AND auth.uid() IN (
  SELECT user_id FROM public.user_roles WHERE role = 'admin'
));

CREATE POLICY "Admin users can update brand assets" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'brand-assets' AND auth.uid() IN (
  SELECT user_id FROM public.user_roles WHERE role = 'admin'
));

CREATE POLICY "Admin users can delete brand assets" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'brand-assets' AND auth.uid() IN (
  SELECT user_id FROM public.user_roles WHERE role = 'admin'
));