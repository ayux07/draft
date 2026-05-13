/* ============================================================
   INDREV Data — Mock Data & Constants
   ============================================================ */

export const GENDERS = ["All", "Men", "Women", "Kids", "Unisex"];

export const CATS_BY_GENDER = {
  Men: ["Suits", "Blazers", "Shirts", "Trousers", "Outerwear", "Footwear", "Accessories"],
  Women: ["Dresses", "Tops", "Skirts", "Trousers", "Outerwear", "Footwear", "Accessories", "Bags"],
  Kids: ["Tops", "Bottoms", "Outerwear", "Footwear", "Accessories"],
  Unisex: ["Streetwear", "Outerwear", "Footwear", "Accessories", "Sportswear", "Official Merch", "Anime", "Motorsports"]
};

export const CONDITIONS = ["New", "Like New", "Excellent", "Good"];

export const CATEGORY_DIRECTORY = [
  { id: 'cat1',  name: "Sportswear",    icon: "⚽",  bio: "Performance and athleisure gear.",                    color: "#1A1A2E" },
  { id: 'cat2',  name: "Official Merch",icon: "🎸",  bio: "Tour merch and official artist drops.",               color: "#2E1A1A" },
  { id: 'cat3',  name: "Anime",         icon: "🎌",  bio: "Exclusive anime collaborations and prints.",          color: "#1A2E1A" },
  { id: 'cat4',  name: "Motorsports",   icon: "🏎️", bio: "Racing jackets and motorsport inspired fashion.",     color: "#3B1A2E" },
  { id: 'cat5',  name: "Accessories",   icon: "💍",  bio: "Jewelry, bags, and rare collectibles.",               color: "#1A2E3B" },
  { id: 'cat6',  name: "Suits",         icon: "🤵",  bio: "Tailored luxury suiting for every occasion.",         color: "#1A1A2E" },
  { id: 'cat7',  name: "Blazers",       icon: "🧥",  bio: "Sharp structured blazers from top houses.",           color: "#2E1A1A" },
  { id: 'cat8',  name: "Shirts",        icon: "👔",  bio: "Dress shirts and casual tops, curated.",              color: "#1A2E1A" },
  { id: 'cat9',  name: "Trousers",      icon: "👖",  bio: "Tailored and relaxed trousers for all.",              color: "#2E2E1A" },
  { id: 'cat10', name: "Outerwear",     icon: "🧣",  bio: "Coats, parkas, and statement outerwear.",             color: "#1A1A3B" },
  { id: 'cat11', name: "Footwear",      icon: "👟",  bio: "Rare sneakers, boots, and statement shoes.",          color: "#3B1A1A" },
  { id: 'cat12', name: "Dresses",       icon: "👗",  bio: "Evening, midi, and archival dresses.",                color: "#2E1A3B" },
  { id: 'cat13', name: "Tops",          icon: "👕",  bio: "Blouses, tees, and structured tops.",                 color: "#1A3B2E" },
  { id: 'cat14', name: "Skirts",        icon: "🩱",  bio: "Mini, midi, and statement skirts.",                   color: "#3B2E1A" },
  { id: 'cat15', name: "Bags",          icon: "👜",  bio: "Rare handbags, totes, and clutches.",                 color: "#1A2E3B" },
  { id: 'cat16', name: "Bottoms",       icon: "🩲",  bio: "Shorts, joggers and casual bottoms.",                 color: "#2E3B1A" }
];

export const INITIAL_PRODUCTS = [
  // SELLER 1 (ARCHIVE BLVD) - 5 items
  { id: 101, name: "Deconstructed Wool Blazer", price: 85000, gender: "Men", cat: "Blazers", sid: 1, cond: "Excellent", size: "M", brand: "Maison Margiela", tag: "Rare", color: "#2A2A2A" },
  { id: 102, name: "Asymmetric Silk Dress", price: 120000, gender: "Women", cat: "Dresses", sid: 1, cond: "New", size: "S", brand: "Rick Owens", tag: "Featured", color: "#111111" },
  { id: 103, name: "Oversized Canvas Parka", price: 65000, gender: "Unisex", cat: "Outerwear", sid: 1, cond: "Like New", size: "L", brand: "Yohji Yamamoto", tag: null, color: "#303830" },
  { id: 104, name: "Tabi Leather Boots", price: 75000, gender: "Women", cat: "Footwear", sid: 1, cond: "Good", size: "38", brand: "Maison Margiela", tag: "Rare", color: "#4A0000" },
  { id: 105, name: "Cropped Structured Top", price: 45000, gender: "Women", cat: "Tops", sid: 1, cond: "Excellent", size: "XS", brand: "Comme des Garçons", tag: null, color: "#1A1A1A" },

  // SELLER 2 (NVSN STUDIOS) - 5 items
  { id: 201, name: "Distressed Denim Jacket", price: 55000, gender: "Unisex", cat: "Motorsports", sid: 2, cond: "New", size: "M", brand: "Balenciaga", tag: "New", color: "#2B3A4F" },
  { id: 202, name: "Chunky Sole Sneakers", price: 82000, gender: "Unisex", cat: "Sportswear", sid: 2, cond: "Like New", size: "42", brand: "Rick Owens", tag: "Featured", color: "#1E1E1E" },
  { id: 203, name: "Graphic Print Hoodie", price: 38000, gender: "Unisex", cat: "Anime", sid: 2, cond: "Excellent", size: "XL", brand: "Vetements", tag: null, color: "#400000" },
  { id: 204, name: "Nylon Cargo Pants", price: 42000, gender: "Men", cat: "Trousers", sid: 2, cond: "Good", size: "L", brand: "Prada", tag: null, color: "#1A1F1A" },
  { id: 205, name: "Logo Beanie", price: 15000, gender: "Unisex", cat: "Accessories", sid: 2, cond: "New", size: "OS", brand: "Acne Studios", tag: null, color: "#202020" },

  // SELLER 3 (LUXE THREADS) - 5 items
  { id: 301, name: "Classic Tuxedo Suit", price: 150000, gender: "Men", cat: "Suits", sid: 3, cond: "Like New", size: "40R", brand: "Tom Ford", tag: "Featured", color: "#0A0A0A" },
  { id: 302, name: "Cashmere Turtleneck", price: 65000, gender: "Men", cat: "Shirts", sid: 3, cond: "New", size: "M", brand: "Loro Piana", tag: "New", color: "#3B332B" },
  { id: 303, name: "Leather Chelsea Boots", price: 78000, gender: "Men", cat: "Footwear", sid: 3, cond: "Excellent", size: "43", brand: "Saint Laurent", tag: null, color: "#110D0A" },
  { id: 304, name: "Tailored Wool Trousers", price: 48000, gender: "Men", cat: "Trousers", sid: 3, cond: "Like New", size: "32", brand: "Gucci", tag: null, color: "#222222" },
  { id: 305, name: "Silk Pocket Square", price: 12000, gender: "Men", cat: "Accessories", sid: 3, cond: "New", size: "OS", brand: "Hermès", tag: null, color: "#001A33" },

  // SELLER 4 (FEMME FATALE) - 5 items
  { id: 401, name: "Pleated Midi Skirt", price: 58000, gender: "Women", cat: "Skirts", sid: 4, cond: "Excellent", size: "S", brand: "Dior", tag: "Classic", color: "#1A2530" },
  { id: 402, name: "Quilted Leather Bag", price: 210000, gender: "Women", cat: "Bags", sid: 4, cond: "Like New", size: "OS", brand: "Chanel", tag: "Rare", color: "#0A050A" },
  { id: 403, name: "Silk Chiffon Blouse", price: 45000, gender: "Women", cat: "Tops", sid: 4, cond: "New", size: "M", brand: "Valentino", tag: null, color: "#3B1015" },
  { id: 404, name: "Pointed Toe Pumps", price: 68000, gender: "Women", cat: "Footwear", sid: 4, cond: "Good", size: "37", brand: "Christian Louboutin", tag: null, color: "#121212" },
  { id: 405, name: "Trench Coat", price: 145000, gender: "Women", cat: "Outerwear", sid: 4, cond: "Excellent", size: "L", brand: "Burberry", tag: "Featured", color: "#3A3022" },

  // SELLER 5 (MINI HAUTE) - 5 items
  { id: 501, name: "Logo Print T-Shirt", price: 18000, gender: "Kids", cat: "Tops", sid: 5, cond: "New", size: "6Y", brand: "Gucci Kids", tag: "New", color: "#1C2833" },
  { id: 502, name: "Denim Overalls", price: 25000, gender: "Kids", cat: "Bottoms", sid: 5, cond: "Excellent", size: "4Y", brand: "Stella McCartney", tag: null, color: "#212F3D" },
  { id: 503, name: "Puffer Jacket", price: 42000, gender: "Kids", cat: "Outerwear", sid: 5, cond: "Like New", size: "8Y", brand: "Moncler Enfant", tag: "Featured", color: "#1A0000" },
  { id: 504, name: "Velcro Sneakers", price: 22000, gender: "Kids", cat: "Footwear", sid: 5, cond: "Good", size: "28", brand: "Givenchy", tag: null, color: "#17202A" },
  { id: 505, name: "Knit Beanie", price: 8000, gender: "Kids", cat: "Accessories", sid: 5, cond: "New", size: "OS", brand: "Burberry", tag: null, color: "#332211" },

  // SELLER 6 (THE VAULT) - 5 items
  { id: 601, name: "Vintage Monogram Trunk", price: 450000, gender: "Unisex", cat: "Official Merch", sid: 6, cond: "Good", size: "OS", brand: "Louis Vuitton", tag: "Rare", color: "#2B1A0A" },
  { id: 602, name: "Oversized Shield Sunglasses", price: 32000, gender: "Unisex", cat: "Accessories", sid: 6, cond: "Excellent", size: "OS", brand: "Balenciaga", tag: null, color: "#0A0A0A" },
  { id: 603, name: "Chain Link Necklace", price: 85000, gender: "Men", cat: "Accessories", sid: 6, cond: "Like New", size: "OS", brand: "Dior Homme", tag: "Featured", color: "#1A1F24" },
  { id: 604, name: "Leather Tote Bag", price: 175000, gender: "Women", cat: "Bags", sid: 6, cond: "Excellent", size: "OS", brand: "Bottega Veneta", tag: null, color: "#112211" },
  { id: 605, name: "Silk Patterned Scarf", price: 28000, gender: "Women", cat: "Accessories", sid: 6, cond: "New", size: "OS", brand: "Hermès", tag: "New", color: "#3A0000" }
];

export const INITIAL_SELLERS = [
  { id: 1, name: "Archive Blvd", icon: "🏛️", bio: "The world's rarest archival fashion.", color: "#2A2A2A", rating: 5.0, verified: true },
  { id: 2, name: "NVSN Studios", icon: "🏢", bio: "Streetwear and motorsports collectibles.", color: "#2B3A4F", rating: 4.8, verified: true },
  { id: 3, name: "Luxe Threads", icon: "🤵", bio: "Bespoke suiting and luxury menswear.", color: "#0A0A0A", rating: 4.9, verified: true },
  { id: 4, name: "Femme Fatale", icon: "👗", bio: "High-end womenswear and couture.", color: "#1A2530", rating: 5.0, verified: true },
  { id: 5, name: "Mini Haute", icon: "👶", bio: "Designer kidswear for the next generation.", color: "#1C2833", rating: 4.7, verified: true },
  { id: 6, name: "The Vault", icon: "💎", bio: "Rare accessories and monogram classics.", color: "#2B1A0A", rating: 4.9, verified: true }
];

export const REVIEWS = [
  { id: 1, user: "Aarav K.", rating: 5, date: "10 Apr 2026", text: "Condition was pristine, exactly as pictured. Shipping was incredibly fast." },
  { id: 2, user: "Ria S.", rating: 4, date: "02 Apr 2026", text: "Love the piece! Minor delay in dispatch but the seller was very communicative." },
  { id: 3, user: "Kabir M.", rating: 5, date: "28 Mar 2026", text: "Grail piece acquired. Authentication tags were all intact." },
  { id: 4, user: "Meera D.", rating: 5, date: "15 Mar 2026", text: "Fits perfectly according to the size guide. Very happy." }
];

export const INITIAL_USERS = [
  { id: 1001, name: "Karan D.", banned: false },
  { id: 1002, name: "Aarav K.", banned: false },
  { id: 1003, name: "Ria S.", banned: false },
  { id: 1004, name: "Meera D.", banned: false }
];

export const SIZES = {
  Men: { Suits: "36-46", Shirts: "XS-XXL", Trousers: "28-40", Footwear: "39-46", Blazers: "36-46", Outerwear: "XS-XXL", Accessories: "OS" },
  Women: { Dresses: "XXS-XXL", Tops: "XXS-XXL", Skirts: "XXS-XXL", Trousers: "24-34", Outerwear: "XXS-XXL", Footwear: "35-42", Bags: "OS", Accessories: "OS" },
  Kids: { Tops: "2Y-12Y", Bottoms: "2Y-12Y", Outerwear: "2Y-12Y", Footwear: "24-34", Accessories: "OS" },
  Unisex: { Streetwear: "XS-XXL", Outerwear: "XS-XXL", Footwear: "35-46", Accessories: "OS" }
};
