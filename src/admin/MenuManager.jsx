import { useEffect, useState } from 'react';

import {
  UtensilsCrossed,
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  X,
  Save,
  ChevronDown,
  ChevronRight,
  Loader2,
} from 'lucide-react';

import { supabase } from '../lib/supabase.js';


/* =========================================================
   FOUR POINTS NASHIK
   ========================================================= */

const HOTEL_ID = 'four-points-nashik';


/* =========================================================
   EMPTY FORMS
   ========================================================= */

const EMPTY_CATEGORY = {
  name: '',
  description: '',
  display_order: 0,
  is_active: true,
};


const EMPTY_ITEM = {
  name: '',
  description: '',
  price: '',
  food_type: 'veg',
  is_available: true,
  display_order: 0,
};


/* =========================================================
   MENU MANAGER
   ========================================================= */

export default function MenuManager() {

  /* =======================================================
     RESTAURANTS
     ======================================================= */

  const [restaurants, setRestaurants] = useState([]);

  const [selectedRestaurantId, setSelectedRestaurantId] =
    useState('');


  /* =======================================================
     MENU DATA
     ======================================================= */

  const [categories, setCategories] = useState([]);

  const [items, setItems] = useState([]);


  /* =======================================================
     STATES
     ======================================================= */

  const [loading, setLoading] = useState(true);

  const [loadingMenu, setLoadingMenu] = useState(false);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState('');


  /* =======================================================
     CATEGORY UI
     ======================================================= */

  const [expandedCategories, setExpandedCategories] =
    useState({});


  /* =======================================================
     CATEGORY MODAL
     ======================================================= */

  const [showCategoryModal, setShowCategoryModal] =
    useState(false);

  const [editingCategory, setEditingCategory] =
    useState(null);

  const [categoryForm, setCategoryForm] =
    useState(EMPTY_CATEGORY);


  /* =======================================================
     ITEM MODAL
     ======================================================= */

  const [showItemModal, setShowItemModal] =
    useState(false);

  const [editingItem, setEditingItem] =
    useState(null);

  const [selectedCategoryId, setSelectedCategoryId] =
    useState('');

  const [itemForm, setItemForm] =
    useState(EMPTY_ITEM);


  /* =======================================================
     LOAD RESTAURANTS
     ======================================================= */

  const loadRestaurants = async () => {

    setLoading(true);

    setError('');


    const {
      data,
      error: fetchError,
    } = await supabase
      .from('restaurants')
      .select('*')
      .eq('hotel_id', HOTEL_ID)
      .order('display_order', {
        ascending: true,
      })
      .order('created_at', {
        ascending: true,
      });


    if (fetchError) {

      console.error(
        'Error loading restaurants:',
        fetchError
      );

      setError(
        fetchError.message ||
        'Unable to load restaurants.'
      );

      setRestaurants([]);

      setLoading(false);

      return;
    }


    const restaurantData =
      data || [];


    setRestaurants(
      restaurantData
    );


    if (restaurantData.length > 0) {

      setSelectedRestaurantId(
        (current) =>
          current ||
          restaurantData[0].id
      );

    }


    setLoading(false);

  };


  /* =======================================================
     LOAD MENU
     ======================================================= */

  const loadMenu = async () => {

    if (!selectedRestaurantId) {

      setCategories([]);

      setItems([]);

      return;

    }


    setLoadingMenu(true);

    setError('');


    /* -----------------------------------------------------
       LOAD CATEGORIES
       ----------------------------------------------------- */

    const {
      data: categoryData,
      error: categoryError,
    } = await supabase
      .from('menu_categories')
      .select('*')
      .eq(
        'restaurant_id',
        selectedRestaurantId
      )
      .order('display_order', {
        ascending: true,
      })
      .order('created_at', {
        ascending: true,
      });


    if (categoryError) {

      console.error(
        'Error loading categories:',
        categoryError
      );

      setError(
        categoryError.message ||
        'Unable to load categories.'
      );

      setCategories([]);

      setItems([]);

      setLoadingMenu(false);

      return;
    }


    const loadedCategories =
      categoryData || [];


    setCategories(
      loadedCategories
    );


    /* -----------------------------------------------------
       LOAD ITEMS
       ----------------------------------------------------- */

    const categoryIds =
      loadedCategories.map(
        (category) => category.id
      );


    if (!categoryIds.length) {

      setItems([]);

      setLoadingMenu(false);

      return;

    }


    const {
      data: itemData,
      error: itemError,
    } = await supabase
      .from('menu_items')
      .select('*')
      .in(
        'category_id',
        categoryIds
      )
      .order('display_order', {
        ascending: true,
      })
      .order('created_at', {
        ascending: true,
      });


    if (itemError) {

      console.error(
        'Error loading menu items:',
        itemError
      );

      setError(
        itemError.message ||
        'Unable to load menu items.'
      );

      setItems([]);

      setLoadingMenu(false);

      return;
    }


    setItems(
      itemData || []
    );

    setLoadingMenu(false);

  };


  /* =======================================================
     INITIAL LOAD
     ======================================================= */

  useEffect(() => {

    loadRestaurants();

  }, []);


  /* =======================================================
     LOAD MENU WHEN RESTAURANT CHANGES
     ======================================================= */

  useEffect(() => {

    loadMenu();

  }, [
    selectedRestaurantId,
  ]);


  /* =======================================================
     REALTIME
     ======================================================= */

  useEffect(() => {

    const channel =
      supabase
        .channel(
          'admin-menu-management'
        )
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'restaurants',
            filter:
              `hotel_id=eq.${HOTEL_ID}`,
          },
          () => {

            loadRestaurants();

          }
        )
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'menu_categories',
          },
          () => {

            loadMenu();

          }
        )
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'menu_items',
          },
          () => {

            loadMenu();

          }
        )
        .subscribe();


    return () => {

      supabase.removeChannel(
        channel
      );

    };

  }, [
    selectedRestaurantId,
  ]);


  /* =======================================================
     GET ITEMS FOR CATEGORY
     ======================================================= */

  const getCategoryItems = (
    categoryId
  ) => {

    return items.filter(
      (item) =>
        item.category_id ===
        categoryId
    );

  };


  /* =======================================================
     TOGGLE CATEGORY EXPANSION
     ======================================================= */

  const toggleCategoryExpanded = (
    categoryId
  ) => {

    setExpandedCategories(
      (current) => ({
        ...current,
        [categoryId]:
          !current[categoryId],
      })
    );

  };


  /* =======================================================
     CATEGORY
     ======================================================= */

  const openAddCategory = () => {

    setEditingCategory(null);

    setCategoryForm({

      ...EMPTY_CATEGORY,

      display_order:
        categories.length,

    });

    setError('');

    setShowCategoryModal(true);

  };


  const openEditCategory = (
    category
  ) => {

    setEditingCategory(
      category
    );

    setCategoryForm({

      name:
        category.name || '',

      description:
        category.description || '',

      display_order:
        category.display_order ?? 0,

      is_active:
        category.is_active ?? true,

    });

    setError('');

    setShowCategoryModal(true);

  };


  const closeCategoryModal = () => {

    if (saving) return;

    setShowCategoryModal(false);

    setEditingCategory(null);

    setCategoryForm(
      EMPTY_CATEGORY
    );

  };


  /* =======================================================
     SAVE CATEGORY
     ======================================================= */

  const saveCategory = async (
    event
  ) => {

    event.preventDefault();


    if (!selectedRestaurantId) {

      setError(
        'Please select a restaurant.'
      );

      return;

    }


    if (!categoryForm.name.trim()) {

      setError(
        'Category name is required.'
      );

      return;

    }


    setSaving(true);

    setError('');


    /* -----------------------------------------------------
       UPDATE
       ----------------------------------------------------- */

    if (editingCategory) {

      const {
        error: updateError,
      } = await supabase
        .from('menu_categories')
        .update({

          name:
            categoryForm.name.trim(),

          description:
            categoryForm.description.trim(),

          display_order:
            Number(
              categoryForm.display_order
            ) || 0,

          is_active:
            Boolean(
              categoryForm.is_active
            ),

        })
        .eq(
          'id',
          editingCategory.id
        )
        .eq(
          'restaurant_id',
          selectedRestaurantId
        );


      if (updateError) {

        console.error(
          'Error updating category:',
          updateError
        );

        setError(
          updateError.message ||
          'Unable to update category.'
        );

        setSaving(false);

        return;

      }

    }


    /* -----------------------------------------------------
       INSERT
       ----------------------------------------------------- */

    else {

      const categoryId =
        `${selectedRestaurantId}-${Date.now()}`;


      const {
        error: insertError,
      } = await supabase
        .from('menu_categories')
        .insert({

          id:
            categoryId,

          restaurant_id:
            selectedRestaurantId,

          name:
            categoryForm.name.trim(),

          description:
            categoryForm.description.trim(),

          display_order:
            Number(
              categoryForm.display_order
            ) || 0,

          is_active:
            Boolean(
              categoryForm.is_active
            ),

        });


      if (insertError) {

        console.error(
          'Error creating category:',
          insertError
        );

        setError(
          insertError.message ||
          'Unable to create category.'
        );

        setSaving(false);

        return;

      }

    }


    setSaving(false);

    setShowCategoryModal(false);

    setEditingCategory(null);

    setCategoryForm(
      EMPTY_CATEGORY
    );

    await loadMenu();

  };


  /* =======================================================
     DELETE CATEGORY
     ======================================================= */

  const deleteCategory = async (
    category
  ) => {

    const categoryItems =
      getCategoryItems(
        category.id
      );


    const confirmed =
      window.confirm(
        categoryItems.length
          ? `Delete "${category.name}" and its ${categoryItems.length} menu item(s)?`
          : `Delete "${category.name}"?`
      );


    if (!confirmed) {
      return;
    }


    setError('');


    const {
      error: deleteError,
    } = await supabase
      .from('menu_categories')
      .delete()
      .eq(
        'id',
        category.id
      )
      .eq(
        'restaurant_id',
        selectedRestaurantId
      );


    if (deleteError) {

      console.error(
        'Error deleting category:',
        deleteError
      );

      setError(
        deleteError.message ||
        'Unable to delete category.'
      );

      return;

    }


    await loadMenu();

  };


  /* =======================================================
     TOGGLE CATEGORY
     ======================================================= */

  const toggleCategory = async (
    category
  ) => {

    setError('');


    const {
      error: updateError,
    } = await supabase
      .from('menu_categories')
      .update({

        is_active:
          !category.is_active,

      })
      .eq(
        'id',
        category.id
      )
      .eq(
        'restaurant_id',
        selectedRestaurantId
      );


    if (updateError) {

      setError(
        updateError.message ||
        'Unable to update category.'
      );

      return;

    }


    await loadMenu();

  };


  /* =======================================================
     ITEM
     ======================================================= */

  const openAddItem = (
    categoryId
  ) => {

    const categoryItems =
      getCategoryItems(
        categoryId
      );


    setEditingItem(null);

    setSelectedCategoryId(
      categoryId
    );

    setItemForm({

      ...EMPTY_ITEM,

      display_order:
        categoryItems.length,

    });

    setError('');

    setShowItemModal(true);

  };


  const openEditItem = (
    item
  ) => {

    setEditingItem(item);

    setSelectedCategoryId(
      item.category_id
    );

    setItemForm({

      name:
        item.name || '',

      description:
        item.description || '',

      price:
        item.price || '',

      food_type:
        item.food_type || 'veg',

      is_available:
        item.is_available ?? true,

      display_order:
        item.display_order ?? 0,

    });

    setError('');

    setShowItemModal(true);

  };


  const closeItemModal = () => {

    if (saving) return;

    setShowItemModal(false);

    setEditingItem(null);

    setSelectedCategoryId('');

    setItemForm(
      EMPTY_ITEM
    );

  };


  const updateItemField = (
    field,
    value
  ) => {

    setItemForm(
      (current) => ({
        ...current,
        [field]: value,
      })
    );

  };


  /* =======================================================
     SAVE ITEM
     ======================================================= */

  const saveItem = async (
    event
  ) => {

    event.preventDefault();


    if (!selectedCategoryId) {

      setError(
        'Please select a category.'
      );

      return;

    }


    if (!itemForm.name.trim()) {

      setError(
        'Menu item name is required.'
      );

      return;

    }


    setSaving(true);

    setError('');


    const payload = {

      category_id:
        selectedCategoryId,

      name:
        itemForm.name.trim(),

      description:
        itemForm.description.trim(),

      price:
        itemForm.price.trim(),

      /*
       * The database has an image column,
       * but menu image uploads are intentionally
       * not used.
       */

      food_type:
        itemForm.food_type,

      is_available:
        Boolean(
          itemForm.is_available
        ),

      display_order:
        Number(
          itemForm.display_order
        ) || 0,

    };


    let result;


    /* -----------------------------------------------------
       UPDATE
       ----------------------------------------------------- */

    if (editingItem) {

      result = await supabase
        .from('menu_items')
        .update(payload)
        .eq(
          'id',
          editingItem.id
        )
        .eq(
          'category_id',
          selectedCategoryId
        );

    }


    /* -----------------------------------------------------
       INSERT
       ----------------------------------------------------- */

    else {

      result = await supabase
        .from('menu_items')
        .insert(payload);

    }


    if (result.error) {

      console.error(
        'Error saving menu item:',
        result.error
      );

      setError(
        result.error.message ||
        'Unable to save menu item.'
      );

      setSaving(false);

      return;

    }


    setSaving(false);

    setShowItemModal(false);

    setEditingItem(null);

    setSelectedCategoryId('');

    setItemForm(
      EMPTY_ITEM
    );

    await loadMenu();

  };


  /* =======================================================
     DELETE ITEM
     ======================================================= */

  const deleteItem = async (
    item
  ) => {

    const confirmed =
      window.confirm(
        `Delete "${item.name}"? This cannot be undone.`
      );


    if (!confirmed) {
      return;
    }


    setError('');


    const {
      error: deleteError,
    } = await supabase
      .from('menu_items')
      .delete()
      .eq(
        'id',
        item.id
      )
      .eq(
        'category_id',
        item.category_id
      );


    if (deleteError) {

      console.error(
        'Error deleting menu item:',
        deleteError
      );

      setError(
        deleteError.message ||
        'Unable to delete menu item.'
      );

      return;

    }


    await loadMenu();

  };


  /* =======================================================
     TOGGLE ITEM
     ======================================================= */

  const toggleItem = async (
    item
  ) => {

    setError('');


    const {
      error: updateError,
    } = await supabase
      .from('menu_items')
      .update({

        is_available:
          !item.is_available,

      })
      .eq(
        'id',
        item.id
      )
      .eq(
        'category_id',
        item.category_id
      );


    if (updateError) {

      setError(
        updateError.message ||
        'Unable to update menu item.'
      );

      return;

    }


    await loadMenu();

  };


  /* =======================================================
     LOADING
     ======================================================= */

  if (loading) {

    return (
      <div className="admin-empty">

        <UtensilsCrossed
          size={28}
        />

        <strong>
          Loading menu...
        </strong>

        <p>
          Fetching restaurants from the database.
        </p>

      </div>
    );

  }


  /* =======================================================
     UI
     ======================================================= */

  return (
    <div className="admin-manager">


      {/* =================================================
          HEADER
          ================================================= */}

      <div className="admin-manager-toolbar">

        <div>

          <span className="admin-eyebrow">
            FOOD &amp; BEVERAGE
          </span>

          <h3>
            Menu Management
          </h3>

          <p>
            Manage restaurants, categories and
            menu items shown to hotel guests.
          </p>

        </div>

      </div>


      {/* =================================================
          ERROR
          ================================================= */}

      {error && (

        <div className="admin-login-error">
          {error}
        </div>

      )}


      {/* =================================================
          RESTAURANT SELECTOR
          ================================================= */}

      {restaurants.length > 0 && (

        <div
          style={{
            marginBottom: '20px',
            padding: '16px',
            borderRadius: '16px',
            border:
              '1px solid rgba(255,255,255,0.08)',
            background:
              'rgba(255,255,255,0.025)',
          }}
        >

          <label
            className="admin-field"
            style={{
              margin: 0,
            }}
          >

            <span>
              Restaurant
            </span>

            <select
              value={
                selectedRestaurantId
              }
              onChange={(event) =>
                setSelectedRestaurantId(
                  event.target.value
                )
              }
            >

              {restaurants.map(
                (restaurant) => (

                  <option
                    key={restaurant.id}
                    value={restaurant.id}
                  >
                    {restaurant.name}
                  </option>

                )
              )}

            </select>

          </label>

        </div>

      )}


      {/* =================================================
          NO RESTAURANTS
          ================================================= */}

      {!restaurants.length && (

        <div className="admin-empty">

          <UtensilsCrossed
            size={28}
          />

          <strong>
            No restaurants found
          </strong>

          <p>
            Add restaurants to the
            restaurants table first.
          </p>

        </div>

      )}


      {/* =================================================
          MENU LOADING
          ================================================= */}

      {restaurants.length > 0 &&
        loadingMenu && (

          <div className="admin-empty">

            <Loader2
              size={25}
              className="spin"
            />

            <strong>
              Loading menu...
            </strong>

          </div>

        )}


      {/* =================================================
          MENU
          ================================================= */}

      {restaurants.length > 0 &&
        !loadingMenu && (

          <>

            {/* -------------------------------------------
                CATEGORY HEADER
                ------------------------------------------- */}

            <div
              style={{
                display: 'flex',
                justifyContent:
                  'space-between',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '14px',
              }}
            >

              <div>

                <span className="admin-eyebrow">
                  CATEGORIES
                </span>

                <h4
                  style={{
                    margin:
                      '4px 0 0',
                  }}
                >
                  Menu Categories
                </h4>

              </div>


              <button
                type="button"
                className="admin-primary-button"
                onClick={
                  openAddCategory
                }
              >

                <Plus size={15} />

                Add Category

              </button>

            </div>


            {/* -------------------------------------------
                EMPTY CATEGORIES
                ------------------------------------------- */}

            {!categories.length && (

              <div className="admin-empty">

                <UtensilsCrossed
                  size={28}
                />

                <strong>
                  No categories yet
                </strong>

                <p>
                  Add the first category for
                  this restaurant.
                </p>

                <button
                  type="button"
                  className="admin-primary-button"
                  onClick={
                    openAddCategory
                  }
                >

                  <Plus size={15} />

                  Add Category

                </button>

              </div>

            )}


            {/* -------------------------------------------
                CATEGORY LIST
                ------------------------------------------- */}

            {categories.length > 0 && (

              <div
                style={{
                  display: 'grid',
                  gap: '12px',
                }}
              >

                {categories.map(
                  (category) => {

                    const categoryItems =
                      getCategoryItems(
                        category.id
                      );

                    const expanded =
                      expandedCategories[
                        category.id
                      ] ?? true;


                    return (

                      <section
                        key={category.id}
                        style={{
                          border:
                            '1px solid rgba(255,255,255,0.08)',
                          borderRadius:
                            '18px',
                          overflow:
                            'hidden',
                          background:
                            'rgba(255,255,255,0.025)',
                          opacity:
                            category.is_active
                              ? 1
                              : 0.6,
                        }}
                      >

                        {/* CATEGORY HEADER */}

                        <div
                          style={{
                            display:
                              'flex',
                            alignItems:
                              'center',
                            gap:
                              '10px',
                            padding:
                              '14px 16px',
                          }}
                        >

                          <button
                            type="button"
                            onClick={() =>
                              toggleCategoryExpanded(
                                category.id
                              )
                            }
                            style={{
                              border: 0,
                              background:
                                'transparent',
                              color:
                                'inherit',
                              cursor:
                                'pointer',
                              padding:
                                '2px',
                              display:
                                'flex',
                            }}
                          >

                            {expanded ? (

                              <ChevronDown
                                size={18}
                              />

                            ) : (

                              <ChevronRight
                                size={18}
                              />

                            )}

                          </button>


                          <div
                            style={{
                              flex: 1,
                              minWidth: 0,
                            }}
                          >

                            <div
                              style={{
                                display:
                                  'flex',
                                alignItems:
                                  'center',
                                gap:
                                  '8px',
                                flexWrap:
                                  'wrap',
                              }}
                            >

                              <strong>
                                {category.name}
                              </strong>

                              <span
                                className={`admin-status ${
                                  category.is_active
                                    ? 'active'
                                    : 'inactive'
                                }`}
                              >

                                {category.is_active
                                  ? 'Active'
                                  : 'Hidden'}

                              </span>

                            </div>


                            {category.description && (

                              <p
                                style={{
                                  margin:
                                    '5px 0 0',
                                  opacity:
                                    0.65,
                                  fontSize:
                                    '13px',
                                }}
                              >
                                {
                                  category.description
                                }
                              </p>

                            )}

                          </div>


                          <span
                            style={{
                              fontSize:
                                '12px',
                              opacity:
                                0.55,
                              whiteSpace:
                                'nowrap',
                            }}
                          >

                            {categoryItems.length}
                            {' '}
                            item
                            {categoryItems.length !== 1
                              ? 's'
                              : ''}

                          </span>


                          <button
                            type="button"
                            className="admin-icon-action"
                            onClick={() =>
                              openEditCategory(
                                category
                              )
                            }
                            title="Edit category"
                          >

                            <Pencil
                              size={14}
                            />

                          </button>


                          <button
                            type="button"
                            className="admin-icon-action"
                            onClick={() =>
                              toggleCategory(
                                category
                              )
                            }
                            title={
                              category.is_active
                                ? 'Hide category'
                                : 'Show category'
                            }
                          >

                            {category.is_active ? (

                              <EyeOff
                                size={14}
                              />

                            ) : (

                              <Eye
                                size={14}
                              />

                            )}

                          </button>


                          <button
                            type="button"
                            className="admin-icon-action danger"
                            onClick={() =>
                              deleteCategory(
                                category
                              )
                            }
                            title="Delete category"
                          >

                            <Trash2
                              size={14}
                            />

                          </button>

                        </div>


                        {/* CATEGORY CONTENT */}

                        {expanded && (

                          <div
                            style={{
                              padding:
                                '0 16px 16px 46px',
                            }}
                          >

                            <div
                              style={{
                                display:
                                  'flex',
                                justifyContent:
                                  'space-between',
                                alignItems:
                                  'center',
                                marginBottom:
                                  '10px',
                              }}
                            >

                              <span className="admin-eyebrow">
                                MENU ITEMS
                              </span>


                              <button
                                type="button"
                                className="admin-secondary-button"
                                onClick={() =>
                                  openAddItem(
                                    category.id
                                  )
                                }
                              >

                                <Plus
                                  size={14}
                                />

                                Add Item

                              </button>

                            </div>


                            {!categoryItems.length && (

                              <div
                                style={{
                                  padding:
                                    '18px',
                                  borderRadius:
                                    '12px',
                                  background:
                                    'rgba(255,255,255,0.025)',
                                  textAlign:
                                    'center',
                                  opacity:
                                    0.65,
                                  fontSize:
                                    '13px',
                                }}
                              >

                                No items in this
                                category.

                              </div>

                            )}


                            {categoryItems.length > 0 && (

                              <div
                                style={{
                                  display:
                                    'grid',
                                  gap:
                                    '8px',
                                }}
                              >

                                {categoryItems.map(
                                  (item) => (

                                    <div
                                      key={item.id}
                                      style={{
                                        display:
                                          'flex',
                                        alignItems:
                                          'center',
                                        gap:
                                          '12px',
                                        padding:
                                          '12px',
                                        borderRadius:
                                          '13px',
                                        border:
                                          '1px solid rgba(255,255,255,0.06)',
                                        background:
                                          'rgba(255,255,255,0.02)',
                                        opacity:
                                          item.is_available
                                            ? 1
                                            : 0.5,
                                      }}
                                    >

                                      {/* ITEM ICON */}

                                      <div
                                        style={{
                                          width:
                                            '42px',
                                          height:
                                            '42px',
                                          flex:
                                            '0 0 42px',
                                          borderRadius:
                                            '10px',
                                          display:
                                            'flex',
                                          alignItems:
                                            'center',
                                          justifyContent:
                                            'center',
                                          background:
                                            'rgba(255,255,255,0.06)',
                                        }}
                                      >

                                        <UtensilsCrossed
                                          size={18}
                                        />

                                      </div>


                                      {/* ITEM INFO */}

                                      <div
                                        style={{
                                          flex:
                                            1,
                                          minWidth:
                                            0,
                                        }}
                                      >

                                        <div
                                          style={{
                                            display:
                                              'flex',
                                            alignItems:
                                              'center',
                                            gap:
                                              '7px',
                                            flexWrap:
                                              'wrap',
                                          }}
                                        >

                                          <strong>
                                            {item.name}
                                          </strong>

                                          <span
                                            style={{
                                              fontSize:
                                                '10px',
                                              padding:
                                                '3px 7px',
                                              borderRadius:
                                                '999px',
                                              background:
                                                'rgba(255,255,255,0.08)',
                                              textTransform:
                                                'uppercase',
                                            }}
                                          >

                                            {item.food_type}

                                          </span>

                                        </div>


                                        {item.description && (

                                          <p
                                            style={{
                                              margin:
                                                '3px 0',
                                              fontSize:
                                                '12px',
                                              opacity:
                                                0.6,
                                              overflow:
                                                'hidden',
                                              textOverflow:
                                                'ellipsis',
                                              whiteSpace:
                                                'nowrap',
                                            }}
                                          >

                                            {
                                              item.description
                                            }

                                          </p>

                                        )}


                                        <div
                                          style={{
                                            fontSize:
                                              '13px',
                                            fontWeight:
                                              600,
                                          }}
                                        >

                                          {item.price
                                            ? `₹${item.price}`
                                            : 'Price on request'}

                                        </div>

                                      </div>


                                      {/* STATUS */}

                                      <span
                                        className={`admin-status ${
                                          item.is_available
                                            ? 'active'
                                            : 'inactive'
                                        }`}
                                      >

                                        {item.is_available
                                          ? 'Available'
                                          : 'Unavailable'}

                                      </span>


                                      {/* EDIT */}

                                      <button
                                        type="button"
                                        className="admin-icon-action"
                                        onClick={() =>
                                          openEditItem(
                                            item
                                          )
                                        }
                                        title="Edit item"
                                      >

                                        <Pencil
                                          size={14}
                                        />

                                      </button>


                                      {/* TOGGLE */}

                                      <button
                                        type="button"
                                        className="admin-icon-action"
                                        onClick={() =>
                                          toggleItem(
                                            item
                                          )
                                        }
                                        title={
                                          item.is_available
                                            ? 'Mark unavailable'
                                            : 'Mark available'
                                        }
                                      >

                                        {item.is_available ? (

                                          <EyeOff
                                            size={14}
                                          />

                                        ) : (

                                          <Eye
                                            size={14}
                                          />

                                        )}

                                      </button>


                                      {/* DELETE */}

                                      <button
                                        type="button"
                                        className="admin-icon-action danger"
                                        onClick={() =>
                                          deleteItem(
                                            item
                                          )
                                        }
                                        title="Delete item"
                                      >

                                        <Trash2
                                          size={14}
                                        />

                                      </button>

                                    </div>

                                  )
                                )}

                              </div>

                            )}

                          </div>

                        )}

                      </section>

                    );

                  }
                )}

              </div>

            )}

          </>

        )}


      {/* =================================================
          CATEGORY MODAL
          ================================================= */}

      {showCategoryModal && (

        <div
          className="admin-modal-backdrop"
          onMouseDown={(event) => {

            if (
              event.target ===
              event.currentTarget
            ) {

              closeCategoryModal();

            }

          }}
        >

          <form
            className="admin-form-modal"
            onSubmit={
              saveCategory
            }
          >

            <div className="admin-form-header">

              <div>

                <span className="admin-eyebrow">
                  MENU
                </span>

                <h3>
                  {editingCategory
                    ? 'Edit Category'
                    : 'Add Category'}
                </h3>

              </div>


              <button
                type="button"
                className="admin-modal-close"
                onClick={
                  closeCategoryModal
                }
                disabled={saving}
              >

                <X size={18} />

              </button>

            </div>


            <label className="admin-field">

              <span>
                Category Name *
              </span>

              <input
                type="text"
                value={
                  categoryForm.name
                }
                onChange={(event) =>
                  setCategoryForm(
                    (current) => ({
                      ...current,
                      name:
                        event.target.value,
                    })
                  )
                }
                placeholder="e.g. Breakfast"
                required
              />

            </label>


            <label className="admin-field">

              <span>
                Description
              </span>

              <textarea
                value={
                  categoryForm.description
                }
                onChange={(event) =>
                  setCategoryForm(
                    (current) => ({
                      ...current,
                      description:
                        event.target.value,
                    })
                  )
                }
                placeholder="Short category description..."
              />

            </label>


            <label className="admin-field">

              <span>
                Display Order
              </span>

              <input
                type="number"
                min="0"
                value={
                  categoryForm.display_order
                }
                onChange={(event) =>
                  setCategoryForm(
                    (current) => ({
                      ...current,
                      display_order:
                        event.target.value,
                    })
                  )
                }
              />

            </label>


            <label className="admin-toggle-field">

              <span>

                <strong>
                  Show category
                </strong>

                <small>
                  Hidden categories won't appear
                  to guests.
                </small>

              </span>

              <input
                type="checkbox"
                checked={
                  categoryForm.is_active
                }
                onChange={(event) =>
                  setCategoryForm(
                    (current) => ({
                      ...current,
                      is_active:
                        event.target.checked,
                    })
                  )
                }
              />

            </label>


            <div className="admin-form-actions">

              <button
                type="button"
                className="admin-secondary-button"
                onClick={
                  closeCategoryModal
                }
                disabled={saving}
              >
                Cancel
              </button>


              <button
                type="submit"
                className="admin-primary-button"
                disabled={saving}
              >

                <Save size={14} />

                {saving
                  ? 'Saving...'
                  : editingCategory
                    ? 'Save Changes'
                    : 'Add Category'}

              </button>

            </div>

          </form>

        </div>

      )}


      {/* =================================================
          ITEM MODAL
          ================================================= */}

      {showItemModal && (

        <div
          className="admin-modal-backdrop"
          onMouseDown={(event) => {

            if (
              event.target ===
              event.currentTarget
            ) {

              closeItemModal();

            }

          }}
        >

          <form
            className="admin-form-modal"
            onSubmit={
              saveItem
            }
          >

            <div className="admin-form-header">

              <div>

                <span className="admin-eyebrow">
                  MENU ITEM
                </span>

                <h3>
                  {editingItem
                    ? 'Edit Menu Item'
                    : 'Add Menu Item'}
                </h3>

              </div>


              <button
                type="button"
                className="admin-modal-close"
                onClick={
                  closeItemModal
                }
                disabled={saving}
              >

                <X size={18} />

              </button>

            </div>


            {/* ITEM NAME */}

            <label className="admin-field">

              <span>
                Item Name *
              </span>

              <input
                type="text"
                value={
                  itemForm.name
                }
                onChange={(event) =>
                  updateItemField(
                    'name',
                    event.target.value
                  )
                }
                placeholder="e.g. Paneer Tikka"
                required
              />

            </label>


            {/* DESCRIPTION */}

            <label className="admin-field">

              <span>
                Description
              </span>

              <textarea
                value={
                  itemForm.description
                }
                onChange={(event) =>
                  updateItemField(
                    'description',
                    event.target.value
                  )
                }
                placeholder="Short description for guests..."
              />

            </label>


            {/* PRICE */}

            <label className="admin-field">

              <span>
                Price
              </span>

              <input
                type="text"
                value={
                  itemForm.price
                }
                onChange={(event) =>
                  updateItemField(
                    'price',
                    event.target.value
                  )
                }
                placeholder="e.g. 420"
              />

            </label>


            {/* FOOD TYPE */}

            <label className="admin-field">

              <span>
                Food Type
              </span>

              <select
                value={
                  itemForm.food_type
                }
                onChange={(event) =>
                  updateItemField(
                    'food_type',
                    event.target.value
                  )
                }
              >

                <option value="veg">
                  Veg
                </option>

                <option value="non-veg">
                  Non-Veg
                </option>

                <option value="mixed">
                  Mixed
                </option>

              </select>

            </label>


            {/* DISPLAY ORDER */}

            <label className="admin-field">

              <span>
                Display Order
              </span>

              <input
                type="number"
                min="0"
                value={
                  itemForm.display_order
                }
                onChange={(event) =>
                  updateItemField(
                    'display_order',
                    event.target.value
                  )
                }
              />

            </label>


            {/* AVAILABILITY */}

            <label className="admin-toggle-field">

              <span>

                <strong>
                  Available to guests
                </strong>

                <small>
                  Unavailable items can be hidden
                  from the guest menu.
                </small>

              </span>

              <input
                type="checkbox"
                checked={
                  itemForm.is_available
                }
                onChange={(event) =>
                  updateItemField(
                    'is_available',
                    event.target.checked
                  )
                }
              />

            </label>


            {/* ACTIONS */}

            <div className="admin-form-actions">

              <button
                type="button"
                className="admin-secondary-button"
                onClick={
                  closeItemModal
                }
                disabled={saving}
              >

                Cancel

              </button>


              <button
                type="submit"
                className="admin-primary-button"
                disabled={saving}
              >

                <Save size={14} />

                {saving
                  ? 'Saving...'
                  : editingItem
                    ? 'Save Changes'
                    : 'Add Item'}

              </button>

            </div>

          </form>

        </div>

      )}

    </div>
  );
}