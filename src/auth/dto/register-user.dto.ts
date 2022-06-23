import { IsNotEmpty, IsOptional } from 'class-validator'


import { ApiProperty } from '@nestjs/swagger'

export class RegisterUserDto {
    @ApiProperty()
    @IsOptional()
    username: string

    @ApiProperty()
    @IsNotEmpty()
    password: string
}
