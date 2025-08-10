import { AVAILABLE_PACKAGED_SERVICE_IDS, AvailablePackagedService } from '../constants/texts';

export const isAvailablePackagedService = (val: unknown): val is AvailablePackagedService => {
  return (
    typeof val === 'string' &&
    AVAILABLE_PACKAGED_SERVICE_IDS.includes(val as AvailablePackagedService)
  );
};
