import { ChevronRight } from 'lucide-react';

export default function SectionCard({ icon, title, subtitle, onClick }) {
  return (
    <button className="section-card" onClick={onClick} type="button">
      <span className="section-icon">{icon}</span>
      <span className="section-copy">
        <strong>{title}</strong>
        {subtitle && <small>{subtitle}</small>}
      </span>
      <span className="card-arrow"><ChevronRight size={18} strokeWidth={1.8} /></span>
    </button>
  );
}
