import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './core/filter/http-exception/http-exception.filter';
import { TransformInterceptor } from './core/interceptor/transform/transform.interceptor';

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
  await app.listen(3005);
}

bootstrap();
