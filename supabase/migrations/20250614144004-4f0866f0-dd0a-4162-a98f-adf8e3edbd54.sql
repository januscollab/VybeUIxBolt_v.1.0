-- Create storage bucket for custom fonts (if it doesn't exist)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('custom-fonts', 'custom-fonts', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for custom fonts
CREATE POLICY "Custom fonts are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'custom-fonts');

CREATE POLICY "Admin users can upload custom fonts" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'custom-fonts' AND auth.uid() IN (
  SELECT user_id FROM public.user_roles WHERE role = 'admin'
));

CREATE POLICY "Admin users can update custom fonts" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'custom-fonts' AND auth.uid() IN (
  SELECT user_id FROM public.user_roles WHERE role = 'admin'
));

CREATE POLICY "Admin users can delete custom fonts" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'custom-fonts' AND auth.uid() IN (
  SELECT user_id FROM public.user_roles WHERE role = 'admin'
));