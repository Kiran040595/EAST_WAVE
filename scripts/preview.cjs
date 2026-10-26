/* eslint-disable @typescript-eslint/no-require-imports -- Launch the Next.js CLI. */
process.env.EASTWAVE_PREVIEW_DIR = '.browser-preview';
process.env.NEXT_TELEMETRY_DISABLED = '1';
process.argv = [process.execPath, require.resolve('next/dist/bin/next'), 'dev', '--webpack', '--hostname', '127.0.0.1', '--port', '3005'];
require('next/dist/bin/next');
