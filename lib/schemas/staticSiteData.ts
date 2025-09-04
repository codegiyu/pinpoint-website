import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'staticSiteData',
  title: 'Static Site Data',
  type: 'document',
  preview: {
    prepare() {
      return {
        title: 'Static Site Data',
        subtitle: 'Configuration of dynamic texts around the site',
      };
    },
  },
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
    }),
    defineField({
      name: 'homepageCompanyDescription',
      title: 'Homepage Company Description',
      type: 'text',
      rows: 5,
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
    }),
  ],
  initialValue: {
    heroTitleModifiers: ['brands', 'campaigns', 'experiences', 'identities'],
    homepageCompanyDescription:
      "Build a brand people will remember with Pinpoint. \
      We help you connect, communicate, and create impact, through \
      strategy, design, content, and experiences that reflect \
      who you are. From branding to digital creativity to packaging, we craft \
      thoughtful, purpose-driven work that moves people. Let's make \
      something meaningful.",
    contactPageTitleModifiers: ['Hello', 'Sannu', 'Ndewo', 'Ẹ n lẹ', 'Msugh', 'Nǐ hǎo'],
  },
});
