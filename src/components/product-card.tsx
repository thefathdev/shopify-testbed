import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { encodeShopifyGid } from "@/lib/utils";

interface Product {
  id: string;
  title: string;
  description: string;
  featuredImage: {
    id: string;
    url: string;
  };
  variants: {
    edges: {
      node: {
        price: {
          amount: string;
          currencyCode: string;
        };
      };
    }[];
  };
}

export function ProductCard({ product }: { product: Product }) {
  const price = product.variants.edges[0]?.node.price;

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="p-0">
        <div className="aspect-square relative overflow-hidden">
          <img
            src={product.featuredImage.url}
            alt={product.title}
            width={400}
            height={400}
            className="object-cover w-full h-full transition-transform duration-300 ease-in-out hover:scale-105"
            loading="lazy"
            decoding="async"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg font-semibold line-clamp-1">
          {product.title}
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
          {product.description}
        </p>
        <p className="text-lg font-bold mt-4">
          {price
            ? `${price.amount} ${price.currencyCode}`
            : "Price not available"}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 mt-auto gap-2">
        <Button className="w-full">Add to Cart</Button>
        <Button className="w-full" variant={"secondary"} asChild>
          <Link href={"/products/" + encodeShopifyGid(product.id)}>
            Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
