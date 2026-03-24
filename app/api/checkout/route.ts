import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

const PRICE_MAP: Record<string, { name: string; amount: number }> = {
  "hipaa-training": { name: "HIPAA Compliance Training", amount: 29900 },
  "security-awareness": { name: "Security Awareness Program", amount: 19900 },
  "policies-package": { name: "Policies & Procedures Package", amount: 49900 },
  "soc2-readiness": { name: "SOC2 Readiness Course", amount: 39900 },
  "incident-response-kit": { name: "Incident Response Planning Kit", amount: 24900 },
  "gdpr-toolkit": { name: "GDPR Compliance Toolkit", amount: 34900 },
};

export async function POST(req: Request) {
  try {
    const { slug } = await req.json();
    const product = PRICE_MAP[slug];

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: product.name },
            unit_amount: product.amount,
          },
          quantity: 1,
        },
      ],
      success_url: `${siteUrl}/shop?success=true`,
      cancel_url: `${siteUrl}/shop/${slug}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
