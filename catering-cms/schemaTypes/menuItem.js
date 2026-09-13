export default {
  name: 'menuItem',
  title: 'Menu Item',
  type: 'document',
  fields: [
    { name: 'name', title: 'Item Name', type: 'string' },
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
    { name: 'imageUrl', title: 'Image URL (fallback)', type: 'url' },
    { name: 'category', title: 'Category', type: 'string' },
    { name: 'packageType', title: 'Package Type', type: 'string' },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'isVeg', title: 'Is Vegetarian?', type: 'boolean' },
  ],
}