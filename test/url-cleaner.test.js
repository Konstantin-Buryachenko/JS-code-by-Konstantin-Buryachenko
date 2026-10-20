import test from 'node:test';
import assert from 'node:assert/strict';
import { cleanUrl, cleanUrls, isTrackingParameter } from '../src/url-cleaner.js';

test('removes UTM parameters', () => {
  assert.equal(cleanUrl('https://example.com/?id=42&utm_source=google'), 'https://example.com/?id=42');
});
test('removes Meta and Google click IDs', () => {
  assert.equal(cleanUrl('https://example.com/?fbclid=123&gclid=456'), 'https://example.com/');
});
test('preserves functional parameters', () => {
  const url = 'https://example.com/?page=3&sort=price&id=10';
  assert.equal(cleanUrl(url), url);
});
test('preserves URL fragments', () => {
  assert.equal(cleanUrl('https://example.com/?utm_medium=email#details'), 'https://example.com/#details');
});
test('handles uppercase parameter names', () => {
  assert.equal(cleanUrl('https://example.com/?UTM_SOURCE=google'), 'https://example.com/');
});
test('preserves duplicate parameters and encoded values', () => {
  assert.equal(cleanUrl('https://example.com/?id=1&id=2&name=a%20b&utm_x=3'), 'https://example.com/?id=1&id=2&name=a%20b');
});
test('rejects non-HTTP URLs', () => {
  assert.throws(() => cleanUrl('javascript:alert(1)'), TypeError);
});
test('batch processing handles invalid URLs', () => {
  const result = cleanUrls(['https://example.com/?utm_source=test', 'not-a-url']);
  assert.equal(result[0].success, true);
  assert.equal(result[1].success, false);
});
test('identifies tracking parameters', () => {
  assert.equal(isTrackingParameter('utm_campaign'), true);
  assert.equal(isTrackingParameter('fbclid'), true);
  assert.equal(isTrackingParameter('product_id'), false);
});
test('preserves relative and query-like text in fragments', () => {
  const url = 'https://example.com/path#section?utm_source=foo';
  assert.equal(cleanUrl(url), url);
});
test('preserves malformed query encodings', () => {
  assert.equal(cleanUrl('https://example.com/?bad%xx=1&utm_source=x'), 'https://example.com/?bad%xx=1');
});
