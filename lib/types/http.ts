import type { AllEndpoints } from '../constants/endpoints';

export type Protocol = 'http://' | 'https://';

export interface SanitySuccessResponse<T extends keyof AllEndpoints> {
  ms: number;
  query: string;
  result: AllEndpoints[T]['response'];
  syncTags: string[];
}

export interface SanityErrorResponse {
  error: {
    query: string;
    description: string;
    start: number;
    end: number;
    type: string;
  };
}

export interface ApiError {
  message: string;
  status: string;
  error?: Record<string, string[]>;
  headers?: Record<string, unknown>;
}

export type CallApiResponse<T extends keyof AllEndpoints> =
  | { data?: never; error?: SanityErrorResponse }
  | { data?: SanitySuccessResponse<T>; error?: never };

export interface BaseResponseMessage<T extends keyof AllEndpoints> {
  message: string;
  requestName: T;
  type: 'error' | 'success';
  error?: SanityErrorResponse;
  data?: AllEndpoints[T]['response'];
}
export type ErrorResponseMessage<T extends keyof AllEndpoints> = BaseResponseMessage<T> & {
  type: 'error';
  error: SanityErrorResponse;
};
export type SuccessResponseMessage<T extends keyof AllEndpoints> = BaseResponseMessage<T> & {
  type: 'success';
  data: AllEndpoints[T]['response'];
};
export type ResponseMessage<T extends keyof AllEndpoints> =
  | ErrorResponseMessage<T>
  | SuccessResponseMessage<T>;

export type WSParams = {
  countDocuments?: boolean;
  populateFields?: [string, string]; // e.g. ['customer', 'auth.twoFA,email,firstName'];
  isFilter?: boolean;
  autoComplete?: boolean;
  countOnly?: boolean;
  sumFields?: string[];
  query: {
    limit?: `${number}`;
    skip?: `${number}`;
    fields?: string; // e.g. 'type,createdAt,status'; Returned objs will contain only these fields and id field
    sort?: string; // e.g. 'updatedAt' or '-createdAt' for reverse order;
    [key: string]: string | boolean | undefined;
  };
  // e.g. { accountStatus: 'active', 'trap.status': true, createdAt: [':gte:2024-9-13', ':lte:2024-10-10'] }
};

export interface SocketResponseData<T> {
  items: T[];
  count: number;
  fetchParameters: Partial<WSParams>;
  sumFieldTotal?: Record<string, number>[];
}

export interface SocketResponse<T> {
  data?: SocketResponseData<T>;
  error?: Record<string, unknown> | string;
  message?: string;
}
