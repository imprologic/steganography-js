# steganography-js

[Steganography](https://grokipedia.com/page/Steganography) is the practice of concealing a message within another message or a physical object.

In computing/electronic contexts, a computer file, message, image, or video is concealed within another file, message, image, or video.


## Overview

This monorepo provides utilities for hiding text in a PNG file:

| Package | Description |
|---------|-------------|
| [`@steganography-js/core`](packages/core) | Shared embed/extract and crypto logic |
| [`@steganography-js/web`](packages/web) | Browser UI (Create React App) |
| [`@steganography-js/cli`](packages/cli) | Command-line embed/extract tool |

You can see the web UI at https://stegano.imprologic.com .
The source code is on Github: https://github.com/imprologic/steganography-js


## How does it work?

This utility makes imperceptible changes to the least significant bit (LSB) of every base color (RGB) in some of the pixels of the original PNG file. \
It does not alter the alpha channel, as this may raise suspicions.

The clear text provided by the user is encrypted and stored at a random location in your PNG. The encrypted message (ciphertext) is "wrapped" by a prefix and a suffix derived from the hash of your passphrase.


## Why PNG?

PNG is both a common file format, and a lossless algortihm.

Being a common file format, it shouldn't normally raise suspicions.

The lossless aspect of PNGs ensures that the embedded data is not lost - assuming that you do not modify the resulting file in any way once the message is embedded.


## What can I hide?

Use your own judgement. You can hide passwords, private keys, recovery phrases... as long it's a relatively short text, you can hide it using this utility.


## Is it safe?

As always, the answer is: it depends. A very determined "foe" who knows that your PNG files may include hidden messages may use heuristics to identify unexpected variations in the image's pixels.

For this reason, I strongly advise using **PNGs with lots of details** like landscapes (isn't nature amazing?), rather than purely geometrical shapes.


## Best practices

A longer, more complex password is always better.

Using PNG files you generated yourself is better than a random PNG off the internet. A determined foe can do an image search and then compare your altered PNG with the original, therefore determining that your version may contain hidden data.

Always delete the original, keep only the altered version of the PNG.

Do not embed additional messages in a PNG that already has an embedded message. There's a good chance you won't be able to recover previous messages.

Do not reuse the same original PNG for multiple messages. A determined foe may compare the altered PNGs and determine that they may contain hidden data.

Do not reuse the same password in different PNGs. A byte-level comparison of the altered PNGs may show similarities between them. \
Slightly changing your strong password from one PNG to the next may be good enough in this scenario.

### Palindrome

While supported, we do not recommend using a [palindrome](https://grokipedia.com/page/Palindrome) for the passphrase. \
A palindrome will create the same marker for the prefix and the suffix of the encrypted message, making it easier to guess that a message may be embedded in the resulting file.


## Will this utility always be available?

I sure hope so, but there are no guarantees. I strongly recommend getting a copy of this repository and running your own steganography utility.


## Why is this not a native mobile app?

Several reasons:

1. Inspecting the code in an app is a lot more difficult - you'd have to trust that the publisher will not steal the messages you embed.
2. The mainstream app stores are notorious for banning apps on a whim. A domain name I own seems a lot safer in that respect.
3. The presence of a steganography app on your mobile device may be seen as a clear indication that you used this technique at some point.

However, you can install this as a PWA app by clicking the "download" icon in the top-right of you browser, or by accepting the prompt on a mobile device.

## Terms of use

This software is provided as is, without guarantees of any kind. \
By using it, you agree not to hold the developer(s) liable for any damages you may incur.

Please make sure you don't forget your passphrase (password) or lose the resulting PNGs.


## Setup

```bash
yarn install
```

Requires Node from [`.nvmrc`](.nvmrc) (currently v23).


## Available Scripts

From the repository root:

### `yarn start`

Runs the web app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `yarn test`

Runs tests for all workspace packages.

### `yarn build`

Builds the web app for production to `packages/web/build`.

### `yarn stegano -- --help`

Runs the CLI. Examples:

```bash
yarn stegano -- embed -i cover.png -o stego.png -p 'secret' -m 'hello'
yarn stegano -- extract -i stego.png -p 'secret'
```

You can also target a package directly:

```bash
yarn workspace @steganography-js/web start
yarn workspace @steganography-js/core test
yarn workspace @steganography-js/cli start -- extract -i stego.png -p 'secret'
```
