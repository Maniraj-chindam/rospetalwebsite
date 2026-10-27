import test from 'node:test';
import assert from 'node:assert/strict';
import { runInNewContext } from 'node:vm';
import { staleChunkRecoveryScript } from '../lib/stale-chunk-recovery.mjs';

function loadPage(store, now) {
  const listeners = new Map();
  let reloads = 0;
  const window = {
    addEventListener(name, handler) { listeners.set(name, handler); },
    location: { reload() { reloads += 1; } },
  };
  const sessionStorage = {
    getItem(key) { return store.get(key) ?? null; },
    setItem(key, value) { store.set(key, value); },
  };
  runInNewContext(staleChunkRecoveryScript, { window, sessionStorage, Date: { now: () => now } });
  return { dispatch: (name, event) => listeners.get(name)(event), reloads: () => reloads };
}

test('a missing Next route chunk refreshes an open page once, without a reload loop', () => {
  const store = new Map();
  const stale = loadPage(store, 100000);
  stale.dispatch('error', { target: { tagName: 'SCRIPT', src: 'https://rosepetalboutique.com/_next/static/chunks/103-old.js' } });
  assert.equal(stale.reloads(), 1);
  const refreshed = loadPage(store, 100001);
  refreshed.dispatch('unhandledrejection', { reason: new Error('ChunkLoadError: Loading chunk 103 failed.') });
  assert.equal(refreshed.reloads(), 0);
  const later = loadPage(store, 161000);
  later.dispatch('error', { target: { tagName: 'SCRIPT', src: 'https://rosepetalboutique.com/_next/static/chunks/103-new.js' } });
  assert.equal(later.reloads(), 1);
});

test('unrelated resource errors leave checkout open', () => {
  const page = loadPage(new Map(), 100000);
  page.dispatch('error', { target: { tagName: 'SCRIPT', src: 'https://checkout.razorpay.com/v1/checkout.js' } });
  page.dispatch('unhandledrejection', { reason: new Error('Courier quote unavailable') });
  assert.equal(page.reloads(), 0);
});
