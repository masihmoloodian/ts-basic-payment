export class Payment {}

import { UserEntity } from 'src/users/entity/user.entity'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'


import { ParentEntity } from '../../shared/base/entity.base'
import { PaymentResponseEnum } from '../enum/payment-response.enum'

@Entity('payments')
export class PaymentEntity extends ParentEntity {
    constructor(payment?: Partial<PaymentEntity>) {
        super()
        this.setArgumentToThisObject(payment)
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    user_id: string

    @Column()
    plan_id: number

    @Column()
    response: PaymentResponseEnum

    @Column()
    code: number

    @ManyToOne(() => UserEntity, (user) => user.payment)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity
}
