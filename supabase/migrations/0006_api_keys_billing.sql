-- 0006_api_keys_billing.sql
-- api_keys, subscriptions, usage_records + RLS + atomik create_link_safe RPC.

-- ---------------------------------------------------------------------------
-- api_keys (key_hash = sha256(raw_key); ham anahtar yalnızca bir kez gösterilir)
-- ---------------------------------------------------------------------------
CREATE TABLE public.api_keys (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id  UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  name          TEXT NOT NULL,
  key_hash      TEXT NOT NULL UNIQUE,
  key_prefix    TEXT NOT NULL,
  scopes        TEXT[] NOT NULL DEFAULT ARRAY['links:read'],
  last_used_at  TIMESTAMPTZ,
  created_by    UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  revoked_at    TIMESTAMPTZ
);
CREATE INDEX idx_apikeys_ws ON public.api_keys(workspace_id) WHERE revoked_at IS NULL;

-- ---------------------------------------------------------------------------
-- subscriptions + usage_records (yazma yalnızca Stripe webhook / service_role)
-- ---------------------------------------------------------------------------
CREATE TABLE public.subscriptions (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id  UUID NOT NULL UNIQUE REFERENCES public.workspaces(id) ON DELETE CASCADE,
  stripe_subscription_id TEXT UNIQUE,
  stripe_price_id TEXT,
  plan          TEXT NOT NULL DEFAULT 'free'
                CHECK (plan IN ('free','pro','growth','enterprise')),
  status        TEXT NOT NULL DEFAULT 'active'
                CHECK (status IN ('active','trialing','past_due','canceled','incomplete')),
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN NOT NULL DEFAULT false,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TRIGGER trg_subs_updated BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.usage_records (
  workspace_id  UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  period        DATE NOT NULL,
  links_created INTEGER NOT NULL DEFAULT 0,
  clicks_count  BIGINT NOT NULL DEFAULT 0,
  PRIMARY KEY (workspace_id, period)
);

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------
ALTER TABLE public.api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "apikeys_select" ON public.api_keys
  FOR SELECT USING (public.is_workspace_member(workspace_id));
CREATE POLICY "apikeys_manage" ON public.api_keys
  FOR ALL USING (public.has_workspace_role(workspace_id, ARRAY['owner','admin']))
  WITH CHECK (public.has_workspace_role(workspace_id, ARRAY['owner','admin']));

CREATE POLICY "subs_select" ON public.subscriptions
  FOR SELECT USING (public.is_workspace_member(workspace_id));
CREATE POLICY "usage_select" ON public.usage_records
  FOR SELECT USING (public.is_workspace_member(workspace_id));

-- ---------------------------------------------------------------------------
-- Atomik link oluşturma RPC (TOCTOU + N+1 önler)
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.create_link_safe(
  p_workspace_id UUID, p_domain_id UUID, p_key TEXT, p_url TEXT, p_payload JSONB
) RETURNS public.links
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v_count INT; v_limit INT; v_row public.links;
BEGIN
  IF NOT public.is_workspace_member(p_workspace_id) THEN
    RAISE EXCEPTION 'forbidden';
  END IF;
  SELECT links_limit INTO v_limit FROM public.workspaces WHERE id = p_workspace_id FOR UPDATE;
  SELECT count(*) INTO v_count FROM public.links
    WHERE workspace_id = p_workspace_id AND deleted_at IS NULL;
  IF v_count >= v_limit THEN RAISE EXCEPTION 'link_limit_reached'; END IF;
  INSERT INTO public.links (workspace_id, domain_id, key, destination_url, title, utm, created_by)
  VALUES (p_workspace_id, p_domain_id, p_key, p_url,
          p_payload->>'title', COALESCE(p_payload->'utm','{}'::jsonb), auth.uid())
  RETURNING * INTO v_row;
  RETURN v_row;
END;
$$;
