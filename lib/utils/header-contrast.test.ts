import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { resolveHeaderChromeColor } from './header-contrast';

describe('resolveHeaderChromeColor', () => {
  it('returns black when no dark zones intersect', () => {
    assert.equal(resolveHeaderChromeColor([]), 'black');
    assert.equal(resolveHeaderChromeColor([false, false]), 'black');
  });

  it('returns white when any dark zone intersects', () => {
    assert.equal(resolveHeaderChromeColor([true]), 'white');
    assert.equal(resolveHeaderChromeColor([false, true]), 'white');
  });
});
