import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'contactData',
  title: 'Contact Data',
  type: 'document',
  preview: {
    prepare() {
      return {
        title: 'Contact Data',
        subtitle: 'Manage the contact data and social media links for Pinpoint',
      };
    },
  },
  fields: [
    defineField({
      name: 'branchLocations',
      title: 'Branch Locations',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'contactGroup',
          title: 'Contact Group',
          fields: [
            { name: 'location', title: 'Location', type: 'string' },
            { name: 'address', title: 'Address', type: 'text', rows: 3 },
            {
              name: 'tel',
              title: 'Telephone Numbers',
              type: 'array',
              of: [{ type: 'string' }],
            },
            { name: 'email', title: 'Email', type: 'string' },
          ],
          preview: {
            select: {
              location: 'location',
            },
            prepare({ location }) {
              return {
                title: `${location || 'Unnamed'} Branch`,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'socialMediaLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        { name: 'instagram', title: 'Instagram', type: 'url' },
        { name: 'facebook', title: 'Facebook', type: 'url' },
        { name: 'tiktok', title: 'TikTok', type: 'url' },
        { name: 'whatsapp', title: 'WhatsApp', type: 'url' },
        { name: 'linkedin', title: 'LinkedIn', type: 'url' },
        { name: 'twitter', title: 'X / Twitter', type: 'url' },
      ],
      preview: {
        prepare() {
          return {
            title: 'Social Media Links',
            subtitle: '',
          };
        },
      },
    }),
  ],
  initialValue: {
    branchLocations: [
      {
        location: 'Abuja',
        address: 'No. 18 Aba Close, Area 8, Garki, Abuja.',
        tel: ['+234 912 323 2389', '+234 912 323 2397'],
        email: 'abuja@pinpoint.ng',
      },
      {
        location: 'Kano',
        address: 'Shop 23 Rima House, Zoo Road',
        tel: ['+234 812 222 1489', '+234 812 222 6489'],
        email: 'kano@pinpoint.ng',
      },
      {
        location: 'Benue',
        address: 'No. 8 7th Avenue, Inikpi street, High level, Makurdi',
        tel: [],
        email: 'benue@pinpoint.ng',
      },
      {
        location: 'China',
        address:
          'No. 36, Qingyuan Road, Jinfeng Town, Zhangjiagang, Suzhou City, Jiangsu Province, China.',
        tel: ['+86 1958 7410 572'],
        email: 'china@pinpoint.ng',
      },
    ],
    socialMediaLinks: {
      instagram: 'https://www.instagram.com/pinpointpackaging?igsh=MXNlbTN3MnQ3bzdicg==',
      facebook: 'https://www.facebook.com/share/19MUWfmSiG/?mibextid=wwXIfr',
      tiktok: 'https://www.tiktok.com/@pinpointglobal?_t=ZS-8yRAXCYmRLp&_r=1',
      whatsapp: '',
      linkedin: '',
      twitter: '',
    },
  },
});
