import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository, UpdateResult } from 'typeorm';
import { AnimalEntity } from './app.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(AnimalEntity)
    private readonly animalRepository: Repository<AnimalEntity>,
  ) {}

  async getAnimal(): Promise<AnimalEntity[] | { Message: string }> {
    const data: any = await this.animalRepository.find();
    if (data.length > 0) {
      return data;
    }
    return { Message: 'No data found in the database' };
  }

  createAnimal(name: string): Promise<InsertResult> {
    try {
      return this.animalRepository.insert({ Name: name });
    } catch (err) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: err.message,
      });
    }
  }

  async findAnimalByID(ID: number) {
    const data = await this.animalRepository.findOne({ where: { ID } });
    if (!data) {
      throw new NotFoundException({
        Message: 'Data has not found',
        Code: 'data_has_not_found',
      });
    }
    return data;
  }

  async deleteCodeByID(ID: number) {
    // for validation purpose
    await this.findAnimalByID(ID);
    try {
      const deleteDataByIDQuery = await this.animalRepository.delete({ ID });
      return deleteDataByIDQuery;
    } catch (err) {
      throw err;
    }
  }

  async updateAnimalByID(ID: number, name: string): Promise<UpdateResult> {
    // for validation purpose
    await this.findAnimalByID(ID);
    try {
      const updateDataByIDQuery = await this.animalRepository.update(
        {
          ID,
        },
        {
          Name: name,
        },
      );
      return updateDataByIDQuery;
    } catch (err) {
      throw err;
    }
  }
}
