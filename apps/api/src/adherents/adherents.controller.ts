import { Body, Controller, Post } from '@nestjs/common';
import { AdherentsService } from './adherents.service';
import { CreateAdherentDto } from './dto/create-adherent.dto';

@Controller('adherents')
export class AdherentsController {
  constructor(private readonly adherentsService: AdherentsService) {}

  @Post()
  create(@Body() createAdherentDto: CreateAdherentDto) {
    return this.adherentsService.create(createAdherentDto);
  }
}
