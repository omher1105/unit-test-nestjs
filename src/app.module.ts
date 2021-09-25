import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrudnameModule } from './modules/crudname/crudname.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    CrudnameModule,
  ],
})
export class AppModule { }
