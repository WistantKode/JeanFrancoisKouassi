import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { UserRole } from '@prisma/client';
import { JwtPayload } from '../auth/types/jwt-payload.type';

describe('ArticlesController', () => {
  let controller: ArticlesController;
  let service: ArticlesService;

  const mockArticlesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockUser: JwtPayload = {
    sub: 'user-id',
    email: 'test@jfk.ci',
    role: UserRole.BLOG_ADMIN,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticlesController],
      providers: [
        {
          provide: ArticlesService,
          useValue: mockArticlesService,
        },
      ],
    }).compile();

    controller = module.get<ArticlesController>(ArticlesController);
    service = module.get<ArticlesService>(ArticlesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create an article', async () => {
      const dto: CreateArticleDto = {
        title: 'Test Article',
        slug: 'test-article',
        content: 'Content',
      };

      mockArticlesService.create.mockResolvedValue({ id: '1', ...dto });

      const result = await controller.create(dto, mockUser);

      expect(service.create).toHaveBeenCalledWith(dto, mockUser.sub);
      expect(result).toEqual({ id: '1', ...dto });
    });
  });

  describe('findAll', () => {
    it('should return an array of articles', async () => {
      const result = [{ id: '1', title: 'Test' }];
      mockArticlesService.findAll.mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a single article', async () => {
      const result = { id: '1', title: 'Test' };
      mockArticlesService.findOne.mockResolvedValue(result);

      expect(await controller.findOne('1')).toBe(result);
    });
  });

  describe('update', () => {
    it('should update an article', async () => {
      const dto: UpdateArticleDto = { title: 'Updated' };
      const result = { id: '1', ...dto };
      mockArticlesService.update.mockResolvedValue(result);

      expect(await controller.update('1', dto)).toBe(result);
      expect(service.update).toHaveBeenCalledWith('1', dto);
    });
  });

  describe('remove', () => {
    it('should remove an article', async () => {
      const result = { id: '1', title: 'Deleted' };
      mockArticlesService.remove.mockResolvedValue(result);

      expect(await controller.remove('1')).toBe(result);
      expect(service.remove).toHaveBeenCalledWith('1');
    });
  });
});
