'use server'

import { imageUrl } from "@/lib/imageUrl";
import { BasketItem } from "@/lib/store";
import stripe from "@/lib/stripe";

export type Metadata = {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId: string;
};


export type GroupedBasketItem = {
  product: BasketItem["product"];
  quantity: number;
};

export async function createCheckoutSession(
  items: GroupedBasketItem[],
  metadata: Metadata
) {
  try {
    // check if any grouped items dont have a price
    const itemsWithoutPrice = items.filter((item) => !item.product.price);
    if (itemsWithoutPrice.length > 0) {
        throw new Error("Some items do not have a price");
    }

    // Search for existing customer by email
    const customers = await stripe.customers.list({
        email: metadata.customerEmail,
        limit: 1,
    });

    let customerID: string | undefined;
    if (customers.data.length > 0) {
        customerID = customers.data[0].id;
    }

    const baseUrl = process.env.NODE_ENV === 'production'
    ? 'https://shopinity-smr.vercel.app'
    : `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}`;

    const successUrl = `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`;

    const cancelUrl = `${baseUrl}/basket`;

    console.log("SUCCESS URL ", successUrl);
    console.log("CANCEL URL ", cancelUrl);

    const session = await stripe.checkout.sessions.create({
    customer: customerID,
    customer_creation: customerID ? undefined : "always",
    customer_email: !customerID ? metadata.customerEmail : undefined,
    metadata,
    mode: "payment",
    allow_promotion_codes: true,
    success_url: successUrl,
    cancel_url: cancelUrl,
            line_items: items.map((item) => ({
            price_data: {
                currency: "usd", 
                unit_amount: Math.round(item.product.price! * 100),
                product_data: {
                name: item.product.name || "Unnamed Product",
                description: `Product ID: ${item.product._id}`,
                metadata: {
                    id: item.product._id,
                },
                images: item.product.image
                    ? [imageUrl(item.product.image).url()]
                    : undefined,
                },
            },
            quantity: item.quantity,
        })),
    });

    return session.url;

    } catch (error) {
    console.error("Error creating checkout session:", error);
    throw error;
    }
}