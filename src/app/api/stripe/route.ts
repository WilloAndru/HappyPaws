import { NextResponse } from "next/server";
import Stripe from "stripe";

export const stripe = new Stripe(String(process.env.STRIPE_SECRET_KEY));

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items, mode } = body;

    // Validación mínima
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Construir line_items para Stripe
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] =
      items.map((item: any) => ({
        quantity: item.quantity,
        price_data: {
          currency: "usd",
          unit_amount: Math.round(item.price * 100), // dólares a centavos
          product_data: {
            name: item.name,
            images: [item.imageUrl],
          },
        },
      }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout`,
      metadata: {
        mode,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe error:", error.message);

    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
