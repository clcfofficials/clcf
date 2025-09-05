export type Product = {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
  featured?: boolean;
};

export const products: Product[] = [
  {
    id: "1",
    title: "EcoGrow All-Purpose Fertilizer",
    description: "A balanced, organic fertilizer perfect for all types of plants, vegetables, and flowers. Boosts growth and enriches soil.",
    price: "$25.99",
    image: "https://picsum.photos/seed/product1/600/400",
    featured: true,
  },
  {
    id: "2",
    title: "YieldMax Corn & Grain Enhancer",
    description: "Specially formulated for corn and grain crops to maximize yield and improve grain quality. Rich in nitrogen and potassium.",
    price: "$45.50",
    image: "https://picsum.photos/seed/product2/600/400",
    featured: true,
  },
  {
    id: "3",
    title: "BloomBurst Flower Food",
    description: "Promotes vibrant colors and prolific blooms in all flowering plants. Contains essential micronutrients for stunning results.",
    price: "$19.99",
    image: "https://picsum.photos/seed/product3/600/400",
    featured: true,
  },
  {
    id: "4",
    title: "RootRally Starter Formula",
    description: "A gentle formula designed to encourage strong root development in seedlings and new transplants.",
    price: "$22.00",
    image: "https://picsum.photos/seed/product4/600/400",
  },
  {
    id: "5",
    title: "GreenLawn Weed & Feed",
    description: "Achieve a lush, green, and weed-free lawn with our dual-action formula that feeds grass while controlling common weeds.",
    price: "$35.75",
    image: "https://picsum.photos/seed/product5/600/400",
  },
  {
    id: "6",
    title: "CitrusGro Fruit Tree Special",
    description: "Enriched with iron and zinc, this fertilizer is perfect for citrus and other fruit trees, promoting healthy growth and abundant fruit.",
    price: "$29.95",
    image: "https://picsum.photos/seed/product6/600/400",
  },
];
