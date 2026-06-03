'use client';

import { cn } from '@/lib/utils';
import type { SubmissionStep } from '@/lib/utils/form-submission-progress';
import { Check, Circle, Loader2, XCircle } from 'lucide-react';

function StepIcon({ status }: { status: SubmissionStep['status'] }) {
  if (status === 'done') {
    return <Check className="size-4 text-dark shrink-0" strokeWidth={2.5} aria-hidden />;
  }
  if (status === 'active') {
    return (
      <Loader2 className="size-4 text-dark shrink-0 animate-spin" strokeWidth={2} aria-hidden />
    );
  }
  if (status === 'error') {
    return <XCircle className="size-4 text-red-600 shrink-0" strokeWidth={2} aria-hidden />;
  }
  return <Circle className="size-4 text-gray-300 shrink-0" strokeWidth={2} aria-hidden />;
}

export function FormSubmissionProgress({
  visible,
  steps,
  uploadAveragePercent,
}: {
  visible: boolean;
  steps: SubmissionStep[];
  uploadAveragePercent: number | null;
}) {
  if (!visible || !steps.length) return null;

  const uploadStep = steps.find(s => s.key === 'upload');
  const showUploadBar =
    uploadStep?.status === 'active' && uploadAveragePercent != null && uploadAveragePercent >= 0;

  return (
    <div
      className={cn(
        'w-full max-w-[min(100%,420px)] mx-auto mt-6 shadow-lg py-4 px-6 md:px-8',
        'bg-[#f2f2f2] text-gray-600 text-[13px] tracking-normal leading-6 border border-gray-300/80'
      )}
      role="status"
      aria-live="polite"
      aria-busy={steps.some(s => s.status === 'active')}>
      <p className="typo-caption-small uppercase text-gray-59 mb-3">Submitting</p>
      <ul className="grid gap-3">
        {steps.map(step => (
          <li key={step.key} className="flex items-start gap-3 text-left">
            <span className="mt-0.5">
              <StepIcon status={step.status} />
            </span>
            <span
              className={cn(
                'typo-body-7 flex-1 min-w-0',
                step.status === 'active' && 'text-dark font-medium',
                step.status === 'done' && 'text-gray-59',
                step.status === 'pending' && 'text-gray-59/80',
                step.status === 'error' && 'text-red-600'
              )}>
              {step.label}
            </span>
          </li>
        ))}
      </ul>
      {showUploadBar && (
        <div className="mt-4 pt-3 border-t border-dark/10">
          <p className="typo-body-7 text-gray-59 mb-2">Upload progress (average)</p>
          <div className="h-1.5 w-full rounded-full bg-dark/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-dark transition-[width] duration-200 ease-out"
              style={{ width: `${Math.min(100, Math.max(0, uploadAveragePercent))}%` }}
            />
          </div>
          <p className="typo-body-7 text-gray-59 mt-1.5 tabular-nums">
            {Math.round(Math.min(100, Math.max(0, uploadAveragePercent)))}%
          </p>
        </div>
      )}
    </div>
  );
}
