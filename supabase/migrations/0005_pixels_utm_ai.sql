-- 0005_pixels_utm_ai.sql
-- pixels, link_pixels, utm_templates, ai_suggestions + RLS.

-- ---------------------------------------------------------------------------
-- pixels (access_token_enc şifreli saklanır — düz metin değil)
-- ---------------------------------------------------------------------------
CREATE TABLE public.pixels (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id  UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  provider      TEXT NOT NULL CHECK (provider IN ('facebook','google','tiktok','linkedin')),
  name          TEXT NOT NULL,
  pixel_id      TEXT NOT NULL,
  access_token_enc TEXT,
  is_enabled    BOOLEAN NOT NULL DEFAULT true,
  created_by    UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at    TIMESTAMPTZ,
  UNIQUE (workspace_id, provider, pixel_id)
);
CREATE INDEX idx_pixels_ws ON public.pixels(workspace_id) WHERE deleted_at IS NULL;
CREATE TRIGGER trg_pixels_updated BEFORE UPDATE ON public.pixels
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.link_pixels (
  link_id   UUID NOT NULL REFERENCES public.links(id) ON DELETE CASCADE,
  pixel_id  UUID NOT NULL REFERENCES public.pixels(id) ON DELETE CASCADE,
  PRIMARY KEY (link_id, pixel_id)
);

-- ---------------------------------------------------------------------------
-- utm_templates
-- ---------------------------------------------------------------------------
CREATE TABLE public.utm_templates (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id  UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  name          TEXT NOT NULL,
  utm_source    TEXT, utm_medium TEXT, utm_campaign TEXT, utm_term TEXT, utm_content TEXT,
  created_by    UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (workspace_id, name)
);
CREATE TRIGGER trg_utm_updated BEFORE UPDATE ON public.utm_templates
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ---------------------------------------------------------------------------
-- ai_suggestions
-- ---------------------------------------------------------------------------
CREATE TABLE public.ai_suggestions (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id  UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  link_id       UUID REFERENCES public.links(id) ON DELETE SET NULL,
  prompt        TEXT NOT NULL,
  suggestion    JSONB NOT NULL,
  model         TEXT NOT NULL DEFAULT 'claude-opus-4-8',
  created_by    UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_ai_ws ON public.ai_suggestions(workspace_id, created_at DESC);

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------
ALTER TABLE public.pixels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.link_pixels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.utm_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_suggestions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "pixels_select" ON public.pixels
  FOR SELECT USING (public.is_workspace_member(workspace_id) AND deleted_at IS NULL);
CREATE POLICY "pixels_manage" ON public.pixels
  FOR ALL USING (public.has_workspace_role(workspace_id, ARRAY['owner','admin']))
  WITH CHECK (public.has_workspace_role(workspace_id, ARRAY['owner','admin']));
CREATE POLICY "link_pixels_all" ON public.link_pixels
  FOR ALL USING (EXISTS (
    SELECT 1 FROM public.links l
    WHERE l.id = link_id AND public.is_workspace_member(l.workspace_id)
  ));

CREATE POLICY "utm_all" ON public.utm_templates
  FOR ALL USING (public.is_workspace_member(workspace_id))
  WITH CHECK (public.is_workspace_member(workspace_id));
CREATE POLICY "ai_all" ON public.ai_suggestions
  FOR ALL USING (public.is_workspace_member(workspace_id))
  WITH CHECK (public.is_workspace_member(workspace_id));
