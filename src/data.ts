import { HeatMapData, Product, YearData } from "./lib/types";

export const OrderGraphData: YearData = {
  "2022": {
    months: [
      { month: "Jan", online: 320, offline: 110, total: 430 },
      { month: "Feb", online: 380, offline: 120, total: 500 },
      { month: "Mar", online: 400, offline: 200, total: 600 },
      { month: "Apr", online: 450, offline: 180, total: 630 },
      { month: "May", online: 500, offline: 200, total: 700 },
      { month: "Jun", online: 380, offline: 220, total: 600 },
      { month: "Jul", online: 350, offline: 150, total: 500 },
      { month: "Aug", online: 450, offline: 300, total: 750 },
      { month: "Sep", online: 500, offline: 200, total: 700 },
      { month: "Oct", online: 600, offline: 400, total: 1000 },
      { month: "Nov", online: 550, offline: 350, total: 900 },
      { month: "Dec", online: 600, offline: 400, total: 1000 },
    ],
    weeks: {
      Jan: [
        { month: "Week 1", online: 80, offline: 30, total: 110 },
        { month: "Week 2", online: 75, offline: 25, total: 100 },
        { month: "Week 3", online: 85, offline: 25, total: 110 },
        { month: "Week 4", online: 80, offline: 30, total: 110 },
      ],
      // Other months would follow the same pattern
    },
    days: {
      "Jan-Week1": [
        { month: "Mon", online: 12, offline: 5, total: 17 },
        { month: "Tue", online: 11, offline: 4, total: 15 },
        { month: "Wed", online: 13, offline: 4, total: 17 },
        { month: "Thu", online: 14, offline: 6, total: 20 },
        { month: "Fri", online: 15, offline: 5, total: 20 },
        { month: "Sat", online: 8, offline: 3, total: 11 },
        { month: "Sun", online: 7, offline: 3, total: 10 },
      ],
    },
  },
  "2023": {
    months: [
      { month: "Jan", online: 400, offline: 130, total: 530 },
      { month: "Feb", online: 420, offline: 140, total: 560 },
      { month: "Mar", online: 550, offline: 250, total: 800 },
      { month: "Apr", online: 580, offline: 170, total: 750 },
      { month: "May", online: 600, offline: 250, total: 850 },
      { month: "Jun", online: 400, offline: 250, total: 650 },
      { month: "Jul", online: 380, offline: 170, total: 550 },
      { month: "Aug", online: 500, offline: 350, total: 850 },
      { month: "Sep", online: 550, offline: 220, total: 770 },
      { month: "Oct", online: 650, offline: 450, total: 1100 },
      { month: "Nov", online: 630, offline: 420, total: 1050 },
      { month: "Dec", online: 650, offline: 450, total: 1100 },
    ],
    weeks: {
      Jan: [
        { month: "Week 1", online: 95, offline: 35, total: 130 },
        { month: "Week 2", online: 98, offline: 32, total: 130 },
        { month: "Week 3", online: 102, offline: 30, total: 132 },
        { month: "Week 4", online: 105, offline: 33, total: 138 },
      ],
      // Other months would follow the same pattern
    },
    days: {
      "Jan-Week1": [
        { month: "Mon", online: 14, offline: 5, total: 19 },
        { month: "Tue", online: 13, offline: 6, total: 19 },
        { month: "Wed", online: 15, offline: 5, total: 20 },
        { month: "Thu", online: 16, offline: 6, total: 22 },
        { month: "Fri", online: 17, offline: 5, total: 22 },
        { month: "Sat", online: 10, offline: 4, total: 14 },
        { month: "Sun", online: 10, offline: 4, total: 14 },
      ],
    },
  },
  "2024": {
    months: [
      { month: "Jan", online: 450, offline: 150, total: 600 },
      { month: "Feb", online: 450, offline: 150, total: 600 },
      { month: "Mar", online: 650, offline: 350, total: 1000 },
      { month: "Apr", online: 650, offline: 200, total: 850 },
      { month: "May", online: 700, offline: 300, total: 1000 },
      { month: "Jun", online: 420, offline: 280, total: 700 },
      { month: "Jul", online: 400, offline: 200, total: 600 },
      { month: "Aug", online: 550, offline: 400, total: 950 },
      { month: "Sep", online: 600, offline: 250, total: 850 },
      { month: "Oct", online: 700, offline: 500, total: 1200 },
      { month: "Nov", online: 700, offline: 500, total: 1200 },
      { month: "Dec", online: 700, offline: 500, total: 1200 },
    ],
    weeks: {
      Jan: [
        { month: "Week 1", online: 110, offline: 40, total: 150 },
        { month: "Week 2", online: 115, offline: 35, total: 150 },
        { month: "Week 3", online: 112, offline: 38, total: 150 },
        { month: "Week 4", online: 113, offline: 37, total: 150 },
      ],
      Feb: [
        { month: "Week 1", online: 112, offline: 38, total: 150 },
        { month: "Week 2", online: 110, offline: 40, total: 150 },
        { month: "Week 3", online: 115, offline: 35, total: 150 },
        { month: "Week 4", online: 113, offline: 37, total: 150 },
      ],
      Mar: [
        { month: "Week 1", online: 160, offline: 90, total: 250 },
        { month: "Week 2", online: 165, offline: 85, total: 250 },
        { month: "Week 3", online: 162, offline: 88, total: 250 },
        { month: "Week 4", online: 163, offline: 87, total: 250 },
      ],
      // Additional months would be added in a real application
    },
    days: {
      "Jan-Week1": [
        { month: "Mon", online: 16, offline: 6, total: 22 },
        { month: "Tue", online: 15, offline: 5, total: 20 },
        { month: "Wed", online: 17, offline: 7, total: 24 },
        { month: "Thu", online: 18, offline: 6, total: 24 },
        { month: "Fri", online: 19, offline: 7, total: 26 },
        { month: "Sat", online: 13, offline: 5, total: 18 },
        { month: "Sun", online: 12, offline: 4, total: 16 },
      ],
      "Jan-Week2": [
        { month: "Mon", online: 17, offline: 5, total: 22 },
        { month: "Tue", online: 16, offline: 6, total: 22 },
        { month: "Wed", online: 18, offline: 5, total: 23 },
        { month: "Thu", online: 17, offline: 5, total: 22 },
        { month: "Fri", online: 20, offline: 6, total: 26 },
        { month: "Sat", online: 14, offline: 4, total: 18 },
        { month: "Sun", online: 13, offline: 4, total: 17 },
      ],
      "Feb-Week1": [
        { month: "Mon", online: 16, offline: 6, total: 22 },
        { month: "Tue", online: 15, offline: 5, total: 20 },
        { month: "Wed", online: 17, offline: 5, total: 22 },
        { month: "Thu", online: 18, offline: 6, total: 24 },
        { month: "Fri", online: 19, offline: 7, total: 26 },
        { month: "Sat", online: 14, offline: 5, total: 19 },
        { month: "Sun", online: 13, offline: 4, total: 17 },
      ],
      "Mar-Week1": [
        { month: "Mon", online: 23, offline: 13, total: 36 },
        { month: "Tue", online: 22, offline: 12, total: 34 },
        { month: "Wed", online: 24, offline: 14, total: 38 },
        { month: "Thu", online: 25, offline: 13, total: 38 },
        { month: "Fri", online: 26, offline: 15, total: 41 },
        { month: "Sat", online: 20, offline: 12, total: 32 },
        { month: "Sun", online: 20, offline: 11, total: 31 },
      ],
      // Additional weeks would be added in a real application
    },
  },
};

export const heatMapData: HeatMapData = {
  weekly: {
    labels: ["2PM", "3PM", "4PM", "5PM", "6PM", "7PM"],
    subLabels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    cells: [
      // Format: { index: hourIndex, subIndex: dayIndex, orders: count }
      { index: 0, subIndex: 0, orders: 10 },
      { index: 0, subIndex: 1, orders: 25 },
      { index: 0, subIndex: 2, orders: 5 },
      { index: 0, subIndex: 3, orders: 25 },
      { index: 0, subIndex: 4, orders: 15 },
      { index: 0, subIndex: 5, orders: 10 },
      { index: 0, subIndex: 6, orders: 10 },

      { index: 1, subIndex: 0, orders: 5 },
      { index: 1, subIndex: 1, orders: 97 },
      { index: 1, subIndex: 2, orders: 5 },
      { index: 1, subIndex: 3, orders: 5 },
      { index: 1, subIndex: 4, orders: 45 },
      { index: 1, subIndex: 5, orders: 10 },
      { index: 1, subIndex: 6, orders: 5 },

      { index: 2, subIndex: 0, orders: 15 },
      { index: 2, subIndex: 1, orders: 5 },
      { index: 2, subIndex: 2, orders: 5 },
      { index: 2, subIndex: 3, orders: 10 },
      { index: 2, subIndex: 4, orders: 25 },
      { index: 2, subIndex: 5, orders: 10 },
      { index: 2, subIndex: 6, orders: 10 },

      { index: 3, subIndex: 0, orders: 35 },
      { index: 3, subIndex: 1, orders: 35 },
      { index: 3, subIndex: 2, orders: 5 },
      { index: 3, subIndex: 3, orders: 35 },
      { index: 3, subIndex: 4, orders: 45 },
      { index: 3, subIndex: 5, orders: 35 },
      { index: 3, subIndex: 6, orders: 15 },

      { index: 4, subIndex: 0, orders: 25 },
      { index: 4, subIndex: 1, orders: 25 },
      { index: 4, subIndex: 2, orders: 5 },
      { index: 4, subIndex: 3, orders: 25 },
      { index: 4, subIndex: 4, orders: 45 },
      { index: 4, subIndex: 5, orders: 25 },
      { index: 4, subIndex: 6, orders: 25 },

      { index: 5, subIndex: 0, orders: 25 },
      { index: 5, subIndex: 1, orders: 25 },
      { index: 5, subIndex: 2, orders: 5 },
      { index: 5, subIndex: 3, orders: 25 },
      { index: 5, subIndex: 4, orders: 35 },
      { index: 5, subIndex: 5, orders: 25 },
      { index: 5, subIndex: 6, orders: 25 },
    ],
  },
  monthly: {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    subLabels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    cells: [
      // Just example data
      { index: 0, subIndex: 0, orders: 120 },
      { index: 0, subIndex: 1, orders: 85 },
      { index: 0, subIndex: 2, orders: 95 },
      { index: 0, subIndex: 3, orders: 75 },
      { index: 0, subIndex: 4, orders: 105 },
      { index: 0, subIndex: 5, orders: 110 },
      { index: 0, subIndex: 6, orders: 90 },
      { index: 0, subIndex: 7, orders: 100 },
      { index: 0, subIndex: 8, orders: 80 },
      { index: 0, subIndex: 9, orders: 115 },
      { index: 0, subIndex: 10, orders: 125 },
      { index: 0, subIndex: 11, orders: 145 },

      { index: 1, subIndex: 0, orders: 140 },
      { index: 1, subIndex: 1, orders: 155 },
      { index: 1, subIndex: 2, orders: 95 },
      { index: 1, subIndex: 3, orders: 115 },
      { index: 1, subIndex: 4, orders: 125 },
      { index: 1, subIndex: 5, orders: 130 },
      { index: 1, subIndex: 6, orders: 110 },
      { index: 1, subIndex: 7, orders: 120 },
      { index: 1, subIndex: 8, orders: 90 },
      { index: 1, subIndex: 9, orders: 135 },
      { index: 1, subIndex: 10, orders: 145 },
      { index: 1, subIndex: 11, orders: 165 },

      { index: 2, subIndex: 0, orders: 130 },
      { index: 2, subIndex: 1, orders: 125 },
      { index: 2, subIndex: 2, orders: 85 },
      { index: 2, subIndex: 3, orders: 105 },
      { index: 2, subIndex: 4, orders: 115 },
      { index: 2, subIndex: 5, orders: 120 },
      { index: 2, subIndex: 6, orders: 100 },
      { index: 2, subIndex: 7, orders: 110 },
      { index: 2, subIndex: 8, orders: 80 },
      { index: 2, subIndex: 9, orders: 125 },
      { index: 2, subIndex: 10, orders: 135 },
      { index: 2, subIndex: 11, orders: 155 },

      { index: 3, subIndex: 0, orders: 150 },
      { index: 3, subIndex: 1, orders: 145 },
      { index: 3, subIndex: 2, orders: 105 },
      { index: 3, subIndex: 3, orders: 125 },
      { index: 3, subIndex: 4, orders: 135 },
      { index: 3, subIndex: 5, orders: 140 },
      { index: 3, subIndex: 6, orders: 120 },
      { index: 3, subIndex: 7, orders: 130 },
      { index: 3, subIndex: 8, orders: 100 },
      { index: 3, subIndex: 9, orders: 145 },
      { index: 3, subIndex: 10, orders: 155 },
      { index: 3, subIndex: 11, orders: 175 },
    ],
  },
  yearly: {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    subLabels: ["2019", "2020", "2021", "2022", "2023", "2024"],
    cells: [
      // Just example data
      { index: 0, subIndex: 0, orders: 350 },
      { index: 0, subIndex: 1, orders: 380 },
      { index: 0, subIndex: 2, orders: 420 },
      { index: 0, subIndex: 3, orders: 450 },
      { index: 0, subIndex: 4, orders: 480 },
      { index: 0, subIndex: 5, orders: 520 },

      { index: 1, subIndex: 0, orders: 370 },
      { index: 1, subIndex: 1, orders: 400 },
      { index: 1, subIndex: 2, orders: 440 },
      { index: 1, subIndex: 3, orders: 470 },
      { index: 1, subIndex: 4, orders: 500 },
      { index: 1, subIndex: 5, orders: 540 },

      { index: 2, subIndex: 0, orders: 360 },
      { index: 2, subIndex: 1, orders: 390 },
      { index: 2, subIndex: 2, orders: 430 },
      { index: 2, subIndex: 3, orders: 460 },
      { index: 2, subIndex: 4, orders: 490 },
      { index: 2, subIndex: 5, orders: 530 },

      { index: 3, subIndex: 0, orders: 390 },
      { index: 3, subIndex: 1, orders: 420 },
      { index: 3, subIndex: 2, orders: 460 },
      { index: 3, subIndex: 3, orders: 490 },
      { index: 3, subIndex: 4, orders: 520 },
      { index: 3, subIndex: 5, orders: 560 },
    ],
  },
};

export const allProducts: Product[] = [
  {
    id: "#237864",
    name: "Apple iPhone 15 Pro Max 256GB Natural Titanium",
    sales: { year: 32, month: 12, week: 3 },
    price: 1199.9,
    earning: { year: 38396.8, month: 14398.8, week: 3599.7 },
    image: "📱",
    category: "Smartphone",
    status: "Active",
    stock: 50,
    rating: 4.5,
  },
  {
    id: "#574908",
    name: "Apple Pencil 2",
    sales: { year: 24, month: 8, week: 2 },
    price: 199.9,
    earning: { year: 4797.6, month: 1599.2, week: 399.8 },
    image: "✏️",
    category: "Accessories",
    status: "Active",
    stock: 50,
    rating: 4.5,
  },
  {
    id: "#007234",
    name: "Apple Watch Series 7 GPS 45mm Aluminium case",
    sales: { year: 23, month: 7, week: 2 },
    price: 799.9,
    earning: { year: 18397.7, month: 5599.3, week: 1599.8 },
    image: "⌚",
    category: "Wearables",
    status: "Active",
    stock: 50,
    rating: 4.5,
  },
  {
    id: "#123456",
    name: "Samsung Galaxy S24 Ultra 512GB Titanium Black",
    sales: { year: 28, month: 10, week: 3 },
    price: 1099.9,
    earning: { year: 30797.2, month: 10999.0, week: 3299.7 },
    image: "📱",
    category: "Smartphone",
    status: "Active",
    stock: 50,
    rating: 4.5,
  },
  {
    id: "#789012",
    name: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
    sales: { year: 19, month: 6, week: 1 },
    price: 349.9,
    earning: { year: 6648.1, month: 2099.4, week: 349.9 },
    image: "🎧",
    category: "Audio",
    status: "Active",
    stock: 50,
    rating: 4.5,
  },
  {
    id: "#345678",
    name: "MacBook Pro 14-inch M3 Pro 1TB SSD",
    sales: { year: 15, month: 5, week: 1 },
    price: 2499.9,
    earning: { year: 37498.5, month: 12499.5, week: 2499.9 },
    image: "💻",
    category: "Computer",
    status: "Active",
    stock: 50,
    rating: 4.5,
  },
  {
    id: "#901234",
    name: "iPad Air 5th Generation 256GB Wi-Fi",
    sales: { year: 17, month: 6, week: 1 },
    price: 749.9,
    earning: { year: 12748.3, month: 4499.4, week: 749.9 },
    image: "📱",
    category: "Tablet",
    status: "Active",
    stock: 50,
    rating: 4.5,
  },
  {
    id: "#567890",
    name: "Nintendo Switch OLED Model",
    sales: { year: 20, month: 8, week: 2 },
    price: 349.9,
    earning: { year: 6998.0, month: 2799.2, week: 699.8 },
    image: "🎮",
    category: "Gaming",
    status: "Active",
    stock: 50,
    rating: 4.5,
  },
  {
    id: "#112233",
    name: "Bose QuietComfort Ultra Headphones",
    sales: { year: 16, month: 5, week: 1 },
    price: 429.9,
    earning: { year: 6878.4, month: 2149.5, week: 429.9 },
    image: "🎧",
    category: "Audio",
    status: "Active",
    stock: 50,
    rating: 4.5,
  },
  {
    id: "#445566",
    name: "Canon EOS R6 Mark II Mirrorless Camera",
    sales: { year: 8, month: 3, week: 1 },
    price: 2499.9,
    earning: { year: 19999.2, month: 7499.7, week: 2499.9 },
    image: "📷",
    category: "Camera",
    status: "Active",
    stock: 50,
    rating: 4.5,
  },
  {
    id: "#778899",
    name: "DJI Mini 3 Pro Drone",
    sales: { year: 12, month: 4, week: 1 },
    price: 899.9,
    earning: { year: 10798.8, month: 3599.6, week: 899.9 },
    image: "🚁",
    category: "Drone",
    status: "Active",
    stock: 50,
    rating: 4.5,
  },
  {
    id: "#001122",
    name: "Samsung 65-inch QN90B Neo QLED 4K Smart TV",
    sales: { year: 10, month: 3, week: 1 },
    price: 1999.9,
    earning: { year: 19999.0, month: 5999.7, week: 1999.9 },
    image: "📺",
    category: "TV",
    status: "Active",
    stock: 50,
    rating: 4.5,
  },
];
