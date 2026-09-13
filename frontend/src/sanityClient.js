import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Read-only, public client for the storefront — never add an API token here.
// A token embedded in frontend code ships to every visitor's browser.
export const client = createClient({
  projectId: '4wdchewz',
  dataset: 'production',
  useCdn: true, // fine for published, public content — faster and cheaper than hitting the API directly
  apiVersion: '2024-01-01',
})

const builder = imageUrlBuilder(client)
export const urlFor = (source) => builder.image(source)