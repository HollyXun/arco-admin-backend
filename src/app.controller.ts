import { Controller, Get, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

@Controller('app')
export class MyController {
  constructor(private readonly appService: AppService) {}

  /**
   * 固定路径
   * 匹配get请求：http://localhost:3005/app/list
   */
  @Get('list')
  getHello(): string {
    return this.appService.getHello();
  }

  /**
   * 固定路径
   * 匹配post请求：http://localhost:3005/app/list
   */
  @Post('list')
  create(): string {
    return 'This is post Method：create';
  }

  /**
   * 通配符路径(?+* 三种通配符 )
   * 匹配get请求：http://localhost:3005/app/user_xxx
   */
  @Get('user_*')
  getUser(): string {
    return 'This is get Method：getUser';
  }

  /**
   * 带参数路径
   * 匹配put请求：http://localhost:3005/app/list/xxxx
   */
  @Put('list/:id')
  update() {
    return 'update';
  }
}
