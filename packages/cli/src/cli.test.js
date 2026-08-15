import assert from 'assert/strict';
import { spawnSync } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';
import test from 'node:test';
import { PNG } from 'pngjs';
import { parseArgs } from './cli.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cliPath = path.join(__dirname, 'cli.js');

const makePngBuffer = (width, height) => {
	const png = new PNG({ width, height });
	for (let i = 0; i < png.data.length; i++) {
		png.data[i] = i % 256;
	}
	return PNG.sync.write(png);
};

test('parseArgs embed options', () => {
	const options = parseArgs([
		'node', 'stegano', 'embed',
		'--input', 'in.png',
		'--output', 'out.png',
		'--passphrase', 'secret',
		'--message', 'hello',
	]);
	assert.equal(options.command, 'embed');
	assert.equal(options.input, 'in.png');
	assert.equal(options.output, 'out.png');
	assert.equal(options.passphrase, 'secret');
	assert.equal(options.message, 'hello');
});

test('CLI embed and extract round-trip', () => {
	const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'stegano-cli-'));
	const input = path.join(tmp, 'cover.png');
	const output = path.join(tmp, 'stego.png');
	fs.writeFileSync(input, makePngBuffer(64, 64));

	const embed = spawnSync(process.execPath, [
		cliPath, 'embed',
		'--input', input,
		'--output', output,
		'--passphrase', 'Invent0r',
		'--message', 'Who is John Galt?',
	], { encoding: 'utf8' });

	assert.equal(embed.status, 0, embed.stderr);
	assert.ok(fs.existsSync(output));

	const extract = spawnSync(process.execPath, [
		cliPath, 'extract',
		'--input', output,
		'--passphrase', 'Invent0r',
	], { encoding: 'utf8' });

	assert.equal(extract.status, 0, extract.stderr);
	assert.equal(extract.stdout.trim(), 'Who is John Galt?');
});
