export function isAvailablePackagedService(val: unknown, allowed: string[]): val is string {
  return typeof val === 'string' && allowed.includes(val);
}
