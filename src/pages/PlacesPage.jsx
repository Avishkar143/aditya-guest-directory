import {
  ChevronRight,
  MapPin,
  Clock,
  Navigation,
} from 'lucide-react';

export default function PlacesPage({
  places = [],
  onBack,
}) {

  /* =====================================================
     ACTIVE PLACES
     ===================================================== */

  const activePlaces = [...places]
    .filter(
      (place) =>
        place.is_active !== false &&
        place.active !== false
    )
    .sort(
      (a, b) =>
        (a.display_order || 0) -
        (b.display_order || 0)
    );


  return (
    <main className="page-shell places-page">

      {/* =====================================================
          HEADER
          ===================================================== */}

      <header className="inner-header">

        <button
          className="icon-button"
          onClick={onBack}
          type="button"
          aria-label="Back"
        >
          <ChevronRight
            size={20}
            style={{
              transform: 'rotate(180deg)',
            }}
          />
        </button>


        <div>

          <span className="eyebrow">
            EXPLORE NASHIK
          </span>

          <h1>
            Places to Visit
          </h1>

        </div>

      </header>


      {/* =====================================================
          PLACES
          ===================================================== */}

      <div className="places-grid">

        {activePlaces.length === 0 ? (

          <div className="admin-empty">

            <MapPin
              size={27}
            />

            <strong>
              No places available
            </strong>

            <p>
              Places recommended for guests
              will appear here.
            </p>

          </div>

        ) : (

          activePlaces.map((place) => (

            <article
              className="place-card"
              key={place.id}
            >

              {/* =================================================
                  IMAGE
                  ================================================= */}

              <div className="place-image">

                {place.image_url ? (

                  <img
                    src={place.image_url}
                    alt={place.name}
                    loading="lazy"
                  />

                ) : (

                  <div className="place-image-placeholder">

                    <MapPin
                      size={27}
                      strokeWidth={1.5}
                    />

                  </div>

                )}

              </div>


              {/* =================================================
                  CONTENT
                  ================================================= */}

              <div className="place-content">

                {/* CATEGORY */}

                {place.category && (

                  <span className="place-category">
                    {place.category}
                  </span>

                )}


                {/* NAME */}

                <h3>
                  {place.name}
                </h3>


                {/* DESCRIPTION */}

                {place.description && (

                  <p>
                    {place.description}
                  </p>

                )}


                {/* =================================================
                    META
                    ================================================= */}

                {(place.distance ||
                  place.duration) && (

                  <div className="place-meta">

                    {place.distance && (

                      <span>
                        <MapPin
                          size={11}
                        />

                        {place.distance}
                      </span>

                    )}


                    {place.duration && (

                      <span>
                        <Clock
                          size={11}
                        />

                        {place.duration}
                      </span>

                    )}

                  </div>

                )}


                {/* =================================================
                    ACTION
                    ================================================= */}

                {place.maps_url && (

                  <div className="place-actions">

                    <a
                      href={place.maps_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="place-action"
                    >

                      <Navigation
                        size={13}
                      />

                      View on Google Maps

                    </a>

                  </div>

                )}

              </div>

            </article>

          ))

        )}

      </div>

    </main>
  );
}