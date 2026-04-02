import { Controller, Get, Param } from '@nestjs/common';
import { Circle } from '../types/index.js';
import { AppService } from './AppService.js';

@Controller('api/circles')
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getCircles(): Circle[] {
		return this.appService.getCircles();
	}

	@Get(':circleName')
	getCircle(@Param('circleName') circleName: string): Circle | null {
		return this.appService.getCircle(circleName);
	}
}
