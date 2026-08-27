import {
  UtensilsCrossed,
  Plus,
} from 'lucide-react';

export default function MenuManager() {

  return (
    <div className="admin-manager">

      <div className="admin-manager-toolbar">

        <div>

          <span className="admin-eyebrow">
            FOOD &amp; BEVERAGE
          </span>

          <h3>
            Menu Management
          </h3>

          <p>
            Manage restaurants, menu categories and
            individual menu items.
          </p>

        </div>

      </div>

      <div className="admin-coming-soon">

        <div className="admin-coming-icon">

          <UtensilsCrossed
            size={25}
            strokeWidth={1.6}
          />

        </div>

        <span className="admin-eyebrow">
          MENU SYSTEM
        </span>

        <h3>
          Menu management is next
        </h3>

        <p>
          The menu manager will allow you to manage
          restaurants, categories, dishes, prices,
          descriptions, food type and availability
          without editing the source code.
        </p>

        <div className="admin-coming-features">

          <span>
            <Plus size={14} />
            Restaurants
          </span>

          <span>
            <Plus size={14} />
            Categories
          </span>

          <span>
            <Plus size={14} />
            Menu items
          </span>

          <span>
            <Plus size={14} />
            Prices
          </span>

          <span>
            <Plus size={14} />
            Availability
          </span>

        </div>

      </div>

    </div>
  );
}