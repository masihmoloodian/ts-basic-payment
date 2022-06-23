import { ApiProperty } from '@nestjs/swagger'


import { PaymentResponseEnum } from '../enum/payment-response.enum'

export class CreatePaymentDto {
    @ApiProperty()
    plan_id: number

    @ApiProperty({ enum: PaymentResponseEnum })
    response: PaymentResponseEnum

    @ApiProperty()
    code: number
}
