import {
  Building2,
  Loader2,
  Save,
} from 'lucide-react';

import {
  useCallback,
  useEffect,
  useState,
} from 'react';

import { supabase } from '../lib/supabase.js';

export default function AdminHotel() {

  const [hotel, setHotel] = useState(null);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState('');

  const [success, setSuccess] = useState('');

  const [name, setName] = useState('');

  const [welcomeMessage, setWelcomeMessage] =
    useState('');

  const [description, setDescription] =
    useState('');

  const loadHotel = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');

      const {
        data,
        error: loadError,
      } = await supabase
        .from('hotels')
        .select('*')
        .order('id', {
          ascending: true,
        })
        .limit(1)
        .maybeSingle();

      if (loadError) {
        throw loadError;
      }

      setHotel(data || null);

      if (data) {
        setName(data.name || '');
        setWelcomeMessage(
          data.welcome_message || ''
        );
        setDescription(
          data.description || ''
        );
      }

    } catch (loadError) {

      console.error(
        'Failed to load hotel:',
        loadError
      );

      setError(
        loadError.message ||
        'Failed to load hotel information.'
      );

    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadHotel();
  }, [loadHotel]);

  const saveHotel = async (event) => {
    event.preventDefault();

    if (!name.trim()) {
      setError('Hotel name is required.');
      return;
    }

    try {
      setSaving(true);
      setError('');
      setSuccess('');

      const values = {
        name: name.trim(),
        welcome_message:
          welcomeMessage.trim(),
        description:
          description.trim(),
        is_active: true,
        updated_at:
          new Date().toISOString(),
      };

      let result;

      if (hotel?.id) {

        result = await supabase
          .from('hotels')
          .update(values)
          .eq('id', hotel.id)
          .select()
          .single();

      } else {

        result = await supabase
          .from('hotels')
          .insert(values)
          .select()
          .single();

      }

      if (result.error) {
        throw result.error;
      }

      setHotel(result.data);

      setSuccess(
        'Hotel information saved successfully.'
      );

    } catch (saveError) {

      console.error(
        'Failed to save hotel:',
        saveError
      );

      setError(
        saveError.message ||
        'Failed to save hotel information.'
      );

    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-empty">

        <Loader2
          size={25}
          className="admin-spinner"
        />

        <strong>
          Loading hotel information...
        </strong>

        <p>
          Reading hotel information from Supabase.
        </p>

      </div>
    );
  }

  return (
    <div className="admin-manager">

      <div className="admin-manager-toolbar">

        <div>
          <span className="admin-eyebrow">
            HOTEL
          </span>

          <h3>
            Hotel Information
          </h3>

          <p>
            Update the information displayed to guests
            on the home page.
          </p>
        </div>

      </div>

      {error && (
        <div className="admin-login-error">
          {error}
        </div>
      )}

      {success && (
        <div className="admin-success-message">
          {success}
        </div>
      )}

      <form
        className="admin-hotel-form"
        onSubmit={saveHotel}
      >

        <div className="admin-form-section">

          <div className="admin-form-section-icon">
            <Building2 size={20} />
          </div>

          <div>
            <strong>
              Basic Information
            </strong>

            <small>
              Information guests see in the directory.
            </small>
          </div>

        </div>

        <label className="admin-field">

          <span>
            Hotel name
          </span>

          <input
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
            placeholder="Four Points by Sheraton Nashik"
            disabled={saving}
          />

        </label>

        <label className="admin-field">

          <span>
            Welcome message
          </span>

          <textarea
            value={welcomeMessage}
            onChange={(event) =>
              setWelcomeMessage(
                event.target.value
              )
            }
            placeholder="Dining, hotel information and personal assistance — all in one place."
            rows={3}
            disabled={saving}
          />

        </label>

        <label className="admin-field">

          <span>
            Hotel description
          </span>

          <textarea
            value={description}
            onChange={(event) =>
              setDescription(
                event.target.value
              )
            }
            placeholder="Enter a short description of the hotel."
            rows={5}
            disabled={saving}
          />

        </label>

        <div className="admin-form-actions">

          <button
            type="submit"
            className="admin-primary-button"
            disabled={saving}
          >

            {saving ? (
              <>
                <Loader2
                  size={16}
                  className="admin-spinner"
                />

                Saving...
              </>
            ) : (
              <>
                <Save size={16} />

                Save Changes
              </>
            )}

          </button>

        </div>

      </form>

    </div>
  );
}