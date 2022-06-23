import { Test, TestingModule } from '@nestjs/testing';
import { PaymentAdminController } from './payment-admin.controller';

describe('PaymentAdminController', () => {
  let controller: PaymentAdminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentAdminController],
    }).compile();

    controller = module.get<PaymentAdminController>(PaymentAdminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
