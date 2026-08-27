import { supabase } from './supabase';


// =========================================================
// HOTEL
// =========================================================

export async function getHotel() {
  const { data, error } = await supabase
    .from('hotels')
    .select('*')
    .eq('is_active', true)
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error('getHotel:', error);
    throw error;
  }

  return data;
}


// =========================================================
// STAFF
// =========================================================

export async function getStaff() {
  const { data, error } = await supabase
    .from('staff')
    .select('*')
    .eq('is_active', true)
    .order('display_order', {
      ascending: true,
    });

  if (error) {
    console.error('getStaff:', error);
    throw error;
  }

  return data || [];
}


// =========================================================
// NOTICES
// =========================================================

export async function getNotices() {
  const { data, error } = await supabase
    .from('notices')
    .select('*')
    .eq('is_active', true)
    .order('display_order', {
      ascending: true,
    });

  if (error) {
    console.error('getNotices:', error);
    throw error;
  }

  return data || [];
}


// =========================================================
// RESTAURANTS
// =========================================================

export async function getRestaurants() {
  const { data, error } = await supabase
    .from('restaurants')
    .select(`
      *,
      menu_categories (
        *,
        menu_items (*)
      )
    `)
    .eq('is_active', true)
    .order('display_order', {
      ascending: true,
    });

  if (error) {
    console.error('getRestaurants:', error);
    throw error;
  }

  return (data || []).map((restaurant) => ({
    ...restaurant,

    categories: (restaurant.menu_categories || [])
      .filter((category) => category.is_active)
      .sort(
        (a, b) =>
          a.display_order - b.display_order
      )
      .map((category) => ({
        ...category,

        items: (category.menu_items || [])
          .filter((item) => item.is_available)
          .sort(
            (a, b) =>
              a.display_order - b.display_order
          ),
      })),
  }));
}


// =========================================================
// SINGLE RESTAURANT
// =========================================================

export async function getRestaurantById(
  restaurantId
) {
  const { data, error } = await supabase
    .from('restaurants')
    .select(`
      *,
      menu_categories (
        *,
        menu_items (*)
      )
    `)
    .eq('id', restaurantId)
    .eq('is_active', true)
    .maybeSingle();

  if (error) {
    console.error(
      'getRestaurantById:',
      error
    );

    throw error;
  }

  if (!data) {
    return null;
  }

  return {
    ...data,

    categories: (data.menu_categories || [])
      .filter((category) => category.is_active)
      .sort(
        (a, b) =>
          a.display_order - b.display_order
      )
      .map((category) => ({
        ...category,

        items: (category.menu_items || [])
          .filter((item) => item.is_available)
          .sort(
            (a, b) =>
              a.display_order - b.display_order
          ),
      })),
  };
}


// =========================================================
// PLACES TO VISIT
// =========================================================

export async function getCityPlaces() {
  const { data, error } = await supabase
    .from('city_places')
    .select('*')
    .eq('is_active', true)
    .order('display_order', {
      ascending: true,
    });

  if (error) {
    console.error(
      'getCityPlaces:',
      error
    );

    throw error;
  }

  return data || [];
}


// =========================================================
// HOTEL INFORMATION
// =========================================================

export async function getHotelInformation() {
  const { data, error } = await supabase
    .from('hotel_information')
    .select('*')
    .eq('is_active', true)
    .order('display_order', {
      ascending: true,
    });

  if (error) {
    console.error(
      'getHotelInformation:',
      error
    );

    throw error;
  }

  return data || [];
}


// =========================================================
// ADMIN
// =========================================================


// -------------------------
// UPDATE HOTEL
// -------------------------

export async function updateHotel(
  hotelId,
  updates
) {
  const { data, error } = await supabase
    .from('hotels')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', hotelId)
    .select()
    .single();

  if (error) {
    console.error(
      'updateHotel:',
      error
    );

    throw error;
  }

  return data;
}


// -------------------------
// CREATE RESTAURANT
// -------------------------

export async function createRestaurant(
  restaurant
) {
  const { data, error } = await supabase
    .from('restaurants')
    .insert({
      name: restaurant.name,
      subtitle: restaurant.subtitle || '',
      description:
        restaurant.description || '',
      image: restaurant.image || '',
      pdf: restaurant.pdf || '',
      is_active:
        restaurant.is_active ?? true,
      display_order:
        restaurant.display_order ?? 0,
    })
    .select()
    .single();

  if (error) {
    console.error(
      'createRestaurant:',
      error
    );

    throw error;
  }

  return data;
}


// -------------------------
// UPDATE RESTAURANT
// -------------------------

export async function updateRestaurant(
  restaurantId,
  updates
) {
  const { data, error } = await supabase
    .from('restaurants')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', restaurantId)
    .select()
    .single();

  if (error) {
    console.error(
      'updateRestaurant:',
      error
    );

    throw error;
  }

  return data;
}


// -------------------------
// DELETE RESTAURANT
// -------------------------

export async function deleteRestaurant(
  restaurantId
) {
  const { error } = await supabase
    .from('restaurants')
    .delete()
    .eq('id', restaurantId);

  if (error) {
    console.error(
      'deleteRestaurant:',
      error
    );

    throw error;
  }
}


// =========================================================
// CATEGORIES
// =========================================================

export async function createCategory(
  category
) {
  const { data, error } = await supabase
    .from('menu_categories')
    .insert({
      restaurant_id:
        category.restaurant_id,
      name: category.name,
      description:
        category.description || '',
      display_order:
        category.display_order ?? 0,
      is_active:
        category.is_active ?? true,
    })
    .select()
    .single();

  if (error) {
    console.error(
      'createCategory:',
      error
    );

    throw error;
  }

  return data;
}


export async function updateCategory(
  categoryId,
  updates
) {
  const { data, error } = await supabase
    .from('menu_categories')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', categoryId)
    .select()
    .single();

  if (error) {
    console.error(
      'updateCategory:',
      error
    );

    throw error;
  }

  return data;
}


export async function deleteCategory(
  categoryId
) {
  const { error } = await supabase
    .from('menu_categories')
    .delete()
    .eq('id', categoryId);

  if (error) {
    console.error(
      'deleteCategory:',
      error
    );

    throw error;
  }
}


// =========================================================
// MENU ITEMS
// =========================================================

export async function createMenuItem(
  menuItem
) {
  const { data, error } = await supabase
    .from('menu_items')
    .insert({
      category_id:
        menuItem.category_id,

      name:
        menuItem.name,

      description:
        menuItem.description || '',

      price:
        menuItem.price || '',

      image:
        menuItem.image || '',

      food_type:
        menuItem.food_type || 'veg',

      is_available:
        menuItem.is_available ?? true,

      display_order:
        menuItem.display_order ?? 0,
    })
    .select()
    .single();

  if (error) {
    console.error(
      'createMenuItem:',
      error
    );

    throw error;
  }

  return data;
}


export async function updateMenuItem(
  menuItemId,
  updates
) {
  const { data, error } = await supabase
    .from('menu_items')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', menuItemId)
    .select()
    .single();

  if (error) {
    console.error(
      'updateMenuItem:',
      error
    );

    throw error;
  }

  return data;
}


export async function deleteMenuItem(
  menuItemId
) {
  const { error } = await supabase
    .from('menu_items')
    .delete()
    .eq('id', menuItemId);

  if (error) {
    console.error(
      'deleteMenuItem:',
      error
    );

    throw error;
  }
}


// =========================================================
// NOTICES ADMIN
// =========================================================

export async function createNotice(
  notice
) {
  const { data, error } = await supabase
    .from('notices')
    .insert({
      title: notice.title,
      message: notice.message,
      type:
        notice.type || 'information',
      is_active:
        notice.is_active ?? true,
      display_order:
        notice.display_order ?? 0,
    })
    .select()
    .single();

  if (error) {
    console.error(
      'createNotice:',
      error
    );

    throw error;
  }

  return data;
}


export async function updateNotice(
  noticeId,
  updates
) {
  const { data, error } = await supabase
    .from('notices')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', noticeId)
    .select()
    .single();

  if (error) {
    console.error(
      'updateNotice:',
      error
    );

    throw error;
  }

  return data;
}


export async function deleteNotice(
  noticeId
) {
  const { error } = await supabase
    .from('notices')
    .delete()
    .eq('id', noticeId);

  if (error) {
    console.error(
      'deleteNotice:',
      error
    );

    throw error;
  }
}


// =========================================================
// PLACES ADMIN
// =========================================================

export async function createCityPlace(
  place
) {
  const { data, error } = await supabase
    .from('city_places')
    .insert({
      name: place.name,
      category: place.category || '',
      description:
        place.description || '',
      image: place.image || '',
      address: place.address || '',
      maps_url: place.maps_url || '',
      timings: place.timings || '',
      is_active:
        place.is_active ?? true,
      display_order:
        place.display_order ?? 0,
    })
    .select()
    .single();

  if (error) {
    console.error(
      'createCityPlace:',
      error
    );

    throw error;
  }

  return data;
}


export async function updateCityPlace(
  placeId,
  updates
) {
  const { data, error } = await supabase
    .from('city_places')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', placeId)
    .select()
    .single();

  if (error) {
    console.error(
      'updateCityPlace:',
      error
    );

    throw error;
  }

  return data;
}


export async function deleteCityPlace(
  placeId
) {
  const { error } = await supabase
    .from('city_places')
    .delete()
    .eq('id', placeId);

  if (error) {
    console.error(
      'deleteCityPlace:',
      error
    );

    throw error;
  }
}


// =========================================================
// STAFF ADMIN
// =========================================================

export async function updateStaff(
  staffId,
  updates
) {
  const { data, error } = await supabase
    .from('staff')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', staffId)
    .select()
    .single();

  if (error) {
    console.error(
      'updateStaff:',
      error
    );

    throw error;
  }

  return data;
}


// =========================================================
// DASHBOARD COUNTS
// =========================================================

export async function getDashboardStats() {
  const [
    restaurants,
    notices,
    places,
    categories,
    items,
  ] = await Promise.all([
    supabase
      .from('restaurants')
      .select('id', {
        count: 'exact',
        head: true,
      }),

    supabase
      .from('notices')
      .select('id', {
        count: 'exact',
        head: true,
      }),

    supabase
      .from('city_places')
      .select('id', {
        count: 'exact',
        head: true,
      }),

    supabase
      .from('menu_categories')
      .select('id', {
        count: 'exact',
        head: true,
      }),

    supabase
      .from('menu_items')
      .select('id', {
        count: 'exact',
        head: true,
      }),
  ]);

  const errors = [
    restaurants,
    notices,
    places,
    categories,
    items,
  ].filter((result) => result.error);

  if (errors.length) {
    console.error(
      'getDashboardStats:',
      errors
    );

    throw errors[0].error;
  }

  return {
    restaurants:
      restaurants.count || 0,

    notices:
      notices.count || 0,

    places:
      places.count || 0,

    categories:
      categories.count || 0,

    items:
      items.count || 0,
  };
}