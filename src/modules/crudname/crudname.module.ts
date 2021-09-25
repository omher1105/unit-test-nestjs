import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CrudnameEntity } from './crudname.entity';
import { CrudnameController } from './crudname.controller';
import { CrudnameService } from './crudname.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([CrudnameEntity]),
    ],
    controllers: [
        CrudnameController,
    ],
    providers: [
        CrudnameService,
    ],
})
export class CrudnameModule { }
