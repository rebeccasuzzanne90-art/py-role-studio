"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, ShoppingCart } from "lucide-react";
import { useParams } from "next/navigation";

import { PRODUCTS } from "@/lib/products";

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [loading, setLoading] = useState(false);
  const product = PRODUCTS[slug];

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Product Not Found</h1>
        <Link href="/shop" className="mt-4 inline-block text-primary">
          Back to Shop
        </Link>
      </div>
    );
  }

  async function handleCheckout() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {
      setLoading(false);
    }
  }

  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/shop"
          className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Shop
        </Link>

        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Badge variant="secondary" className="mb-4">
              Course
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {product.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            <h2 className="mb-4 mt-10 text-xl font-bold">What&apos;s Included</h2>
            <ul className="space-y-3">
              {product.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <p className="text-3xl font-bold">${product.price}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  One-time payment
                </p>
                <Button
                  className="mt-6 w-full gap-2"
                  size="lg"
                  onClick={handleCheckout}
                  disabled={loading}
                >
                  <ShoppingCart className="h-4 w-4" />
                  {loading ? "Processing..." : "Purchase Now"}
                </Button>
                <p className="mt-4 text-center text-xs text-muted-foreground">
                  Secure checkout powered by Stripe
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
