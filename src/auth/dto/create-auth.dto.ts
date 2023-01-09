import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty} from "class-validator";

export class CreateAuthDto {
    @ApiProperty({ description: '用户名' })
    @IsNotEmpty({ message: '请输入用户名' })
    username: string;

    @ApiProperty({ description: '密码' })
    @IsNotEmpty({ message: '请输入密码' })
    password: string;

    @ApiProperty({ description: '类型' })
    @IsNotEmpty({ message: '请选择身份' })
    role: string;
}
