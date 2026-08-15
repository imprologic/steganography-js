# @steganography-js/cli

Command-line interface for embedding and extracting text in PNG files.

```bash
# Embed
stegano embed --input cover.png --output stego.png --passphrase 'secret' --message 'hello'

# Or read the message from a file
stegano embed -i cover.png -o stego.png -p 'secret' -f message.txt

# Extract (prints message to stdout)
stegano extract --input stego.png --passphrase 'secret'
```

From the monorepo root:

```bash
yarn stegano -- embed -i cover.png -o stego.png -p 'secret' -m 'hello'
# or
yarn workspace @steganography-js/cli start -- embed -i cover.png -o stego.png -p 'secret' -m 'hello'
```
