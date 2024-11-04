import { decodeShopifyGid } from "@/lib/utils";
import { gql, request } from "graphql-request";
import ProductDetails from "./product-details";
import { Product, ProductResponse } from "@/types/product";

async function getProduct(id: string): Promise<Product> {
  const query = gql`
    query GetProduct($id: ID!) {
      product(id: $id) {
        id
        title
        description
        featuredImage {
          id
          url
        }
        variants(first: 3) {
          edges {
            cursor
            node {
              id
              title
              image {
                url
              }
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  const variables = {
    id: decodeShopifyGid(id),
  };

  const data = await request<ProductResponse>(
    "https://mock.shop/api",
    query,
    variables,
  );

  return data.product;
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const product = await getProduct(params.id);
  return <ProductDetails product={product} />;
}
