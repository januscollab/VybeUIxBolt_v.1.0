-- Create enum types for design system
CREATE TYPE public.token_type AS ENUM ('color', 'typography', 'spacing', 'shadow', 'radius', 'motion');
CREATE TYPE public.component_status AS ENUM ('draft', 'review', 'stable', 'deprecated');
CREATE TYPE public.theme_mode AS ENUM ('light', 'dark', 'auto');

-- Create categories table
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create design tokens table
CREATE TABLE public.design_tokens (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  token_type public.token_type NOT NULL,
  value JSONB NOT NULL,
  description TEXT,
  category_id UUID REFERENCES public.categories(id),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create components table
CREATE TABLE public.components (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  category_id UUID REFERENCES public.categories(id),
  status public.component_status DEFAULT 'draft',
  figma_url TEXT,
  storybook_url TEXT,
  is_experimental BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create component variants table
CREATE TABLE public.component_variants (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  component_id UUID REFERENCES public.components(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  props JSONB DEFAULT '{}',
  code_example TEXT,
  preview_url TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create documentation table
CREATE TABLE public.documentation (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  component_id UUID REFERENCES public.components(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  section TEXT DEFAULT 'usage',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.design_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.components ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.component_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documentation ENABLE ROW LEVEL SECURITY;

-- Create policies (public read for now, can be restricted later)
CREATE POLICY "Public read access for categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Public read access for design_tokens" ON public.design_tokens FOR SELECT USING (true);
CREATE POLICY "Public read access for components" ON public.components FOR SELECT USING (true);
CREATE POLICY "Public read access for component_variants" ON public.component_variants FOR SELECT USING (true);
CREATE POLICY "Public read access for documentation" ON public.documentation FOR SELECT USING (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_design_tokens_updated_at BEFORE UPDATE ON public.design_tokens FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_components_updated_at BEFORE UPDATE ON public.components FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_component_variants_updated_at BEFORE UPDATE ON public.component_variants FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_documentation_updated_at BEFORE UPDATE ON public.documentation FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial categories
INSERT INTO public.categories (name, slug, description, sort_order) VALUES
('Foundations', 'foundations', 'Core design tokens and foundational elements', 1),
('Core UI Elements', 'core-ui', 'Basic UI components like buttons, inputs, and toggles', 2),
('Navigation', 'navigation', 'Navigation components and patterns', 3),
('Content & Layout', 'content-layout', 'Layout and content presentation components', 4),
('Forms', 'forms', 'Form components and validation patterns', 5),
('Feedback & Messaging', 'feedback', 'Alerts, notifications, and status indicators', 6),
('Experimental', 'experimental', 'Experimental and advanced components', 7);