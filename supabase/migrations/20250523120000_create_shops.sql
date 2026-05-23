-- Shops table for vendor storefronts
create table if not exists public.shops (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  slug text not null unique,
  color_accent text not null default '#0055FF',
  description text,
  created_at timestamptz not null default now()
);

create index if not exists shops_owner_id_idx on public.shops (owner_id);

alter table public.shops enable row level security;

create policy "Users can view their own shops"
  on public.shops
  for select
  to authenticated
  using (auth.uid() = owner_id);

create policy "Users can create their own shops"
  on public.shops
  for insert
  to authenticated
  with check (auth.uid() = owner_id);

create policy "Users can update their own shops"
  on public.shops
  for update
  to authenticated
  using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);
