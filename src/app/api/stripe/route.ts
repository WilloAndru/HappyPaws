import { NextResponse } from "next/server";
import Stripe from "stripe";

export const stripe = new Stripe(String(process.env.STRIPE_SECRET_KEY));

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items, mode } = body;

    console.log("Request body:", body); // <--- Log del body completo

    if (!items || !Array.isArray(items) || items.length === 0) {
      console.warn("Cart is empty");
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] =
      items.map((item: any) => ({
        quantity: item.quantity,
        price_data: {
          currency: "usd",
          unit_amount: Math.round(item.price * 100),
          product_data: {
            name: item.name,
            images: [item.imageUrl],
          },
        },
      }));

    const successUrl = process.env.NEXT_PUBLIC_APP_URL
      ? `${process.env.NEXT_PUBLIC_APP_URL}/success`
      : "";
    const cancelUrl = process.env.NEXT_PUBLIC_APP_URL
      ? `${process.env.NEXT_PUBLIC_APP_URL}/checkout`
      : "";

    console.log("Success URL:", successUrl); // <--- Log de URLs
    console.log("Cancel URL:", cancelUrl);

    if (!successUrl.startsWith("http") || !cancelUrl.startsWith("http")) {
      console.error("Invalid URL detected!");
      return NextResponse.json(
        { error: "Invalid success or cancel URL" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: { mode },
    });

    console.log("Stripe session created:", session.id); // <--- Log del ID de sesión

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe error full:", error); // <--- Log completo del error

    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
