-- 0002_workspaces_and_profiles.sql
-- profiles, workspaces, workspace_members, workspace_invites + RLS + yeni kullanıcı trigger'ı.

-- ---------------------------------------------------------------------------
-- workspaces (profiles FK'si bunu referans aldığı için önce oluşturulur)
-- ---------------------------------------------------------------------------
CREATE TABLE public.workspaces (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL CHECK (char_length(name) BETWEEN 2 AND 60),
  slug        CITEXT NOT NULL UNIQUE CHECK (slug ~ '^[a-z0-9-]{3,40}$'),
  owner_id    UUID NOT NULL REFERENCES auth.users(id) ON DELETE RESTRICT,
  plan        TEXT NOT NULL DEFAULT 'free'
              CHECK (plan IN ('free','pro','growth','enterprise')),
  stripe_customer_id     TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  links_limit    INTEGER NOT NULL DEFAULT 25,
  clicks_limit   INTEGER NOT NULL DEFAULT 1000,
  domains_limit  INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at  TIMESTAMPTZ
);
CREATE INDEX idx_workspaces_owner ON public.workspaces(owner_id) WHERE deleted_at IS NULL;
CREATE TRIGGER trg_workspaces_updated BEFORE UPDATE ON public.workspaces
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.workspace_members (
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  user_id      UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role         TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('owner','admin','member')),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (workspace_id, user_id)
);
CREATE INDEX idx_members_user ON public.workspace_members(user_id);

CREATE TABLE public.workspace_invites (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  email        CITEXT NOT NULL,
  role         TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('admin','member')),
  token        TEXT NOT NULL UNIQUE DEFAULT encode(gen_random_bytes(24),'hex'),
  invited_by   UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  expires_at   TIMESTAMPTZ NOT NULL DEFAULT (now() + interval '7 days'),
  accepted_at  TIMESTAMPTZ,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (workspace_id, email)
);

-- ---------------------------------------------------------------------------
-- profiles
-- ---------------------------------------------------------------------------
CREATE TABLE public.profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email       CITEXT NOT NULL,
  full_name   TEXT,
  avatar_url  TEXT,
  default_workspace_id UUID REFERENCES public.workspaces(id) ON DELETE SET NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TRIGGER trg_profiles_updated BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- auth.users insert → profile + ilk workspace + owner üyeliği
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE new_ws UUID;
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
    VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  INSERT INTO public.workspaces (name, slug, owner_id)
    VALUES (COALESCE(NEW.raw_user_meta_data->>'full_name','Çalışma Alanım'),
            'ws-' || substr(NEW.id::text,1,8), NEW.id)
    RETURNING id INTO new_ws;
  INSERT INTO public.workspace_members (workspace_id, user_id, role)
    VALUES (new_ws, NEW.id, 'owner');
  UPDATE public.profiles SET default_workspace_id = new_ws WHERE id = NEW.id;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspace_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspace_invites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_select_own" ON public.profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE POLICY "ws_select_member" ON public.workspaces
  FOR SELECT USING (public.is_workspace_member(id) AND deleted_at IS NULL);
CREATE POLICY "ws_insert_self" ON public.workspaces
  FOR INSERT WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "ws_update_admin" ON public.workspaces
  FOR UPDATE USING (public.has_workspace_role(id, ARRAY['owner','admin']))
  WITH CHECK (public.has_workspace_role(id, ARRAY['owner','admin']));

CREATE POLICY "members_select" ON public.workspace_members
  FOR SELECT USING (public.is_workspace_member(workspace_id));
CREATE POLICY "members_manage_admin" ON public.workspace_members
  FOR ALL USING (public.has_workspace_role(workspace_id, ARRAY['owner','admin']))
  WITH CHECK (public.has_workspace_role(workspace_id, ARRAY['owner','admin']));

CREATE POLICY "invites_manage_admin" ON public.workspace_invites
  FOR ALL USING (public.has_workspace_role(workspace_id, ARRAY['owner','admin']))
  WITH CHECK (public.has_workspace_role(workspace_id, ARRAY['owner','admin']));
