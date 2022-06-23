import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'


import { ParentEntity } from '../../shared/base/entity.base'
import { UserEntity } from '../../users/entity/user.entity'
import { PermissionEntity } from './permission.entity'

@Entity('roles')
export class RoleEntity extends ParentEntity {
    constructor(role?: Partial<RoleEntity>) {
        super()
        this.setArgumentToThisObject(role)
    }
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    name: string

    @Column()
    description: string

    @ManyToMany(
        () => UserEntity,
        role => role.roles
    )
    users: UserEntity[]

    @ManyToMany(
        () => PermissionEntity,
        permissions => permissions.roles,
        { eager: true }
    )
    permissions: PermissionEntity[]
}
