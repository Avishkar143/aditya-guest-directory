import AdminPage from './admin/AdminPage.jsx';
import HomePage from './pages/HomePage.jsx';
import MenuPage from './components/MenuPage.jsx';
import PlacesPage from './pages/PlacesPage.jsx';

import {
  restaurants,
} from './data/content.js';


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
  //
  // /admin
  //
  // AdminPage handles:
  // - Administrator login
  // - Authentication
  // - Admin dashboard
  // - Admin navigation
  // - Logout
  //
  // The admin login is NOT displayed on HomePage.
  //
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
  //
  // /?menu=restaurant-id
  //
  // Example:
  // /?menu=ird
  //
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

          /*
           * Remove the menu query parameter
           * and return to the guest home page.
           */

          window.location.href =
            pathname;

        }}
      />
    );

  }


  // =========================================================
  // PLACES
  // =========================================================
  //
  // /?places=true
  //
  // =========================================================

  const showPlaces =
    params.get('places') === 'true';


  if (showPlaces) {

    return (
      <PlacesPage
        onBack={() => {

          /*
           * Remove the places query parameter
           * and return to the guest home page.
           */

          window.location.href =
            pathname;

        }}
      />
    );

  }


  // =========================================================
  // HOME
  // =========================================================
  //
  // /
  //
  // HomePage is ONLY the guest-facing application.
  //
  // There is intentionally NO admin/login button here.
  //
  // =========================================================

  return (
    <HomePage />
  );

}