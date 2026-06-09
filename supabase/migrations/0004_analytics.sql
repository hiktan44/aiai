-- 0004_analytics.sql
-- click_events (append-only) + click_stats_hourly (saatlik özet) + RLS.
-- Yazma yalnızca service_role ile yapılır; INSERT policy tanımlanmaz.

CREATE TABLE public.click_events (
  id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  link_id       UUID NOT NULL REFERENCES public.links(id) ON DELETE CASCADE,
  workspace_id  UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  clicked_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  ip_hash       TEXT,            -- KVKK: ham IP değil, tuzlanmış hash
  country       TEXT,            -- ISO 3166-1 alpha-2
  city          TEXT,
  region        TEXT,
  device        TEXT,            -- desktop/mobile/tablet
  os            TEXT,
  browser       TEXT,
  referrer      TEXT,
  referrer_host TEXT,
  utm           JSONB NOT NULL DEFAULT '{}'::jsonb,
  is_bot        BOOLEAN NOT NULL DEFAULT false
);
CREATE INDEX idx_clicks_link_time ON public.click_events(link_id, clicked_at DESC);
CREATE INDEX idx_clicks_ws_time ON public.click_events(workspace_id, clicked_at DESC);
CREATE INDEX idx_clicks_country ON public.click_events(workspace_id, country);

CREATE TABLE public.click_stats_hourly (
  link_id       UUID NOT NULL REFERENCES public.links(id) ON DELETE CASCADE,
  workspace_id  UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  bucket        TIMESTAMPTZ NOT NULL,  -- saatin başı
  country       TEXT NOT NULL DEFAULT '',
  device        TEXT NOT NULL DEFAULT '',
  clicks        BIGINT NOT NULL DEFAULT 0,
  PRIMARY KEY (link_id, bucket, country, device)
);
CREATE INDEX idx_stats_ws_bucket ON public.click_stats_hourly(workspace_id, bucket DESC);

ALTER TABLE public.click_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.click_stats_hourly ENABLE ROW LEVEL SECURITY;

CREATE POLICY "clicks_select_member" ON public.click_events
  FOR SELECT USING (public.is_workspace_member(workspace_id));
CREATE POLICY "stats_select_member" ON public.click_stats_hourly
  FOR SELECT USING (public.is_workspace_member(workspace_id));
-- INSERT/UPDATE policy yok → yalnızca RLS-bypass eden service_role yazabilir.
