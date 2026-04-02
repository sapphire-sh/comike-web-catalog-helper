import { Module } from '@nestjs/common';
import { AppController } from './AppController.js';
import { AppService } from './AppService.js';

@Module({
	imports: [],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
