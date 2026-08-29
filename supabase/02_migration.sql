-- ============================================================
-- STEP 1: Drop old categories table if it exists (fresh start)
-- ============================================================
DROP TABLE IF EXISTS public.categories CASCADE;

-- ============================================================
-- STEP 2: Create Categories Table (with slug column)
-- ============================================================
CREATE TABLE public.categories (
  id   uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================================
-- STEP 3: Seed default categories
-- ============================================================
INSERT INTO public.categories (name, slug) VALUES
  ('Villa',        'villa'),
  ('Appartement',  'appartement'),
  ('Bureau',       'bureau'),
  ('Terrain',      'terrain')
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- STEP 4: RLS Policies for Categories
-- ============================================================
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on categories"
  ON public.categories FOR SELECT
  USING (true);

CREATE POLICY "Admin full access on categories"
  ON public.categories FOR ALL
  USING (auth.role() = 'authenticated');

-- ============================================================
-- STEP 5: Expand Settings Table with Homepage fields
-- ============================================================
INSERT INTO public.settings (key, value) VALUES
  ('hero_title',          'Lqa Ddar dial a7lamek'),
  ('hero_subtitle',       'Accès exclusif l''a7san villas, appartements de luxe, bureaux premium, w terrains f l''Maroc.'),
  ('hero_image_url',      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop'),
  ('promo_banner_active', 'false'),
  ('promo_banner_text',   ''),
  ('tagline',             'Premium Real Estate in Morocco'),
  ('facebook_url',        'https://facebook.com/ElMehdiMoumou'),
  ('instagram_url',       'https://instagram.com/el_mehdi_moumou'),
  ('twitter_url',         'https://twitter.com/ElMehdiMoumou'),
  ('whatsapp_number',     '212700111676')
ON CONFLICT (key) DO NOTHING;

