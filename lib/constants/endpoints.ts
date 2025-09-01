export type HttpMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
export type AdminUpdateAction = 'suspend' | 'unsuspend' | 'delete';

export type EndpointDefinition<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Payload extends Record<string, any> | undefined = undefined,
  Response = unknown,
> = Payload extends undefined
  ? { payload?: never; response: Response }
  : { payload: Payload; response: Response };

export type EndpointDetails = {
  query: string;
  method: HttpMethods;
};

export interface AllEndpoints {
  GET_HERO_TITLE_MODIFIERS: EndpointDefinition<
    undefined,
    StaticSitePartData<{ heroTitleModifiers: string[] }>
  >;
  GET_CONTACT_PAGE_TITLE_MODIFIERS: EndpointDefinition<
    undefined,
    StaticSitePartData<{ contactPageTitleModifiers: string[] }>
  >;
}

export const ENDPOINTS: Record<keyof AllEndpoints, EndpointDetails> = {
  GET_HERO_TITLE_MODIFIERS: {
    query: '*[_type == "staticSiteData"][0]{heroTitleModifiers}',
    method: 'GET',
  },
  GET_CONTACT_PAGE_TITLE_MODIFIERS: {
    query: '*[_type == "staticSiteData"][0]{contactPageTitleModifiers}',
    method: 'GET',
  },
};

export type StaticSitePartData<T> = T & {
  _id?: string;
  _type?: string;
};
