-- Phase 1: Fix RLS policies for proper role-based access control

-- Categories table - only admins can modify
DROP POLICY IF EXISTS "Everyone can view categories" ON public.categories;
DROP POLICY IF EXISTS "Admins can manage categories" ON public.categories;

CREATE POLICY "Everyone can view categories"
ON public.categories
FOR SELECT
USING (true);

CREATE POLICY "Admins can manage categories"
ON public.categories
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Components table - only admins can modify
DROP POLICY IF EXISTS "Everyone can view components" ON public.components;
DROP POLICY IF EXISTS "Admins can manage components" ON public.components;

CREATE POLICY "Everyone can view components"
ON public.components
FOR SELECT
USING (true);

CREATE POLICY "Admins can manage components"
ON public.components
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Component variants table - only admins can modify
DROP POLICY IF EXISTS "Everyone can view component variants" ON public.component_variants;
DROP POLICY IF EXISTS "Admins can manage component variants" ON public.component_variants;

CREATE POLICY "Everyone can view component variants"
ON public.component_variants
FOR SELECT
USING (true);

CREATE POLICY "Admins can manage component variants"
ON public.component_variants
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Design tokens table - only admins can modify
DROP POLICY IF EXISTS "Everyone can view design tokens" ON public.design_tokens;
DROP POLICY IF EXISTS "Admins can manage design tokens" ON public.design_tokens;

CREATE POLICY "Everyone can view design tokens"
ON public.design_tokens
FOR SELECT
USING (true);

CREATE POLICY "Admins can manage design tokens"
ON public.design_tokens
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Documentation table - only admins can modify
DROP POLICY IF EXISTS "Everyone can view documentation" ON public.documentation;
DROP POLICY IF EXISTS "Admins can manage documentation" ON public.documentation;

CREATE POLICY "Everyone can view documentation"
ON public.documentation
FOR SELECT
USING (true);

CREATE POLICY "Admins can manage documentation"
ON public.documentation
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Profiles table - users can view all but only modify their own
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;

CREATE POLICY "Users can view all profiles"
ON public.profiles
FOR SELECT
USING (true);

CREATE POLICY "Users can update own profile"
ON public.profiles
FOR UPDATE
USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
ON public.profiles
FOR INSERT
WITH CHECK (auth.uid() = id);

-- User invitations - only admins can manage
DROP POLICY IF EXISTS "Admins can manage invitations" ON public.user_invitations;

CREATE POLICY "Admins can view invitations"
ON public.user_invitations
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage invitations"
ON public.user_invitations
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Remove Figma credentials from database (Phase 3)
ALTER TABLE public.design_system_versions 
DROP COLUMN IF EXISTS figma_client_id,
DROP COLUMN IF EXISTS figma_client_secret;