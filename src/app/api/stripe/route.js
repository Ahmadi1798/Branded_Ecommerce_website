import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

import { stripe } from '../../../../lib/stripe';

export async function POST(req) {
  try {
    const { cartItems } = await req.json();
    const headersList = await headers();
    const origin = headersList.get('origin');

    const params = {
      submit_type: 'pay',
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      shipping_options: [
        { shipping_rate: 'shr_1SF6dmRR57ePahZcZhuSYGpg' },
        { shipping_rate: 'shr_1SF6fuRR57ePahZcFsH5QJyt' },
      ],
      line_items: cartItems.map((item) => {
        const img = item.image[0].asset._ref;
        const newImage = img
          .replace(
            'image-',
            'https://cdn.sanity.io/images/4oo8z2er/production/'
          )
          .replace('-webp', '.webp');

        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.name,
              images: [newImage],
            },
            unit_amount: item.price * 100,
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item.quantity,
        };
      }),
      mode: 'payment',
      success_url: `${origin}/success`,
      cancel_url: `${origin}/?canceled=true`,
    };

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create(params);

    return NextResponse.json({ url: session.url });
  } catch (err) {
    // It's useful to log the error for debugging purposes
    console.error(err);
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    );
  }
}
