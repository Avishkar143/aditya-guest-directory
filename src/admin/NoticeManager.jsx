import {
  Bell,
  Edit3,
  Plus,
  Trash2,
  Loader2,
} from 'lucide-react';

import {
  useCallback,
  useEffect,
  useState,
} from 'react';

import { supabase } from '../lib/supabase.js';


/* =========================================================
   NOTICE MANAGER
   ========================================================= */

export default function NoticeManager() {

  const [notices, setNotices] = useState([]);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const [editingNotice, setEditingNotice] =
    useState(null);


  /* =======================================================
     LOAD NOTICES
     ======================================================= */

  const loadNotices = useCallback(
    async () => {

      try {

        setLoading(true);

        const {
          data,
          error,
        } = await supabase
          .from('notices')
          .select('*')
          .order(
            'display_order',
            {
              ascending: true,
            }
          )
          .order(
            'created_at',
            {
              ascending: true,
            }
          );

        if (error) {
          throw error;
        }

        setNotices(data || []);

      } catch (error) {

        console.error(
          'Failed to load notices:',
          error
        );

        alert(
          `Failed to load notices:\n${error.message}`
        );

      } finally {

        setLoading(false);

      }

    },
    []
  );


  /* =======================================================
     INITIAL LOAD
     ======================================================= */

  useEffect(() => {

    loadNotices();

  }, [loadNotices]);


  /* =======================================================
     REALTIME
     ======================================================= */

  useEffect(() => {

    const channel =
      supabase
        .channel('admin-notices')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'notices',
          },
          () => {
            loadNotices();
          }
        )
        .subscribe();


    return () => {

      supabase.removeChannel(
        channel
      );

    };

  }, [loadNotices]);


  /* =======================================================
     ADD
     ======================================================= */

  const openAdd = () => {

    setEditingNotice(null);

    setShowForm(true);

  };


  /* =======================================================
     EDIT
     ======================================================= */

  const openEdit = (notice) => {

    setEditingNotice(notice);

    setShowForm(true);

  };


  /* =======================================================
     DELETE
     ======================================================= */

  const deleteNotice = async (id) => {

    const confirmed =
      window.confirm(
        'Delete this notice permanently?'
      );

    if (!confirmed) {
      return;
    }


    try {

      setSaving(true);


      const {
        error,
      } = await supabase
        .from('notices')
        .delete()
        .eq('id', id);


      if (error) {
        throw error;
      }


      setNotices((current) =>
        current.filter(
          (notice) =>
            notice.id !== id
        )
      );


    } catch (error) {

      console.error(
        'Failed to delete notice:',
        error
      );

      alert(
        `Failed to delete notice:\n${error.message}`
      );

    } finally {

      setSaving(false);

    }

  };


  /* =======================================================
     ACTIVATE / DEACTIVATE
     ======================================================= */

  const toggleNotice = async (notice) => {

    try {

      setSaving(true);


      const newStatus =
        !notice.is_active;


      const {
        data,
        error,
      } = await supabase
        .from('notices')
        .update({
          is_active: newStatus,
          updated_at:
            new Date().toISOString(),
        })
        .eq(
          'id',
          notice.id
        )
        .select()
        .single();


      if (error) {
        throw error;
      }


      setNotices((current) =>
        current.map(
          (item) =>
            item.id === notice.id
              ? data
              : item
        )
      );


    } catch (error) {

      console.error(
        'Failed to update notice:',
        error
      );

      alert(
        `Failed to update notice:\n${error.message}`
      );

    } finally {

      setSaving(false);

    }

  };


  /* =======================================================
     SAVE
     ======================================================= */

  const saveNotice = async (
    noticeData
  ) => {

    try {

      setSaving(true);


      /* ===================================================
         EDIT EXISTING
         =================================================== */

      if (editingNotice) {

        const {
          data,
          error,
        } = await supabase
          .from('notices')
          .update({
            title:
              noticeData.title,

            message:
              noticeData.message,

            type:
              noticeData.type ||
              'information',

            is_active:
              noticeData.is_active,

            updated_at:
              new Date().toISOString(),
          })
          .eq(
            'id',
            editingNotice.id
          )
          .select()
          .single();


        if (error) {
          throw error;
        }


        setNotices((current) =>
          current.map(
            (item) =>
              item.id ===
              editingNotice.id
                ? data
                : item
          )
        );

      }

      /* ===================================================
         CREATE NEW
         =================================================== */

      else {

        /*
         * Find the next display order.
         */

        const highestOrder =
          notices.reduce(
            (
              highest,
              notice
            ) =>
              Math.max(
                highest,
                Number(
                  notice.display_order ||
                  0
                )
              ),
            0
          );


        const {
          data,
          error,
        } = await supabase
          .from('notices')
          .insert({
            title:
              noticeData.title,

            message:
              noticeData.message,

            type:
              noticeData.type ||
              'information',

            is_active:
              noticeData.is_active,

            display_order:
              highestOrder + 1,
          })
          .select()
          .single();


        if (error) {
          throw error;
        }


        setNotices((current) => [
          ...current,
          data,
        ]);

      }


      setShowForm(false);

      setEditingNotice(null);


    } catch (error) {

      console.error(
        'Failed to save notice:',
        error
      );

      alert(
        `Failed to save notice:\n${error.message}`
      );

    } finally {

      setSaving(false);

    }

  };


  /* =======================================================
     CLOSE FORM
     ======================================================= */

  const closeForm = () => {

    if (saving) {
      return;
    }

    setShowForm(false);

    setEditingNotice(null);

  };


  /* =======================================================
     RENDER
     ======================================================= */

  return (

    <div className="admin-manager">


      {/* =================================================
          TOOLBAR
          ================================================= */}

      <div className="admin-manager-toolbar">

        <div>

          <span className="admin-eyebrow">
            HOME PAGE
          </span>

          <h3>
            Notices
          </h3>

          <p>
            Notices created here can appear
            on the guest home page.
          </p>

        </div>


        <button
          type="button"
          className="admin-primary-button"
          onClick={openAdd}
          disabled={saving}
        >

          <Plus size={17} />

          Add Notice

        </button>

      </div>


      {/* =================================================
          LIST
          ================================================= */}

      <div className="admin-list">


        {/* LOADING */}

        {loading && (

          <div className="admin-empty">

            <Loader2
              size={25}
              className="admin-loading-icon"
            />

            <strong>
              Loading notices...
            </strong>

            <p>
              Reading notices from Supabase.
            </p>

          </div>

        )}


        {/* EMPTY */}

        {!loading &&
          notices.length === 0 && (

            <div className="admin-empty">

              <Bell size={25} />

              <strong>
                No notices
              </strong>

              <p>
                There are currently no notices
                in the database.
              </p>

            </div>

          )}


        {/* NOTICES */}

        {!loading &&
          notices.length > 0 &&
          notices.map(
            (notice) => (

              <article
                className={`admin-list-card ${
                  notice.is_active
                    ? ''
                    : 'inactive'
                }`}
                key={notice.id}
              >


                {/* ICON */}

                <div className="admin-list-icon">

                  <Bell size={18} />

                </div>


                {/* CONTENT */}

                <div className="admin-list-copy">

                  <strong>
                    {notice.title}
                  </strong>


                  <p>
                    {notice.message}
                  </p>


                  <span
                    className={`admin-status ${
                      notice.is_active
                        ? 'active'
                        : 'inactive'
                    }`}
                  >

                    {notice.is_active
                      ? 'Visible'
                      : 'Hidden'}

                  </span>

                </div>


                {/* ACTIONS */}

                <div className="admin-list-actions">


                  {/* SHOW / HIDE */}

                  <button
                    type="button"
                    title={
                      notice.is_active
                        ? 'Hide notice'
                        : 'Show notice'
                    }
                    onClick={() =>
                      toggleNotice(
                        notice
                      )
                    }
                    disabled={saving}
                  >

                    {notice.is_active
                      ? 'Hide'
                      : 'Show'}

                  </button>


                  {/* EDIT */}

                  <button
                    type="button"
                    title="Edit notice"
                    onClick={() =>
                      openEdit(
                        notice
                      )
                    }
                    disabled={saving}
                  >

                    <Edit3 size={16} />

                  </button>


                  {/* DELETE */}

                  <button
                    type="button"
                    title="Delete notice"
                    onClick={() =>
                      deleteNotice(
                        notice.id
                      )
                    }
                    disabled={saving}
                  >

                    <Trash2 size={16} />

                  </button>

                </div>

              </article>

            )
          )}

      </div>


      {/* =================================================
          FORM
          ================================================= */}

      {showForm && (

        <NoticeForm

          notice={
            editingNotice
          }

          saving={saving}

          onSave={
            saveNotice
          }

          onClose={
            closeForm
          }

        />

      )}

    </div>

  );

}


/* =========================================================
   NOTICE FORM
   ========================================================= */

function NoticeForm({
  notice,
  saving,
  onSave,
  onClose,
}) {

  const [
    title,
    setTitle,
  ] = useState(
    notice?.title || ''
  );


  const [
    message,
    setMessage,
  ] = useState(
    notice?.message || ''
  );


  const [
    active,
    setActive,
  ] = useState(
    notice?.is_active ?? true
  );


  const [
    type,
    setType,
  ] = useState(
    notice?.type ||
    'information'
  );


  /* =======================================================
     SUBMIT
     ======================================================= */

  const submit = async (
    event
  ) => {

    event.preventDefault();


    if (
      !title.trim() ||
      !message.trim()
    ) {

      alert(
        'Please enter both a title and message.'
      );

      return;

    }


    await onSave({

      title:
        title.trim(),

      message:
        message.trim(),

      type,

      is_active:
        active,

    });

  };


  /* =======================================================
     RENDER
     ======================================================= */

  return (

    <div
      className="admin-modal-backdrop"

      onMouseDown={
        (event) => {

          if (
            event.target ===
            event.currentTarget
          ) {

            onClose();

          }

        }
      }
    >

      <form
        className="admin-form-modal"
        onSubmit={submit}
      >


        {/* HEADER */}

        <div className="admin-form-header">

          <div>

            <span className="admin-eyebrow">
              NOTICE
            </span>

            <h3>

              {notice
                ? 'Edit Notice'
                : 'Add Notice'}

            </h3>

          </div>


          <button
            type="button"
            className="admin-modal-close"
            onClick={onClose}
            disabled={saving}
          >
            ×
          </button>

        </div>


        {/* TITLE */}

        <label className="admin-field">

          <span>
            Notice title
          </span>

          <input
            value={title}
            onChange={
              (event) =>
                setTitle(
                  event.target.value
                )
            }
            placeholder="e.g. Pool maintenance"
            disabled={saving}
            autoFocus
          />

        </label>


        {/* MESSAGE */}

        <label className="admin-field">

          <span>
            Notice message
          </span>

          <textarea
            value={message}
            onChange={
              (event) =>
                setMessage(
                  event.target.value
                )
            }
            placeholder="Enter the message guests should see"
            rows={5}
            disabled={saving}
          />

        </label>


        {/* TYPE */}

        <label className="admin-field">

          <span>
            Notice type
          </span>

          <select
            value={type}
            onChange={
              (event) =>
                setType(
                  event.target.value
                )
            }
            disabled={saving}
          >

            <option value="information">
              Information
            </option>

            <option value="important">
              Important
            </option>

            <option value="maintenance">
              Maintenance
            </option>

            <option value="event">
              Event
            </option>

          </select>

        </label>


        {/* ACTIVE */}

        <label className="admin-toggle-field">

          <span>

            <strong>
              Show on home page
            </strong>

            <small>
              Guests will see this notice
              when enabled.
            </small>

          </span>


          <input
            type="checkbox"
            checked={active}
            onChange={
              (event) =>
                setActive(
                  event.target.checked
                )
            }
            disabled={saving}
          />

        </label>


        {/* ACTIONS */}

        <div className="admin-form-actions">

          <button
            type="button"
            className="admin-secondary-button"
            onClick={onClose}
            disabled={saving}
          >
            Cancel
          </button>


          <button
            type="submit"
            className="admin-primary-button"
            disabled={saving}
          >

            {saving && (
              <Loader2
                size={15}
                className="admin-spinner"
              />
            )}

            {saving
              ? 'Saving...'
              : notice
                ? 'Save Changes'
                : 'Create Notice'}

          </button>

        </div>

      </form>

    </div>

  );

}