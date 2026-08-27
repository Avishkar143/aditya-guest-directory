import {
  ChevronRight,
  MapPin,
} from 'lucide-react';

export default function PlacesPage({
  places = [],
  onBack,
}) {

  const activePlaces =
    places
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
    <main className="page-shell menu-page">

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
              transform:
                'rotate(180deg)',
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

      <div className="places-list">

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

          activePlaces.map(
            (place) => (

              <article
                className="place-card"
                key={place.id}
              >

                {/* =================================================
                    IMAGE
                    ================================================= */}

                <div className="place-card-image">

                  {place.image ? (

                    <img
                      src={place.image}
                      alt={place.name}
                      loading="lazy"
                    />

                  ) : (

                    <MapPin
                      size={27}
                      strokeWidth={1.5}
                    />

                  )}

                </div>


                {/* =================================================
                    CONTENT
                    ================================================= */}

                <div className="place-card-body">

                  <div className="place-card-title">

                    <h2>
                      {place.name}
                    </h2>

                  </div>


                  {/* CATEGORY */}

                  {place.category && (

                    <span className="place-category">

                      {place.category}

                    </span>

                  )}


                  {/* DESCRIPTION */}

                  {place.description && (

                    <p>
                      {place.description}
                    </p>

                  )}


                  {/* ADDRESS */}

                  {place.address && (

                    <small>

                      <MapPin
                        size={13}
                      />

                      {place.address}

                    </small>

                  )}


                  {/* TIMINGS */}

                  {place.timings && (

                    <small>
                      {place.timings}
                    </small>

                  )}


                  {/* GOOGLE MAPS */}

                  {place.maps_url && (

                    <a
                      href={place.maps_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="place-map-button"
                    >
                      View on Google Maps
                    </a>

                  )}

                </div>

              </article>

            )
          )

        )}

      </div>

    </main>
  );
}