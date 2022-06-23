import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'


import { ParentEntity } from '../../shared/base/entity.base'
import { RoleEntity } from './role.entity'

@Entity('permissions')
export class PermissionEntity extends ParentEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    name: string

    @Column()
    description: string

    @ManyToMany(() => RoleEntity, (roles) => roles.permissions)
    @JoinTable({ name: 'role_permissions' })
    roles: RoleEntity[]
}
