export const categories = [
  { name: "Best Sellers", icon: "https://placehold.co/100x100/FDF8F5/F5B041?text=BS" },
  { name: "Cakes", icon: "https://placehold.co/100x100/FDF8F5/F5B041?text=CK" },
  { name: "Pastries", icon: "https://placehold.co/100x100/FDF8F5/F5B041?text=PS" },
  { name: "Beverages", icon: "https://placehold.co/100x100/FDF8F5/F5B041?text=BV" }
];

export const mockProducts = [
  // CATEGORY: Cakes
  { id: 1, name: "Choco Chip Butter Cake", description: "Soft, rich, and loaded with gooey chocolate chips.", price: 900, isVeg: true, category: "Cakes", image: "/choco-chip.png", customisable: true, sizes: [{ name: "1/2 kg", price: 0, image: "/choco-chip.png" }, { name: "1kg", price: 700, image: "/choco-chip.png" }], addons: [{ name: "Gift Box", price: 300 }] },
  { id: 2, name: "Red Velvet Cake", description: "Rich cocoa cake with red hue, topped with cream cheese.", price: 1100, isVeg: false, category: "Cakes", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Red+Velvet", customisable: true, sizes: [{ name: "1/2 kg", price: 0, image: "https://placehold.co/100x100?text=0.5" }], addons: [] },
  { id: 3, name: "Pineapple Fresh Cream", description: "Light sponge cake with fresh cream and pineapple chunks.", price: 750, isVeg: true, category: "Cakes", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Pineapple+Cake", customisable: false },
  { id: 4, name: "Black Forest Gateau", description: "Classic German chocolate cake with cherries and cream.", price: 850, isVeg: true, category: "Cakes", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Black+Forest", customisable: false },
  { id: 5, name: "Truffle Chocolate Cake", description: "Dense chocolate sponge with rich dark chocolate ganache.", price: 1200, isVeg: true, category: "Cakes", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Truffle+Cake", customisable: false },
  { id: 6, name: "Mango Cheesecake", description: "Creamy baked cheesecake with a tropical mango glaze.", price: 1350, isVeg: false, category: "Cakes", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Mango+Cheese", customisable: false },
  { id: 7, name: "Vanilla Buttercream Cake", description: "Simple, elegant vanilla cake with creamy butter frosting.", price: 650, isVeg: true, category: "Cakes", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Vanilla+Cake", customisable: false },
  { id: 8, name: "Coffee Walnut Cake", description: "A delightful pairing of robust coffee and crunchy walnuts.", price: 950, isVeg: true, category: "Cakes", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Coffee+Cake", customisable: false },
  { id: 9, name: "Blueberry Lemon Cake", description: "Zesty lemon cake bursting with fresh blueberries.", price: 1050, isVeg: true, category: "Cakes", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Blueberry+Cake", customisable: false },

  // CATEGORY: Best Sellers
  { id: 10, name: "Dulce de Leche Besito", description: "A sweet kiss of caramel in a butter cookie.", price: 450, isVeg: true, category: "Best Sellers", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Besito", customisable: true, sizes: [{ name: "Box of 6", price: 0, image: "https://placehold.co/100x100?text=6" }, { name: "Box of 12", price: 400, image: "https://placehold.co/100x100?text=12" }], addons: [] },
  { id: 11, name: "Almond Biscotti", description: "Twice-baked almond cookies for dipping in coffee.", price: 350, isVeg: true, category: "Best Sellers", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Biscotti", customisable: false },
  { id: 12, name: "Chocolate Hazelnut Tart", description: "Crisp tart shell filled with gooey hazelnut praline.", price: 280, isVeg: false, category: "Best Sellers", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Hazelnut+Tart", customisable: false },
  { id: 13, name: "Signature Fudge Brownie", description: "Fudgy, dense, and packed with chocolate chunks.", price: 150, isVeg: true, category: "Best Sellers", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Fudge+Brownie", customisable: false },
  { id: 14, name: "Pistachio Macarons", description: "Delicate French almond cookies filled with pistachio ganache.", price: 400, isVeg: false, category: "Best Sellers", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Macarons", customisable: true, sizes: [{ name: "Box of 4", price: 0, image: "https://placehold.co/100x100?text=4" }], addons: [] },
  { id: 15, name: "Caramel Sea Salt Cookie", description: "Large chewy cookie with caramel bits and sea salt flakes.", price: 120, isVeg: true, category: "Best Sellers", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Caramel+Cookie", customisable: false },
  { id: 16, name: "Classic Apple Pie", description: "Traditional pie with cinnamon-spiced apples.", price: 550, isVeg: true, category: "Best Sellers", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Apple+Pie", customisable: false },
  { id: 17, name: "Strawberry Shortcake", description: "Light sponge layered with fresh strawberries and cream.", price: 300, isVeg: true, category: "Best Sellers", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Shortcake", customisable: false },
  { id: 18, name: "Chocolate Eclair", description: "Choux pastry filled with vanilla cream and chocolate glaze.", price: 180, isVeg: false, category: "Best Sellers", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Eclair", customisable: false },

  // CATEGORY: Pastries
  { id: 19, name: "Classic Butter Croissant", description: "Flaky, buttery, and baked fresh daily. A Parisian classic.", price: 180, isVeg: true, category: "Pastries", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Croissant", customisable: false },
  { id: 20, name: "Chicken Tikka Puff", description: "Spiced chicken tikka filling in a buttery puff pastry.", price: 150, isVeg: false, category: "Pastries", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Tikka+Puff", customisable: false },
  { id: 21, name: "Lemon Tart", description: "Zesty lemon curd in a crisp sweet pastry shell.", price: 220, isVeg: false, category: "Pastries", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Lemon+Tart", customisable: false },
  { id: 22, name: "Pain au Chocolat", description: "Croissant dough wrapped around rich dark chocolate batons.", price: 200, isVeg: true, category: "Pastries", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Pain+Chocolat", customisable: false },
  { id: 23, name: "Mushroom & Cheese Quiche", description: "Savory pastry filled with earthy mushrooms and Gruyère.", price: 250, isVeg: false, category: "Pastries", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Mushroom+Quiche", customisable: false },
  { id: 24, name: "Almond Croissant", description: "Twice-baked croissant with almond frangipane and flaked almonds.", price: 220, isVeg: true, category: "Pastries", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Almond+Croissant", customisable: false },
  { id: 25, name: "Spinach Feta Turnover", description: "Crisp puff pastry filled with creamy spinach and feta cheese.", price: 160, isVeg: true, category: "Pastries", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Spinach+Turnover", customisable: false },
  { id: 26, name: "Pecan Danish", description: "Sweet Danish pastry topped with caramelized pecans.", price: 190, isVeg: true, category: "Pastries", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Pecan+Danish", customisable: false },
  { id: 27, name: "Sausage Roll", description: "Seasoned meat wrapped in golden flaky pastry.", price: 180, isVeg: false, category: "Pastries", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Sausage+Roll", customisable: false },

  // CATEGORY: Beverages
  { id: 28, name: "Cold Brew Coffee", description: "Slow-steeped for 18 hours for a smooth coffee experience.", price: 250, isVeg: true, category: "Beverages", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Cold+Brew", customisable: true, sizes: [{ name: "Regular", price: 0, image: "https://placehold.co/100x100?text=Reg" }], addons: [{ name: "Oat Milk", price: 50 }] },
  { id: 29, name: "Matcha Latte", description: "Premium Japanese matcha green tea blended with steamed milk.", price: 280, isVeg: true, category: "Beverages", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Matcha", customisable: true, sizes: [{ name: "Regular", price: 0, image: "https://placehold.co/100x100?text=Reg" }], addons: [{ name: "Extra Shot", price: 60 }] },
  { id: 30, name: "Iced Caramel Macchiato", description: "Espresso combined with vanilla, milk, and caramel drizzle.", price: 260, isVeg: true, category: "Beverages", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Caramel+Macchiato", customisable: false },
  { id: 31, name: "Hot Chocolate", description: "Rich, creamy hot chocolate topped with marshmallows.", price: 200, isVeg: true, category: "Beverages", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Hot+Chocolate", customisable: false },
  { id: 32, name: "Fresh Orange Juice", description: "Freshly squeezed Valencia oranges. Pure and natural.", price: 180, isVeg: true, category: "Beverages", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Orange+Juice", customisable: false },
  { id: 33, name: "Peach Iced Tea", description: "Refreshing black tea infused with sweet peach notes.", price: 160, isVeg: true, category: "Beverages", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Peach+Tea", customisable: false },
  { id: 34, name: "Cappuccino", description: "Equal parts espresso, steamed milk, and milk foam.", price: 180, isVeg: true, category: "Beverages", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Cappuccino", customisable: false },
  { id: 35, name: "Strawberry Milkshake", description: "Thick and creamy shake made with real strawberries.", price: 240, isVeg: true, category: "Beverages", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Strawberry+Shake", customisable: false },
  { id: 36, name: "Kombucha (Berry)", description: "Probiotic fermented tea with mixed berry flavors.", price: 220, isVeg: true, category: "Beverages", image: "https://placehold.co/400x300/FDF8F5/F5B041?text=Kombucha", customisable: false }
];
