drop table if exists profiles;
TRUNCATE auth.users cascade;

-- Create the table
create table 
  profiles (
    id uuid references auth.users on delete cascade not null,
    created_at timestamptz default now() not null,
    first_name text not null,
    last_name text not null,
    
    primary key (id)
  );

alter table profiles enable row level security;

create policy "Enable read access for all users"
on "public"."profiles"
for select using (true);