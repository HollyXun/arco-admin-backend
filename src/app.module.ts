import { Module } from '@nestjs/common';
import { AppController, MyController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import envConfig from '../config/env';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import env from "../config/env";

@Module({
  /**
   * 导入模块的列表，如果需要使用其他模块的服务，需要通过这里导入；
   */
  imports: [
    PostsModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [envConfig.path],
    }),
    // 使用SequelizeORM框架
    SequelizeModule.forRootAsync({
      // 特别注意一定要导入, 不导入就报错, 说你没在imports引入
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        dialect: 'mysql',
        host: configService.get('DB_HOST', 'localhost'),
        port: +configService.get<number>('DB_PORT', 3306),
        username: configService.get('DB_USER', 'root'),
        password: configService.get('DB_PASSWD'),
        database: configService.get('DB_DATABASE', 'envDb'),
        models: [],
        timezone: '+08:00',
        autoLoadModels: true,
        synchronize: true,
        define: {
          timestamps: true, // 是否自动创建时间字段， 默认会自动创建createdAt、updatedAt
          paranoid: true, // 是否自动创建deletedAt字段
          createdAt: 'createTime', // 重命名字段
          updatedAt: 'updateTime',
          deletedAt: 'deleteTime',
          underscored: true, // 开启下划线命名方式，默认是驼峰命名
          freezeTableName: true, // 禁止修改表名
          charset: 'utf8mb4',
        },
      }),
    }),
  ],

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
