import {
  Bell,
  Building2,
  ChevronRight,
  Home,
  LogIn,
  LogOut,
  Loader2,
  LockKeyhole,
  MapPin,
  Utensils,
} from 'lucide-react';

import {
  useEffect,
  useState,
} from 'react';

import { supabase } from '../lib/supabase.js';

import AdminDashboard from './AdminDashboard.jsx';
import AdminHotel from './AdminHotel.jsx';
import NoticeManager from './NoticeManager.jsx';
import PlacesManager from './PlacesManager.jsx';
import MenuManager from './MenuManager.jsx';


/* =========================================================
   ADMIN PAGE
   ========================================================= */

export default function AdminPage() {

  const [
    session,
    setSession,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    authError,
    setAuthError,
  ] = useState('');

  const [
    activeSection,
    setActiveSection,
  ] = useState('dashboard');


  /* =======================================================
     CHECK AUTHENTICATION
     ======================================================= */

  useEffect(() => {

    let mounted = true;


    const checkSession = async () => {

      const {
        data,
        error,
      } = await supabase.auth.getSession();


      if (!mounted) {
        return;
      }


      if (error) {

        console.error(
          'Failed to get admin session:',
          error
        );

        setAuthError(
          error.message
        );

      } else {

        setSession(
          data?.session || null
        );

      }


      setLoading(false);

    };


    checkSession();


    /* =====================================================
       LISTEN FOR LOGIN / LOGOUT
       ===================================================== */

    const {
      data: authListener,
    } =
      supabase.auth.onAuthStateChange(
        (
          _event,
          newSession
        ) => {

          if (!mounted) {
            return;
          }

          setSession(
            newSession || null
          );

          setLoading(false);

        }
      );


    return () => {

      mounted = false;

      authListener?.subscription?.unsubscribe();

    };

  }, []);


  /* =======================================================
     LOADING
     ======================================================= */

  if (loading) {

    return (
      <main className="admin-page">

        <div className="admin-auth-loading">

          <Loader2
            size={25}
            className="admin-spinner"
          />

          <span>
            Checking administrator access...
          </span>

        </div>

      </main>
    );

  }


  /* =======================================================
     LOGIN
     ======================================================= */

  if (!session) {

    return (
      <AdminLogin
        error={authError}
        setError={setAuthError}
      />
    );

  }


  /* =======================================================
     AUTHENTICATED ADMIN
     ======================================================= */

  return (
    <AuthenticatedAdmin
      session={session}
      activeSection={activeSection}
      setActiveSection={setActiveSection}
    />
  );

}


/* =========================================================
   ADMIN LOGIN
   ========================================================= */

function AdminLogin({
  error,
  setError,
}) {

  const [
    email,
    setEmail,
  ] = useState('');

  const [
    password,
    setPassword,
  ] = useState('');

  const [
    loading,
    setLoading,
  ] = useState(false);


  /* =======================================================
     LOGIN
     ======================================================= */

  const handleLogin = async (
    event
  ) => {

    event.preventDefault();

    setError('');


    if (
      !email.trim() ||
      !password
    ) {

      setError(
        'Please enter your email and password.'
      );

      return;

    }


    try {

      setLoading(true);


      const {
        error: loginError,
      } =
        await supabase.auth.signInWithPassword({
          email:
            email.trim(),

          password,
        });


      if (loginError) {
        throw loginError;
      }


    } catch (loginError) {

      console.error(
        'Admin login failed:',
        loginError
      );


      /*
       * Don't expose unnecessary
       * Supabase details to guests.
       */

      setError(
        'Invalid email or password.'
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <main className="admin-page">

      <div className="admin-auth-shell">


        {/* =================================================
            LOGIN CARD
            ================================================= */}

        <section className="admin-login-card">


          {/* LOGO */}

          <div className="admin-login-icon">

            <LockKeyhole
              size={23}
              strokeWidth={1.7}
            />

          </div>


          {/* HEADING */}

          <span className="admin-eyebrow">

            FOUR POINTS NASHIK

          </span>


          <h1>
            Administrator Login
          </h1>


          <p className="admin-login-description">

            Sign in to manage the guest directory,
            hotel information, notices, places and menus.

          </p>


          {/* ERROR */}

          {error && (

            <div className="admin-login-error">

              {error}

            </div>

          )}


          {/* FORM */}

          <form
            className="admin-login-form"
            onSubmit={handleLogin}
          >


            {/* EMAIL */}

            <label className="admin-field">

              <span>
                Email address
              </span>

              <input
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(
                    event.target.value
                  )
                }
                placeholder="admin@example.com"
                autoComplete="email"
                disabled={loading}
                autoFocus
              />

            </label>


            {/* PASSWORD */}

            <label className="admin-field">

              <span>
                Password
              </span>

              <input
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(
                    event.target.value
                  )
                }
                placeholder="Enter your password"
                autoComplete="current-password"
                disabled={loading}
              />

            </label>


            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="admin-primary-button admin-login-button"
              disabled={loading}
            >

              {loading ? (

                <>

                  <Loader2
                    size={16}
                    className="admin-spinner"
                  />

                  Signing in...

                </>

              ) : (

                <>

                  <LogIn size={16} />

                  Sign In

                </>

              )}

            </button>

          </form>


          {/* SECURITY NOTE */}

          <div className="admin-login-security">

            <LockKeyhole
              size={13}
            />

            <span>
              Administrator access only
            </span>

          </div>


          {/* BACK TO GUEST DIRECTORY */}

          <button
            type="button"
            className="admin-back-home"
            onClick={() => {
              window.location.href = '/';
            }}
          >
            Return to Guest Directory
          </button>

        </section>


        {/* FOOTER */}

        <footer className="admin-auth-footer">

          <span>
            Four Points by Sheraton Nashik
          </span>

          <i />

          <span>
            Administrator Portal
          </span>

        </footer>

      </div>

    </main>

  );

}


/* =========================================================
   AUTHENTICATED ADMIN
   ========================================================= */

function AuthenticatedAdmin({
  session,
  activeSection,
  setActiveSection,
}) {


  /* =======================================================
     NAVIGATION
     ======================================================= */

  const navigation = [

    {
      id: 'dashboard',
      label: 'Dashboard',
      description: 'Overview',
      icon: Home,
    },

    {
      id: 'hotel',
      label: 'Hotel',
      description: 'Hotel information',
      icon: Building2,
    },

    {
      id: 'notices',
      label: 'Notices',
      description: 'Guest announcements',
      icon: Bell,
    },

    {
      id: 'places',
      label: 'Places to Visit',
      description: 'Nashik recommendations',
      icon: MapPin,
    },

    {
      id: 'menu',
      label: 'Menu Management',
      description: 'Restaurants & menus',
      icon: Utensils,
    },

  ];


  /* =======================================================
     CURRENT PAGE
     ======================================================= */

  const currentPage =
    navigation.find(
      (item) =>
        item.id === activeSection
    ) || navigation[0];


  /* =======================================================
     NAVIGATE
     ======================================================= */

  const navigate = (
    section
  ) => {

    setActiveSection(
      section
    );


    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

  };


  /* =======================================================
     LOGOUT
     ======================================================= */

  const logout = async () => {

    const confirmed =
      window.confirm(
        'Sign out of the administrator panel?'
      );


    if (!confirmed) {
      return;
    }


    const {
      error,
    } =
      await supabase.auth.signOut();


    if (error) {

      console.error(
        'Admin logout failed:',
        error
      );

      alert(
        'Could not sign out. Please try again.'
      );

      return;

    }


    window.location.href = '/';

  };


  /* =======================================================
     CONTENT
     ======================================================= */

  const renderContent = () => {

    switch (
      activeSection
    ) {

      case 'dashboard':

        return (
          <AdminDashboard
            onNavigate={navigate}
          />
        );


      case 'hotel':

        return (
          <AdminHotel />
        );


      case 'notices':

        return (
          <NoticeManager />
        );


      case 'places':

        return (
          <PlacesManager />
        );


      case 'menu':

        return (
          <MenuManager />
        );


      default:

        return (
          <AdminDashboard
            onNavigate={navigate}
          />
        );

    }

  };


  /* =======================================================
     RENDER
     ======================================================= */

  return (

    <main className="admin-page">

      <div className="admin-shell">


        {/* =================================================
            HEADER
            ================================================= */}

        <header className="admin-header">

          <div className="admin-brand">

            <div className="admin-brand-mark">

              <Building2
                size={22}
              />

            </div>


            <div>

              <span className="admin-eyebrow">

                FOUR POINTS NASHIK

              </span>

              <h1>
                Guest Directory
              </h1>

            </div>

          </div>


          <div className="admin-header-right">


            <span className="admin-user-email">

              {session?.user?.email}

            </span>


            <button
              type="button"
              className="admin-exit-button"
              onClick={logout}
            >

              <LogOut
                size={15}
              />

              <span>
                Logout
              </span>

            </button>

          </div>

        </header>


        {/* =================================================
            NAVIGATION
            ================================================= */}

        <nav
          className="admin-navigation"
          aria-label="Admin navigation"
        >

          {navigation.map(
            (item) => {

              const Icon =
                item.icon;

              const active =
                activeSection ===
                item.id;


              return (

                <button
                  key={item.id}
                  type="button"
                  className={`admin-nav-card ${
                    active
                      ? 'active'
                      : ''
                  }`}
                  onClick={() =>
                    navigate(
                      item.id
                    )
                  }
                >

                  <span className="admin-nav-icon">

                    <Icon
                      size={18}
                    />

                  </span>


                  <span className="admin-nav-copy">

                    <strong>
                      {item.label}
                    </strong>

                    <small>
                      {item.description}
                    </small>

                  </span>


                  <ChevronRight
                    size={15}
                    className="admin-nav-arrow"
                  />

                </button>

              );

            }
          )}

        </nav>


        {/* =================================================
            PAGE TITLE
            ================================================= */}

        <section className="admin-section-header">

          <div>

            <span className="admin-eyebrow">

              {activeSection ===
                'dashboard'
                ? 'ADMINISTRATION'
                : currentPage.label.toUpperCase()}

            </span>


            <h2>
              {currentPage.label}
            </h2>


            <p>
              {currentPage.description}
            </p>

          </div>

        </section>


        {/* =================================================
            CONTENT
            ================================================= */}

        <section className="admin-content">

          {renderContent()}

        </section>


        {/* =================================================
            FOOTER
            ================================================= */}

        <footer className="admin-footer">

          <span>
            Four Points by Sheraton Nashik
          </span>

          <i />

          <span>
            Guest Directory Administration
          </span>

        </footer>

      </div>

    </main>

  );

}