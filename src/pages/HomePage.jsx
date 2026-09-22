import {
  ArrowRight,
  BellRing,
  ChevronRight,
  HandHelping,
  MapPin,
  MessageCircle,
  Phone,
  Utensils,
  X,
} from 'lucide-react';

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import SectionCard from '../components/SectionCard.jsx';

import { supabase } from '../lib/supabase.js';


// =========================================================
// HOME PAGE
// =========================================================
//
// All guest-facing information is loaded from Supabase.
//
// Tables used:
//   hotels
//   staff
//   restaurants
//   city_places
//
// Menu categories/items are loaded by MenuPage.
//
// =========================================================


export default function HomePage() {

  // =======================================================
  // STATE
  // =======================================================

  const [hotel, setHotel] = useState(null);

  const [staff, setStaff] = useState(null);

  const [restaurants, setRestaurants] = useState([]);

  const [places, setPlaces] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState('');

  const [
    showRequest,
    setShowRequest,
  ] = useState(false);


  // =======================================================
  // LOAD HOTEL
  // =======================================================

  const loadHotel = useCallback(
    async () => {

      const {
        data,
        error,
      } = await supabase
        .from('hotels')
        .select('*')
        .eq('is_active', true)
        .limit(1)
        .maybeSingle();

      if (error) {
        throw error;
      }

      setHotel(data || null);

      return data;

    },
    []
  );


  // =======================================================
  // LOAD STAFF
  // =======================================================

  const loadStaff = useCallback(
    async () => {

      const {
        data,
        error,
      } = await supabase
        .from('staff')
        .select('*')
        .eq('is_active', true)
        .order('id', {
          ascending: true,
        })
        .limit(1)
        .maybeSingle();

      if (error) {
        throw error;
      }

      setStaff(data || null);

      return data;

    },
    []
  );


  // =======================================================
  // LOAD RESTAURANTS
  // =======================================================

  const loadRestaurants =
    useCallback(
      async () => {

        const {
          data,
          error,
        } = await supabase
          .from('restaurants')
          .select(`
            id,
            name,
            subtitle,
            description,
            image,
            pdf,
            is_active,
            display_order
          `)
          .eq('is_active', true)
          .order('display_order', {
            ascending: true,
          });

        if (error) {
          throw error;
        }

        setRestaurants(data || []);

        return data || [];

      },
      []
    );


  // =======================================================
  // LOAD PLACES
  // =======================================================

  const loadPlaces =
    useCallback(
      async () => {

        const {
          data,
          error,
        } = await supabase
          .from('city_places')
          .select(`
            id,
            name,
            category,
            description,
            image,
            address,
            maps_url,
            timings,
            is_active,
            display_order
          `)
          .eq('is_active', true)
          .order('display_order', {
            ascending: true,
          });

        if (error) {
          throw error;
        }

        setPlaces(data || []);

        return data || [];

      },
      []
    );


  // =======================================================
  // LOAD EVERYTHING
  // =======================================================

  const loadHomeData =
    useCallback(
      async () => {

        try {

          setLoading(true);
          setError('');

          await Promise.all([
            loadHotel(),
            loadStaff(),
            loadRestaurants(),
            loadPlaces(),
          ]);

        } catch (loadError) {

          console.error(
            'Failed to load guest directory:',
            loadError
          );

          setError(
            loadError?.message ||
            'Could not load the guest directory.'
          );

        } finally {

          setLoading(false);

        }

      },
      [
        loadHotel,
        loadStaff,
        loadRestaurants,
        loadPlaces,
      ]
    );


  // =======================================================
  // INITIAL LOAD
  // =======================================================

  useEffect(() => {

    loadHomeData();

  }, [loadHomeData]);


  // =======================================================
  // REALTIME UPDATES
  // =======================================================

  useEffect(() => {

    const channel =
      supabase
        .channel(
          'guest-home-live-updates'
        )

        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'hotels',
          },
          () => {
            loadHotel();
          }
        )

        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'staff',
          },
          () => {
            loadStaff();
          }
        )

        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'restaurants',
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
            table: 'city_places',
          },
          () => {
            loadPlaces();
          }
        )

        .subscribe();


    return () => {

      supabase.removeChannel(
        channel
      );

    };

  }, [
    loadHotel,
    loadStaff,
    loadRestaurants,
    loadPlaces,
  ]);


  // =======================================================
  // STAFF INITIALS
  // =======================================================

  const staffInitials =
    useMemo(() => {

      if (!staff?.name) {
        return 'GA';
      }

      return staff.name
        .split(' ')
        .filter(Boolean)
        .map(
          (part) =>
            part[0]
        )
        .join('')
        .slice(0, 2)
        .toUpperCase();

    }, [staff]);


  // =======================================================
  // CONTACT
  // =======================================================

  const call = () => {

    if (!staff?.phone) {
      return;
    }

    window.location.href =
      `tel:${staff.phone}`;

  };


  const whatsapp = () => {

    if (!staff?.whatsapp) {
      return;
    }

    const number =
      staff.whatsapp.replace(
        /\D/g,
        ''
      );

    if (!number) {
      return;
    }

    window.open(
      `https://wa.me/${number}`,
      '_blank',
      'noopener,noreferrer'
    );

  };


  // =======================================================
  // NAVIGATION
  // =======================================================

  const openMenu = (id) => {

    window.location.href =
      `${window.location.pathname}?menu=${encodeURIComponent(
        id
      )}`;

  };


  const openPlaces = () => {

    window.location.href =
      `${window.location.pathname}?places=true`;

  };


  // =======================================================
  // LOADING
  // =======================================================

  if (loading) {

    return (
      <main className="app-bg">

        <div className="page-shell home">

          <header className="topbar">

            <div className="brand-lockup">

              <span className="brand-mark">
                G
              </span>

              <div>

                <strong>
                  Guest Directory
                </strong>

                <span>
                  GUEST ASSISTANCE
                </span>

              </div>

            </div>

            <span className="secure-pill">

              <span className="live-dot" />

              Loading

            </span>

          </header>


          <section className="welcome-card loading-card">

            <div className="loading-avatar" />

            <div className="loading-line small" />

            <div className="loading-line large" />

            <div className="loading-line medium" />

          </section>


          <section className="content-section">

            <div className="home-loading-list">

              <div className="home-skeleton-card" />
              <div className="home-skeleton-card" />
              <div className="home-skeleton-card" />

            </div>

          </section>

        </div>

      </main>
    );

  }


  // =======================================================
  // ERROR
  // =======================================================

  if (error || !hotel) {

    return (
      <main className="app-bg">

        <div className="page-shell home">

          <section className="directory-error">

            <div className="directory-error-icon">
              !
            </div>

            <span className="eyebrow">
              TEMPORARILY UNAVAILABLE
            </span>

            <h1>
              Guest directory unavailable
            </h1>

            <p>
              We could not load the hotel
              information right now.
              Please try again shortly.
            </p>

            {error && (
              <small>
                {error}
              </small>
            )}

            <button
              type="button"
              className="admin-primary-button"
              onClick={loadHomeData}
            >
              Try Again
            </button>

          </section>

        </div>

      </main>
    );

  }


  // =======================================================
  // HOME
  // =======================================================

  return (

    <main className="app-bg">

      <div className="page-shell home">


        {/* =================================================
            TOP BAR
            ================================================= */}

        <header className="topbar">

          <div
            className="brand-lockup"
            aria-label="Guest assistance"
          >

            <span className="brand-mark">
              {hotel.name
                ?.charAt(0)
                ?.toUpperCase() || 'G'}
            </span>

            <div>

              <strong>
                {hotel.name}
              </strong>

              <span>
                GUEST DIRECTORY
              </span>

            </div>

          </div>


          <span className="secure-pill">

            <span className="live-dot" />

            Guest Assistant

          </span>

        </header>


        {/* =================================================
            HERO / WELCOME
            ================================================= */}

        <section className="welcome-card">

          <div
            className="welcome-orbit orbit-one"
          />

          <div
            className="welcome-orbit orbit-two"
          />


          <div
            className="avatar"
            aria-hidden="true"
          >
            {staffInitials}
          </div>


          <span className="eyebrow">
            PERSONAL GUEST ASSISTANCE
          </span>


          <h1>
            Namaste Sir/Ma’am, How Can I assist you?
          </h1>


          <p>
            {hotel.welcome_message ||
              'Dining, hotel information and personal assistance — all in one place.'}
          </p>


          <div className="welcome-chip">

            <span>
              Available to assist
            </span>

            <span className="chip-dot" />

          </div>

        </section>


        {/* =================================================
            QUICK ACTIONS
            ================================================= */}

        <section className="quick-actions">

          <button
            type="button"
            onClick={() => {

              const firstRestaurant =
                restaurants[0];

              if (
                firstRestaurant
              ) {
                openMenu(
                  firstRestaurant.id
                );
              }

            }}
            disabled={
              restaurants.length === 0
            }
          >

            <span className="quick-action-icon">
              <Utensils size={18} />
            </span>

            <span>

              <strong>
                Dining
              </strong>

              <small>
                Explore menus
              </small>

            </span>

            <ChevronRight size={16} />

          </button>


          <button
            type="button"
            onClick={openPlaces}
            disabled={
              places.length === 0
            }
          >

            <span className="quick-action-icon">
              <MapPin size={18} />
            </span>

            <span>

              <strong>
                Explore
              </strong>

              <small>
                Discover Nashik
              </small>

            </span>

            <ChevronRight size={16} />

          </button>

        </section>


        {/* =================================================
            FOOD & BEVERAGE
            ================================================= */}

        {restaurants.length > 0 && (

          <section className="content-section">

            <div className="section-heading">

              <span className="heading-icon">

                <Utensils size={18} />

              </span>


              <div>

                <span className="eyebrow">
                  DISCOVER
                </span>

                <h2>
                  Food &amp; Beverage
                </h2>

              </div>

            </div>


            <div className="card-stack">

              {restaurants.map(
                (restaurant) => {

                  const restaurantIcon =
                    restaurant.short_name ||
                    restaurant.name
                      ?.split(' ')
                      .filter(Boolean)
                      .map(
                        (word) =>
                          word[0]
                      )
                      .join('')
                      .slice(0, 2)
                      .toUpperCase() ||
                    'FO';


                  return (

                    <SectionCard
                      key={
                        restaurant.id
                      }
                      icon={
                        restaurantIcon
                      }
                      title={
                        restaurant.name
                      }
                      subtitle={
                        restaurant.subtitle
                      }
                      onClick={() =>
                        openMenu(
                          restaurant.id
                        )
                      }
                    />

                  );

                }
              )}

            </div>

          </section>

        )}


        {/* =================================================
            PLACES TO VISIT
            ================================================= */}

        {places.length > 0 && (

          <section
            className="content-section"
          >

            <div className="section-heading">

              <span className="heading-icon">

                <MapPin size={18} />

              </span>


              <div>

                <span className="eyebrow">
                  EXPLORE NASHIK
                </span>

                <h2>
                  Places to Visit
                </h2>

              </div>

            </div>


            <button
              type="button"
              className="places-preview-card"
              onClick={openPlaces}
            >

              <span className="places-preview-icon">

                <MapPin size={21} />

              </span>


              <span className="places-preview-copy">

                <strong>
                  Discover Nashik
                </strong>

                <small>
                  Explore places recommended
                  for our guests
                </small>

              </span>


              <ChevronRight
                size={18}
              />

            </button>

          </section>

        )}


        {/* =================================================
            CONTACT ASSISTANT
            ================================================= */}

        <section
          className="content-section contact-section"
        >

          <div className="section-heading">

            <span className="heading-icon">

              <HandHelping size={18} />

            </span>


            <div>

              <span className="eyebrow">
                PERSONAL ASSISTANCE
              </span>

              <h2>
                Contact Your Assistant
              </h2>

            </div>

          </div>


          <div className="contact-grid">

            {/* CALL */}

            <button
              className="contact-card"
              onClick={call}
              type="button"
              disabled={!staff?.phone}
            >

              <span className="contact-icon">

                <Phone size={19} />

              </span>


              <strong>
                Call
              </strong>


              <small>

                {staff?.phone
                  ? 'Speak with our guest assistance team'
                  : 'Number to be added'}

              </small>


              <ChevronRight
                size={16}
              />

            </button>


            {/* WHATSAPP */}

            <button
              className="contact-card"
              onClick={whatsapp}
              type="button"
              disabled={!staff?.whatsapp}
            >

              <span className="contact-icon whatsapp">

                <MessageCircle
                  size={19}
                />

              </span>


              <strong>
                WhatsApp
              </strong>


              <small>

                {staff?.whatsapp
                  ? 'Message guest assistance'
                  : 'Number to be added'}

              </small>


              <ChevronRight
                size={16}
              />

            </button>


            {/* REQUEST */}

            <button
              className="contact-card full"
              onClick={() =>
                setShowRequest(true)
              }
              type="button"
            >

              <span className="contact-icon request">

                <BellRing size={19} />

              </span>


              <span className="contact-text">

                <strong>
                  Request Assistance
                </strong>

                <small>
                  Tell us what you need
                </small>

              </span>


              <ArrowRight
                size={17}
              />

            </button>

          </div>

        </section>


        {/* =================================================
            FOOTER
            ================================================= */}

        <footer>

          <span>
            {hotel.name}
          </span>

          <i />

          <span>
            Your comfort, our priority
          </span>

        </footer>

      </div>


      {/* =====================================================
          REQUEST ASSISTANCE MODAL
          ===================================================== */}

      {showRequest && (

        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {

            if (
              event.target === event.currentTarget
            ) {
              setShowRequest(false);
            }

          }}
        >

          <section
            className="request-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="request-title"
          >

            {/* CLOSE */}

            <button
              className="modal-close"
              onClick={() =>
                setShowRequest(false)
              }
              aria-label="Close"
              type="button"
            >

              <X size={18} />

            </button>


            {/* ICON */}

            <div className="modal-icon">

              <BellRing size={21} />

            </div>


            {/* LABEL */}

            <span className="eyebrow">
              PERSONAL ASSISTANCE
            </span>


            {/* TITLE */}

            <h2 id="request-title">
              At Your Service
            </h2>


            {/* MESSAGE */}

            <p className="modal-copy">

              For any further assistance or to make
              your stay more comfortable, please feel
              free to contact At Your Service by simply
              dialing <strong>0</strong> from your room
              telephone. We’ll be delighted to assist you.

            </p>


            {/* HOTEL SERVICE NOTE */}

            <div className="future-note">

              <span>
                ✓
              </span>

              <span>
                Our team will be delighted to assist you.
              </span>

            </div>

          </section>

        </div>

      )}

    </main>

  );

}