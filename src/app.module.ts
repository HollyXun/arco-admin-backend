import { Dependencies, Module } from '@nestjs/common';
import { AppController, MyController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import envConfig from '../config/env';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Dependencies(DataSource)
@Module({
  /**
   * 导入模块的列表，如果需要使用其他模块的服务，需要通过这里导入；
   */
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [envConfig.path],
    }),

    // 使用typeORM
    TypeOrmModule.forRootAsync({
      // 特别注意一定要导入, 不导入就报错, 说你没在imports引入
      imports: [ConfigModule],
      inject: [ConfigService],
      // name: 'albumsConnection',
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql', // 数据库类型
        entities: [], // 数据表实体
        host: configService.get('DB_HOST', 'localhost'),
        port: +configService.get<number>('DB_PORT', 3306),
        username: configService.get('DB_USER', 'root'),
        password: configService.get('DB_PASSWD', '12345678'),
        database: configService.get('DB_DATABASE', 'testdb'),
        timezone: '+08:00', //服务器上配置的时区
        autoLoadEntities: true,
        synchronize: true, //根据实体自动创建数据库表， 生产环境建议关闭
      }),
    }),
    PostsModule,

    UserModule,

    AuthModule,
  ],

  /**
   * 处理http请求，包括路由控制，向客户端返回响应，将具体业务逻辑委托给providers处理
   */

  controllers: [AppController, MyController],

  /**
   * Nest.js注入器实例化的提供者（服务提供者），处理具体的业务逻辑，各个模块之间可以共享（注入器的概念后面依赖注入部分会讲解）；
   */
  providers: [AppService],
  exports: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
