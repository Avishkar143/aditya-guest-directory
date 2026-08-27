import {
  Bell,
  Building2,
  MapPin,
  Utensils,
  ChevronRight,
} from 'lucide-react';

export default function AdminDashboard({
  onNavigate,
}) {
  const sections = [
    {
      id: 'hotel',
      title: 'Hotel',
      description: 'Manage hotel information and guest-facing details.',
      icon: Building2,
    },
    {
      id: 'notices',
      title: 'Notices',
      description: 'Create and manage announcements shown to guests.',
      icon: Bell,
    },
    {
      id: 'places',
      title: 'Places to Visit',
      description: 'Manage Nashik recommendations and places.',
      icon: MapPin,
    },
    {
      id: 'menu',
      title: 'Menu Management',
      description: 'Manage restaurants and menu information.',
      icon: Utensils,
    },
  ];

  return (
    <div className="admin-manager">

      <div className="admin-manager-toolbar">
        <div>
          <span className="admin-eyebrow">
            ADMINISTRATION
          </span>

          <h3>
            Dashboard
          </h3>

          <p>
            Manage the information displayed in the guest
            directory.
          </p>
        </div>
      </div>

      <div className="admin-dashboard-grid">

        {sections.map((section) => {
          const Icon = section.icon;

          return (
            <button
              key={section.id}
              type="button"
              className="admin-dashboard-card"
              onClick={() =>
                onNavigate(section.id)
              }
            >
              <span className="admin-dashboard-icon">
                <Icon size={22} />
              </span>

              <span className="admin-dashboard-copy">
                <strong>
                  {section.title}
                </strong>

                <small>
                  {section.description}
                </small>
              </span>

              <ChevronRight size={18} />
            </button>
          );
        })}

      </div>

    </div>
  );
}