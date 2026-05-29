import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { shouldDisableHeavyRouteTransitions } from './lightweight-navigation';

describe('shouldDisableHeavyRouteTransitions', () => {
  it('returns false on the server', () => {
    assert.equal(shouldDisableHeavyRouteTransitions(), false);
  });
});
