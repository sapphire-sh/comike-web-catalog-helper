import { Injectable } from '@nestjs/common';
import { CatalogService } from '../services';
import { Circle } from '../types';

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
