-- Create user_invitations table for admin to invite readers
CREATE TABLE public.user_invitations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  invited_by UUID NOT NULL,
  email TEXT NOT NULL,
  role app_role NOT NULL DEFAULT 'user',
  token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + interval '7 days'),
  accepted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_invitations ENABLE ROW LEVEL SECURITY;

-- Admin can view and create invitations
CREATE POLICY "Admins can manage invitations" 
ON public.user_invitations 
FOR ALL 
USING (public.has_role(auth.uid(), 'admin'));

-- Function to accept invitation
CREATE OR REPLACE FUNCTION public.accept_invitation(invitation_token TEXT)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  invitation_record RECORD;
  user_id UUID;
BEGIN
  -- Get current user
  user_id := auth.uid();
  
  IF user_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'message', 'Must be authenticated');
  END IF;
  
  -- Find valid invitation
  SELECT * INTO invitation_record
  FROM public.user_invitations
  WHERE token = invitation_token
    AND expires_at > now()
    AND accepted_at IS NULL;
    
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'message', 'Invalid or expired invitation');
  END IF;
  
  -- Grant role to user
  INSERT INTO public.user_roles (user_id, role)
  VALUES (user_id, invitation_record.role)
  ON CONFLICT (user_id, role) DO NOTHING;
  
  -- Mark invitation as accepted
  UPDATE public.user_invitations
  SET accepted_at = now()
  WHERE id = invitation_record.id;
  
  RETURN jsonb_build_object('success', true, 'role', invitation_record.role);
END;
$$;