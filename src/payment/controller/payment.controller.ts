import { JwtGuard } from 'src/auth/guard/jwt.guard'
import { User } from 'src/shared/decorators/user.decorator'
import { UserEntity } from 'src/users/entity/user.entity'


import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'


import { UpdatePaymentDto } from '../dto/update-payment.dto'
import { PaymentService } from '../payment.service'

@ApiTags('payments')
@Controller('payments')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    @ApiOperation({ summary: 'Create payment' })
    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @Post(':planId')
    create(@User() user: UserEntity, @Param('planId') planId: number) {
        return this.paymentService.create(user.id, planId)
    }

    @ApiOperation({ summary: 'Get all user payment by id' })
    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @Get()
    getAllUserPaymentsById(@User() user: UserEntity) {
        return this.paymentService.getAllUserPaymentsById(user.id)
    }

    @ApiOperation({ summary: 'Get a user payment by id' })
    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @Get(':id')
    getUserPaymentsById(@User() user: UserEntity, @Param('id') id: string) {
        return this.paymentService.getUserPaymentsById(user.id, +id)
    }

    @ApiOperation({ summary: 'Delete a user payment by id' })
    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @Delete(':id')
    deleteUserPaymentsById(@User() user: UserEntity, @Param('id') id: string) {
        return this.paymentService.deleteUserPaymentsById(user.id, +id)
    }

    @ApiOperation({ summary: 'Update a user payment by id' })
    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @Patch(':id')
    async updateUserPaymentsById(
        @User() user: UserEntity,
        @Body() dto: UpdatePaymentDto,
        @Param('id') id: number
    ) {
        const payment = await this.paymentService.getUserPaymentsById(
            user.id,
            id
        )
        Object.assign(payment, dto)
        return await payment.save()
    }
}
