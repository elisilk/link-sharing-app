-- Create the table
create table instruments (
  id bigint primary key generated always as identity,
  name text not null
);

-- Insert some sample data into the table
-- insert into instruments (name)
-- values
--   ('violin'),
--   ('viola'),
--   ('clarinet'),
--   ('cello');

alter table instruments enable row level security;

create policy "Enable read access for all users"
on "public"."instruments"
for select using (true);