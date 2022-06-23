import { Body, Controller, Post } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'


import { ResponseDTO } from '../../shared/dto/response.dto'
import { UserService } from '../../users/user.service'
import { AuthService } from '../auth.service'
import { OTPStep1Dto } from '../dto/otp-step-1.dto'
import { OTPStep2Dto } from '../dto/otp-step-2.dto'
import { RegisterUserDto } from '../dto/register-user.dto'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) {}

    @ApiOperation({ summary: 'Register new user' })
    @Post('register')
    async register(@Body() dto: RegisterUserDto): Promise<ResponseDTO> {
        const user = await this.userService.createByUserName(dto)
        return new ResponseDTO(user.clean())
    }

    @ApiOperation({ summary: 'Login  step 1' })
    @Post('code')
    async loginOTP1(@Body() dto: OTPStep1Dto): Promise<ResponseDTO> {
        const user = await this.authService.loginOTP1(dto)
        return new ResponseDTO(user)
    }

    @ApiOperation({ summary: 'Login Step 2' })
    @Post('login')
    async loginOTP2(@Body() dto: OTPStep2Dto): Promise<ResponseDTO> {
        const token = await this.authService.loginOTP2(dto)
        return new ResponseDTO(token)
    }
}
