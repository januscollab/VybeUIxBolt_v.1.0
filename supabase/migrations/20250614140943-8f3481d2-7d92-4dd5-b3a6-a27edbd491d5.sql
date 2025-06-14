-- Create a function to automatically grant admin role to master admin
CREATE OR REPLACE FUNCTION public.handle_master_admin()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Check if this is the master admin email
  IF NEW.email = 'alan@januscollab.com' THEN
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

-- Create trigger to automatically grant admin role to master admin on signup
DROP TRIGGER IF EXISTS on_auth_user_master_admin ON auth.users;
CREATE TRIGGER on_auth_user_master_admin
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_master_admin();