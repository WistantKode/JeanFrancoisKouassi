import { Injectable, Logger } from '@nestjs/common';
import { CreateAdherentDto } from './dto/create-adherent.dto';

@Injectable()
export class AdherentsService {
  private readonly logger = new Logger(AdherentsService.name);

  create(createAdherentDto: CreateAdherentDto) {
    this.logger.log('New adherent registration:', createAdherentDto);
    // In a real app, save to DB here
    return {
      message: 'Adhesion successful',
      data: createAdherentDto,
    };
  }
}
