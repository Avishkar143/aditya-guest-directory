export const staff = {
  id: 'aditya-patil',
  name: 'Aditya Patil',
  welcome: 'Hi, Aditya Patil here. How can I help you?',
  phone: '',
  whatsapp: '',
};

// Food type:
// veg      = Vegetarian
// non-veg  = Non-Vegetarian
// mixed    = Vegetarian + Non-Vegetarian options

const item = (
  name,
  price,
  description = '',
  type = 'veg'
) => ({
  name,
  price,
  description,
  type,
});

const category = (id, name, items) => ({
  id,
  name,
  items,
});

export const restaurants = [
  // =========================================================
  // IRD
  // =========================================================
  {
    id: 'ird',
    name: 'IRD',
    subtitle: 'In-Room Dining',
    description: 'Breakfast, all-day dining and in-room favourites.',
    pdf: '/menus/ird-menu.pdf',

    categories: [
      category('breakfast-local', 'Breakfast — Local', [
        item(
          'Dhapate',
          '₹395',
          'Jowar | Gram Flour | Wheat | Sweet Yogurt | Garlic Chutney',
          'veg'
        ),
        item(
          'Ghavane',
          '₹395',
          'Rice Flour | Mint, Coconut & Peanut Chutney',
          'veg'
        ),
        item(
          'Thalipeeth',
          '₹395',
          'Rice Flour | Cucumber | White Butter',
          'veg'
        ),
        item(
          'Dahi Missal Pav',
          '₹395',
          'Sprouted Lentil Curry | Farsan | Baked Bread',
          'veg'
        ),
        item(
          'Tari Masala Poha',
          '₹395',
          'Flattened Rice | Spicy Gravy',
          'veg'
        ),
        item(
          'Thalipeeth',
          '₹395',
          'Multigrain Flatbread | White Butter | Thecha',
          'veg'
        ),
        item(
          'Sabudana Wada',
          '₹395',
          'Tapioca Pearls Patty | Sweet Yogurt',
          'veg'
        ),
        item(
          'Divshi',
          '₹445',
          'Rice Flour | Egg Bhurji | Mint, Coconut & Peanut Chutney',
          'non-veg'
        ),
      ]),

      category('breakfast-indian', 'Breakfast — Indian Classic', [
        item('Upma', '₹395', 'Savory Semolina', 'veg'),
        item(
          'Puri Bhaji',
          '₹395',
          'Fried Whole Wheat Bread | Curried Mix Potato',
          'veg'
        ),
        item(
          'Stuffed Paratha',
          '₹395',
          'Stuffed Whole Wheat Bread | Pickle | Yogurt | Choice of Potato, Cauliflower or Cottage Cheese',
          'veg'
        ),
      ]),

      category('south-indian', 'South Indian Breakfast', [
        item(
          'Idli',
          '₹395',
          'Steamed Rice Dumpling | Sambar | Coconut Chutney | Tomato Chutney',
          'veg'
        ),
        item(
          'Uttapam',
          '₹395',
          'Fermented Rice Pancake | Sambar | Coconut Chutney | Tomato Chutney',
          'veg'
        ),
        item(
          'Medu Vada',
          '₹395',
          'Fried Savory Indian Doughnut | Sambar | Coconut Chutney | Tomato Chutney',
          'veg'
        ),
      ]),

      category('eggs', 'Eggs', [
        item(
          'Poached / Scrambled / Boiled / Sunny Side Up / Over Easy',
          '₹445',
          'Choice of Chicken Sausage or Bacon | Hash Brown Potato | Mushrooms',
          'non-veg'
        ),
        item(
          'Plain / Masala / Egg White Omelette',
          '₹445',
          'Choice of Chicken Sausage or Bacon | Hash Brown Potato | Mushrooms',
          'non-veg'
        ),
        item(
          'Signature Nashik Eggs Benedict',
          '₹495',
          'Poached Eggs | Buttered Pav | Thecha Hollandaise',
          'non-veg'
        ),
      ]),

      category('waffle-pancake', 'Waffle & Pancake', [
        item(
          'Guava & Honey Pancake',
          '₹395',
          'Whipped Cream | Guava | Honey',
          'veg'
        ),
        item(
          'Native Strawberry Waffles',
          '₹395',
          'Whipped Cream | Maple Syrup | Strawberry Compote',
          'veg'
        ),
      ]),

      category('cereals', 'Cereals', [
        item(
          'Corn Flakes / Muesli Flakes / Rice Bubbles / Choco Pops / Sugar Frosties / Honey Puff',
          '₹245',
          'Choice of Whole Milk, Skimmed Milk or Soy Milk',
          'veg'
        ),
        item(
          'Oatmeal Porridge',
          '₹245',
          'Choice of Whole Milk, Skimmed Milk or Soy Milk',
          'veg'
        ),
        item(
          'Bircher Muesli',
          '₹245',
          'Oatmeal | Yogurt | Nuts | Honey | Apple',
          'veg'
        ),
      ]),

      category('fruit-yogurt', 'Fruit & Yogurt', [
        item('Plain Yogurt', '₹225', '', 'veg'),
        item(
          'Flavored Yogurt',
          '₹245',
          'Choice of Mango, Blueberry or Strawberry',
          'veg'
        ),
        item('Fresh Fruit Platter', '₹445', 'Seasonal', 'veg'),
      ]),

      category('bakery', "From the Baker's Oven — Three Pieces", [
        item(
          'Breads',
          '₹225',
          'Multigrain | Real Sunflower Seed | Gluten Free',
          'veg'
        ),
        item(
          'Croissant',
          '₹325',
          'Butter | Multigrain',
          'veg'
        ),
        item(
          'Danish Pastry',
          '₹325',
          'Cinnamon Rolls | Strawberry Pinwheel | Pain au Chocolat',
          'veg'
        ),
        item(
          'Muffins',
          '₹325',
          'Chocolate | Vanilla',
          'veg'
        ),
      ]),

      category('sides', 'Sides', [
        item('Chicken Sausages', '₹325', '', 'non-veg'),
        item('Pork Streaky Bacon', '₹325', '', 'non-veg'),
        item('Hash Brown Potato', '₹245', '', 'veg'),
        item('Sautéed Mushroom', '₹245', '', 'veg'),
      ]),

      category(
        'juices-smoothies',
        'Fresh Juices & Vitalizing Smoothies',
        [
          item(
            'Recharge Remedy',
            '₹395',
            'Locally Sourced Pineapple | Apple | Greek Yogurt | Coconut Water',
            'veg'
          ),
          item(
            'Morning Infusion',
            '₹395',
            'Berry | Banana | Chia Seeds | Walnut | Cinnamon',
            'veg'
          ),
          item(
            'Antioxidant Mix',
            '₹395',
            'Valencia Orange | Carrot | Pomegranate | Beetroot | Ginger | Lemon',
            'veg'
          ),
          item(
            'Detox Blend',
            '₹395',
            'Cucumber | Apple | Spinach | Avocado | Lemon',
            'veg'
          ),
          item(
            'Fat Burning',
            '₹395',
            'Pineapple | Spinach | Celery | Mint | Green Tea | Lemon',
            'veg'
          ),
          item(
            'Diabetic Therapy',
            '₹395',
            'Cucumber | Tomato | Bitter Gourd',
            'veg'
          ),
        ]
      ),

      category('fresh-juice', 'Freshly Squeezed Juice', [
        item('Watermelon', '₹375', '', 'veg'),
        item('Pineapple', '₹375', '', 'veg'),
        item('Orange', '₹375', '', 'veg'),
        item('Carrot', '₹375', '', 'veg'),
        item('Cucumber Mint', '₹375', '', 'veg'),
        item(
          'ABC',
          '₹375',
          'Apple | Beetroot | Carrot',
          'veg'
        ),
      ]),

      category('all-day-soups', 'All Day Menu — Soups', [
        item(
          'Tamatar Dhaniya Shorba',
          '₹445',
          'Countryside Tomato | Garlic Croute',
          'veg'
        ),
        item(
          'Truffle Mushroom Cappuccino',
          '₹525',
          'Mushroom | Truffle Oil | Cream | Garlic Croute',
          'veg'
        ),
        item(
          'Hot & Sour Soup',
          '₹475 / ₹495 / ₹545',
          'Choice of Vegetable / Chicken / Prawns',
          'mixed'
        ),
        item(
          'Paya Shorba',
          '₹525',
          'Slow Cooked Lamb Trotters | Organic Turmeric',
          'non-veg'
        ),
      ]),

      category('all-day-salads', 'All Day Menu — Salads', [
        item(
          'Fresh Garden Salad',
          '₹345',
          'Garden | Raw & Pickled Nashik Vegetables | Lettuce | Goat Cheese | Seasonal Fruits | Grape Vinaigrette',
          'veg'
        ),
        item(
          'Classic Caesar Salad',
          '₹595 / ₹595 / ₹595',
          'Choice of Grilled Paprika Prawns / Grilled Chicken / Silken Tofu',
          'mixed'
        ),
      ]),

      category('local-main', 'All Day Menu — Local', [
        item(
          'Bharleli Wangi',
          '₹595',
          'Stuffed Brinjal | Peanut | Coconut',
          'veg'
        ),
        item(
          'Methi Shengadana',
          '₹595',
          'Fresh Fenugreek | Peanut',
          'veg'
        ),
        item(
          'Surmai Cha Kalvan',
          '₹985',
          'Kingfish Steak Curry | Freshly Ground Local Masala | Coconut Milk',
          'non-veg'
        ),
        item(
          'Kombdi Jeere Mire',
          '₹775',
          'Chicken | Hand Pounded Cumin | Fresh Roasted Coconut',
          'non-veg'
        ),
        item(
          'Chulivarcha Mutton',
          '₹875',
          '24 Hours Charcoal Cooked Lamb | Black Masala',
          'non-veg'
        ),
        item(
          'Phodnicha Varan',
          '₹375',
          'Moong Dal | Clarified Butter',
          'veg'
        ),
      ]),

      category('indian-main', 'All Day Menu — Indian', [
        item(
          'Pudina Paneer Tikka',
          '₹595',
          'Cottage Cheese | Yogurt | Cream | Mint',
          'veg'
        ),
        item(
          'Tandoori Mushroom',
          '₹595',
          'Cured Olives & Bell Pepper Stuffed Button Mushrooms | Processed Cheese',
          'veg'
        ),
        item(
          'Kasundi Malai Broccoli',
          '₹595',
          'Broccoli Florets | Mustard | Cheese',
          'veg'
        ),
        item(
          'Dahi ke Sholey',
          '₹595',
          'Hung Curd | Bell Peppers',
          'veg'
        ),
        item(
          'Sunehari Prawns',
          '₹875',
          'Arabian Sea Prawns | Citronella | Yogurt',
          'non-veg'
        ),
        item(
          'Sankeshwari Chicken Tikka',
          '₹675',
          'Chicken Morsels | Sankeshwari Chili | Yogurt | Cream',
          'non-veg'
        ),
        item(
          'Tandoori Chicken',
          '₹775',
          'Spring Chicken | Red Chili | Yogurt | Fenugreek',
          'non-veg'
        ),
        item(
          'Mutton Pepper Fry',
          '₹775',
          'Lamb | Black Pepper | Curry Leaves | Clarified Butter',
          'non-veg'
        ),
      ]),

      category('indian-mains', 'Indian — Main Course', [
        item(
          'Paneer Tikka Masala',
          '₹725',
          'Cottage Cheese | Yogurt | Dried Fenugreek',
          'veg'
        ),
        item(
          'Bhoona Lasooni Palak',
          '₹725',
          'Organic Fresh Spinach | Garlic',
          'veg'
        ),
        item(
          'Bharwan Aloo',
          '₹725',
          'Fig | Potato',
          'veg'
        ),
        item(
          'Subz Miloni',
          '₹725',
          'Assorted Vegetables | Organic Fresh Spinach',
          'veg'
        ),
        item(
          'Subz Kadai',
          '₹725',
          'Assorted Vegetables | Indian Coarse Spices',
          'veg'
        ),
        item(
          'Goan Curry',
          '₹995',
          'Classic Goan Masala | Coconut Milk | Choice of Prawns or Kingfish',
          'non-veg'
        ),
        item(
          'Butter Chicken',
          '₹775',
          'Chicken | Dried Fenugreek | Cream',
          'non-veg'
        ),
        item(
          'Chicken Rara',
          '₹775',
          'Chicken | Boiled Egg',
          'non-veg'
        ),
      ]),

      category('asian', 'Asian', [
        item(
          'Crispy Fried Lotus Stem',
          '₹595',
          'Crispy Lotus Stem | Soy Honey Sauce',
          'veg'
        ),
        item(
          'Sweet Pepper Paneer Chilli',
          '₹595',
          'Cottage Cheese | Bell Peppers | Onion | Soy Sauce',
          'veg'
        ),
        item(
          'Prawns Hot Basil',
          '₹775',
          'Prawn | Basil | Hot Chili Sauce',
          'non-veg'
        ),
        item(
          'Korean Fried Chicken',
          '₹645',
          'Korean Chili Spice',
          'non-veg'
        ),
        item(
          'Mapo Tofu',
          '₹695',
          'Silken Tofu | Chili | Black Bean Sauce',
          'veg'
        ),
        item(
          'Stir Fry Asian Greens',
          '₹695',
          'Carrot | Bok Choy | Beans | Baby Corn | Mushroom',
          'veg'
        ),
        item(
          'Sliced Fish with Chili Bean Sauce',
          '₹875',
          'Fish | Chili Bean Sauce | Spring Onion',
          'non-veg'
        ),
        item(
          'Kung Pao Chicken',
          '₹775',
          'Chicken | Red Chilli | Cashew Nuts',
          'non-veg'
        ),
      ]),

      category('coffee-tea', 'Hot Beverages', [
        item(
          'Classic Italian Coffee',
          'See menu PDF',
          'Espresso, Doppio, Americano, Macchiato, Cortado, Cappuccino, Café Latte, Flat White, Café Mocha',
          'veg'
        ),
        item(
          'Classic Indian Coffee',
          '₹259',
          'South Indian Filter Coffee',
          'veg'
        ),
        item(
          'Hot Chocolate',
          '₹259',
          'Classic Hot Chocolate | Mint Hot Chocolate',
          'veg'
        ),
      ]),
    ],
  },

  // =========================================================
  // INTERMEZZO
  // =========================================================
  {
    id: 'intermezzo',
    name: 'Intermezzo',
    subtitle: 'Food & Beverages',
    description: 'Food, drinks, coffee, tea and more.',
    pdf: '/menus/intermezzo-menu.pdf',

    categories: [
      category('signatures', 'Signatures', [
        item(
          'Homemade Pretzels',
          '₹275',
          'Thecha Aioli | Served with Herb Butter & Mustard Aioli',
          'veg'
        ),
        item(
          'Korean Fried Chicken',
          '₹499',
          'Chicken tossed in Korean Spices',
          'non-veg'
        ),
      ]),

      category('local-favorites', 'Local Favorites', [
        item(
          'Vada Pav',
          '₹399',
          'Classic | Inverse | Brioche Pesto',
          'veg'
        ),
        item(
          'Bun Maska',
          '₹199',
          'Warm homemade Pav with Butter',
          'veg'
        ),
        item(
          'Kanda Bhaji',
          '₹399',
          'Crispy Onion Fritters with Mint Chutney',
          'veg'
        ),
        item(
          'Jain Samosa',
          '₹399',
          'Raw Banana filling with Tamarind & Mint Chutney',
          'veg'
        ),
      ]),

      category('light-bites', 'Light Bites', [
        item(
          'Make Your Own Pasta',
          '₹499',
          'Penne | Spaghetti | Fusilli • Arrabbiata | Aglio Olio | Cream Sauce • Chicken add-on ₹75++',
          'mixed'
        ),
        item(
          'Pizza Focacciana',
          '₹399',
          'Italian flatbread with Garlic, Rosemary & Chili',
          'veg'
        ),
        item(
          'Pizza Verdure',
          '₹549',
          'Mozzarella, Broccoli, Olives, Bell Peppers',
          'veg'
        ),
        item(
          'Pizza Chicken Tikka',
          '₹399',
          'Chicken Tikka, Red Onion, Mozzarella',
          'non-veg'
        ),
        item(
          'Cheesy Nachos',
          '₹499',
          'Nachos, Cheese Sauce, Jalapeños, Olives, Salsa',
          'veg'
        ),
        item(
          'Potato Cheese Shots',
          '₹399',
          'Cheddar, Herbs, Fried Potato, Tartare Sauce',
          'veg'
        ),
        item(
          'French Fries',
          '₹325',
          'Peri Peri | Cheesy | Classic',
          'veg'
        ),
      ]),

      category('sandwiches', 'Wraps, Sandwiches & Burgers', [
        item(
          'Falafel Cheese Wrap',
          '₹399',
          'Falafel, Cheddar, Tortilla, Hummus, Potato Chips',
          'veg'
        ),
        item(
          'Mumbai Toasties',
          '₹399',
          'Masala Potato, Beetroot, Cheese, Potato Chips',
          'veg'
        ),
        item(
          'Pesto Veg Focaccia Sandwich',
          '₹449',
          'Pesto, Grilled Vegetables, Focaccia, Potato Chips',
          'veg'
        ),
        item(
          'Chicken Tikka Sandwich',
          '₹499',
          'Chicken Tikka, Red Onion, Mozzarella',
          'non-veg'
        ),
        item(
          'Paprika Dusted Fish Fingers',
          '₹499',
          'Salmon, Mustard, Herbs, Tartare Sauce',
          'non-veg'
        ),
        item(
          'Big Bird Chicken Burger',
          '₹599',
          'Crumb-Fried Chicken, Jalapeño, Cheese, Fried Egg, Fries',
          'non-veg'
        ),
        item(
          'Veggie Cheesy Burger',
          '₹549',
          'Veg Patty, Cheddar, Caramelized Onions, Fries',
          'veg'
        ),
      ]),

      category('desserts', 'Desserts', [
        item(
          'Desserts from our Pastry Shop',
          '₹150',
          '',
          'veg'
        ),
        item(
          'Ice Cream Selection',
          '₹299',
          'Vanilla | Chocolate | Coffee | Butterscotch',
          'veg'
        ),
      ]),

      category('non-alcoholic', 'Non-Alcoholic Cocktails', [
        item(
          'Nirvana',
          '₹349',
          'Guava saccharum | Lime | Soda',
          'veg'
        ),
        item(
          'No Story',
          '₹349',
          'Kaffir lime | Vanilla syrup | Fresh orange juice',
          'veg'
        ),
        item(
          'Cocoa Butter',
          '₹349',
          'Peanut butter | Cacao syrup | Cherry syrup | Lime',
          'veg'
        ),
        item(
          'Your Favorite',
          '₹349',
          'Ask the bartender for your choice',
          'veg'
        ),
      ]),

      category('soft-drinks', 'Soft Drinks', [
        item('Pepsi', '₹199', '', 'veg'),
        item('Diet Pepsi', '₹199', '', 'veg'),
        item('7UP', '₹199', '', 'veg'),
        item('Soda Water', '₹199', '', 'veg'),
        item('Ginger Ale', '₹249', '', 'veg'),
        item('Tonic Water', '₹249', '', 'veg'),
      ]),

      category('energy', 'Energy Drinks', [
        item('Red Bull', '₹299', '', 'veg'),
      ]),

      category('boba', 'Boba Teas', [
        item('Classic', '₹349', '', 'veg'),
        item('Matcha Taro', '₹399', '', 'veg'),
        item('Taro', '₹399', '', 'veg'),
      ]),

      category('iced-tea', 'Iced Tea & Brews', [
        item('Classic Lemon Iced Tea', '₹349', '', 'veg'),
        item('Peach Brew', '₹349', '', 'veg'),
        item('Wild Berry Ice Brew', '₹349', '', 'veg'),
      ]),

      category('water', 'Mineral Water', [
        item('Still Water (750 ml)', '₹199', '', 'veg'),
        item('Sparkling Water (330 ml)', '₹299', '', 'veg'),
      ]),

      category('juices', 'Freshly Squeezed Juices', [
        item('Watermelon', '₹325', '', 'veg'),
        item('Pineapple', '₹325', '', 'veg'),
        item('Orange', '₹325', '', 'veg'),
        item('Carrot', '₹325', '', 'veg'),
        item('Cucumber Mint', '₹325', '', 'veg'),
        item(
          'ABC',
          '₹325',
          'Apple | Beetroot | Carrot',
          'veg'
        ),
      ]),

      category('tea', 'Tea', [
        item('Assam Tea', '₹299', '', 'veg'),
        item('Darjeeling Tea', '₹299', '', 'veg'),
        item('Chamomile Tea', '₹299', '', 'veg'),
        item('Peppermint Tea', '₹299', '', 'veg'),
        item('Kashmiri Kahwa', '₹299', '', 'veg'),
        item('Green Lavender Rose Mint Tea', '₹299', '', 'veg'),
        item('Rooibos Orange & Cinnamon Tea', '₹299', '', 'veg'),
        item('Jasmine Tea', '₹299', '', 'veg'),
        item('English Breakfast Tea', '₹299', '', 'veg'),
        item('Earl Grey Tea', '₹299', '', 'veg'),
        item('Masala Tea', '₹299', '', 'veg'),
        item('Green Tea', '₹299', '', 'veg'),
      ]),

      category('coffee', 'Classic Italian Coffee', [
        item('Espresso', '₹245', '', 'veg'),
        item('Doppio', '₹245', '', 'veg'),
        item('Americano', '₹259', '', 'veg'),
        item('Macchiato', '₹259', '', 'veg'),
        item('Cortado', '₹259', '', 'veg'),
        item('Cappuccino', '₹259', '', 'veg'),
        item('Café Latte', '₹259', '', 'veg'),
        item('Flat White', '₹259', '', 'veg'),
        item('Café Mocha', '₹259', '', 'veg'),
      ]),

      category('indian-coffee', 'Classic Indian Coffee', [
        item(
          'South Indian Filter Coffee',
          '₹259',
          '',
          'veg'
        ),
      ]),

      category('hot-chocolate', 'Hot Chocolate', [
        item(
          'Classic Hot Chocolate',
          '₹259',
          '',
          'veg'
        ),
        item(
          'Mint Hot Chocolate',
          '₹259',
          'Marshmallow | Chocoflakes | Cinnamon',
          'veg'
        ),
      ]),
    ],
  },

  // =========================================================
  // ARBOR KITCHEN
  // =========================================================
  {
    id: 'arbor-kitchen',
    name: 'Arbor Kitchen',
    subtitle: 'All Day Dining',
    description:
      'All-day dining restaurant serving a selection of food and beverages.',
    pdf: null,
    categories: [],
  },

  // =========================================================
  // DRINKS
  // =========================================================
  {
    id: 'drinks',
    name: 'Drinks',
    subtitle: 'Beverages Menu',
    description:
      'Non-alcoholic cocktails, soft drinks, juices, tea, coffee and hot beverages.',
    pdf: '/menus/drink-menu.pdf',

    categories: [
      category('non-alcoholic', 'Non-Alcoholic Cocktails', [
        item(
          'Nirvana',
          '₹349',
          'Guava saccharum | Lime | Soda',
          'veg'
        ),
        item(
          'No Story',
          '₹349',
          'Kaffir lime | Vanilla syrup | Fresh orange juice',
          'veg'
        ),
        item(
          'Coco Butter',
          '₹349',
          'Peanut butter | Cacao syrup | Cherry syrup | Lime',
          'veg'
        ),
        item(
          'Your Favorite',
          '₹349',
          'Ask the bartender for your choice',
          'veg'
        ),
      ]),

      category('soft-drinks', 'Soft Drinks', [
        item('Pepsi', '₹199', '', 'veg'),
        item('Diet Pepsi', '₹199', '', 'veg'),
        item('7UP', '₹199', '', 'veg'),
        item('Soda Water', '₹199', '', 'veg'),
        item('Ginger Ale', '₹249', '', 'veg'),
        item('Tonic Water', '₹249', '', 'veg'),
      ]),

      category('energy', 'Energy Drinks', [
        item('Red Bull', '₹299', '', 'veg'),
      ]),

      category('boba', 'Boba Teas', [
        item('Classic', '₹349', '', 'veg'),
        item('Matcha', '₹399', '', 'veg'),
        item('Taro', '₹399', '', 'veg'),
      ]),

      category('iced-tea', 'Iced Tea & Brews', [
        item('Classic Lemon Iced Tea', '₹349', '', 'veg'),
        item('Peach Brew', '₹349', '', 'veg'),
        item('Wild Berry Ice Brew', '₹349', '', 'veg'),
      ]),

      category('water', 'Mineral Water', [
        item('Still Water (750 ml)', '₹199', '', 'veg'),
        item('Sparkling Water (330 ml)', '₹299', '', 'veg'),
      ]),

      category('fresh-lime', 'Fresh Lime Soda | Water', [
        item(
          'Fresh Lime Soda / Water',
          '₹245',
          'Sweet | Salted',
          'veg'
        ),
      ]),

      category('juices', 'Freshly Squeezed Juices', [
        item('Watermelon', '₹325', '', 'veg'),
        item('Pineapple', '₹325', '', 'veg'),
        item('Orange', '₹325', '', 'veg'),
        item('Carrot', '₹325', '', 'veg'),
        item('Cucumber Mint', '₹325', '', 'veg'),
        item(
          'ABC',
          '₹325',
          'Apple | Beetroot | Carrot',
          'veg'
        ),
      ]),

      category('loose-leaf-tea', 'Loose Leaf Tea', [
        item('Assam', '₹299', '', 'veg'),
        item('Darjeeling', '₹299', '', 'veg'),
        item('Chamomile', '₹299', '', 'veg'),
        item('Peppermint', '₹299', '', 'veg'),
        item('Kashmiri Kahwa', '₹299', '', 'veg'),
        item(
          'Green Lavender Rose Mint',
          '₹299',
          '',
          'veg'
        ),
        item(
          'Rooibos Orange & Cinnamon',
          '₹299',
          '',
          'veg'
        ),
        item('Jasmine', '₹299', '', 'veg'),
      ]),

      category('classic-tea', 'Classic Tea', [
        item('English Breakfast', '₹299', '', 'veg'),
        item('Earl Grey', '₹299', '', 'veg'),
        item('Masala Tea', '₹299', '', 'veg'),
        item('Green Tea', '₹299', '', 'veg'),
      ]),

      category('italian-coffee', 'Classic Italian Coffee', [
        item('Espresso', '₹245', '', 'veg'),
        item('Doppio', '₹245', '', 'veg'),
        item('Americano', '₹259', '', 'veg'),
        item('Macchiato', '₹259', '', 'veg'),
        item('Cortado', '₹259', '', 'veg'),
        item('Cappuccino', '₹259', '', 'veg'),
        item('Café Latte', '₹259', '', 'veg'),
        item('Flat White', '₹259', '', 'veg'),
        item('Café Mocha', '₹259', '', 'veg'),
      ]),

      category('indian-coffee', 'Classic Indian Coffee', [
        item(
          'South Indian Filter Coffee',
          '₹259',
          '',
          'veg'
        ),
      ]),

      category('hot-chocolate', 'Hot Chocolate', [
        item(
          'Classic Hot Chocolate',
          '₹259',
          '',
          'veg'
        ),
        item(
          'Mint Hot Chocolate',
          '₹259',
          '',
          'veg'
        ),
      ]),
    ],
  },
];

// =========================================================
// FUTURE ADMIN-READY ENTITIES
// =========================================================

export const hotelInformation = [];
export const cityPlaces = [];

export const adminSchema = {
  restaurants: [
    'id',
    'name',
    'subtitle',
    'description',
    'image',
    'is_active',
    'display_order',
  ],

  menu_categories: [
    'id',
    'restaurant_id',
    'name',
    'description',
    'display_order',
    'is_active',
  ],

  menu_items: [
    'id',
    'category_id',
    'name',
    'description',
    'price',
    'image',
    'is_vegetarian',
    'is_available',
    'display_order',
  ],

  staff: [
    'id',
    'name',
    'designation',
    'phone',
    'whatsapp',
    'photo',
    'welcome_message',
    'is_active',
  ],

  qr_codes: [
    'id',
    'staff_id',
    'slug',
    'is_active',
  ],

  hotel_information: [
    'id',
    'type',
    'title',
    'description',
    'image',
    'timings',
    'is_active',
    'display_order',
  ],

  city_places: [
    'id',
    'name',
    'description',
    'image',
    'address',
    'maps_url',
    'timings',
    'is_active',
    'display_order',
  ],
};