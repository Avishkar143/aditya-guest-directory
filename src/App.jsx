import { useEffect, useState } from 'react';

import AdminPage from './admin/AdminPage.jsx';
import HomePage from './pages/HomePage.jsx';
import MenuPage from './components/MenuPage.jsx';
import PlacesPage from './pages/PlacesPage.jsx';

import {
  restaurants,
} from './data/content.js';

import { supabase } from './lib/supabase.js';


const HOTEL_ID = 'four-points-nashik';


export default function App() {

  const pathname =
    window.location.pathname;

  const params =
    new URLSearchParams(
      window.location.search
    );


  // =========================================================
  // ADMIN
  // =========================================================

  if (
    pathname === '/admin' ||
    pathname === '/admin/'
  ) {

    return (
      <AdminPage />
    );

  }


  // =========================================================
  // MENU
  // =========================================================

  const selectedMenuId =
    params.get('menu');


  const selectedRestaurant =
    selectedMenuId
      ? restaurants.find(
          (restaurant) =>
            String(restaurant.id) ===
            String(selectedMenuId)
        )
      : null;


  if (selectedRestaurant) {

    return (
      <MenuPage
        restaurant={
          selectedRestaurant
        }

        onBack={() => {

          window.location.href =
            pathname;

        }}
      />
    );

  }


  // =========================================================
  // PLACES
  // =========================================================

  const showPlaces =
    params.get('places') === 'true';


  if (showPlaces) {

    return (
      <PlacesRoute
        onBack={() => {

          window.location.href =
            pathname;

        }}
      />
    );

  }


  // =========================================================
  // HOME
  // =========================================================

  return (
    <HomePage />
  );

}


// =============================================================
// PLACES ROUTE
// =============================================================
//
// Loads city places directly from Supabase and passes them
// to PlacesPage.
//
// =============================================================

function PlacesRoute({ onBack }) {

  const [places, setPlaces] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);


  useEffect(() => {

    let mounted = true;


    async function loadPlaces() {

      setLoading(true);
      setError(null);


      const {
        data,
        error: fetchError,
      } = await supabase
        .from('city_places')
        .select('*')
        .eq('hotel_id', HOTEL_ID)
        .eq('is_active', true)
        .order('display_order', {
          ascending: true,
        })
        .order('created_at', {
          ascending: true,
        });


      if (!mounted) {
        return;
      }


      if (fetchError) {

        console.error(
          'Failed to load places:',
          fetchError
        );

        setError(
          fetchError.message ||
          'Unable to load places.'
        );

        setPlaces([]);

        setLoading(false);

        return;

      }


      setPlaces(
        Array.isArray(data)
          ? data
          : []
      );

      setLoading(false);

    }


    loadPlaces();


    // =======================================================
    // REALTIME
    // =======================================================

    const channel =
      supabase
        .channel(
          'city-places-app'
        )
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'city_places',
            filter:
              `hotel_id=eq.${HOTEL_ID}`,
          },
          () => {

            loadPlaces();

          }
        )
        .subscribe();


    return () => {

      mounted = false;

      supabase.removeChannel(
        channel
      );

    };

  }, []);


  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {

    return (
      <main className="page-shell places-page">

        <div
          style={{
            minHeight: '60vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >

          <div>

            <div
              style={{
                fontSize: '28px',
                marginBottom: '10px',
              }}
            >
              ✦
            </div>

            <p>
              Loading places to visit...
            </p>

          </div>

        </div>

      </main>
    );

  }


  // =========================================================
  // ERROR
  // =========================================================

  if (error) {

    return (
      <main className="page-shell places-page">

        <div
          style={{
            minHeight: '60vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '24px',
          }}
        >

          <div>

            <h2>
              Places unavailable
            </h2>

            <p>
              {error}
            </p>

            <button
              type="button"
              onClick={onBack}
            >
              Back to Home
            </button>

          </div>

        </div>

      </main>
    );

  }


  // =========================================================
  // PLACES PAGE
  // =========================================================

  return (
    <PlacesPage
      places={places}
      onBack={onBack}
    />
  );

}