import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: '4wdchewz',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
//   token: 'skev9qRPLxHdnh3eThEOpKu4oSr2Ditjj9RB4b0jt8D9hfSurPagqgKn8X9F8rn1TQKMn9qvlTT7mYEh6fdOoRhK0OcN1Pl3CIvmdRp2kljNA5HwL9pjq9OkvAaufHeTUdwh3M5S4dJUDzIpneuKxGBY7mhiqdToG2GPUNir3h0aCLgYHTLP
// '
})

const builder = imageUrlBuilder(client)
export const urlFor = (source) => builder.image(source)