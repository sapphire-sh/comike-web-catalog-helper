import path from 'path';

export const rootDir = path.resolve(__dirname, '..', '..', '..');
export const dataDir = path.resolve(rootDir, 'data');

export const PORT = process.env.PORT ?? 8081;
