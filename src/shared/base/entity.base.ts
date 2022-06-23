import { BaseEntity, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm'

export class ParentEntity extends BaseEntity {
    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date

    /**
     * Set received object fields to the entity object.
     * @param obj Received object
     * @param ignores Ignores fields, default item is ['deleted_at', 'updated_at', 'created_at']
     */
    protected setArgumentToThisObject(
        obj: any,
        ignores: string[] = ['deleted_at', 'updated_at', 'created_at']
    ) {
        ignores.concat(['deleted_at', 'updated_at', 'created_at'])
        for (const key in obj) {
            if (ignores.indexOf(key) == -1) this[key] = obj[key]
        }
    }
}
