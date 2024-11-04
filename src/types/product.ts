// Image types
export interface Image {
  id: string;
  url: string;
}

// Price types
export interface Money {
  amount: string;
  currencyCode: string;
}

// Variant types
export interface ProductVariant {
  id: string;
  title: string;
  image: Image;
  price: Money;
}

export interface ProductVariantEdge {
  cursor: string;
  node: ProductVariant;
}

export interface ProductVariantConnection {
  edges: ProductVariantEdge[];
}

// Product types
export interface Product {
  id: string;
  title: string;
  description: string;
  featuredImage: Image;
  variants: ProductVariantConnection;
}

export interface ProductResponse {
  product: Product;
}
