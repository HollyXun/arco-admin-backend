import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './core/filter/http-exception/http-exception.filter';
import { TransformInterceptor } from './core/interceptor/transform/transform.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /**
   * 全局路由前缀：api
   */
  app.setGlobalPrefix('api');
  /**
   * 注册全局拦截过滤器
   */
  app.useGlobalFilters(new HttpExceptionFilter());
  /**
   * 注册全局成功拦截器
   */
  app.useGlobalInterceptors(new TransformInterceptor());
  /**
   *
   */
  app.useGlobalPipes(new ValidationPipe());
  /**
   * 设置全局swagger文档
   */
  const config = new DocumentBuilder()
    .setTitle('后台管理系统')
    .setDescription('后台管理系统API文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3005);
}

bootstrap();
