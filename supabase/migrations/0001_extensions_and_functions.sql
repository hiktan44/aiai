-- 0001_extensions_and_functions.sql
-- LinkSpark — Uzantılar, yardımcı fonksiyonlar ve RLS recursion önleyiciler.

CREATE EXTENSION IF NOT EXISTS pgcrypto;   -- gen_random_uuid(), digest(), gen_random_bytes()
CREATE EXTENSION IF NOT EXISTS citext;     -- case-insensitive email/domain
CREATE EXTENSION IF NOT EXISTS pg_trgm;    -- başlık trigram araması (gin_trgm_ops)

-- updated_at otomatik güncelleme tetikleyicisi
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Workspace üyeliği kontrolü (RLS recursion önleyici — SECURITY DEFINER)
CREATE OR REPLACE FUNCTION public.is_workspace_member(ws_id UUID)
RETURNS BOOLEAN
LANGUAGE sql SECURITY DEFINER STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.workspace_members
    WHERE workspace_id = ws_id AND user_id = auth.uid()
  );
$$;

-- Rol kontrolü (owner/admin için)
CREATE OR REPLACE FUNCTION public.has_workspace_role(ws_id UUID, roles TEXT[])
RETURNS BOOLEAN
LANGUAGE sql SECURITY DEFINER STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.workspace_members
    WHERE workspace_id = ws_id AND user_id = auth.uid() AND role = ANY(roles)
  );
$$;
