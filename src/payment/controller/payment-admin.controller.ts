import { JwtGuard } from 'src/auth/guard/jwt.guard'
import { PermissionGuard } from 'src/auth/guard/permissions.guard'


import { Controller, Get, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'


import { PaymentService } from '../payment.service'

@ApiTags('admin/payments')
@Controller('admin/payments')
export class PaymentAdminController {
    constructor(private readonly paymentService: PaymentService) {}

    @ApiOperation({ summary: 'Get all payment' })
    @ApiBearerAuth()
    @UseGuards(JwtGuard, PermissionGuard)
    @Get()
    getAll() {
        return this.paymentService.getAll()
    }
}
