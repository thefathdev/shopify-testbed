import { request, gql } from "graphql-request";
import { ProductCard } from "@/components/product-card";

interface Price {
  amount: string;
  currencyCode: string;
}

interface ProductVariant {
  node: {
    price: Price;
  };
}

interface ProductImage {
  id: string;
  url: string;
}

interface Product {
  id: string;
  title: string;
  description: string;
  featuredImage: ProductImage;
  variants: {
    edges: ProductVariant[];
  };
}

interface ProductsResponse {
  products: {
    edges: {
      node: Product;
    }[];
  };
}

async function getProducts() {
  const query = gql`
    {
      products(first: 20) {
        edges {
          node {
            id
            title
            description
            featuredImage {
              id
              url
            }
            variants(first: 3) {
              edges {
                node {
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  const response = await request<ProductsResponse>(
    "https://mock.shop/api",
    query,
  );
  return response.products.edges.map((edge) => edge.node);
}

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main>
        <h1 className="text-3xl font-bold mb-8 text-center">Our Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}
