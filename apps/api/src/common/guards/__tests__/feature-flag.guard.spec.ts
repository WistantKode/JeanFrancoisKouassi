import { FeatureFlagGuard } from '../feature-flag.guard';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ExecutionContext, NotFoundException } from '@nestjs/common';

describe('FeatureFlagGuard', () => {
  let guard: FeatureFlagGuard;
  let reflector: Reflector;
  let configService: ConfigService;

  beforeEach(() => {
    reflector = new Reflector();
    configService = new ConfigService();
    guard = new FeatureFlagGuard(reflector, configService);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should return true if no flag is defined', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(null);
    const context = {
      getHandler: jest.fn(),
      getClass: jest.fn(),
    } as unknown as ExecutionContext;

    expect(guard.canActivate(context)).toBe(true);
  });

  it('should return true if flag is enabled (true)', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue('TEST_FLAG');
    jest.spyOn(configService, 'get').mockReturnValue('true');
    const context = {
      getHandler: jest.fn(),
      getClass: jest.fn(),
    } as unknown as ExecutionContext;

    expect(guard.canActivate(context)).toBe(true);
  });

  it('should throw NotFoundException if flag is disabled (false)', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue('TEST_FLAG');
    jest.spyOn(configService, 'get').mockReturnValue('false');
    const context = {
      getHandler: jest.fn(),
      getClass: jest.fn(),
    } as unknown as ExecutionContext;

    expect(() => guard.canActivate(context)).toThrow(NotFoundException);
  });

  it('should throw NotFoundException if flag is missing (undefined)', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue('TEST_FLAG');
    jest.spyOn(configService, 'get').mockReturnValue(undefined);
    const context = {
      getHandler: jest.fn(),
      getClass: jest.fn(),
    } as unknown as ExecutionContext;

    expect(() => guard.canActivate(context)).toThrow(NotFoundException);
  });
});
