"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Product, ProductVariant } from "@/types/product";

export default function ProductDetails({ product }: { product: Product }) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants.edges[0].node,
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <Image
              src={selectedVariant.image.url || product.featuredImage.url}
              alt={product.title}
              width={500}
              height={500}
              className="w-full h-auto object-cover"
            />
            <Carousel className="mt-4">
              <CarouselContent>
                {product.variants.edges.map(({ node }) => (
                  <CarouselItem key={node.id} className="basis-1/3">
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-2">
                          <Image
                            src={node.image.url}
                            alt={node.title}
                            width={100}
                            height={100}
                            className="rounded-md cursor-pointer"
                            onClick={() => setSelectedVariant(node)}
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
          <CardContent className="md:w-1/2 p-6">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">
                {product.title}
              </CardTitle>
              <CardDescription className="text-lg text-gray-500">
                {selectedVariant.title}
              </CardDescription>
            </CardHeader>
            <Tabs defaultValue="details" className="mt-6">
              <TabsList>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="variants">Variants</TabsTrigger>
              </TabsList>
              <TabsContent value="details">
                <p className="mt-4">{product.description}</p>
              </TabsContent>
              <TabsContent value="variants">
                <div className="mt-4 space-y-4">
                  {product.variants.edges.map(({ node }) => (
                    <Card
                      key={node.id}
                      className={
                        node.id === selectedVariant.id ? "border-primary" : ""
                      }
                    >
                      <CardContent className="flex items-center p-4">
                        <Image
                          src={node.image.url}
                          alt={node.title}
                          width={50}
                          height={50}
                          className="rounded-full mr-4"
                        />
                        <div>
                          <h3 className="font-semibold">{node.title}</h3>
                          <p className="text-sm text-gray-500">
                            {node.price.amount} {node.price.currencyCode}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
            <div className="mt-6">
              <p className="text-2xl font-bold">
                {selectedVariant.price.amount}{" "}
                {selectedVariant.price.currencyCode}
              </p>
              <Button className="mt-4 w-full">Add to Cart</Button>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
