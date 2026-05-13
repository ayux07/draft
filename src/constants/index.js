/* ============================================================
   INDREV — Design Tokens & Constants
   ============================================================ */

export const C = {
  // Backgrounds
  bg: "#F5F0E8",      // Warm off-white / aged paper
  surface: "#FFFEF9", // Card surface
  dark: "#0D0D0D",    // Near-black

  // Primary accent
  yellow: "#FFE500",  // Bold yellow
  yellowDk: "#E5CE00", 

  // Secondary accents
  red: "#FF3131", 
  blue: "#1A1AFF", 
  green: "#00C853", 

  // Text
  ink: "#0D0D0D", 
  muted: "#555555", 
  mutedLo: "#999999", 

  // Borders & shadows
  border: "#0D0D0D", 
  shadow: "#0D0D0D", 
};

export const GENDERS = ["All", "Men", "Women", "Kids", "Unisex"];

export const CATS_BY_GENDER = {
  Men: ["Suits", "Blazers", "Shirts", "Trousers", "Outerwear", "Footwear", "Accessories"],
  Women: ["Dresses", "Tops", "Skirts", "Trousers", "Outerwear", "Footwear", "Accessories", "Bags"],
  Kids: ["Tops", "Bottoms", "Outerwear", "Footwear", "Accessories"],
  Unisex: ["Streetwear", "Outerwear", "Footwear", "Accessories", "Sportswear", "Official Merch", "Anime", "Motorsports"]
};

export const CONDITIONS = ["New", "Like New", "Excellent", "Good"];

export const TAG_COLORS = {
  New: C.green,
  Rare: C.blue,
  Featured: C.yellow,
  Classic: C.red
};

export const SIZES = {
  Men: { Suits: "36-46", Shirts: "XS-XXL", Trousers: "28-40", Footwear: "39-46", Blazers: "36-46", Outerwear: "XS-XXL", Accessories: "OS" },
  Women: { Dresses: "XXS-XXL", Tops: "XXS-XXL", Skirts: "XXS-XXL", Trousers: "24-34", Outerwear: "XXS-XXL", Footwear: "35-42", Bags: "OS", Accessories: "OS" },
  Kids: { Tops: "2Y-12Y", Bottoms: "2Y-12Y", Outerwear: "2Y-12Y", Footwear: "24-34", Accessories: "OS" },
  Unisex: { Streetwear: "XS-XXL", Outerwear: "XS-XXL", Footwear: "35-46", Accessories: "OS" }
};
