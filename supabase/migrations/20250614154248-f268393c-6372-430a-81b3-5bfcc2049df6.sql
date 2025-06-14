-- Check if app_role type exists
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'app_role') THEN
        -- Create the app_role enum type
        CREATE TYPE app_role AS ENUM ('user', 'admin', 'editor');
        
        -- Create component_status enum if it doesn't exist
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'component_status') THEN
            CREATE TYPE component_status AS ENUM ('draft', 'review', 'stable', 'deprecated');
        END IF;
        
        -- Create token_type enum if it doesn't exist  
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'token_type') THEN
            CREATE TYPE token_type AS ENUM ('color', 'spacing', 'typography', 'shadow', 'border');
        END IF;
    END IF;
END $$;