import { Test, TestingModule } from '@nestjs/testing'


import { PaymentService } from '../payment.service'
import { PaymentController } from './payment.controller'

describe('PaymentController', () => {
    let controller: PaymentController

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PaymentController],
            providers: [PaymentService],
        }).compile()

        controller = module.get<PaymentController>(PaymentController)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })
})
