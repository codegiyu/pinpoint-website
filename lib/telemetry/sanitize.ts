const PII_KEY_PATTERN =
  /^(email|e-mail|phone|tel|mobile|name|firstName|lastName|fullName|address|password|token|secret|message|portfolio|linkedin)$/i;

export function sanitizeEventProperties(
  properties?: Record<string, string | number | boolean>
): Record<string, string | number | boolean> | undefined {
  if (!properties) return undefined;

  const clean: Record<string, string | number | boolean> = {};

  for (const [key, value] of Object.entries(properties)) {
    if (PII_KEY_PATTERN.test(key)) continue;
    if (typeof value === 'string' && value.length > 512) {
      clean[key] = value.slice(0, 512);
      continue;
    }
    clean[key] = value;
  }

  return Object.keys(clean).length ? clean : undefined;
}

export function sanitizeClientErrorMessage(message: string): string {
  const trimmed = message.trim().slice(0, 240);
  return trimmed.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[redacted-email]');
}
