import "reflect-metadata";
import "dotenv/config";
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module.js";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: process.env.CLIENT_ORIGIN || "http://localhost:5173"
    }
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidUnknownValues: false
    })
  );

  const port = Number(process.env.PORT || 4000);
  await app.listen(port);
  console.log(`Server running at http://localhost:${port}`);
}

void bootstrap();
