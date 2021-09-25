import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from './../src/app.module';
import {CrudnameModule} from '../src/modules/crudname/crudname.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {crudnameStub} from '../src/modules/crudname/test/stubs/crudname.stub';

describe('AppController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule, CrudnameModule, TypeOrmModule.forRoot()],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });
});
