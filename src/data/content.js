export const staff = {
  id: 'aditya-patil',
  name: 'Aditya Patil',
  welcome: 'Hi, Aditya Patil here. How can I help you?',
  phone: '',
  whatsapp: '',
};

const item = (name, price, description = '') => ({ name, price, description });
const category = (id, name, items) => ({ id, name, items });

export const restaurants = [
  {
    id: 'ird',
    name: 'IRD',
    subtitle: 'In-Room Dining',
    description: 'Breakfast, all-day dining and in-room favourites.',
    pdf: '/menus/ird-menu.pdf',
    categories: [
      category('breakfast-local', 'Breakfast — Local', [
        item('Dhapate', '₹395', 'Jowar | Gram Flour | Wheat | Sweet Yogurt | Garlic Chutney'),
        item('Ghavane', '₹395', 'Rice Flour | Mint, Coconut & Peanut Chutney'),
        item('Thalipeeth', '₹395', 'Rice Flour | Cucumber | White Butter'),
        item('Dahi Missal Pav', '₹395', 'Sprouted Lentil Curry | Farsan | Baked Bread'),
        item('Tari Masala Poha', '₹395', 'Flattened Rice | Spicy Gravy'),
        item('Thalipeeth', '₹395', 'Multigrain Flatbread | White Butter | Thecha'),
        item('Sabudana Wada', '₹395', 'Tapioca Pearls Patty | Sweet Yogurt'),
        item('Divshi', '₹445', 'Rice Flour | Egg Bhurji | Mint, Coconut & Peanut Chutney'),
      ]),
      category('breakfast-indian', 'Breakfast — Indian Classic', [
        item('Upma', '₹395', 'Savory Semolina'),
        item('Puri Bhaji', '₹395', 'Fried Whole Wheat Bread | Curried Mix Potato'),
        item('Stuffed Paratha', '₹395', 'Stuffed Whole Wheat Bread | Pickle | Yogurt | Choice of Potato, Cauliflower or Cottage Cheese'),
      ]),
      category('south-indian', 'South Indian Breakfast', [
        item('Idli', '₹395', 'Steamed Rice Dumpling | Sambar | Coconut Chutney | Tomato Chutney'),
        item('Uttapam', '₹395', 'Fermented Rice Pancake | Sambar | Coconut Chutney | Tomato Chutney'),
        item('Medu Vada', '₹395', 'Fried Savory Indian Doughnut | Sambar | Coconut Chutney | Tomato Chutney'),
      ]),
      category('eggs', 'Eggs', [
        item('Poached / Scrambled / Boiled / Sunny Side Up / Over Easy', '₹445', 'Choice of Chicken Sausage or Bacon | Hash Brown Potato | Mushrooms'),
        item('Plain / Masala / Egg White Omelette', '₹445', 'Choice of Chicken Sausage or Bacon | Hash Brown Potato | Mushrooms'),
        item('Signature Nashik Eggs Benedict', '₹495', 'Poached Eggs | Buttered Pav | Thecha Hollandaise'),
      ]),
      category('waffle-pancake', 'Waffle & Pancake', [
        item('Guava & Honey Pancake', '₹395', 'Whipped Cream | Guava | Honey'),
        item('Native Strawberry Waffles', '₹395', 'Whipped Cream | Maple Syrup | Strawberry Compote'),
      ]),
      category('cereals', 'Cereals', [
        item('Corn Flakes / Muesli Flakes / Rice Bubbles / Choco Pops / Sugar Frosties / Honey Puff', '₹245', 'Choice of Whole Milk, Skimmed Milk or Soy Milk'),
        item('Oatmeal Porridge', '₹245', 'Choice of Whole Milk, Skimmed Milk or Soy Milk'),
        item('Bircher Muesli', '₹245', 'Oatmeal | Yogurt | Nuts | Honey | Apple'),
      ]),
      category('fruit-yogurt', 'Fruit & Yogurt', [
        item('Plain Yogurt', '₹225'),
        item('Flavored Yogurt', '₹245', 'Choice of Mango, Blueberry or Strawberry'),
        item('Fresh Fruit Platter', '₹445', 'Seasonal'),
      ]),
      category('bakery', "From the Baker's Oven — Three Pieces", [
        item('Breads', '₹225', 'Multigrain | Real Sunflower Seed | Gluten Free'),
        item('Croissant', '₹325', 'Butter | Multigrain'),
        item('Danish Pastry', '₹325', 'Cinnamon Rolls | Strawberry Pinwheel | Pain au Chocolat'),
        item('Muffins', '₹325', 'Chocolate | Vanilla'),
      ]),
      category('sides', 'Sides', [
        item('Chicken Sausages', '₹325'),
        item('Pork Streaky Bacon', '₹325'),
        item('Hash Brown Potato', '₹245'),
        item('Sautéed Mushroom', '₹245'),
      ]),
      category('juices-smoothies', 'Fresh Juices & Vitalizing Smoothies', [
        item('Recharge Remedy', '₹395', 'Locally Sourced Pineapple | Apple | Greek Yogurt | Coconut Water'),
        item('Morning Infusion', '₹395', 'Berry | Banana | Chia Seeds | Walnut | Cinnamon'),
        item('Antioxidant Mix', '₹395', 'Valencia Orange | Carrot | Pomegranate | Beetroot | Ginger | Lemon'),
        item('Detox Blend', '₹395', 'Cucumber | Apple | Spinach | Avocado | Lemon'),
        item('Fat Burning', '₹395', 'Pineapple | Spinach | Celery | Mint | Green Tea | Lemon'),
        item('Diabetic Therapy', '₹395', 'Cucumber | Tomato | Bitter Gourd'),
      ]),
      category('fresh-juice', 'Freshly Squeezed Juice', [
        item('Watermelon', '₹375'), item('Pineapple', '₹375'), item('Orange', '₹375'),
        item('Carrot', '₹375'), item('Cucumber Mint', '₹375'), item('ABC', '₹375', 'Apple | Beetroot | Carrot'),
      ]),
      category('all-day-soups', 'All Day Menu — Soups', [
        item('Tamatar Dhaniya Shorba', '₹445', 'Countryside Tomato | Garlic Croute'),
        item('Truffle Mushroom Cappuccino', '₹525', 'Mushroom | Truffle Oil | Cream | Garlic Croute'),
        item('Hot & Sour Soup', '₹475 / ₹495 / ₹545', 'Choice of Vegetable / Chicken / Prawns'),
        item('Paya Shorba', '₹525', 'Slow Cooked Lamb Trotters | Organic Turmeric'),
      ]),
      category('all-day-salads', 'All Day Menu — Salads', [
        item('Fresh Garden Salad', '₹345', 'Garden | Raw & Pickled Nashik Vegetables | Lettuce | Goat Cheese | Seasonal Fruits | Grape Vinaigrette'),
        item('Classic Caesar Salad', '₹595 / ₹595 / ₹595', 'Choice of Grilled Paprika Prawns / Grilled Chicken / Silken Tofu'),
      ]),
      category('local-main', 'All Day Menu — Local', [
        item('Bharleli Wangi', '₹595', 'Stuffed Brinjal | Peanut | Coconut'),
        item('Methi Shengadana', '₹595', 'Fresh Fenugreek | Peanut'),
        item('Surmai Cha Kalvan', '₹985', 'Kingfish Steak Curry | Freshly Ground Local Masala | Coconut Milk'),
        item('Kombdi Jeere Mire', '₹775', 'Chicken | Hand Pounded Cumin | Fresh Roasted Coconut'),
        item('Chulivarcha Mutton', '₹875', '24 Hours Charcoal Cooked Lamb | Black Masala'),
        item('Phodnicha Varan', '₹375', 'Moong Dal | Clarified Butter'),
      ]),
      category('indian-main', 'All Day Menu — Indian', [
        item('Pudina Paneer Tikka', '₹595', 'Cottage Cheese | Yogurt | Cream | Mint'),
        item('Tandoori Mushroom', '₹595', 'Cured Olives & Bell Pepper Stuffed Button Mushrooms | Processed Cheese'),
        item('Kasundi Malai Broccoli', '₹595', 'Broccoli Florets | Mustard | Cheese'),
        item('Dahi ke Sholey', '₹595', 'Hung Curd | Bell Peppers'),
        item('Sunehari Prawns', '₹875', 'Arabian Sea Prawns | Citronella | Yogurt'),
        item('Sankeshwari Chicken Tikka', '₹675', 'Chicken Morsels | Sankeshwari Chili | Yogurt | Cream'),
        item('Tandoori Chicken', '₹775', 'Spring Chicken | Red Chili | Yogurt | Fenugreek'),
        item('Mutton Pepper Fry', '₹775', 'Lamb | Black Pepper | Curry Leaves | Clarified Butter'),
      ]),
      category('indian-mains', 'Indian — Main Course', [
        item('Paneer Tikka Masala', '₹725', 'Cottage Cheese | Yogurt | Dried Fenugreek'),
        item('Bhoona Lasooni Palak', '₹725', 'Organic Fresh Spinach | Garlic'),
        item('Bharwan Aloo', '₹725', 'Fig | Potato'),
        item('Subz Miloni', '₹725', 'Assorted Vegetables | Organic Fresh Spinach'),
        item('Subz Kadai', '₹725', 'Assorted Vegetables | Indian Coarse Spices'),
        item('Goan Curry', '₹995', 'Classic Goan Masala | Coconut Milk | Choice of Prawns or Kingfish'),
        item('Butter Chicken', '₹775', 'Chicken | Dried Fenugreek | Cream'),
        item('Chicken Rara', '₹775', 'Chicken | Boiled Egg'),
      ]),
      category('asian', 'Asian', [
        item('Crispy Fried Lotus Stem', '₹595', 'Crispy Lotus Stem | Soy Honey Sauce'),
        item('Sweet Pepper Paneer Chilli', '₹595', 'Cottage Cheese | Bell Peppers | Onion | Soy Sauce'),
        item('Prawns Hot Basil', '₹775', 'Prawn | Basil | Hot Chili Sauce'),
        item('Korean Fried Chicken', '₹645', 'Korean Chili Spice'),
        item('Mapo Tofu', '₹695', 'Silken Tofu | Chili | Black Bean Sauce'),
        item('Stir Fry Asian Greens', '₹695', 'Carrot | Bok Choy | Beans | Baby Corn | Mushroom'),
        item('Sliced Fish with Chili Bean Sauce', '₹875', 'Fish | Chili Bean Sauce | Spring Onion'),
        item('Kung Pao Chicken', '₹775', 'Chicken | Red Chilli | Cashew Nuts'),
      ]),
      category('coffee-tea', 'Hot Beverages', [
        item('Classic Italian Coffee', 'See menu PDF', 'Espresso, Doppio, Americano, Macchiato, Cortado, Cappuccino, Café Latte, Flat White, Café Mocha'),
        item('Classic Indian Coffee', '₹259', 'South Indian Filter Coffee'),
        item('Hot Chocolate', '₹259', 'Classic Hot Chocolate | Mint Hot Chocolate'),
      ]),
    ],
  },
  {
    id: 'intermezzo', name: 'Intermezzo', subtitle: 'Food & Beverages', description: 'Food, drinks, coffee, tea and more.', pdf: '/menus/intermezzo-menu.pdf',
    categories: [
      category('signatures', 'Signatures', [item('Homemade Pretzels', '₹275', 'Thecha Aioli | Served with Herb Butter & Mustard Aioli'), item('Korean Fried Chicken', '₹499', 'Chicken tossed in Korean Spices')]),
      category('local-favorites', 'Local Favorites', [item('Vada Pav', '₹399', 'Classic | Inverse | Brioche Pesto'), item('Bun Maska', '₹199', 'Warm homemade Pav with Butter'), item('Kanda Bhaji', '₹399', 'Crispy Onion Fritters with Mint Chutney'), item('Jain Samosa', '₹399', 'Raw Banana filling with Tamarind & Mint Chutney')]),
      category('light-bites', 'Light Bites', [item('Make Your Own Pasta', '₹499', 'Penne | Spaghetti | Fusilli • Arrabbiata | Aglio Olio | Cream Sauce • Chicken add-on ₹75++'), item('Pizza Focacciana', '₹399', 'Italian flatbread with Garlic, Rosemary & Chili'), item('Pizza Verdure', '₹549', 'Mozzarella, Broccoli, Olives, Bell Peppers'), item('Pizza Chicken Tikka', '₹399', 'Chicken Tikka, Red Onion, Mozzarella'), item('Cheesy Nachos', '₹499', 'Nachos, Cheese Sauce, Jalapeños, Olives, Salsa'), item('Potato Cheese Shots', '₹399', 'Cheddar, Herbs, Fried Potato, Tartare Sauce'), item('French Fries', '₹325', 'Peri Peri | Cheesy | Classic')]),
      category('sandwiches', 'Wraps, Sandwiches & Burgers', [item('Falafel Cheese Wrap', '₹399', 'Falafel, Cheddar, Tortilla, Hummus, Potato Chips'), item('Mumbai Toasties', '₹399', 'Masala Potato, Beetroot, Cheese, Potato Chips'), item('Pesto Veg Focaccia Sandwich', '₹449', 'Pesto, Grilled Vegetables, Focaccia, Potato Chips'), item('Chicken Tikka Sandwich', '₹499', 'Chicken Tikka, Red Onion, Mozzarella'), item('Paprika Dusted Fish Fingers', '₹499', 'Salmon, Mustard, Herbs, Tartare Sauce'), item('Big Bird Chicken Burger', '₹599', 'Crumb-Fried Chicken, Jalapeño, Cheese, Fried Egg, Fries'), item('Veggie Cheesy Burger', '₹549', 'Veg Patty, Cheddar, Caramelized Onions, Fries')]),
      category('desserts', 'Desserts', [item('Desserts from our Pastry Shop', '₹150'), item('Ice Cream Selection', '₹299', 'Vanilla | Chocolate | Coffee | Butterscotch')]),
      category('non-alcoholic', 'Non-Alcoholic Cocktails', [item('Nirvana', '₹349', 'Guava saccharum | Lime | Soda'), item('No Story', '₹349', 'Kaffir lime | Vanilla syrup | Fresh orange juice'), item('Cocoa Butter', '₹349', 'Peanut butter | Cacao syrup | Cherry syrup | Lime'), item('Your Favorite', '₹349', 'Ask the bartender for your choice')]),
      category('soft-drinks', 'Soft Drinks', [item('Pepsi', '₹199'), item('Diet Pepsi', '₹199'), item('7UP', '₹199'), item('Soda Water', '₹199'), item('Ginger Ale', '₹249'), item('Tonic Water', '₹249')]),
      category('energy', 'Energy Drinks', [item('Red Bull', '₹299')]),
      category('boba', 'Boba Teas', [item('Classic', '₹349'), item('Matcha Taro', '₹399'), item('Taro', '₹399')]),
      category('iced-tea', 'Iced Tea & Brews', [item('Classic Lemon Iced Tea', '₹349'), item('Peach Brew', '₹349'), item('Wild Berry Ice Brew', '₹349')]),
      category('water', 'Mineral Water', [item('Still Water (750 ml)', '₹199'), item('Sparkling Water (330 ml)', '₹299')]),
      category('juices', 'Freshly Squeezed Juices', [item('Watermelon', '₹325'), item('Pineapple', '₹325'), item('Orange', '₹325'), item('Carrot', '₹325'), item('Cucumber Mint', '₹325'), item('ABC', '₹325', 'Apple | Beetroot | Carrot')]),
      category('tea', 'Tea', [item('Assam Tea', '₹299'), item('Darjeeling Tea', '₹299'), item('Chamomile Tea', '₹299'), item('Peppermint Tea', '₹299'), item('Kashmiri Kahwa', '₹299'), item('Green Lavender Rose Mint Tea', '₹299'), item('Rooibos Orange & Cinnamon Tea', '₹299'), item('Jasmine Tea', '₹299'), item('English Breakfast Tea', '₹299'), item('Earl Grey Tea', '₹299'), item('Masala Tea', '₹299'), item('Green Tea', '₹299')]),
      category('coffee', 'Classic Italian Coffee', [item('Espresso', '₹245'), item('Doppio', '₹245'), item('Americano', '₹259'), item('Macchiato', '₹259'), item('Cortado', '₹259'), item('Cappuccino', '₹259'), item('Café Latte', '₹259'), item('Flat White', '₹259'), item('Café Mocha', '₹259')]),
      category('indian-coffee', 'Classic Indian Coffee', [item('South Indian Filter Coffee', '₹259')]),
      category('hot-chocolate', 'Hot Chocolate', [item('Classic Hot Chocolate', '₹259'), item('Mint Hot Chocolate', '₹259', 'Marshmallow | Chocoflakes | Cinnamon')]),
    ],
  },
  {
    id: 'arbor-kitchen', name: 'Arbor Kitchen', subtitle: 'Restaurant Menu', description: 'Menu content will be added once the Arbor Kitchen source menu is provided.', pdf: null, categories: [],
  },
];

// Future admin-ready entities. Keep these in the data layer so the guest UI does not need restructuring later.
export const hotelInformation = [];
export const cityPlaces = [];

export const adminSchema = {
  restaurants: ['id', 'name', 'subtitle', 'description', 'image', 'is_active', 'display_order'],
  menu_categories: ['id', 'restaurant_id', 'name', 'description', 'display_order', 'is_active'],
  menu_items: ['id', 'category_id', 'name', 'description', 'price', 'image', 'is_vegetarian', 'is_available', 'display_order'],
  staff: ['id', 'name', 'designation', 'phone', 'whatsapp', 'photo', 'welcome_message', 'is_active'],
  qr_codes: ['id', 'staff_id', 'slug', 'is_active'],
  hotel_information: ['id', 'type', 'title', 'description', 'image', 'timings', 'is_active', 'display_order'],
  city_places: ['id', 'name', 'description', 'image', 'address', 'maps_url', 'timings', 'is_active', 'display_order'],
};
