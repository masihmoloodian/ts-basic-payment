import { config } from 'dotenv'
import { RegisterUserDto } from 'src/auth/dto/register-user.dto'
import { Repository } from 'typeorm'


import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common'
import { HttpException } from '@nestjs/common/exceptions/http.exception'
import { InjectRepository } from '@nestjs/typeorm'


import { UserEntity } from './entity/user.entity'

config()
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>
    ) {}

    async getUserById(id: string): Promise<UserEntity> {
        const userFound = await this.usersRepository.findOne({
            where: { id },
        })

        if (!userFound)
            throw new HttpException('User not found.', HttpStatus.NOT_FOUND)
        return userFound
    }

    async createByUserName(dto: RegisterUserDto) {
        const user = await this.usersRepository.findOne({
            where: { user_name: dto.username },
        })
        if (user) throw new BadRequestException('User exists')
        return await this.usersRepository.save(
            new UserEntity({
                ...dto,
                user_name: dto.username,
            })
        )
    }

    async getUserByUsername(username: string): Promise<UserEntity> {
        const user = await this.usersRepository.findOne({
            user_name: username,
        })
        if (!user) throw new HttpException('User not found', 404)
        return user
    }
}
