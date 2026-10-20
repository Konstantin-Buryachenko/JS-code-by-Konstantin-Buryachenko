import { cleanUrl, cleanUrls } from '../src/url-cleaner.js';

const input = 'https://shop.example.com/item?id=42&utm_source=google';
console.log('Original:', input);
console.log('Cleaned:', cleanUrl(input));

console.log(JSON.stringify(cleanUrls([
  'https://example.com/?utm_medium=email&page=2',
  'https://example.org/?fbclid=abc123',
  'https://example.net/products?category=shoes',
  'invalid-url'
]), null, 2));
