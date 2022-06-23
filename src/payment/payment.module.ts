import { UsersModule } from 'src/users/user.module'


import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'


import { PaymentAdminController } from './controller/payment-admin.controller'
import { PaymentController } from './controller/payment.controller'
import { PaymentEntity } from './entities/payment.entity'
import { PaymentService } from './payment.service'

@Module({
    imports: [TypeOrmModule.forFeature([PaymentEntity]), UsersModule],
    controllers: [PaymentController, PaymentAdminController],
    providers: [PaymentService],
})
export class PaymentModule {}
