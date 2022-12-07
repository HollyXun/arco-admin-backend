import { Module } from '@nestjs/common';
import { AppController, MyController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';

@Module({
  /**
   * 导入模块的列表，如果需要使用其他模块的服务，需要通过这里导入；
   */
  imports: [PostsModule],

  /**
   * 处理http请求，包括路由控制，向客户端返回响应，将具体业务逻辑委托给providers处理
   */

  controllers: [AppController, MyController],

  /**
   * Nest.js注入器实例化的提供者（服务提供者），处理具体的业务逻辑，各个模块之间可以共享（注入器的概念后面依赖注入部分会讲解）；
   */
  providers: [AppService],
})
export class AppModule {}
