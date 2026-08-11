import {
  ArrowLeft,
  ExternalLink,
  Search,
  UtensilsCrossed,
} from 'lucide-react';
import { useMemo, useState } from 'react';

export default function MenuPage({ restaurant, onBack }) {
  const [query, setQuery] = useState('');
  const [foodType, setFoodType] = useState('all');

  const filteredCategories = useMemo(() => {
    const search = query.trim().toLowerCase();

    return restaurant.categories
      .map((category) => ({
        ...category,

        items: category.items.filter((item) => {
          const matchesSearch =
            `${item.name} ${item.description}`
              .toLowerCase()
              .includes(search);

          const matchesFoodType =
            foodType === 'all' ||
            item.type === foodType ||
            (foodType === 'veg' && item.type === 'mixed') ||
            (foodType === 'non-veg' && item.type === 'mixed');

          return matchesSearch && matchesFoodType;
        }),
      }))
      .filter((category) => category.items.length);
  }, [restaurant.categories, query, foodType]);

  return (
    <main className="page-shell menu-page premium-menu-page">

      {/* Header */}
      <header className="inner-header menu-header">
        <button
          className="icon-button"
          onClick={onBack}
          aria-label="Back to Food & Beverage"
        >
          <ArrowLeft size={20} strokeWidth={1.8} />
        </button>

        <div className="menu-header-copy">
          <span className="eyebrow">FOOD &amp; BEVERAGE</span>
          <h1>{restaurant.name}</h1>
        </div>
      </header>

      {/* Restaurant introduction */}
      <section className="menu-hero">
        <div className="menu-hero-mark">
          <UtensilsCrossed size={23} strokeWidth={1.6} />
        </div>

        <div className="menu-hero-copy">
          <span className="menu-kicker">THE MENU</span>

          <h2>{restaurant.subtitle}</h2>

          {restaurant.description && (
            <p>{restaurant.description}</p>
          )}
        </div>
      </section>

      {/* Full PDF */}
      {restaurant.pdf && (
        <a
          className="pdf-link premium-pdf-link"
          href={restaurant.pdf}
          target="_blank"
          rel="noreferrer"
        >
          <span>View full menu</span>
          <ExternalLink size={15} strokeWidth={1.8} />
        </a>
      )}

      {/* Empty menu */}
      {restaurant.categories.length === 0 ? (
        <section className="empty-state premium-empty-state">
          <div className="empty-state-mark">
            <UtensilsCrossed size={22} strokeWidth={1.6} />
          </div>

          <span className="eyebrow">COMING SOON</span>

          <h2>Menu coming soon</h2>

          <p>
            The menu for {restaurant.name} will be available here once
            the final menu details are provided.
          </p>
        </section>
      ) : (
        <>
          {/* Search */}
          <div className="menu-toolbar">
            <label className="search-box premium-search-box">
              <Search
                size={17}
                strokeWidth={1.8}
                aria-hidden="true"
              />

              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={`Search ${restaurant.name} menu`}
                aria-label={`Search ${restaurant.name} menu`}
              />

              {query && (
                <button
                  type="button"
                  className="search-clear"
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </label>
          </div>

          {/* Vegetarian / Non-Vegetarian filter */}
          <div className="food-type-filter" role="group" aria-label="Food type">

            <button
              type="button"
              className={`food-filter-button ${
                foodType === 'all' ? 'active' : ''
              }`}
              onClick={() => setFoodType('all')}
            >
              All
            </button>

            <button
              type="button"
              className={`food-filter-button ${
                foodType === 'veg' ? 'active veg' : ''
              }`}
              onClick={() => setFoodType('veg')}
            >
              <span className="food-dot veg-dot" />
              Vegetarian
            </button>

            <button
              type="button"
              className={`food-filter-button ${
                foodType === 'non-veg' ? 'active non-veg' : ''
              }`}
              onClick={() => setFoodType('non-veg')}
            >
              <span className="food-dot non-veg-dot" />
              Non-Vegetarian
            </button>

          </div>

          {/* Categories */}
          {filteredCategories.length > 0 ? (
            <div className="accordion-list premium-accordion-list">

              {filteredCategories.map((category) => (
                <section
                  className="accordion premium-accordion"
                  key={category.id}
                >

                  {/* Category header */}
                  <div className="accordion-head premium-accordion-head">
                    <div>
                      <span>{category.name}</span>

                      <small>
                        {category.items.length}{' '}
                        {category.items.length === 1
                          ? 'item'
                          : 'items'}
                      </small>
                    </div>

                    <span className="category-count">
                      {category.items.length}
                    </span>
                  </div>

                  {/* Menu items */}
                  <div className="accordion-body premium-accordion-body">

                    {category.items.map((menuItem, index) => (
                      <article
                        className="menu-item detailed premium-menu-item"
                        key={`${menuItem.name}-${index}`}
                      >

                        <div className="menu-item-copy">

                          <div className="menu-item-title">
                            <span
                              className={`food-indicator ${
                                menuItem.type === 'non-veg'
                                  ? 'non-veg-indicator'
                                  : 'veg-indicator'
                              }`}
                              aria-label={
                                menuItem.type === 'non-veg'
                                  ? 'Non-vegetarian'
                                  : menuItem.type === 'mixed'
                                    ? 'Vegetarian and non-vegetarian options'
                                    : 'Vegetarian'
                              }
                            />

                            <strong>{menuItem.name}</strong>
                          </div>

                          {menuItem.description && (
                            <small>{menuItem.description}</small>
                          )}

                        </div>

                        <b>{menuItem.price}</b>

                      </article>
                    ))}

                  </div>

                </section>
              ))}

            </div>
          ) : (
            <section className="empty-state premium-empty-state">

              <Search
                size={22}
                strokeWidth={1.6}
                aria-hidden="true"
              />

              <h2>No matches found</h2>

              <p>
                Try another dish or change the food preference.
              </p>

              <button
                type="button"
                className="text-button"
                onClick={() => {
                  setQuery('');
                  setFoodType('all');
                }}
              >
                Clear filters
              </button>

            </section>
          )}
        </>
      )}

    </main>
  );
}