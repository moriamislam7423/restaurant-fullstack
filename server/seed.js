const mongoose = require("mongoose");
require("dotenv").config();

const MenuItem = require("./models/MenuItem");

const menuItems = [
  {
    name: "Classic Hotdog",
    category: "Hotdog",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1612392061787-2d078b3b0f3b?auto=format&fit=crop&w=800&q=80",
    description: "Fresh classic hotdog with simple toppings.",
  },
  {
    name: "Cheeseburger",
    category: "Burger",
    price: 7.99,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80",
    description: "Juicy cheeseburger served fresh.",
  },
  {
    name: "Fries",
    category: "Side",
    price: 3.49,
    image: "https://images.unsplash.com/photo-1518013431117-eb1465fa5752?auto=format&fit=crop&w=800&q=80",
    description: "Crispy golden fries.",
  },
  {
    name: "Milkshake",
    category: "Drink",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
    description: "Cold and sweet milkshake.",
  },
  {
    name: "Chili Cheese Dog",
    category: "Hotdog",
    price: 6.49,
    image: "https://images.unsplash.com/photo-1550317138-10000687a72b?auto=format&fit=crop&w=800&q=80",
    description: "Hotdog with chili and cheese.",
  },
  {
    name: "Combo Deal",
    category: "Combo",
    price: 10.99,
    image: "https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=800&q=80",
    description: "A full meal combo deal.",
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await MenuItem.deleteMany();
    await MenuItem.insertMany(menuItems);
    console.log("Menu items added to MongoDB");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedDatabase();