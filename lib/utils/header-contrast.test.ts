import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { resolveHeaderContrast } from './header-contrast';

describe('resolveHeaderContrast', () => {
  it('returns blend when no zones intersect', () => {
    assert.equal(resolveHeaderContrast([]), 'blend');
    assert.equal(resolveHeaderContrast([false, false]), 'blend');
  });

  it('returns solid when any zone intersects', () => {
    assert.equal(resolveHeaderContrast([true]), 'solid');
    assert.equal(resolveHeaderContrast([false, true]), 'solid');
  });
});
