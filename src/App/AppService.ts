import { Injectable } from '@nestjs/common';
import { CatalogService } from '../services/index.js';
import { Circle } from '../types/index.js';

@Injectable()
export class AppService {
	getCircles(): Circle[] {
		const s = new CatalogService();
		return s.circles;
	}

	getCircle(circleName: string): Circle | null {
		const s = new CatalogService();
		return s.circles.find((x) => x.circleName === circleName) ?? null;
	}
}
