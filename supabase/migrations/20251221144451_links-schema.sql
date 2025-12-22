drop table if exists public.links;

-- Create the table
create table 
  public.links (
    id bigint primary key generated always as identity not null,
    created_at timestamptz default now() not null,
    platform text not null,
    url text not null,
    user_id uuid references profiles (id) on delete cascade not null
  );

-- Enable RLS
alter table public.links enable row level security;

-- Create policies
create policy "Public links are visible to everyone."
on public.links
for select
to authenticated, anon
using ( true );

create policy "Public links can be created by everyone."
on public.links
for insert
to authenticated, anon
with check ( true );