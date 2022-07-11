import { NestFactory } from '@nestjs/core';
import { AppModule } from './App/AppModule';
import { PORT } from './constants';
import { CatalogService } from './services';

async function bootstrap() {
	const s = new CatalogService();
	await s.initialize();

	const app = await NestFactory.create(AppModule);
	app.enableCors({
		origin: 'https://webcatalog.circle.ms',
	});
	await app.listen(PORT);
}
bootstrap();
