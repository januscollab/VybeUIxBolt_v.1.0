-- Create figma_integrations table
CREATE TABLE public.figma_integrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  team_id TEXT NOT NULL,
  project_name TEXT NOT NULL,
  description TEXT,
  export_format TEXT NOT NULL DEFAULT 'svg',
  export_scale INTEGER NOT NULL DEFAULT 2,
  component_prefix TEXT NOT NULL DEFAULT 'DS',
  auto_sync BOOLEAN NOT NULL DEFAULT false,
  api_token_set BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.figma_integrations ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view figma integrations if admin" 
ON public.figma_integrations 
FOR SELECT 
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can create figma integrations if admin" 
ON public.figma_integrations 
FOR INSERT 
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can update figma integrations if admin" 
ON public.figma_integrations 
FOR UPDATE 
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can delete figma integrations if admin" 
ON public.figma_integrations 
FOR DELETE 
USING (public.has_role(auth.uid(), 'admin'));

-- Add trigger for automatic timestamp updates
CREATE TRIGGER update_figma_integrations_updated_at
BEFORE UPDATE ON public.figma_integrations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();