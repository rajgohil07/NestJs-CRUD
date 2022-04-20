import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AnimalEntity } from './app.entity';
import { AppService } from './app.service';
import { PostgresDataSource } from './config/database-config';

@Module({
  imports: [
    TypeOrmModule.forRoot(PostgresDataSource),
    TypeOrmModule.forFeature([AnimalEntity]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
