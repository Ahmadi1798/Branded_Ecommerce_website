import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: '4oo8z2er',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2025-08-25',
  token: process.env.NEXT_SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
