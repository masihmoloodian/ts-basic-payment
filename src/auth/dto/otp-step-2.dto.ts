import { IsNotEmpty } from 'class-validator'


import { ApiProperty } from '@nestjs/swagger'


import { OTPStep1Dto } from './otp-step-1.dto'

export class OTPStep2Dto extends OTPStep1Dto {
    @ApiProperty()
    @IsNotEmpty()
    code: string
}
