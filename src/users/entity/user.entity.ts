import { hash } from 'bcrypt'
import { PaymentEntity } from 'src/payment/entities/payment.entity'
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm'


import { RoleEntity } from '../../auth/entity/role.entity'
import { ParentEntity } from '../../shared/base/entity.base'

@Entity('users')
export class UserEntity extends ParentEntity {
    constructor(user?: Partial<UserEntity>) {
        super()
        this.setArgumentToThisObject(user)
    }

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ unique: true, nullable: true })
    user_name?: string

    @Column({ nullable: true })
    password?: string

    @OneToMany(() => PaymentEntity, (payment) => payment.user)
    payment: PaymentEntity[]

    @ManyToMany(() => RoleEntity, (role) => role.users, { eager: true })
    @JoinTable({ name: 'user_roles' })
    roles: RoleEntity[]

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.password) {
            this.password = await hash(this.password, process.env.SALT_HASH)
        }
    }
    clean(): any {
        const result = this
        delete result.deleted_at
        delete result.updated_at
        delete result.created_at
        delete result.password
        return result
    }
}
