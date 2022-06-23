import { IsNotEmpty, IsNumber, IsString } from 'class-validator'


import { ApiProperty } from '@nestjs/swagger'

export class ResponseDTO {
    constructor(
        data: any,
        meta: any = '',
        message: string = 'Success',
        code: number = 200
    ) {
        this.data = data
        this.message = message
        this.code = code
        this.meta = meta
    }

    @ApiProperty()
    @IsNotEmpty()
    data: any

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    code: number

    @ApiProperty()
    @IsNotEmpty()
    meta: any

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    message: string

    static success(
        data: any,
        meta: any = '',
        message: string = 'Success',
        code: number = 200
    ): ResponseDTO {
        return new ResponseDTO(data, meta, message, code)
    }

    static error(
        data: any,
        meta: any = '',
        message: string = 'Error',
        code: number = 400
    ): ResponseDTO {
        return new ResponseDTO(data, meta, message, code)
    }
}
