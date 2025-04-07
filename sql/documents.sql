create table documents (
  id bigserial primary key,
  -- user_id uuid not null,
  title text not null,
  content text not null,
  cover_image_url text,
  -- tags text[],
  status text default 'draft', -- draft / published / archived
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);