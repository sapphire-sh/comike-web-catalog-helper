import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse';
import { dataDir } from '../constants';
import { Circle, CircleRecord } from '../types';

export class CatalogService {
	private static _circles: Circle[] = [];

	private async getCatalogFilename(): Promise<string> {
		const filenames = await fs.promises.readdir(dataDir);
		for (const filename of filenames) {
			if (!filename.startsWith('WebCatalog')) {
				continue;
			}
			return filename;
		}

		throw new Error('cannot find catalog');
	}

	private async importCatalog(filename: string) {
		const filePath = path.resolve(dataDir, filename);
		const buffer = await fs.promises.readFile(filePath);

		return new Promise<CircleRecord[]>((resolve, reject) => {
			const records: CircleRecord[] = [];

			const parser = parse({
				relax_column_count: true,
			});

			parser.on('readable', () => {
				let record;
				let index = 0;

				while ((record = parser.read()) !== null) {
					index += 1;

					if (index === 1) {
						continue;
					}

					records.push(record);
				}
			});

			parser.on('error', (error) => {
				console.error(error);
				reject(error);
			});

			parser.on('end', () => {
				resolve(records);
			});

			parser.write(buffer);
			parser.end();
		});
	}

	private convertCircle(record: CircleRecord): Circle {
		return {
			id: parseInt(record[1], 10),
			date: record[5],
			space: `${record[6]}${record[7]}${record[8]}`,
			genre: parseInt(record[9], 10),
			circleName: record[10],
			artistName: record[12],
			description: `${record[13]}\n${record[16]}`,
			category: parseInt(record[21], 10),
			row2: parseInt(record[2], 10),
			row3: parseInt(record[3], 10),
			row4: parseInt(record[4], 10),
		};
	}

	public async initialize() {
		const filename = await this.getCatalogFilename();
		const records = await this.importCatalog(filename);
		const circles = records.map((record) => this.convertCircle(record));

		CatalogService._circles = circles;
	}

	public get circles() {
		return CatalogService._circles;
	}
}
