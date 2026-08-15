# @steganography-js/cli

Command-line interface for embedding and extracting text in PNG files.

From the monorepo root (after `yarn install`):

```bash
# Embed
yarn stegano embed \
  --input cover.png \
  --output stego.png \
  --passphrase 'secret' \
  --message 'hello'

# Or read the message from a file
yarn stegano embed \
    -i cover.png \
    -o stego.png \
    -p 'secret' \
    -f message.txt

# Extract (prints message to stdout)
yarn stegano extract \
    --input stego.png \
    --passphrase 'secret'
```

You can also call the workspace package directly:

```bash
yarn workspace @steganography-js/cli start -- extract -i stego.png -p 'secret'
```

Or run the local binary without the root script:

```bash
./node_modules/.bin/stegano extract -i stego.png -p 'secret'
```

A bare `stegano` command is available only after a global install (or `yarn link` from `packages/cli`), for example:

```bash
yarn global add file:$PWD/packages/cli
stegano extract -i stego.png -p 'secret'
```
