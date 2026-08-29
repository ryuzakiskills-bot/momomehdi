-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Properties Table
create table public.properties (
  id uuid default uuid_generate_v4() primary key,
  slug text unique not null,
  title text not null,
  description text,
  price numeric not null,
  type text not null, -- 'Villa', 'Appartement', 'Bureau', 'Terrain'
  status text default 'Available', -- 'Available', 'Sold'
  city text not null,
  address text,
  surface text,
  bedrooms integer default 0,
  bathrooms integer default 0,
  parking integer default 0,
  security boolean default false,
  elevator boolean default false,
  swimming_pool boolean default false,
  garden boolean default false,
  featured boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Property Images Table
create table public.property_images (
  id uuid default uuid_generate_v4() primary key,
  property_id uuid references public.properties(id) on delete cascade not null,
  image_url text not null,
  is_featured boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Leads Table (extended with status)
create table public.leads (
  id uuid default uuid_generate_v4() primary key,
  property_id uuid references public.properties(id) on delete set null,
  name text not null,
  phone text not null,
  email text,
  message text,
  status text default 'New', -- New, Contacted, Interested, Visit Scheduled, Closed
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Admin Users Table
create table public.admin_users (
  id uuid default uuid_generate_v4() primary key,
  email text unique not null,
  password_hash text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Property Views Tracking Table
create table public.property_views (
  id uuid default uuid_generate_v4() primary key,
  property_id uuid references public.properties(id) on delete cascade,
  viewed_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. Settings Table
create table public.settings (
  id uuid default uuid_generate_v4() primary key,
  key text unique not null,
  value text not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Setup Row Level Security (RLS)
alter table public.properties enable row level security;
alter table public.property_images enable row level security;
alter table public.leads enable row level security;
alter table public.admin_users enable row level security;
alter table public.property_views enable row level security;
alter table public.settings enable row level security;

-- Policies for public reading
create policy "Allow public read access on properties"
  on public.properties for select
  using (true);

create policy "Allow public read access on property_images"
  on public.property_images for select
  using (true);

-- Policy to allow anyone to insert a lead (anonymous form submission)
create policy "Allow anonymous insert on leads"
  on public.leads for insert
  with check (true);

-- Policy to allow admin users to manage data (example – full access for admins)
create policy "Admin full access"
  on public.properties for all
  using (auth.role() = 'authenticated');
create policy "Admin full access"
  on public.property_images for all
  using (auth.role() = 'authenticated');
create policy "Admin full access"
  on public.leads for all
  using (auth.role() = 'authenticated');
create policy "Admin full access"
  on public.admin_users for all
  using (auth.role() = 'authenticated');
create policy "Admin full access"
  on public.property_views for all
  using (auth.role() = 'authenticated');
create policy "Admin full access"
  on public.settings for all
  using (auth.role() = 'authenticated');
