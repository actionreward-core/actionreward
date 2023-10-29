import { Test, TestingModule } from '@nestjs/testing';
import { ClientapiController } from './clientapi.controller';

describe('ClientapiController', () => {
  let controller: ClientapiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientapiController],
    }).compile();

    controller = module.get<ClientapiController>(ClientapiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
