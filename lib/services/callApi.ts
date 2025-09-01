import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';
import type { SanitySuccessResponse, ResponseMessage } from '@/lib/types/http';
import { assertENV, getDataFromRequest } from '@/lib/utils/general';
import { type AllEndpoints, ENDPOINTS } from '@/lib/constants/endpoints';

const sanityProjectId = assertENV(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, {
  message: 'Please add the NEXT_PUBLIC_SANITY_PROJECT_ID variable to your .env file',
});
const sanityDataset = assertENV(process.env.NEXT_PUBLIC_SANITY_DATASET, {
  message: 'Please add the NEXT_PUBLIC_SANITY_DATASET variable to your .env file',
});
const sanityApiVersion = assertENV(process.env.NEXT_PUBLIC_SANITY_API_VERSION, {
  message: 'Please add the NEXT_PUBLIC_SANITY_API_VERSION variable to your .env file',
});
const sanityApiToken = assertENV(process.env.NEXT_PUBLIC_SANITY_API_TOKEN, {
  message: 'Please add the NEXT_PUBLIC_SANITY_API_TOKEN variable to your .env file',
});

const api = axios.create({
  baseURL: `https://${sanityProjectId}.api.sanity.io/${sanityApiVersion}/data/query/${sanityDataset}`,
  timeout: 120000, //120 seconds timeout
  // withCredentials: true, //enable cookies to be sent along with every request
});

export const callApi = async <T extends keyof AllEndpoints>(
  endpoint: T,
  options: Omit<AllEndpoints[T], 'response'>
): Promise<ResponseMessage<T>> => {
  const { method, query } = ENDPOINTS[endpoint];

  const source = axios.CancelToken.source();

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const requestConfig: AxiosRequestConfig<any> = {
      // url: encodeURI(query ?? ''),
      url: '',
      params: { query },
      method,
      data: options.payload,
      cancelToken: source.token,
      headers: {
        Authorization: `Bearer ${sanityApiToken}`,
      },
    };

    const response: AxiosResponse<SanitySuccessResponse<T>> =
      await api.request<SanitySuccessResponse<T>>(requestConfig);

    return getDataFromRequest({ data: response.data }, endpoint);
  } catch (error) {
    console.error({ error });
    return getDataFromRequest(
      {
        error: {
          error: {
            query: query ?? '',
            description:
              axios.isAxiosError(error) && error.response
                ? error.response.data.message
                : error instanceof Error
                  ? error.message
                  : 'Unknown error',
            start: 0,
            end: 0,
            type: 'AxiosError',
          },
        },
      },
      endpoint
    );
  } finally {
    // if (redirectPath) {
    //   Router.navigate(redirectPath);
    // }
  }
};

export default api;
