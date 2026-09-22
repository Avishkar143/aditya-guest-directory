import {
  Building2,
  Bell,
  MapPin,
  UtensilsCrossed,
  Hotel,
  Users,
  Eye,
  ArrowRight,
} from 'lucide-react';

export default function AdminDashboard({ onNavigate }) {
  const stats = [
    {
      label: 'Hotel Information',
      value: 'Manage',
      icon: Building2,
      section: 'hotel',
    },
    {
      label: 'Guest Notices',
      value: 'Manage',
      icon: Bell,
      section: 'notices',
    },
    {
      label: 'Places to Visit',
      value: 'Manage',
      icon: MapPin,
      section: 'places',
    },
  ];

  const quickActions = [
    {
      title: 'Hotel',
      description: 'Manage hotel information and guest-facing details.',
      icon: Building2,
      section: 'hotel',
    },
    {
      title: 'Notices',
      description: 'Create and manage announcements shown to guests.',
      icon: Bell,
      section: 'notices',
    },
    {
      title: 'Places to Visit',
      description: 'Manage Nashik recommendations and places.',
      icon: MapPin,
      section: 'places',
    },
    {
      title: 'Menu Management',
      description: 'Manage restaurants and menu information.',
      icon: UtensilsCrossed,
      section: 'menu',
    },
  ];

  return (
    <div className="admin-dashboard">

      {/* Welcome */}
      <section className="admin-welcome-card">
        <span className="admin-eyebrow">
          FOUR POINTS NASHIK
        </span>

        <h3>
          Guest Directory Administration
        </h3>

        <p>
          Manage the information, recommendations,
          notices and dining content displayed to hotel guests.
        </p>
      </section>


      {/* Statistics */}
      <section className="admin-stat-grid">

        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <Hotel size={18} />
          </div>

          <strong>Hotel</strong>

          <small>
            Hotel information and details
          </small>
        </div>


        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <MapPin size={18} />
          </div>

          <strong>Places</strong>

          <small>
            Nashik places and recommendations
          </small>
        </div>


        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <Eye size={18} />
          </div>

          <strong>Guest Directory</strong>

          <small>
            Content visible to guests
          </small>
        </div>

      </section>


      {/* Quick Management */}
      <section className="admin-dashboard-section">

        <div className="admin-dashboard-section-header">
          <div>
            <span className="admin-eyebrow">
              MANAGEMENT
            </span>

            <h3>
              Quick Management
            </h3>
          </div>
        </div>


        <div className="admin-dashboard-actions">

          {quickActions.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.section}
                type="button"
                className="admin-dashboard-action"
                onClick={() => onNavigate?.(item.section)}
              >

                <div className="admin-dashboard-action-icon">
                  <Icon size={19} />
                </div>

                <div className="admin-dashboard-action-copy">
                  <strong>
                    {item.title}
                  </strong>

                  <small>
                    {item.description}
                  </small>
                </div>

                <ArrowRight
                  size={17}
                  className="admin-dashboard-action-arrow"
                />

              </button>
            );
          })}

        </div>

      </section>


      {/* Footer information */}
      <section className="admin-info-card">

        <div className="admin-info-icon">
          <Users size={17} />
        </div>

        <div>
          <strong>
            Guest-facing content
          </strong>

          <p>
            Changes made here are reflected in the
            guest directory after saving.
          </p>
        </div>

      </section>

    </div>
  );
}