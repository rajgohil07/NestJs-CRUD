import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { AnimalEntity } from './app.entity';
import { AppService } from './app.service';

@Controller('animal')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // all listing
  @Get('list')
  getAnimal(): Promise<any[] | { Message: string }> {
    return this.appService.getAnimal();
  }

  // create animal
  @Post('create')
  createAnimal(@Body('name') name): Promise<any> {
    return this.appService.createAnimal(name);
  }

  // get animal by id
  @Get('byid/:ID')
  findAnimalByID(@Param('ID') ID: number): Promise<AnimalEntity> {
    return this.appService.findAnimalByID(ID);
  }

  // delete animal by id
  @Delete('delete/:ID')
  deleteCodeByID(@Param('ID') ID: number): Promise<DeleteResult> {
    return this.appService.deleteCodeByID(ID);
  }

  @Put('update/:ID')
  updateAnimalByID(
    @Param('ID') ID: number,
    @Body('name') name: string,
  ): Promise<UpdateResult> {
    return this.appService.updateAnimalByID(ID, name);
  }
}
