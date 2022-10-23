# steganography-js

[Steganography](https://en.wikipedia.org/wiki/Steganography) is the practice of concealing a message within another message or a physical object.

In computing/electronic contexts, a computer file, message, image, or video is concealed within another file, message, image, or video. 


## Overview

This repository provides a web-based utility allowing (for now) the hiding of a text in a PNG file.

You can see it in action at https://stegano.imprologic.com .
The source code is on Github: https://github.com/imprologic/steganography-js


## How does it work

TODO

## Why PNG

PNG is both a common file format, and a lossless algortihms.

Being a common file format, it shouldn't normally raise suspicions.

The lossless aspect of PNGs ensures that the embedded data is not lost - assuming that you do not modify the resulting file in any way once the message is embedded.


## What can I hide?

Use your own judgement. You can hide passwords, private keys, recovery phrases... as long it's a relatively short text, you can hide it using this utility.


## Is it safe?

As always, the answer is: it depends. A very determined "foe" who knows that your PNG files may include hidden messages may use heuristics to indentify unexpected variations in the image's pixels.

For this reason, I strongly advise using PNGs with lots of details like landscapes (isn't nature amazing?) rather than purely geometrical shapes.


## Will this utility always be available?

I sure hope so, but there are no guarantees. I strongly recommend getting a copy of this repository and running your own steganography utility.
