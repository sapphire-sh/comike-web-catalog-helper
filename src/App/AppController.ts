import { Controller, Get, Param } from '@nestjs/common';
import { Circle } from '../types';
import { AppService } from './AppService';

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
