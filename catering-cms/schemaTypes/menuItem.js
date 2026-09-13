import {defineField, defineType} from 'sanity'

// Keep in sync with the category filter list in frontend/src/pages/Menu.jsx
const CATEGORIES = [
  'Welcome Drink',
  'Veg Starters',
  'Chaat',
  'Salads',
  'Veg Gravy',
  'Non-Veg Gravy',
  'Dry Items',
  'Rice',
  'Veg Rice',
  'Breads',
  'Dessert',
  'Live Counters',
  'Paan',
]

// Keep in sync with the values written by importToSanity.js
const PACKAGE_TYPES = ['All', 'Premium', 'Mannat Special']

export default defineType({
  name: 'menuItem',
  title: 'Menu Item',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Item Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'imageUrl',
      title: 'Image URL (fallback)',
      type: 'url',
      description: 'Used when no image is uploaded above.',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {list: CATEGORIES},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'packageType',
      title: 'Package Type',
      type: 'string',
      options: {list: PACKAGE_TYPES},
      initialValue: 'All',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'price',
      title: 'Price (₹ per plate)',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'isVeg',
      title: 'Is Vegetarian?',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'image',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'Untitled item',
        subtitle: subtitle || 'No category',
        media,
      }
    },
  },
})
