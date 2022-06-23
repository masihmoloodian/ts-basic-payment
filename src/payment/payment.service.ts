import { Repository } from 'typeorm'

import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { PaymentEntity } from './entities/payment.entity'
import { PaymentResponseEnum } from './enum/payment-response.enum'

@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(PaymentEntity)
        private readonly paymentRepository: Repository<PaymentEntity>
    ) {}

    async create(userId: string, planId: number) {
        const code = await this.generateRandomNumber()

        return this.paymentRepository.save({
            user_id: userId,
            plan_id: planId,
            response: PaymentResponseEnum.SUCCESS,
            code,
            url: `http://marchhealth.com/${code}`,
        })
    }

    private async generateRandomNumber(): Promise<number> {
        return Number(Math.floor(1000 + Math.random() * 9000).toString())
    }

    getAll() {
        return this.paymentRepository.find()
    }

    async getUserPaymentsById(userId: string, id: number) {
        const payment = await this.paymentRepository.findOne({
            where: { user_id: userId, id },
        })
        if (payment) return payment
        throw new NotFoundException()
    }

    async getAllUserPaymentsById(userId: string) {
        const payment = await this.paymentRepository.find({
            where: { user_id: userId },
        })
        if (payment) return payment
        throw new NotFoundException()
    }

    async deleteUserPaymentsById(userId: string, id: number) {
        const payment = await this.getUserPaymentsById(userId, id)
        return await payment.softRemove()
    }
}
