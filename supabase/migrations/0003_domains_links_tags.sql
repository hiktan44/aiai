-- 0003_domains_links_tags.sql
-- domains, links, tags, link_tags + indexler + RLS.

-- ---------------------------------------------------------------------------
-- domains
-- ---------------------------------------------------------------------------
CREATE TABLE public.domains (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id  UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  domain        CITEXT NOT NULL UNIQUE
                CHECK (domain ~ '^([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$'),
  is_primary    BOOLEAN NOT NULL DEFAULT false,
  is_verified   BOOLEAN NOT NULL DEFAULT false,
  ssl_status    TEXT NOT NULL DEFAULT 'pending'
                CHECK (ssl_status IN ('pending','provisioning','active','failed')),
  verification_token TEXT NOT NULL DEFAULT encode(gen_random_bytes(16),'hex'),
  verified_at   TIMESTAMPTZ,
  created_by    UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at    TIMESTAMPTZ
);
CREATE INDEX idx_domains_ws ON public.domains(workspace_id) WHERE deleted_at IS NULL;
CREATE UNIQUE INDEX idx_domains_one_primary ON public.domains(workspace_id)
  WHERE is_primary = true AND deleted_at IS NULL;
CREATE TRIGGER trg_domains_updated BEFORE UPDATE ON public.domains
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ---------------------------------------------------------------------------
-- links
-- ---------------------------------------------------------------------------
CREATE TABLE public.links (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id  UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  domain_id     UUID REFERENCES public.domains(id) ON DELETE SET NULL,
  key           TEXT NOT NULL CHECK (key ~ '^[a-zA-Z0-9_-]{1,64}$'),
  destination_url TEXT NOT NULL CHECK (destination_url ~ '^https?://'),
  title         TEXT,
  description   TEXT,
  ios_url       TEXT,
  android_url   TEXT,
  geo_targeting JSONB NOT NULL DEFAULT '{}'::jsonb,
  expires_at    TIMESTAMPTZ,
  expired_url   TEXT,
  password_hash TEXT,
  utm           JSONB NOT NULL DEFAULT '{}'::jsonb,
  qr_config     JSONB NOT NULL DEFAULT '{}'::jsonb,
  click_count   BIGINT NOT NULL DEFAULT 0,
  last_clicked_at TIMESTAMPTZ,
  is_archived   BOOLEAN NOT NULL DEFAULT false,
  created_by    UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at    TIMESTAMPTZ,
  UNIQUE (domain_id, key)
);
CREATE INDEX idx_links_ws_active ON public.links(workspace_id, created_at DESC)
  WHERE deleted_at IS NULL AND is_archived = false;
CREATE INDEX idx_links_lookup ON public.links(domain_id, key) WHERE deleted_at IS NULL;
CREATE INDEX idx_links_utm_gin ON public.links USING gin (utm jsonb_path_ops);
CREATE INDEX idx_links_title_trgm ON public.links USING gin (title gin_trgm_ops);
CREATE TRIGGER trg_links_updated BEFORE UPDATE ON public.links
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ---------------------------------------------------------------------------
-- tags + link_tags
-- ---------------------------------------------------------------------------
CREATE TABLE public.tags (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id  UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  name          TEXT NOT NULL CHECK (char_length(name) BETWEEN 1 AND 40),
  color         TEXT NOT NULL DEFAULT '#6366f1' CHECK (color ~ '^#[0-9a-fA-F]{6}$'),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (workspace_id, name)
);

CREATE TABLE public.link_tags (
  link_id  UUID NOT NULL REFERENCES public.links(id) ON DELETE CASCADE,
  tag_id   UUID NOT NULL REFERENCES public.tags(id) ON DELETE CASCADE,
  PRIMARY KEY (link_id, tag_id)
);

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------
ALTER TABLE public.domains ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.link_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "domains_select" ON public.domains
  FOR SELECT USING (public.is_workspace_member(workspace_id) AND deleted_at IS NULL);
CREATE POLICY "domains_insert" ON public.domains
  FOR INSERT WITH CHECK (public.has_workspace_role(workspace_id, ARRAY['owner','admin']));
CREATE POLICY "domains_update" ON public.domains
  FOR UPDATE USING (public.has_workspace_role(workspace_id, ARRAY['owner','admin']))
  WITH CHECK (public.has_workspace_role(workspace_id, ARRAY['owner','admin']));

CREATE POLICY "links_select" ON public.links
  FOR SELECT USING (public.is_workspace_member(workspace_id) AND deleted_at IS NULL);
CREATE POLICY "links_insert" ON public.links
  FOR INSERT WITH CHECK (public.is_workspace_member(workspace_id));
CREATE POLICY "links_update" ON public.links
  FOR UPDATE USING (public.is_workspace_member(workspace_id))
  WITH CHECK (public.is_workspace_member(workspace_id));

CREATE POLICY "tags_all" ON public.tags
  FOR ALL USING (public.is_workspace_member(workspace_id))
  WITH CHECK (public.is_workspace_member(workspace_id));
CREATE POLICY "link_tags_all" ON public.link_tags
  FOR ALL USING (EXISTS (
    SELECT 1 FROM public.links l
    WHERE l.id = link_id AND public.is_workspace_member(l.workspace_id)
  ));
