# URL Cleaner — JavaScript SEO Utility

A lightweight, dependency-free JavaScript utility for removing common advertising and analytics tracking parameters from **absolute HTTP(S) URLs**, without removing unrelated query parameters.

Useful for SEO audits, link sharing, URL-list preparation and basic privacy hygiene.

## Features

- Removes any `utm_*` parameter, case-insensitively.
- Removes common click identifiers including `fbclid`, `gclid`, `msclkid`, and `ttclid`.
- Preserves functional parameters, query ordering, repeated keys, encoded values and fragments.
- Returns unchanged input if no removable parameters are present.
- Processes batches without stopping on individual invalid URLs.
- No external runtime dependencies.

## Requirements

Node.js **20+**.

## Setup

```bash
git clone https://github.com/Konstantin-Buryachenko/JS-code-by-Konstantin-Buryachenko.git
cd JS-code-by-Konstantin-Buryachenko
```

No `npm install` is needed.

## Quick start

```js
import { cleanUrl } from './src/url-cleaner.js';

console.log(cleanUrl('https://example.com/product?id=123&utm_source=google&fbclid=abc'));
// https://example.com/product?id=123
```

## Batch processing

```js
import { cleanUrls } from './src/url-cleaner.js';

console.log(cleanUrls([
  'https://example.org/?utm_campaign=sale',
  'https://example.com/?id=42&gclid=123',
  'not-a-url'
]));
```

Each entry contains `original`, `cleaned` and `success`. Failed entries contain `error`.

## Supported tracking parameters

Any key beginning with `utm_`, plus:

`fbclid`, `gclid`, `dclid`, `gbraid`, `wbraid`, `msclkid`, `ttclid`, `twclid`, `li_fat_id`, `igshid`, `mc_cid`, `mc_eid`, `_hsenc`, `_hsmi`, `mkt_tok`, `yclid`.

## Test and example

```bash
npm test
npm run example
```

## API

| Function | Description |
| --- | --- |
| `cleanUrl(url)` | Return a cleaned URL or throw `TypeError` for unsupported input. |
| `cleanUrls(urls)` | Return a result object per input, including failures. |
| `isTrackingParameter(key)` | Identify whether a name is in the removal rules. |

## Limitations

- Only absolute HTTP and HTTPS URLs are supported; relative URLs need an absolute base URL first.
- Redirects are not followed and link availability is not checked.
- Tracking information in URL paths or fragments is not removed.
- URL query keys with malformed percent encodings are preserved.
- Some sites use a parameter that resembles tracking information for functionality. **Verify cleaned links** before production use.
- Removing query parameters does not guarantee search-engine canonicalization or ranking benefits.

## Ideas for improvements

- Custom allow/block lists for query parameters.
- CLI for stdin and CSV files.
- Browser extension.
- Domain-specific cleaning rules.

## Contributing

Reproducible bug reports, tests and pull requests are welcome.

## License

No license has been granted in this repository. Contact the repository owner regarding reuse or redistribution permissions.
