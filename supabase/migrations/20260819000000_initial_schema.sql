-- =========================================================
-- FOUR POINTS NASHIK
-- GUEST DIRECTORY DATABASE
-- =========================================================

create extension if not exists pgcrypto;


-- =========================================================
-- UPDATED_AT FUNCTION
-- =========================================================

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;


-- =========================================================
-- HOTELS
-- =========================================================

create table if not exists public.hotels (
  id text primary key,
  name text not null,
  city text not null default '',
  country text not null default 'India',

  phone text default '',
  whatsapp text default '',

  welcome_title text default '',
  welcome_message text default '',
  assistance_message text default '',

  is_active boolean not null default true,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);


-- =========================================================
-- STAFF
-- =========================================================

create table if not exists public.staff (
  id text primary key,

  hotel_id text
    references public.hotels(id)
    on delete cascade,

  name text not null default '',
  designation text not null default '',

  phone text default '',
  whatsapp text default '',

  photo text default '',

  welcome_message text default '',

  is_active boolean not null default true,

  display_order integer not null default 0,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);


-- =========================================================
-- NOTICES
-- =========================================================

create table if not exists public.notices (
  id uuid primary key default gen_random_uuid(),

  hotel_id text
    references public.hotels(id)
    on delete cascade,

  title text not null,
  message text not null,

  type text not null default 'information',

  is_active boolean not null default true,

  display_order integer not null default 0,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);


-- =========================================================
-- RESTAURANTS
-- =========================================================

create table if not exists public.restaurants (
  id text primary key,

  hotel_id text
    references public.hotels(id)
    on delete cascade,

  name text not null,

  subtitle text default '',

  description text default '',

  image text default '',

  pdf text default '',

  is_active boolean not null default true,

  display_order integer not null default 0,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);


-- =========================================================
-- MENU CATEGORIES
-- =========================================================

create table if not exists public.menu_categories (
  id text primary key,

  restaurant_id text not null
    references public.restaurants(id)
    on delete cascade,

  name text not null,

  description text default '',

  display_order integer not null default 0,

  is_active boolean not null default true,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);


-- =========================================================
-- MENU ITEMS
-- =========================================================

create table if not exists public.menu_items (
  id uuid primary key default gen_random_uuid(),

  category_id text not null
    references public.menu_categories(id)
    on delete cascade,

  name text not null,

  description text default '',

  price text default '',

  image text default '',

  food_type text not null default 'veg'
    check (
      food_type in (
        'veg',
        'non-veg',
        'mixed'
      )
    ),

  is_available boolean not null default true,

  display_order integer not null default 0,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);


-- =========================================================
-- CITY PLACES
-- =========================================================

create table if not exists public.city_places (
  id uuid primary key default gen_random_uuid(),

  hotel_id text
    references public.hotels(id)
    on delete cascade,

  name text not null,

  category text default '',

  description text default '',

  image text default '',

  address text default '',

  maps_url text default '',

  timings text default '',

  is_active boolean not null default true,

  display_order integer not null default 0,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);


-- =========================================================
-- HOTEL INFORMATION
-- =========================================================

create table if not exists public.hotel_information (
  id uuid primary key default gen_random_uuid(),

  hotel_id text
    references public.hotels(id)
    on delete cascade,

  type text not null default 'information',

  title text not null,

  description text default '',

  image text default '',

  timings text default '',

  is_active boolean not null default true,

  display_order integer not null default 0,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);


-- =========================================================
-- QR CODES
-- =========================================================

create table if not exists public.qr_codes (
  id uuid primary key default gen_random_uuid(),

  hotel_id text
    references public.hotels(id)
    on delete cascade,

  slug text not null unique,

  is_active boolean not null default true,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);


-- =========================================================
-- INDEXES
-- =========================================================

create index if not exists restaurants_hotel_id_idx
on public.restaurants(hotel_id);

create index if not exists restaurants_display_order_idx
on public.restaurants(display_order);

create index if not exists menu_categories_restaurant_id_idx
on public.menu_categories(restaurant_id);

create index if not exists menu_categories_display_order_idx
on public.menu_categories(display_order);

create index if not exists menu_items_category_id_idx
on public.menu_items(category_id);

create index if not exists menu_items_display_order_idx
on public.menu_items(display_order);

create index if not exists notices_hotel_id_idx
on public.notices(hotel_id);

create index if not exists city_places_hotel_id_idx
on public.city_places(hotel_id);

create index if not exists hotel_information_hotel_id_idx
on public.hotel_information(hotel_id);


-- =========================================================
-- UPDATED_AT TRIGGERS
-- =========================================================

drop trigger if exists hotels_updated_at
on public.hotels;

create trigger hotels_updated_at
before update on public.hotels
for each row
execute function public.set_updated_at();


drop trigger if exists staff_updated_at
on public.staff;

create trigger staff_updated_at
before update on public.staff
for each row
execute function public.set_updated_at();


drop trigger if exists notices_updated_at
on public.notices;

create trigger notices_updated_at
before update on public.notices
for each row
execute function public.set_updated_at();


drop trigger if exists restaurants_updated_at
on public.restaurants;

create trigger restaurants_updated_at
before update on public.restaurants
for each row
execute function public.set_updated_at();


drop trigger if exists menu_categories_updated_at
on public.menu_categories;

create trigger menu_categories_updated_at
before update on public.menu_categories
for each row
execute function public.set_updated_at();


drop trigger if exists menu_items_updated_at
on public.menu_items;

create trigger menu_items_updated_at
before update on public.menu_items
for each row
execute function public.set_updated_at();


drop trigger if exists city_places_updated_at
on public.city_places;

create trigger city_places_updated_at
before update on public.city_places
for each row
execute function public.set_updated_at();


drop trigger if exists hotel_information_updated_at
on public.hotel_information;

create trigger hotel_information_updated_at
before update on public.hotel_information
for each row
execute function public.set_updated_at();


drop trigger if exists qr_codes_updated_at
on public.qr_codes;

create trigger qr_codes_updated_at
before update on public.qr_codes
for each row
execute function public.set_updated_at();


-- =========================================================
-- INSERT HOTEL
-- =========================================================

insert into public.hotels (
  id,
  name,
  city,
  country,
  phone,
  whatsapp,
  welcome_title,
  welcome_message,
  assistance_message,
  is_active
)
values (
  'four-points-nashik',
  'Four Points by Sheraton Nashik',
  'Nashik',
  'India',
  '+91 92250 99414',
  '+91 92250 99414',
  'Welcome to Four Points by Sheraton Nashik',
  'Dining, local experiences and personal assistance — all in one place.',
  'Our guest assistance team is available to help you with your stay.',
  true
)
on conflict (id)
do update set
  name = excluded.name,
  city = excluded.city,
  country = excluded.country,
  phone = excluded.phone,
  whatsapp = excluded.whatsapp,
  welcome_title = excluded.welcome_title,
  welcome_message = excluded.welcome_message,
  assistance_message = excluded.assistance_message,
  is_active = excluded.is_active;


-- =========================================================
-- INSERT STAFF
-- =========================================================

insert into public.staff (
  id,
  hotel_id,
  name,
  designation,
  phone,
  whatsapp,
  photo,
  welcome_message,
  is_active,
  display_order
)
values (
  'hotel-assistance',
  'four-points-nashik',
  'Hotel Assistant',
  'Guest Assistance',
  '+91 92250 99414',
  '+91 92250 99414',
  '',
  'Namste Sir/Ma’am, How Can I assist you?',
  true,
  1
)
on conflict (id)
do update set
  hotel_id = excluded.hotel_id,
  name = excluded.name,
  designation = excluded.designation,
  phone = excluded.phone,
  whatsapp = excluded.whatsapp,
  welcome_message = excluded.welcome_message,
  is_active = excluded.is_active;


-- =========================================================
-- RLS
-- =========================================================

alter table public.hotels enable row level security;
alter table public.staff enable row level security;
alter table public.notices enable row level security;
alter table public.restaurants enable row level security;
alter table public.menu_categories enable row level security;
alter table public.menu_items enable row level security;
alter table public.city_places enable row level security;
alter table public.hotel_information enable row level security;
alter table public.qr_codes enable row level security;


-- =========================================================
-- PUBLIC READ POLICIES
-- =========================================================

drop policy if exists "Public can read active hotels"
on public.hotels;

create policy "Public can read active hotels"
on public.hotels
for select
to anon, authenticated
using (
  is_active = true
);


drop policy if exists "Public can read active staff"
on public.staff;

create policy "Public can read active staff"
on public.staff
for select
to anon, authenticated
using (
  is_active = true
);


drop policy if exists "Public can read active notices"
on public.notices;

create policy "Public can read active notices"
on public.notices
for select
to anon, authenticated
using (
  is_active = true
);


drop policy if exists "Public can read active restaurants"
on public.restaurants;

create policy "Public can read active restaurants"
on public.restaurants
for select
to anon, authenticated
using (
  is_active = true
);


drop policy if exists "Public can read active categories"
on public.menu_categories;

create policy "Public can read active categories"
on public.menu_categories
for select
to anon, authenticated
using (
  is_active = true
);


drop policy if exists "Public can read available menu items"
on public.menu_items;

create policy "Public can read available menu items"
on public.menu_items
for select
to anon, authenticated
using (
  is_available = true
);


drop policy if exists "Public can read active places"
on public.city_places;

create policy "Public can read active places"
on public.city_places
for select
to anon, authenticated
using (
  is_active = true
);


drop policy if exists "Public can read active hotel information"
on public.hotel_information;

create policy "Public can read active hotel information"
on public.hotel_information
for select
to anon, authenticated
using (
  is_active = true
);


drop policy if exists "Public can read active QR codes"
on public.qr_codes;

create policy "Public can read active QR codes"
on public.qr_codes
for select
to anon, authenticated
using (
  is_active = true
);


-- =========================================================
-- AUTHENTICATED ADMIN POLICIES
-- =========================================================
--
-- Temporary development policy.
--
-- We will replace this with proper admin-role
-- authorization when we build Admin Login.
--
-- =========================================================

drop policy if exists "Authenticated users manage hotels"
on public.hotels;

create policy "Authenticated users manage hotels"
on public.hotels
for all
to authenticated
using (true)
with check (true);


drop policy if exists "Authenticated users manage staff"
on public.staff;

create policy "Authenticated users manage staff"
on public.staff
for all
to authenticated
using (true)
with check (true);


drop policy if exists "Authenticated users manage notices"
on public.notices;

create policy "Authenticated users manage notices"
on public.notices
for all
to authenticated
using (true)
with check (true);


drop policy if exists "Authenticated users manage restaurants"
on public.restaurants;

create policy "Authenticated users manage restaurants"
on public.restaurants
for all
to authenticated
using (true)
with check (true);


drop policy if exists "Authenticated users manage categories"
on public.menu_categories;

create policy "Authenticated users manage categories"
on public.menu_categories
for all
to authenticated
using (true)
with check (true);


drop policy if exists "Authenticated users manage menu items"
on public.menu_items;

create policy "Authenticated users manage menu items"
on public.menu_items
for all
to authenticated
using (true)
with check (true);


drop policy if exists "Authenticated users manage places"
on public.city_places;

create policy "Authenticated users manage places"
on public.city_places
for all
to authenticated
using (true)
with check (true);


drop policy if exists "Authenticated users manage hotel information"
on public.hotel_information;

create policy "Authenticated users manage hotel information"
on public.hotel_information
for all
to authenticated
using (true)
with check (true);


drop policy if exists "Authenticated users manage QR codes"
on public.qr_codes;

create policy "Authenticated users manage QR codes"
on public.qr_codes
for all
to authenticated
using (true)
with check (true);


-- =========================================================
-- GRANTS
-- =========================================================

grant select on public.hotels
to anon, authenticated;

grant select on public.staff
to anon, authenticated;

grant select on public.notices
to anon, authenticated;

grant select on public.restaurants
to anon, authenticated;

grant select on public.menu_categories
to anon, authenticated;

grant select on public.menu_items
to anon, authenticated;

grant select on public.city_places
to anon, authenticated;

grant select on public.hotel_information
to anon, authenticated;

grant select on public.qr_codes
to anon, authenticated;


grant select, insert, update, delete
on public.hotels
to authenticated;

grant select, insert, update, delete
on public.staff
to authenticated;

grant select, insert, update, delete
on public.notices
to authenticated;

grant select, insert, update, delete
on public.restaurants
to authenticated;

grant select, insert, update, delete
on public.menu_categories
to authenticated;

grant select, insert, update, delete
on public.menu_items
to authenticated;

grant select, insert, update, delete
on public.city_places
to authenticated;

grant select, insert, update, delete
on public.hotel_information
to authenticated;

grant select, insert, update, delete
on public.qr_codes
to authenticated;


-- =========================================================
-- SEQUENCES / DEFAULTS COMPLETE
-- =========================================================