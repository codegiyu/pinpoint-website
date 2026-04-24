export type SubmissionStepStatus = 'pending' | 'active' | 'done' | 'error';

export type SubmissionStep = {
  key: string;
  label: string;
  status: SubmissionStepStatus;
};

export function buildProjectRequestSubmissionSteps(hasAttachments: boolean): SubmissionStep[] {
  const steps: SubmissionStep[] = [];
  if (hasAttachments) {
    steps.push({ key: 'upload', label: 'Uploading attachments…', status: 'active' });
    steps.push({ key: 'save', label: 'Saving request record…', status: 'pending' });
  } else {
    steps.push({ key: 'save', label: 'Saving request record…', status: 'active' });
  }
  steps.push({ key: 'compile', label: 'Compiling email…', status: 'pending' });
  steps.push({ key: 'send', label: 'Sending email…', status: 'pending' });
  return steps;
}

export function buildJobApplicationSubmissionSteps(): SubmissionStep[] {
  return [
    { key: 'upload', label: 'Uploading attachments…', status: 'active' },
    { key: 'save', label: 'Saving your application…', status: 'pending' },
    { key: 'compile', label: 'Compiling email…', status: 'pending' },
    { key: 'send', label: 'Sending email…', status: 'pending' },
  ];
}

export function completeStepActivateNext(
  steps: SubmissionStep[],
  completedKey: string
): SubmissionStep[] {
  const i = steps.findIndex(s => s.key === completedKey);
  return steps.map((s, j) => {
    if (s.key === completedKey) return { ...s, status: 'done' as const };
    if (i >= 0 && j === i + 1) return { ...s, status: 'active' as const };
    return s;
  });
}

export function markActiveStepError(steps: SubmissionStep[]): SubmissionStep[] {
  return steps.map(s => (s.status === 'active' ? { ...s, status: 'error' as const } : s));
}
