-- Add comprehensive RLS policies for all tables

-- Categories table policies (currently only has read access)
CREATE POLICY "Authenticated users can insert categories" ON public.categories FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update categories" ON public.categories FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete categories" ON public.categories FOR DELETE TO authenticated USING (true);

-- Components table policies (currently only has read access)
CREATE POLICY "Authenticated users can insert components" ON public.components FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update components" ON public.components FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete components" ON public.components FOR DELETE TO authenticated USING (true);

-- Component variants table policies (currently only has read access)
CREATE POLICY "Authenticated users can insert component_variants" ON public.component_variants FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update component_variants" ON public.component_variants FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete component_variants" ON public.component_variants FOR DELETE TO authenticated USING (true);

-- Documentation table policies (currently only has read access)
CREATE POLICY "Authenticated users can insert documentation" ON public.documentation FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update documentation" ON public.documentation FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete documentation" ON public.documentation FOR DELETE TO authenticated USING (true);

-- Design tokens table policies (currently only has read access)
CREATE POLICY "Authenticated users can insert design_tokens" ON public.design_tokens FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update design_tokens" ON public.design_tokens FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete design_tokens" ON public.design_tokens FOR DELETE TO authenticated USING (true);

-- Create a profiles table for user management
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies - users can read all profiles but only update their own
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Add trigger for profiles updated_at
CREATE TRIGGER update_profiles_updated_at 
  BEFORE UPDATE ON public.profiles 
  FOR EACH ROW 
  EXECUTE FUNCTION public.update_updated_at_column();