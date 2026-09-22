import { useEffect, useState } from 'react';

import {
  MapPin,
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  ExternalLink,
  X,
  Save,
  Image as ImageIcon,
  Upload,
  Loader2,
} from 'lucide-react';

import { supabase } from '../lib/supabase.js';


/* =========================================================
   FOUR POINTS NASHIK
   ========================================================= */

const HOTEL_ID = 'four-points-nashik';

const STORAGE_BUCKET = 'place-images';


/* =========================================================
   EMPTY FORM
   ========================================================= */

const EMPTY_FORM = {
  name: '',
  category: '',
  description: '',
  image_url: '',
  distance: '',
  duration: '',
  maps_url: '',
  display_order: 0,
  is_active: true,
};


export default function PlacesManager() {

  const [places, setPlaces] = useState([]);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [uploadingImage, setUploadingImage] =
    useState(false);

  const [error, setError] = useState('');

  const [showModal, setShowModal] = useState(false);

  const [editingPlace, setEditingPlace] =
    useState(null);

  const [form, setForm] =
    useState(EMPTY_FORM);


  /* =====================================================
     LOAD PLACES
     ===================================================== */

  const loadPlaces = async () => {

    setLoading(true);

    setError('');

    const { data, error } = await supabase
      .from('city_places')
      .select('*')
      .eq('hotel_id', HOTEL_ID)
      .order('display_order', {
        ascending: true,
      })
      .order('created_at', {
        ascending: true,
      });

    if (error) {

      console.error(
        'Error loading city places:',
        error
      );

      setError(
        error.message ||
        'Unable to load places.'
      );

      setPlaces([]);

      setLoading(false);

      return;
    }

    setPlaces(data || []);

    setLoading(false);
  };


  /* =====================================================
     INITIAL LOAD + REALTIME
     ===================================================== */

  useEffect(() => {

    loadPlaces();


    const channel = supabase
      .channel('admin-city-places')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'city_places',
          filter: `hotel_id=eq.${HOTEL_ID}`,
        },
        () => {
          loadPlaces();
        }
      )
      .subscribe();


    return () => {
      supabase.removeChannel(channel);
    };

  }, []);


  /* =====================================================
     OPEN ADD
     ===================================================== */

  const openAdd = () => {

    setEditingPlace(null);

    setForm({
      ...EMPTY_FORM,
      display_order: places.length,
    });

    setError('');

    setShowModal(true);
  };


  /* =====================================================
     OPEN EDIT
     ===================================================== */

  const openEdit = (place) => {

    setEditingPlace(place);

    setForm({

      name:
        place.name || '',

      category:
        place.category || '',

      description:
        place.description || '',

      image_url:
        place.image_url || '',

      distance:
        place.distance || '',

      duration:
        place.duration || '',

      maps_url:
        place.maps_url || '',

      display_order:
        place.display_order ?? 0,

      is_active:
        place.is_active ?? true,

    });

    setError('');

    setShowModal(true);
  };


  /* =====================================================
     CLOSE MODAL
     ===================================================== */

  const closeModal = () => {

    if (
      saving ||
      uploadingImage
    ) {
      return;
    }

    setShowModal(false);

    setEditingPlace(null);

    setForm(EMPTY_FORM);

    setError('');
  };


  /* =====================================================
     FORM CHANGE
     ===================================================== */

  const updateField = (
    field,
    value
  ) => {

    setForm((current) => ({
      ...current,
      [field]: value,
    }));

  };


  /* =====================================================
     IMAGE UPLOAD
     ===================================================== */

  const handleImageUpload = async (
    event
  ) => {

    const file =
      event.target.files?.[0];


    if (!file) {
      return;
    }


    setError('');


    /* -----------------------------------------------
       Validate file type
       ----------------------------------------------- */

    if (
      !file.type.startsWith('image/')
    ) {

      setError(
        'Please select a valid image file.'
      );

      event.target.value = '';

      return;
    }


    /* -----------------------------------------------
       Validate file size
       ----------------------------------------------- */

    const maxSize =
      5 * 1024 * 1024;


    if (file.size > maxSize) {

      setError(
        'Image must be smaller than 5 MB.'
      );

      event.target.value = '';

      return;
    }


    setUploadingImage(true);


    try {

      /* ---------------------------------------------
         Create unique filename
         --------------------------------------------- */

      const extension =
        file.name
          .split('.')
          .pop()
          ?.toLowerCase() || 'jpg';


      const safeName =
        file.name
          .replace(
            /\.[^/.]+$/,
            ''
          )
          .replace(
            /[^a-zA-Z0-9-_]/g,
            '-'
          )
          .toLowerCase();


      const uniqueName =
        `${Date.now()}-${Math.random()
          .toString(36)
          .slice(2, 8)}`;


      const filePath =
        `${HOTEL_ID}/${uniqueName}-${safeName}.${extension}`;


      /* ---------------------------------------------
         Upload to Supabase Storage
         --------------------------------------------- */

      const {
        error: uploadError,
      } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(
          filePath,
          file,
          {
            cacheControl: '3600',
            upsert: false,
            contentType: file.type,
          }
        );


      if (uploadError) {

        throw uploadError;

      }


      /* ---------------------------------------------
         Get public URL
         --------------------------------------------- */

      const {
        data: publicUrlData,
      } = supabase.storage
        .from(STORAGE_BUCKET)
        .getPublicUrl(
          filePath
        );


      const publicUrl =
        publicUrlData?.publicUrl;


      if (!publicUrl) {

        throw new Error(
          'Unable to generate image URL.'
        );

      }


      /* ---------------------------------------------
         Save URL in form
         --------------------------------------------- */

      updateField(
        'image_url',
        publicUrl
      );


    } catch (uploadError) {

      console.error(
        'Image upload error:',
        uploadError
      );

      setError(
        uploadError?.message ||
        'Unable to upload image.'
      );

    } finally {

      setUploadingImage(false);

      event.target.value = '';

    }

  };


  /* =====================================================
     SAVE PLACE
     ===================================================== */

  const handleSave = async (
    event
  ) => {

    event.preventDefault();


    if (!form.name.trim()) {

      setError(
        'Place name is required.'
      );

      return;
    }


    if (uploadingImage) {

      setError(
        'Please wait for the image upload to finish.'
      );

      return;
    }


    setSaving(true);

    setError('');


    const payload = {

      hotel_id:
        HOTEL_ID,

      name:
        form.name.trim(),

      category:
        form.category.trim(),

      description:
        form.description.trim(),

      image_url:
        form.image_url.trim(),

      distance:
        form.distance.trim(),

      duration:
        form.duration.trim(),

      maps_url:
        form.maps_url.trim(),

      display_order:
        Number(form.display_order) || 0,

      is_active:
        Boolean(form.is_active),

    };


    let result;


    /* -----------------------------------------------
       EDIT
       ----------------------------------------------- */

    if (editingPlace) {

      result = await supabase
        .from('city_places')
        .update(payload)
        .eq('id', editingPlace.id)
        .eq('hotel_id', HOTEL_ID);

    }


    /* -----------------------------------------------
       ADD
       ----------------------------------------------- */

    else {

      result = await supabase
        .from('city_places')
        .insert(payload);

    }


    /* -----------------------------------------------
       Error
       ----------------------------------------------- */

    if (result.error) {

      console.error(
        'Error saving city place:',
        result.error
      );

      setError(
        result.error.message ||
        'Unable to save the place.'
      );

      setSaving(false);

      return;
    }


    /* -----------------------------------------------
       Success
       ----------------------------------------------- */

    setSaving(false);

    setShowModal(false);

    setEditingPlace(null);

    setForm(EMPTY_FORM);

    await loadPlaces();

  };


  /* =====================================================
     TOGGLE ACTIVE
     ===================================================== */

  const toggleActive = async (
    place
  ) => {

    setError('');


    const { error } =
      await supabase
        .from('city_places')
        .update({
          is_active:
            !place.is_active,
        })
        .eq('id', place.id)
        .eq('hotel_id', HOTEL_ID);


    if (error) {

      console.error(
        'Error updating city place:',
        error
      );

      setError(
        error.message ||
        'Unable to update place.'
      );

      return;
    }


    await loadPlaces();

  };


  /* =====================================================
     DELETE
     ===================================================== */

  const deletePlace = async (
    place
  ) => {

    const confirmed =
      window.confirm(
        `Delete "${place.name}"? This cannot be undone.`
      );


    if (!confirmed) {
      return;
    }


    setError('');


    const { error } =
      await supabase
        .from('city_places')
        .delete()
        .eq('id', place.id)
        .eq('hotel_id', HOTEL_ID);


    if (error) {

      console.error(
        'Error deleting city place:',
        error
      );

      setError(
        error.message ||
        'Unable to delete place.'
      );

      return;
    }


    await loadPlaces();

  };


  /* =====================================================
     LOADING
     ===================================================== */

  if (loading) {

    return (
      <div className="admin-empty">

        <MapPin size={26} />

        <strong>
          Loading places...
        </strong>

        <p>
          Fetching places to visit from the database.
        </p>

      </div>
    );

  }


  /* =====================================================
     UI
     ===================================================== */

  return (
    <div className="admin-manager">


      {/* =================================================
          HEADER
          ================================================= */}

      <div className="admin-manager-toolbar">

        <div>

          <span className="admin-eyebrow">
            CITY GUIDE
          </span>

          <h3>
            Places to Visit
          </h3>

          <p>
            Add and manage Nashik attractions,
            temples, landmarks and recommendations
            shown to hotel guests.
          </p>

        </div>


        <button
          type="button"
          className="admin-primary-button"
          onClick={openAdd}
        >

          <Plus size={15} />

          Add Place

        </button>

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
          EMPTY
          ================================================= */}

      {!places.length && (

        <div className="admin-empty">

          <MapPin size={28} />

          <strong>
            No places added yet
          </strong>

          <p>
            Add your first Nashik destination
            to display it in the guest directory.
          </p>

          <button
            type="button"
            className="admin-primary-button"
            onClick={openAdd}
          >

            <Plus size={15} />

            Add First Place

          </button>

        </div>

      )}


      {/* =================================================
          PLACES LIST
          ================================================= */}

      {places.length > 0 && (

        <div className="admin-places-list">

          {places.map((place) => (

            <article
              key={place.id}
              className={`admin-place-card ${
                !place.is_active
                  ? 'inactive'
                  : ''
              }`}
            >

              {/* IMAGE */}

              <div className="admin-place-image">

                {place.image_url ? (

                  <img
                    src={place.image_url}
                    alt={place.name}
                  />

                ) : (

                  <ImageIcon size={25} />

                )}

              </div>


              {/* CONTENT */}

              <div className="admin-place-content">

                <div className="admin-place-top">

                  <div>

                    <h4>
                      {place.name}
                    </h4>

                    {place.category && (

                      <span className="admin-eyebrow">
                        {place.category}
                      </span>

                    )}

                  </div>


                  <span
                    className={`admin-status ${
                      place.is_active
                        ? 'active'
                        : 'inactive'
                    }`}
                  >

                    {place.is_active
                      ? 'Active'
                      : 'Hidden'}

                  </span>

                </div>


                {place.description && (

                  <p className="admin-place-description">
                    {place.description}
                  </p>

                )}


                {place.distance && (

                  <div className="admin-place-detail">

                    <MapPin size={13} />

                    <span>
                      {place.distance}
                    </span>

                  </div>

                )}


                {place.duration && (

                  <div className="admin-place-detail">

                    <Eye size={13} />

                    <span>
                      {place.duration}
                    </span>

                  </div>

                )}


                <div className="admin-place-actions">

                  <button
                    type="button"
                    className="admin-icon-action"
                    onClick={() =>
                      openEdit(place)
                    }
                    title="Edit"
                  >

                    <Pencil size={14} />

                  </button>


                  <button
                    type="button"
                    className="admin-icon-action"
                    onClick={() =>
                      toggleActive(place)
                    }
                    title={
                      place.is_active
                        ? 'Hide'
                        : 'Show'
                    }
                  >

                    {place.is_active ? (

                      <EyeOff size={14} />

                    ) : (

                      <Eye size={14} />

                    )}

                  </button>


                  {place.maps_url && (

                    <a
                      href={place.maps_url}
                      target="_blank"
                      rel="noreferrer"
                      className="admin-icon-action"
                      title="Open Google Maps"
                    >

                      <ExternalLink size={14} />

                    </a>

                  )}


                  <button
                    type="button"
                    className="admin-icon-action danger"
                    onClick={() =>
                      deletePlace(place)
                    }
                    title="Delete"
                  >

                    <Trash2 size={14} />

                  </button>

                </div>

              </div>

            </article>

          ))}

        </div>

      )}


      {/* =================================================
          ADD / EDIT MODAL
          ================================================= */}

      {showModal && (

        <div
          className="admin-modal-backdrop"
          onMouseDown={(event) => {

            if (
              event.target === event.currentTarget
            ) {

              closeModal();

            }

          }}
        >

          <form
            className="admin-form-modal"
            onSubmit={handleSave}
          >

            {/* HEADER */}

            <div className="admin-form-header">

              <div>

                <span className="admin-eyebrow">
                  CITY GUIDE
                </span>

                <h3>
                  {editingPlace
                    ? 'Edit Place'
                    : 'Add Place'}
                </h3>

              </div>


              <button
                type="button"
                className="admin-modal-close"
                onClick={closeModal}
                disabled={
                  saving ||
                  uploadingImage
                }
              >

                <X size={18} />

              </button>

            </div>


            {/* PLACE NAME */}

            <label className="admin-field">

              <span>
                Place Name *
              </span>

              <input
                type="text"
                value={form.name}
                onChange={(event) =>
                  updateField(
                    'name',
                    event.target.value
                  )
                }
                placeholder="e.g. Trimbakeshwar Temple"
                required
              />

            </label>


            {/* CATEGORY */}

            <label className="admin-field">

              <span>
                Category
              </span>

              <input
                type="text"
                value={form.category}
                onChange={(event) =>
                  updateField(
                    'category',
                    event.target.value
                  )
                }
                placeholder="Temple, Landmark, Nature..."
              />

            </label>


            {/* DESCRIPTION */}

            <label className="admin-field">

              <span>
                Description
              </span>

              <textarea
                value={form.description}
                onChange={(event) =>
                  updateField(
                    'description',
                    event.target.value
                  )
                }
                placeholder="Short description for hotel guests..."
              />

            </label>


            {/* =================================================
                IMAGE UPLOAD
                ================================================= */}

            <div className="admin-field">

              <span>
                Place Image
              </span>


              {/* Preview */}

              {form.image_url && (

                <div
                  style={{
                    width: '100%',
                    height: '180px',
                    borderRadius: '14px',
                    overflow: 'hidden',
                    marginBottom: '10px',
                    border: '1px solid rgba(255,255,255,0.08)',
                    background: '#111',
                  }}
                >

                  <img
                    src={form.image_url}
                    alt="Place preview"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />

                </div>

              )}


              <label
                htmlFor="place-image-upload"
                className="admin-secondary-button"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: uploadingImage
                    ? 'not-allowed'
                    : 'pointer',
                  opacity: uploadingImage
                    ? 0.7
                    : 1,
                }}
              >

                {uploadingImage ? (

                  <>
                    <Loader2
                      size={15}
                      className="spin"
                    />

                    Uploading image...

                  </>

                ) : (

                  <>

                    <Upload size={15} />

                    {form.image_url
                      ? 'Replace Image'
                      : 'Upload Image'}

                  </>

                )}

                <input
                  id="place-image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={
                    uploadingImage ||
                    saving
                  }
                  style={{
                    display: 'none',
                  }}
                />

              </label>


              <small>
                JPG, PNG or WebP. Maximum 5 MB.
              </small>

            </div>


            {/* DISTANCE */}

            <label className="admin-field">

              <span>
                Distance
              </span>

              <input
                type="text"
                value={form.distance}
                onChange={(event) =>
                  updateField(
                    'distance',
                    event.target.value
                  )
                }
                placeholder="e.g. 28 km from hotel"
              />

            </label>


            {/* TRAVEL TIME */}

            <label className="admin-field">

              <span>
                Travel Time
              </span>

              <input
                type="text"
                value={form.duration}
                onChange={(event) =>
                  updateField(
                    'duration',
                    event.target.value
                  )
                }
                placeholder="e.g. 45 min by car"
              />

            </label>


            {/* GOOGLE MAPS */}

            <label className="admin-field">

              <span>
                Google Maps URL
              </span>

              <input
                type="url"
                value={form.maps_url}
                onChange={(event) =>
                  updateField(
                    'maps_url',
                    event.target.value
                  )
                }
                placeholder="https://maps.google.com/..."
              />

            </label>


            {/* DISPLAY ORDER */}

            <label className="admin-field">

              <span>
                Display Order
              </span>

              <input
                type="number"
                min="0"
                value={form.display_order}
                onChange={(event) =>
                  updateField(
                    'display_order',
                    event.target.value
                  )
                }
              />

            </label>


            {/* ACTIVE */}

            <label className="admin-toggle-field">

              <span>

                <strong>
                  Show to guests
                </strong>

                <small>
                  Active places appear in the guest directory.
                </small>

              </span>

              <input
                type="checkbox"
                checked={form.is_active}
                onChange={(event) =>
                  updateField(
                    'is_active',
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
                onClick={closeModal}
                disabled={
                  saving ||
                  uploadingImage
                }
              >

                Cancel

              </button>


              <button
                type="submit"
                className="admin-primary-button"
                disabled={
                  saving ||
                  uploadingImage
                }
              >

                <Save size={14} />

                {saving
                  ? 'Saving...'
                  : uploadingImage
                    ? 'Uploading...'
                    : editingPlace
                      ? 'Save Changes'
                      : 'Add Place'}

              </button>

            </div>

          </form>

        </div>

      )}

    </div>
  );
}