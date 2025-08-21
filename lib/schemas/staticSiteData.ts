import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'staticSiteData',
  title: 'Static Site Data',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTitleModifiers',
      title: 'Hero Title Modifiers',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'heroTitleModifier',
          type: 'string',
        }),
      ],
      initialValue: ['brands', 'campaigns', 'experiences', 'identities'],
    }),
    defineField({
      name: 'contactPageTitleModifiers',
      title: 'Contact Page Title Modifiers',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'contactPageTitleModifier',
          type: 'string',
        }),
      ],
      initialValue: ['Hello', 'Sannu', 'Ndewo', 'Ẹ n lẹ', 'Msugh', 'Nǐ hǎo'],
    }),
  ],
});
