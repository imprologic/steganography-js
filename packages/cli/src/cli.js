#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { embedText, extractText } from '@steganography-js/core';

const USAGE = `Usage:
  stegano embed  --input <cover.png> --output <out.png> --passphrase <pass> (--message <text> | --message-file <file>)
  stegano extract --input <stego.png> --passphrase <pass>

Options:
  -i, --input <path>         Input PNG file
  -o, --output <path>        Output PNG file (embed only)
  -p, --passphrase <text>    Passphrase used to encrypt/decrypt the message
  -m, --message <text>       Message to embed
  -f, --message-file <path>  Read message to embed from a file
  -h, --help                 Show this help
`;

/**
 * Parse argv into a flat options object plus a command.
 * @param {string[]} argv
 */
export const parseArgs = (argv) => {
	const args = argv.slice(2);
	if (args.length === 0 || args.includes('-h') || args.includes('--help')) {
		return { help: true };
	}

	const command = args[0];
	if (command !== 'embed' && command !== 'extract') {
		throw new Error(`Unknown command: ${command}\n\n${USAGE}`);
	}

	const options = { command };
	for (let i = 1; i < args.length; i++) {
		const arg = args[i];
		const next = args[i + 1];
		const takeValue = () => {
			if (next === undefined || next.startsWith('-')) {
				throw new Error(`Missing value for ${arg}`);
			}
			i += 1;
			return next;
		};

		switch (arg) {
			case '-i':
			case '--input':
				options.input = takeValue();
				break;
			case '-o':
			case '--output':
				options.output = takeValue();
				break;
			case '-p':
			case '--passphrase':
				options.passphrase = takeValue();
				break;
			case '-m':
			case '--message':
				options.message = takeValue();
				break;
			case '-f':
			case '--message-file':
				options.messageFile = takeValue();
				break;
			default:
				throw new Error(`Unknown option: ${arg}\n\n${USAGE}`);
		}
	}

	return options;
};

const requireOption = (options, name) => {
	if (!options[name]) {
		throw new Error(`Missing required option: --${name}\n\n${USAGE}`);
	}
};

const readMessage = (options) => {
	if (options.message !== undefined && options.messageFile) {
		throw new Error('Use either --message or --message-file, not both');
	}
	if (options.messageFile) {
		return fs.readFileSync(options.messageFile, 'utf8');
	}
	if (options.message !== undefined) {
		return options.message;
	}
	throw new Error('Missing required option: --message or --message-file');
};

const runEmbed = async (options) => {
	requireOption(options, 'input');
	requireOption(options, 'output');
	requireOption(options, 'passphrase');
	const message = readMessage(options);
	const input = fs.readFileSync(options.input);
	const output = await embedText(input, message, options.passphrase);
	fs.writeFileSync(options.output, output);
	process.stderr.write(`Embedded message into ${path.resolve(options.output)}\n`);
};

const runExtract = async (options) => {
	requireOption(options, 'input');
	requireOption(options, 'passphrase');
	const input = fs.readFileSync(options.input);
	const text = await extractText(input, options.passphrase);
	process.stdout.write(text);
	if (!text.endsWith('\n')) {
		process.stdout.write('\n');
	}
};

export const main = async (argv = process.argv) => {
	try {
		const options = parseArgs(argv);
		if (options.help) {
			process.stdout.write(USAGE);
			return;
		}
		if (options.command === 'embed') {
			await runEmbed(options);
		} else {
			await runExtract(options);
		}
	} catch (error) {
		process.stderr.write(`${error.message || error}\n`);
		process.exitCode = 1;
	}
};

const isDirectRun = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));
if (isDirectRun) {
	main();
}

export { USAGE };
