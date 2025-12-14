import { Test, TestingModule } from '@nestjs/testing';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { UserRole } from '@prisma/client';
import { JwtPayload } from '../auth/types/jwt-payload.type';

describe('EventsController', () => {
  let controller: EventsController;

  const mockEventsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockUser: JwtPayload = {
    sub: 'organizer-id',
    email: 'event@jfk.ci',
    role: UserRole.EVENT_ADMIN,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [
        {
          provide: EventsService,
          useValue: mockEventsService,
        },
      ],
    }).compile();

    controller = module.get<EventsController>(EventsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create an event', async () => {
      const dto: CreateEventDto = {
        title: 'Event',
        slug: 'event',
        description: 'Desc',
        startDate: '2025-01-01',
        endDate: '2025-01-02',
        location: 'Abidjan',
      };

      mockEventsService.create.mockResolvedValue({ id: '1', ...dto });

      const result = await controller.create(dto, mockUser);

      expect(mockEventsService.create).toHaveBeenCalledWith(dto, mockUser.sub);
      expect(result).toEqual({ id: '1', ...dto });
    });
  });

  describe('findAll', () => {
    it('should return all events', async () => {
      const result = [{ id: '1', title: 'Event' }];
      mockEventsService.findAll.mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return one event', async () => {
      const result = { id: '1', title: 'Event' };
      mockEventsService.findOne.mockResolvedValue(result);

      expect(await controller.findOne('1')).toBe(result);
    });
  });

  describe('update', () => {
    it('should update an event', async () => {
      const dto: UpdateEventDto = { title: 'Updated' };
      const result = { id: '1', ...dto };
      mockEventsService.update.mockResolvedValue(result);

      expect(await controller.update('1', dto)).toBe(result);
      expect(mockEventsService.update).toHaveBeenCalledWith('1', dto);
    });
  });

  describe('remove', () => {
    it('should remove an event', async () => {
      const result = { id: '1', title: 'Deleted' };
      mockEventsService.remove.mockResolvedValue(result);

      expect(await controller.remove('1')).toBe(result);
      expect(mockEventsService.remove).toHaveBeenCalledWith('1');
    });
  });
});
