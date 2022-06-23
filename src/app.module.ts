import { RedisModule } from 'nestjs-redis'


import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'
import { TypeOrmModule } from '@nestjs/typeorm'


import { AuthModule } from './auth/auth.module'
import { PaymentModule } from './payment/payment.module'
import { UsersModule } from './users/user.module'

@Module({
    imports: [
        ScheduleModule.forRoot(),
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        UsersModule,
        AuthModule,
        TypeOrmModule.forRoot(),
        RedisModule.register({
            name: process.env.REDIS_REGISTER_NAME,
            host: process.env.REDIS_HOST,
            port: parseInt(process.env.REDIS_PORT),
        }),
        PaymentModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
