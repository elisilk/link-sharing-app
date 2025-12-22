drop table if exists public.profiles;
TRUNCATE auth.users cascade;

-- Create the table
create table 
  public.profiles (
    id uuid references auth.users on delete cascade not null,
    created_at timestamptz default now() not null,
    first_name text not null,
    last_name text not null,
    email text not null,
    
    primary key (id)
  );

-- Enable RLS
alter table public.profiles enable row level security;

-- Create policies
create policy "Public profiles are visible to everyone."
on public.profiles
for select
to authenticated, anon
using ( true );

create policy "Public profiles can be created by everyone."
on public.profiles
for insert
to authenticated, anon
with check ( true );
