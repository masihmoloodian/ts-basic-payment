import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'


import { UserService } from '../user.service'

@ApiTags('user/admin')
@Controller('user/admin')
export class UserAdminController {
    constructor(private readonly userService: UserService) {}
}
