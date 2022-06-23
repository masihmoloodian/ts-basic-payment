import { compare } from 'bcrypt'
import { RedisService } from 'nestjs-redis'
import { UserService } from 'src/users/user.service'


import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'


import { UserEntity } from '../users/entity/user.entity'
import { OTPStep1Dto } from './dto/otp-step-1.dto'
import { OTPStep2Dto } from './dto/otp-step-2.dto'

@Injectable()
export class AuthService {
    constructor(
        private readonly redisService: RedisService,
        private readonly jwtService: JwtService,
        private readonly userService: UserService
    ) {}

    private async generateRandomNumber() {
        return Math.floor(100000 + Math.random() * 900000).toString()
    }

    async setRedisValue(key: string, value: string): Promise<void> {
        const client = this.redisService.getClient(process.env.REDIS_REGISTERY)
        const oldValue = await client.get(key)
        const exp = parseInt(process.env.REDIS_EXPIRE_TIME)
        // set _id -> code , code -> id   // _id -> code entry will be overwritten if oldcode exists
        const multi = client
            .multi()
            .set(key.toString(), value, 'EX', exp)
            .set(value, key.toString(), 'EX', exp)
        // If oldcode exists remove old code entry
        if (oldValue) multi.del(oldValue)
        await multi.exec()
    }

    async getRedisValueByKey(key: string) {
        const client = this.redisService.getClient(process.env.REDIS_REGISTERY)
        return await client.get(key)
    }

    async loginOTP1(dto: OTPStep1Dto): Promise<any> {
        const user = await this.userService.getUserByUsername(dto.username)

        if (!user) throw new NotFoundException('user not found')
        const isPassMatched = await this.matchPassword(
            dto.password,
            user.password
        )

        if (isPassMatched) {
            const code = await this.generateRandomNumber()
            await this.setRedisValue(`user-otp-${user.id}`, code)
            return `Your code is: ${code}`
        }
        throw new UnauthorizedException()
    }

    async loginOTP2(dto: OTPStep2Dto) {
        const user = await this.userService.getUserByUsername(dto.username)
        const isPassMatched = await this.matchPassword(
            dto.password,
            user.password
        )
        if (isPassMatched) {
            const storedCode = await this.getRedisValueByKey(
                `user-otp-${user.id}`
            )
            if (storedCode == dto.code) {
                const token = this.generateAccessToken(user)
                return token
            }
            throw new UnauthorizedException('Wrong otp code')
        }
        throw new UnauthorizedException('Wrong password')
    }

    async matchPassword(
        planPassword: string,
        encryptPassword: string
    ): Promise<boolean> {
        return compare(planPassword, encryptPassword)
    }

    generateAccessToken(user: UserEntity): Object {
        const payload = { id: user.id }
        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}
