-- Create admin role and design system versioning tables
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- User roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Design system versions table
CREATE TABLE public.design_system_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    version_name TEXT NOT NULL,
    color_palette JSONB NOT NULL DEFAULT '{}',
    typography JSONB NOT NULL DEFAULT '{}',
    is_active BOOLEAN DEFAULT false,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Custom fonts table
CREATE TABLE public.custom_fonts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    font_name TEXT NOT NULL,
    font_family TEXT NOT NULL,
    font_files JSONB NOT NULL DEFAULT '{}', -- stores different font weights/styles
    is_google_font BOOLEAN DEFAULT false,
    google_font_url TEXT,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.design_system_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_fonts ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
ON public.user_roles
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for design_system_versions
CREATE POLICY "Everyone can view design system versions"
ON public.design_system_versions
FOR SELECT
USING (true);

CREATE POLICY "Admins can manage design system versions"
ON public.design_system_versions
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for custom_fonts
CREATE POLICY "Everyone can view custom fonts"
ON public.custom_fonts
FOR SELECT
USING (true);

CREATE POLICY "Admins can manage custom fonts"
ON public.custom_fonts
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_design_system_versions_updated_at
    BEFORE UPDATE ON public.design_system_versions
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default design system version
INSERT INTO public.design_system_versions (version_name, color_palette, typography, is_active)
VALUES (
    'Default VybeUI Theme',
    '{
        "primary": "#007bff",
        "secondary": "#6c757d", 
        "success": "#28a745",
        "warning": "#ffc107",
        "error": "#dc3545",
        "orange": "#ff6b35",
        "background": "#ffffff",
        "foreground": "#000000",
        "muted": "#f8f9fa",
        "accent": "#e9ecef"
    }',
    '{
        "primary": {
            "family": "Inter",
            "weights": ["400", "500", "600", "700"],
            "googleFontUrl": "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        },
        "secondary": {
            "family": "JetBrains Mono", 
            "weights": ["400", "500"],
            "googleFontUrl": "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap"
        }
    }',
    true
);