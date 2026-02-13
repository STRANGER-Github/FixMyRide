
-- The unique constraint user_roles_user_id_role_key already exists, skip it.
-- Add blocked column to profiles for admin blocking users
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_blocked BOOLEAN NOT NULL DEFAULT false;
