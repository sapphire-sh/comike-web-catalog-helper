import { NestFactory } from '@nestjs/core';
import { AppModule } from './App/AppModule.js';
import { PORT } from './constants/index.js';
import { CatalogService } from './services/index.js';

const bootstrap = async () => {
	const s = new CatalogService();
	await s.initialize();

	const app = await NestFactory.create(AppModule);
	app.enableCors({
		origin: 'https://webcatalog.circle.ms',
	});
	await app.listen(PORT);
};
void bootstrap();
