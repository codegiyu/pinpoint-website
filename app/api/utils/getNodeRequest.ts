/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from 'next/server';
import { Readable } from 'stream';

// Helper to convert Web Request to a stream for formidable
export async function getNodeRequest(
  req: NextRequest
): Promise<Readable & { headers: any; method: string; url?: string }> {
  // const contentType = req.headers.get('content-type') || '';
  const body = req.body;
  const readable = Readable.fromWeb(body as any) as unknown as Readable;

  const nodeRequest = Object.assign(readable, {
    headers: Object.fromEntries(req.headers.entries()),
    method: req.method,
    url: '', // optional, but can be set
  });

  return nodeRequest;
}
