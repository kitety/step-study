import { NestFactory } from "@nestjs/core";
import { Logger } from "@nestjs/common";
import { AppModule } from "./app.module";
import * as config from 'config'

async function bootstrap() {
  // bootstrap function
  const logger = new Logger("bootstrap");
  const app = await NestFactory.create(AppModule);
  const serverConfig=config.get('server')
  const { port } = serverConfig;
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
