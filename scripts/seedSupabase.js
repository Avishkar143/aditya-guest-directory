// =========================================================
// SUPABASE SEED SCRIPT
// =========================================================
//
// Imports the existing content configuration and inserts
// everything into Supabase.
//
// Run:
// npm run seed
//
// IMPORTANT:
// This script uses SUPABASE_SERVICE_ROLE_KEY.
// Never expose that key in frontend/Vite code.
//
// =========================================================

import 'dotenv/config';

import crypto from 'node:crypto';

import { createClient } from '@supabase/supabase-js';

import {
  hotel,
  staff,
  restaurants,
  notices,
  cityPlaces,
} from '../src/data/content.js';


// =========================================================
// ENVIRONMENT
// =========================================================

const SUPABASE_URL =
  process.env.VITE_SUPABASE_URL;

const SUPABASE_SERVICE_ROLE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY;


if (!SUPABASE_URL) {
  console.error(
    '\n❌ Missing VITE_SUPABASE_URL.\n'
  );

  console.error(
    'Make sure your .env contains:\n'
  );

  console.error(
    'VITE_SUPABASE_URL=https://your-project.supabase.co\n'
  );

  process.exit(1);
}


if (!SUPABASE_SERVICE_ROLE_KEY) {
  console.error(
    '\n❌ Missing SUPABASE_SERVICE_ROLE_KEY.\n'
  );

  console.error(
    'Make sure your .env contains:\n'
  );

  console.error(
    'SUPABASE_SERVICE_ROLE_KEY=your-secret-key\n'
  );

  process.exit(1);
}


// =========================================================
// SUPABASE CLIENT
// =========================================================

const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY
);


// =========================================================
// HELPERS
// =========================================================

const now = new Date().toISOString();

const log = (message) => {
  console.log(`\n${message}`);
};


// =========================================================
// DETERMINISTIC UUID
// =========================================================
//
// Supabase menu_items.id and menu_categories.id are UUID.
//
// We cannot insert:
//
//   ird-breakfast-local-dhapate-1
//
// Therefore we convert a deterministic string into a valid
// UUID.
//
// The same source record always gets the same UUID.
//
// This means running:
//
//   npm run seed
//
// repeatedly will safely update existing records instead
// of creating duplicates.
//
// =========================================================

const deterministicUUID = (value) => {
  const hash = crypto
    .createHash('sha256')
    .update(String(value))
    .digest('hex');

  return [
    hash.substring(0, 8),
    hash.substring(8, 12),
    hash.substring(12, 16),
    hash.substring(16, 20),
    hash.substring(20, 32),
  ].join('-');
};


// =========================================================
// CATEGORY UUID
// =========================================================

const getCategoryDatabaseId = (
  restaurant,
  menuCategory
) => {

  const sourceId =
    `${restaurant.id}:category:${menuCategory.id}`;

  return deterministicUUID(sourceId);
};


// =========================================================
// MENU ITEM UUID
// =========================================================

const getMenuItemDatabaseId = (
  restaurant,
  menuCategory,
  menuItem,
  itemIndex
) => {

  const sourceId =
    [
      restaurant.id,
      'item',
      menuCategory.id,
      itemIndex + 1,
      menuItem.name,
    ].join(':');

  return deterministicUUID(sourceId);
};


// =========================================================
// TEST CONNECTION
// =========================================================

async function testConnection() {

  log(
    '🔌 Testing Supabase connection...'
  );

  const { data, error } =
    await supabase
      .from('hotels')
      .select('id')
      .limit(1);


  if (error) {

    console.error(
      '\n❌ Supabase connection failed:'
    );

    console.error(error);

    throw error;
  }


  console.log(
    '✅ Supabase connection successful.'
  );


  return data;
}


// =========================================================
// HOTEL
// =========================================================

async function seedHotel() {

  log('🏨 Seeding hotel...');


  const hotelRecord = {

    id:
      hotel.id,

    name:
      hotel.name,

    city:
      hotel.city,

    country:
      hotel.country,

    phone:
      hotel.phone,

    whatsapp:
      hotel.whatsapp,

    welcome_title:
      hotel.welcomeTitle || '',

    welcome_message:
      hotel.welcomeMessage || '',

    assistance_message:
      hotel.assistanceMessage || '',

    is_active:
      hotel.is_active !== false,
  };


  const { error } =
    await supabase
      .from('hotels')
      .upsert(
        hotelRecord,
        {
          onConflict: 'id',
        }
      );


  if (error) {

    console.error(
      '❌ Hotel insert failed:',
      error
    );

    throw error;
  }


  console.log(
    `✅ Hotel: ${hotel.name}`
  );
}


// =========================================================
// STAFF
// =========================================================

async function seedStaff() {

  log(
    '👤 Seeding hotel assistance...'
  );


  const staffRecord = {

    id:
      staff.id,

    name:
      staff.name,

    designation:
      staff.designation || '',

    phone:
      staff.phone || null,

    whatsapp:
      staff.whatsapp || null,

    photo:
      staff.photo || '',

    welcome_message:
      staff.welcome || '',

    is_active:
      staff.is_active !== false,
  };


  const { error } =
    await supabase
      .from('staff')
      .upsert(
        staffRecord,
        {
          onConflict: 'id',
        }
      );


  if (error) {

    console.error(
      '❌ Staff insert failed:',
      error
    );

    throw error;
  }


  console.log(
    `✅ Staff: ${staff.name}`
  );
}


// =========================================================
// RESTAURANTS
// =========================================================

async function seedRestaurants() {

  log(
    '🍽️ Seeding restaurants...'
  );


  const restaurantRecords =
    restaurants.map(
      (
        restaurant,
        restaurantIndex
      ) => ({

        id:
          restaurant.id,

        name:
          restaurant.name,

        subtitle:
          restaurant.subtitle || '',

        description:
          restaurant.description || '',

        image:
          restaurant.image || '',

        pdf:
          restaurant.pdf || null,

        is_active:
          restaurant.is_active !== false,

        display_order:
          restaurant.display_order ??
          restaurantIndex + 1,
      })
    );


  if (!restaurantRecords.length) {

    console.log(
      'ℹ️ No restaurants configured.'
    );

    return;
  }


  const { error } =
    await supabase
      .from('restaurants')
      .upsert(
        restaurantRecords,
        {
          onConflict: 'id',
        }
      );


  if (error) {

    console.error(
      '❌ Restaurant insert failed:',
      error
    );

    throw error;
  }


  restaurantRecords.forEach(
    (restaurant) => {

      console.log(
        `  ✅ ${restaurant.display_order}. ${restaurant.name}`
      );

    }
  );


  console.log(
    `✅ ${restaurantRecords.length} restaurants inserted.`
  );
}


// =========================================================
// MENU CATEGORIES
// =========================================================

async function seedCategories() {

  log(
    '📂 Seeding menu categories...'
  );


  const categoryRecords = [];


  restaurants.forEach(
    (restaurant) => {

      const categories =
        restaurant.categories || [];


      categories.forEach(
        (
          menuCategory,
          categoryIndex
        ) => {

          const categoryDatabaseId =
            getCategoryDatabaseId(
              restaurant,
              menuCategory
            );


          categoryRecords.push({

            id:
              categoryDatabaseId,

            restaurant_id:
              restaurant.id,

            name:
              menuCategory.name,

            description:
              menuCategory.description || '',

            display_order:
              menuCategory.display_order ??
              categoryIndex + 1,

            is_active:
              menuCategory.is_active !== false,
          });

        }
      );

    }
  );


  if (!categoryRecords.length) {

    console.log(
      'ℹ️ No menu categories to insert.'
    );

    return;
  }


  // -------------------------------------------------------
  // Duplicate UUID safety check
  // -------------------------------------------------------

  const ids =
    categoryRecords.map(
      (category) => category.id
    );


  const duplicateIds =
    ids.filter(
      (id, index) =>
        ids.indexOf(id) !== index
    );


  if (duplicateIds.length) {

    console.error(
      '❌ Duplicate category UUIDs detected:'
    );

    console.error(
      [...new Set(duplicateIds)]
    );

    throw new Error(
      'Duplicate category UUIDs detected before Supabase insert.'
    );
  }


  // -------------------------------------------------------
  // Batch insert
  // -------------------------------------------------------

  const batchSize = 100;


  for (
    let i = 0;
    i < categoryRecords.length;
    i += batchSize
  ) {

    const batch =
      categoryRecords.slice(
        i,
        i + batchSize
      );


    const { error } =
      await supabase
        .from('menu_categories')
        .upsert(
          batch,
          {
            onConflict: 'id',
          }
        );


    if (error) {

      console.error(
        `❌ Category batch ${
          Math.floor(i / batchSize) + 1
        } failed:`,
        error
      );

      throw error;
    }


    console.log(
      `  ✅ Categories ${i + 1}-${Math.min(
        i + batchSize,
        categoryRecords.length
      )}/${categoryRecords.length}`
    );
  }


  console.log(
    `✅ ${categoryRecords.length} menu categories inserted.`
  );
}


// =========================================================
// MENU ITEMS
// =========================================================

async function seedMenuItems() {

  log(
    '🍴 Seeding menu items...'
  );


  const itemRecords = [];


  restaurants.forEach(
    (restaurant) => {

      const categories =
        restaurant.categories || [];


      categories.forEach(
        (menuCategory) => {

          const items =
            menuCategory.items || [];


          const categoryDatabaseId =
            getCategoryDatabaseId(
              restaurant,
              menuCategory
            );


          items.forEach(
            (
              menuItem,
              itemIndex
            ) => {

              const itemId =
                getMenuItemDatabaseId(
                  restaurant,
                  menuCategory,
                  menuItem,
                  itemIndex
                );


              itemRecords.push({

                id:
                  itemId,

                category_id:
                  categoryDatabaseId,

                name:
                  menuItem.name,

                description:
                  menuItem.description || '',

                /*
                 * Prices are preserved as TEXT.
                 *
                 * Examples:
                 *
                 * ₹395
                 * ₹475 / ₹495 / ₹545
                 * See menu PDF
                 */

                price:
                  menuItem.price || '',

                image:
                  menuItem.image || '',

                food_type:
                  menuItem.type || 'veg',

                is_available:
                  menuItem.is_available !== false,

                display_order:
                  menuItem.display_order ??
                  itemIndex + 1,
              });

            }
          );

        }
      );

    }
  );


  if (!itemRecords.length) {

    console.log(
      'ℹ️ No menu items to insert.'
    );

    return;
  }


  // -------------------------------------------------------
  // Duplicate UUID safety check
  // -------------------------------------------------------

  const ids =
    itemRecords.map(
      (item) => item.id
    );


  const duplicateIds =
    ids.filter(
      (id, index) =>
        ids.indexOf(id) !== index
    );


  if (duplicateIds.length) {

    console.error(
      '❌ Duplicate menu item UUIDs detected:'
    );

    console.error(
      [...new Set(duplicateIds)]
    );

    throw new Error(
      'Duplicate menu item UUIDs detected before Supabase insert.'
    );
  }


  // -------------------------------------------------------
  // Batch upsert
  // -------------------------------------------------------

  const batchSize = 100;


  for (
    let i = 0;
    i < itemRecords.length;
    i += batchSize
  ) {

    const batch =
      itemRecords.slice(
        i,
        i + batchSize
      );


    const { error } =
      await supabase
        .from('menu_items')
        .upsert(
          batch,
          {
            onConflict: 'id',
          }
        );


    if (error) {

      console.error(
        `❌ Menu item batch ${
          Math.floor(i / batchSize) + 1
        } failed:`,
        error
      );

      throw error;
    }


    console.log(
      `  ✅ Inserted ${Math.min(
        i + batchSize,
        itemRecords.length
      )}/${itemRecords.length} items`
    );
  }


  console.log(
    `✅ ${itemRecords.length} menu items inserted.`
  );
}


// =========================================================
// NOTICES
// =========================================================

async function seedNotices() {

  log(
    '🔔 Seeding notices...'
  );


  if (!notices.length) {

    console.log(
      'ℹ️ No notices configured.'
    );

    return;
  }


  const noticeRecords =
    notices.map(
      (
        notice,
        index
      ) => ({

        id:
          notice.id,

        title:
          notice.title || '',

        message:
          notice.message || '',

        type:
          notice.type ||
          'information',

        is_active:
          notice.is_active !== false,

        display_order:
          notice.display_order ??
          index + 1,

        created_at:
          notice.created_at ||
          now,

        updated_at:
          notice.updated_at ||
          now,
      })
    );


  const { error } =
    await supabase
      .from('notices')
      .upsert(
        noticeRecords,
        {
          onConflict: 'id',
        }
      );


  if (error) {

    console.error(
      '❌ Notice insert failed:',
      error
    );

    throw error;
  }


  console.log(
    `✅ ${noticeRecords.length} notices inserted.`
  );
}


// =========================================================
// CITY PLACES
// =========================================================

async function seedPlaces() {

  log(
    '📍 Seeding places to visit...'
  );


  if (!cityPlaces.length) {

    console.log(
      'ℹ️ No places configured.'
    );

    return;
  }


  const placeRecords =
    cityPlaces.map(
      (
        place,
        index
      ) => ({

        id:
          place.id,

        name:
          place.name,

        category:
          place.category || '',

        description:
          place.description || '',

        image:
          place.image || '',

        address:
          place.address || '',

        maps_url:
          place.maps_url || '',

        timings:
          place.timings || '',

        is_active:
          place.is_active !== false,

        display_order:
          place.display_order ??
          index + 1,

        created_at:
          place.created_at ||
          now,

        updated_at:
          place.updated_at ||
          now,
      })
    );


  const { error } =
    await supabase
      .from('city_places')
      .upsert(
        placeRecords,
        {
          onConflict: 'id',
        }
      );


  if (error) {

    console.error(
      '❌ Places insert failed:',
      error
    );

    throw error;
  }


  console.log(
    `✅ ${placeRecords.length} places inserted.`
  );
}


// =========================================================
// MAIN SEED
// =========================================================

async function seed() {

  try {

    console.log(
      '\n========================================'
    );

    console.log(
      ' FOUR POINTS NASHIK'
    );

    console.log(
      ' SUPABASE DATA SEED'
    );

    console.log(
      '========================================'
    );


    // -----------------------------------------------------
    // 1. CONNECTION
    // -----------------------------------------------------

    await testConnection();


    // -----------------------------------------------------
    // 2. HOTEL
    // -----------------------------------------------------

    await seedHotel();


    // -----------------------------------------------------
    // 3. STAFF
    // -----------------------------------------------------

    await seedStaff();


    // -----------------------------------------------------
    // 4. RESTAURANTS
    // -----------------------------------------------------

    await seedRestaurants();


    // -----------------------------------------------------
    // 5. CATEGORIES
    // -----------------------------------------------------

    await seedCategories();


    // -----------------------------------------------------
    // 6. MENU ITEMS
    // -----------------------------------------------------

    await seedMenuItems();


    // -----------------------------------------------------
    // 7. NOTICES
    // -----------------------------------------------------

    await seedNotices();


    // -----------------------------------------------------
    // 8. PLACES
    // -----------------------------------------------------

    await seedPlaces();


    console.log(
      '\n========================================'
    );

    console.log(
      '🎉 SEED COMPLETED SUCCESSFULLY'
    );

    console.log(
      '========================================\n'
    );

  } catch (error) {

    console.error(
      '\n========================================'
    );

    console.error(
      '❌ SEED FAILED'
    );

    console.error(
      '========================================'
    );

    console.error(error);

    process.exit(1);
  }
}


// =========================================================
// START
// =========================================================

seed();