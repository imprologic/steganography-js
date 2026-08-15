# @steganography-js/core

Shared steganography logic: AES encryption, LSB bit packing, and PNG embed/extract.

```js
import { embedText, extractText } from '@steganography-js/core';

const stego = await embedText(pngBuffer, 'secret message', 'passphrase');
const message = await extractText(stego, 'passphrase');
```

## Scripts

- `yarn test` — run unit tests
