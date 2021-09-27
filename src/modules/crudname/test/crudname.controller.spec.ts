import {CrudnameController} from '../crudname.controller';
import {CrudnameService} from '../crudname.service';
import {Test} from '@nestjs/testing';
import {crudnameStub, responseDataStub} from './stubs/crudname.stub';
import {CreateCrudnameDTO, CrudnameDTO, ResponseData} from '../crudname.dto';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';

jest.mock('../crudname.service.ts');

describe('Crudname Controller', () => {
    let app: INestApplication;
    let crudnameController: CrudnameController;
    let crudnameService: CrudnameService;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [],
            controllers: [CrudnameController],
            providers: [CrudnameService],
        }).compile();

        app = module.createNestApplication();
        await app.init();

        crudnameController = module.get<CrudnameController>(CrudnameController);
        crudnameService = module.get<CrudnameService>(CrudnameService);
        jest.clearAllMocks();
    });

    test(' should be defined controller', () => {
        expect(crudnameController).toBeDefined();
    });

    test(' should be defined service', () => {
        expect(crudnameService).toBeDefined();
    });

    describe('findAll', () => {
        const queryParams = () => {
            return {page: 1, keyword: ''};
        };

        test('/ (GET)', () => {
            return request(app.getHttpServer())
                .get('/crudname')
                .expect(200);
        });

        describe('when called find all', () => {
            let responseData: CrudnameDTO[];

            beforeEach(async () => {
                responseData = await crudnameController.getCrudname(queryParams());
            });

            test('then it should call service', () => {
                expect(crudnameService.getCrudname).toHaveBeenCalledWith(queryParams().page, queryParams().keyword);
            });

            test('then it should return responseData', () => {
                expect(responseData).toEqual([crudnameStub]);
                expect(responseData).not.toBeNull();
            });
        });
    });

    describe('findById', () => {

        test('/ (GET By ID)', () => {
            return request(app.getHttpServer())
                .get(`/crudname/${crudnameStub().id}`)
                .expect(200);
        });

        describe('when called find by param', () => {
            let responseData: CrudnameDTO;

            beforeEach(async () => {
                responseData = await crudnameController.getCrudnameByparam(crudnameStub().id);
            });

            test('then it should call service', () => {
                expect(crudnameService.getCrudnameByparam).toBeCalledWith(crudnameStub().id);
            });

            test('then it should return responseData', () => {
                expect(responseData).toEqual(crudnameStub);
                expect(responseData).not.toBeNull();
            });
        });
    });

    describe('create', () => {

        it('/ (POST)', () => {
            return request(app.getHttpServer())
                .post('/crudname')
                .send({name: crudnameStub().name})
                .expect(201);
        });

        describe('when create is called', () => {
            let responseData: ResponseData;
            let createCrudnameDTO: CreateCrudnameDTO;

            beforeEach(async () => {
                createCrudnameDTO = {
                    name: crudnameStub().name,
                };
                responseData = await crudnameController.createCrudname(createCrudnameDTO);
            });

            test('then it should call service', () => {
                expect(crudnameService.createCrudname).toHaveBeenCalledWith(createCrudnameDTO);
            });

            test('then it should return responseData', () => {
                expect(responseData).toEqual(responseDataStub);
                expect(responseData).not.toBeNull();
            });
        });
    });

    describe('update', () => {

        it('/ (UPDATE)', () => {
            return request(app.getHttpServer())
                .put(`/crudname/${crudnameStub().id}`)
                .set('Accept', 'application/json')
                .send({name: crudnameStub().name})
                .expect(200);
        });

        describe('when update is called', () => {
            let responseData: CrudnameDTO;
            let updateCrudnameDTO: CreateCrudnameDTO;

            beforeEach(async () => {
                updateCrudnameDTO = {
                    name: crudnameStub().name,
                };
                responseData = await crudnameController.updateCrudname(crudnameStub().id, updateCrudnameDTO);
            });

            test('then it should call service', () => {
                expect(crudnameService.updateCrudname).toHaveBeenCalledWith(crudnameStub().id, updateCrudnameDTO);
            });

            test('then it should return responseData', () => {
                expect(responseData).toEqual(crudnameStub);
                expect(responseData).not.toBeNull();
            });
        });
    });

    describe('delete', () => {

        it('/ (DELETE)', () => {
            return request(app.getHttpServer())
                .delete('/crudname/1')
                .expect(200);
        });

        describe('when delete is called', () => {
            let responseData: ResponseData;

            beforeEach(async () => {
                responseData = await crudnameController.deleteCrudname(crudnameStub().id);
            });

            test('then it should call service', () => {
                expect(crudnameService.deleteCrudname).toHaveBeenCalledWith(crudnameStub().id);
            });

            test('then it should return responseData', () => {
                expect(responseData).toEqual(responseDataStub);
                expect(responseData).not.toBeNull();
            });
        });
    });
});
