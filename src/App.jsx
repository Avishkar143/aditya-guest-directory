import { useState } from 'react';
import {
  ArrowRight,
  BellRing,
  Check,
  ChevronRight,
  HandHelping,
  MessageCircle,
  Phone,
  Utensils,
  X,
} from 'lucide-react';
import SectionCard from './components/SectionCard.jsx';
import MenuPage from './components/MenuPage.jsx';
import { restaurants, staff } from './data/content.js';

export default function App() {
  const [showRequest, setShowRequest] = useState(false);
  const params = new URLSearchParams(window.location.search);
  const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
  const isAdityaRoute = !path || path === 'aditya' || path === 'guest/aditya-patil';
  const selectedId = params.get('menu');
  const selectedRestaurant = isAdityaRoute && selectedId ? restaurants.find((r) => r.id === selectedId) : null;

  const call = () => {
    if (staff.phone) window.location.href = `tel:${staff.phone}`;
  };

  const whatsapp = () => {
    if (staff.whatsapp) window.open(`https://wa.me/${staff.whatsapp.replace(/\D/g, '')}`, '_blank', 'noopener,noreferrer');
  };

  const openMenu = (id) => {
    window.location.href = `${window.location.pathname}?menu=${id}`;
  };

  const goHome = () => {
    window.location.href = window.location.pathname;
  };

  if (selectedRestaurant) return <MenuPage restaurant={selectedRestaurant} onBack={goHome} />;

  return (
    <main className="app-bg">
      <div className="page-shell home">
        <header className="topbar">
          <div className="brand-lockup" aria-label="Guest assistance">
            <span className="brand-mark">G</span>
            <div>
              <strong>GUEST</strong>
              <span>ASSISTANCE</span>
            </div>
          </div>
          <span className="secure-pill"><span className="live-dot" /> Aditya</span>
        </header>

        <section className="welcome-card">
          <div className="welcome-orbit orbit-one" />
          <div className="welcome-orbit orbit-two" />
          <div className="avatar">AP</div>
          <span className="eyebrow">PERSONAL GUEST ASSISTANCE</span>
          <h1>{staff.welcome}</h1>
          <p>Dining, hotel information and personal assistance — all in one place.</p>
          <div className="welcome-chip"><span>Available to assist</span><span className="chip-dot" /></div>
        </section>

        <section className="content-section">
          <div className="section-heading">
            <span className="heading-icon"><Utensils size={18} /></span>
            <div><span className="eyebrow">DISCOVER</span><h2>Food &amp; Beverage</h2></div>
          </div>
          <div className="card-stack">
            {restaurants.map((restaurant) => (
              <SectionCard
                key={restaurant.id}
                icon={restaurant.id === 'ird' ? 'IR' : restaurant.id === 'intermezzo' ? 'IN' : 'AK'}
                title={restaurant.name}
                subtitle={restaurant.subtitle}
                onClick={() => openMenu(restaurant.id)}
              />
            ))}
          </div>
        </section>

        <section className="content-section contact-section">
          <div className="section-heading">
            <span className="heading-icon"><HandHelping size={18} /></span>
            <div><span className="eyebrow">PERSONAL ASSISTANCE</span><h2>Contact Aditya</h2></div>
          </div>
          <div className="contact-grid">
            <button className="contact-card" onClick={call} type="button" disabled={!staff.phone}>
              <span className="contact-icon"><Phone size={19} /></span>
              <strong>Call</strong><small>{staff.phone ? 'Speak with Aditya' : 'Number to be added'}</small><ChevronRight size={16} />
            </button>
            <button className="contact-card" onClick={whatsapp} type="button" disabled={!staff.whatsapp}>
              <span className="contact-icon whatsapp"><MessageCircle size={19} /></span>
              <strong>WhatsApp</strong><small>{staff.whatsapp ? 'Send a message' : 'Number to be added'}</small><ChevronRight size={16} />
            </button>
            <button className="contact-card full" onClick={() => setShowRequest(true)} type="button">
              <span className="contact-icon request"><BellRing size={19} /></span>
              <span className="contact-text"><strong>Request Assistance</strong><small>Tell Aditya what you need</small></span>
              <ArrowRight size={17} />
            </button>
          </div>
        </section>

        <footer><span>Guest assistance</span><i /> <span>Your comfort, our priority</span></footer>
      </div>

      {showRequest && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && setShowRequest(false)}>
          <section className="request-modal" role="dialog" aria-modal="true" aria-labelledby="request-title">
            <button className="modal-close" onClick={() => setShowRequest(false)} aria-label="Close" type="button"><X size={18} /></button>
            <div className="modal-icon"><BellRing size={21} /></div>
            <span className="eyebrow">PERSONAL ASSISTANCE</span>
            <h2 id="request-title">How can Aditya help?</h2>
            <p className="modal-copy">This request screen is ready for the hotel assistance workflow. We can connect the submission to the admin panel in the next phase.</p>
            <div className="request-options">
              {['Room assistance', 'Housekeeping', 'Food & beverage', 'Other'].map((option) => (
                <button key={option} type="button" onClick={() => setShowRequest(false)}><span>{option}</span><ChevronRight size={16} /></button>
              ))}
            </div>
            <div className="future-note"><Check size={15} /> Admin-ready request structure</div>
          </section>
        </div>
      )}
    </main>
  );
}
