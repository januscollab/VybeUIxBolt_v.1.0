-- Update the master admin function to include alan.mahon@gmail.com
CREATE OR REPLACE FUNCTION public.handle_master_admin()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Check if this is a master admin email
  IF NEW.email IN ('alan@januscollab.com', 'alan.mahon@gmail.com') THEN
    -- Grant admin role
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin'::app_role)
    ON CONFLICT (user_id, role) DO NOTHING;
    
    -- Also update their profile role for quick reference
    UPDATE public.profiles 
    SET role = 'admin'
    WHERE id = NEW.id;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Grant admin role to alan.mahon@gmail.com if they already exist
DO $$
DECLARE
    user_uuid UUID;
BEGIN
    -- Find the user ID for alan.mahon@gmail.com
    SELECT id INTO user_uuid 
    FROM auth.users 
    WHERE email = 'alan.mahon@gmail.com';
    
    -- If user exists, grant admin role
    IF user_uuid IS NOT NULL THEN
        INSERT INTO public.user_roles (user_id, role)
        VALUES (user_uuid, 'admin'::app_role)
        ON CONFLICT (user_id, role) DO NOTHING;
        
        -- Update profile role
        UPDATE public.profiles 
        SET role = 'admin'
        WHERE id = user_uuid;
    END IF;
END $$;