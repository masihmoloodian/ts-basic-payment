import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'


import { UserService } from '../../users/user.service'

@Injectable()
export class PermissionGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private readonly userService: UserService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requestPermissions = this.reflector.get<string[]>(
            'permissions',
            context.getHandler()
        )
        if (!requestPermissions) return true
        const request = context.switchToHttp().getRequest()
        const userFound = await this.userService.getUserById(request.user.id)
        if (userFound.user_name === process.env.SUPER_USER_USERNAME) return true
        const permissions: Set<string> = new Set()
        for (const role of userFound.roles) {
            for (const perm of role.permissions) {
                permissions.add(perm.name)
            }
        }
        return requestPermissions.some((permElement: string | []) => {
            if (typeof permElement === 'string') {
                if (permissions.has(permElement)) return true
            } else
                return permElement.every((permElementAnd: string) =>
                    permissions.has(permElementAnd)
                )
        })
    }
}
