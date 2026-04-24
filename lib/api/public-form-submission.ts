import { uploadFileWithProgress } from '@/lib/utils/general';

type ApiEnvelope<T> = {
  success: boolean;
  data?: T;
  message?: string;
  responseCode?: number;
};

export type PublicFormType =
  | 'projectRequest'
  | 'jobApplication'
  | 'spontaneousApplication'
  | 'contact';

export interface PublicFormAttachment {
  url?: string;
  filename?: string;
  mimeType?: string;
  size?: number;
}

type PresignedUpload = {
  id?: string;
  intent: string;
  uploadUrl: string;
  key: string;
  filename: string;
  publicUrl: string;
  expiresIn: number;
  expiresAt: string;
};

function getBackendBase() {
  const base = process.env.NEXT_PUBLIC_PINPOINT_BACKEND_URL?.replace(/\/$/, '');
  if (!base) throw new Error('NEXT_PUBLIC_PINPOINT_BACKEND_URL is not set');
  return base;
}

async function parseApiResponse<T>(res: Response): Promise<T> {
  let body: ApiEnvelope<T>;
  try {
    body = (await res.json()) as ApiEnvelope<T>;
  } catch {
    throw new Error('Invalid JSON response from backend');
  }

  if (!res.ok || body.success !== true) {
    throw new Error(body.message || 'Request failed');
  }

  if (body.data == null) {
    throw new Error('Missing response data from backend');
  }

  return body.data;
}

export async function uploadAttachmentsToR2(
  files: File[],
  onUploadProgress?: (averagePercent: number) => void
): Promise<PublicFormAttachment[]> {
  if (!files.length) return [];

  const response = await fetch(`${getBackendBase()}/api/v1/public/pinpoint-global/presigned-urls`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      intent: 'site-content-form-submission',
      files: files.map(file => ({
        fileExtension: file.name.split('.').pop() || '',
        contentType: file.type || 'application/octet-stream',
      })),
    }),
  });

  const data = await parseApiResponse<{ uploads: PresignedUpload[] }>(response);
  const uploads = data.uploads ?? [];

  if (uploads.length !== files.length) {
    throw new Error('Could not generate upload slots for all attachments');
  }

  const progresses = files.map(() => 0);
  const reportAverage = () => {
    if (!onUploadProgress || !progresses.length) return;
    const avg = Math.round(progresses.reduce((a, b) => a + b, 0) / progresses.length);
    onUploadProgress(avg);
  };

  onUploadProgress?.(0);

  await Promise.all(
    uploads.map((upload, idx) =>
      uploadFileWithProgress(files[idx], upload.uploadUrl, pct => {
        progresses[idx] = pct;
        reportAverage();
      })
    )
  );

  onUploadProgress?.(100);

  return uploads.map((upload, idx) => ({
    url: upload.publicUrl,
    filename: files[idx].name || upload.filename,
    mimeType: files[idx].type || undefined,
    size: files[idx].size || undefined,
  }));
}

export async function submitPublicFormSubmission(payload: {
  formType: PublicFormType;
  formName: string;
  jobSlug?: string;
  fields: Record<string, string | string[]>;
  attachments?: PublicFormAttachment[];
}) {
  const response = await fetch(
    `${getBackendBase()}/api/v1/public/pinpoint-global/form-submissions`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        payload: {
          formType: payload.formType,
          formName: payload.formName,
          ...(payload.jobSlug ? { jobSlug: payload.jobSlug } : {}),
          ...payload.fields,
        },
        ...(payload.attachments?.length ? { attachments: payload.attachments } : {}),
      }),
    }
  );

  return parseApiResponse<{ _id: string; success: boolean }>(response);
}
