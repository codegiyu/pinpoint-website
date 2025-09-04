/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineConfig } from 'sanity';
// import { deskTool } from 'sanity/desk';
import { StructureResolver, structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { assertENV } from './lib/utils/general';
import { sanitySchemaTypes } from './lib/schemas';

const SANITY_PROJECT_ID = assertENV(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, {
  message: 'Please add the NEXT_PUBLIC_SANITY_PROJECT_ID variable to your .env file',
});
const SANITY_DATASET = assertENV(process.env.NEXT_PUBLIC_SANITY_DATASET, {
  message: 'Please add the NEXT_PUBLIC_SANITY_DATASET variable to your .env file',
});

// array of document types that only publishing should be allowed on.
// makes no sense to have 'create' or 'duplicate'
export const publishOnlyDocuments = ['staticSiteData', 'contactData'];

// Determins the actions that appear in the Publish bar
const actions = (actions: any, { schemaType }: any) => {
  // deconstruct all actions so we can order them if required.
  const [publish, discardChanges, unPublish, duplicate, deleteDocument, ...anyOtherActions] =
    actions;

  // if this document is in the  publishOnlyDocuments then we don't want
  // return only publish (or schedule if it is there)
  if (publishOnlyDocuments.includes(schemaType)) {
    return [publish];
  }

  return [
    // CustomPublishAction, // Example action which intercepts the current publish action.
    discardChanges,
    unPublish,
    duplicate,
    deleteDocument,
    ...anyOtherActions,
  ];
};

// Determins the New Documents Types that appear when clicking the New Document Button .
const newDocumentOptions = (newDocumentOptions: any) => {
  const filteredNewDocumentOptions = newDocumentOptions.filter((documentOption: any) => {
    // return only the documentTypes that are not publishOnlyDocuments
    return !publishOnlyDocuments.includes(documentOption.templateId);
  });
  return filteredNewDocumentOptions;
};

const structure: StructureResolver = s =>
  s
    .list()
    .title('Content')
    .items([
      // Single item for Site Settings
      s
        .listItem()
        .title('Site Data')
        .child(
          s
            .list()
            .title('Site Data')
            .items([
              // Static site data singleton
              s
                .listItem()
                .title('Static Site Data')
                .child(s.document().schemaType('staticSiteData').documentId('staticSiteData')),

              // Contact data singleton
              s
                .listItem()
                .title('Contact Data')
                .child(s.document().schemaType('contactData').documentId('contactData')),
            ])
        ),

      // Divider
      s.divider(),

      // Regular collections
      // s.documentTypeListItem('services').title('Services'),
      // s.documentTypeListItem('projects').title('Projects'),
    ]);

export default defineConfig({
  basePath: '/studio',
  name: 'pinpoint-global',
  title: 'Pinpoint CMS',
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  document: {
    actions,
    newDocumentOptions,
  },
  plugins: [
    structureTool({ structure }),
    visionTool({
      defaultApiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? 'v2025-08-25',
      defaultDataset: 'development',
    }),
  ],
  schema: {
    types: sanitySchemaTypes,
    templates: prev => [
      ...prev,
      {
        id: 'contactData',
        title: 'Contact Data Singleton',
        schemaType: 'contactData',
        value: {
          _id: 'contactData',
          _type: 'contactData',
        },
      },
    ],
  },
});
