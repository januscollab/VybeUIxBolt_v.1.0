-- Add Figma configuration columns to design_system_versions table
ALTER TABLE public.design_system_versions 
ADD COLUMN IF NOT EXISTS figma_client_id TEXT,
ADD COLUMN IF NOT EXISTS figma_client_secret TEXT;