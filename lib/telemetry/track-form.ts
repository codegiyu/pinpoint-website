import { getTelemetry } from './telemetry-facade';

const startedForms = new Set<string>();

export function trackFormStart(formName: string, formType?: string) {
  const key = `${formType ?? 'form'}:${formName}`;
  if (startedForms.has(key)) return;

  startedForms.add(key);
  getTelemetry().track('form_start', {
    form_name: formName,
    ...(formType ? { form_type: formType } : {}),
  });
}

export function trackFormSubmit(formName: string, formType?: string) {
  getTelemetry().track('form_submit', {
    form_name: formName,
    ...(formType ? { form_type: formType } : {}),
  });
}

export function resetTrackedFormsForTests(): void {
  startedForms.clear();
}
