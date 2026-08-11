import { ArrowLeft, ExternalLink, Search, UtensilsCrossed } from 'lucide-react';
import { useMemo, useState } from 'react';

export default function MenuPage({ restaurant, onBack }) {
  const [query, setQuery] = useState('');
  const filteredCategories = useMemo(() => restaurant.categories.map((category) => ({
    ...category,
    items: category.items.filter((item) => `${item.name} ${item.description}`.toLowerCase().includes(query.toLowerCase())),
  })).filter((category) => category.items.length), [restaurant.categories, query]);

  return (
    <div className="page-shell menu-page">
      <header className="inner-header">
        <button className="icon-button" onClick={onBack} aria-label="Back"><ArrowLeft size={20} /></button>
        <div><span className="eyebrow">FOOD & BEVERAGE</span><h1>{restaurant.name}</h1></div>
      </header>

      <div className="menu-intro">
        <div className="menu-mark"><UtensilsCrossed size={22} /></div>
        <div><strong>{restaurant.subtitle}</strong><p>{restaurant.description}</p></div>
      </div>

      {restaurant.pdf && <a className="pdf-link" href={restaurant.pdf} target="_blank" rel="noreferrer"><ExternalLink size={16} /> View full menu PDF</a>}

      {restaurant.categories.length === 0 ? (
        <div className="empty-state"><p>Menu content will be added when the source menu is provided.</p></div>
      ) : (
        <>
          <label className="search-box"><Search size={18} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search menu" /></label>
          <div className="accordion-list">
            {filteredCategories.map((category) => (
              <section className="accordion open" key={category.id}>
                <div className="accordion-head static"><span>{category.name}</span><span className="category-count">{category.items.length}</span></div>
                <div className="accordion-body">
                  {category.items.map((item, index) => <div className="menu-item detailed" key={`${item.name}-${index}`}><div><strong>{item.name}</strong>{item.description && <small>{item.description}</small>}</div><b>{item.price}</b></div>)}
                </div>
              </section>
            ))}
          </div>
          {!filteredCategories.length && <div className="empty-state"><p>No menu item found.</p></div>}
        </>
      )}
    </div>
  );
}
