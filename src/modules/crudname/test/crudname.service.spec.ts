import {FilterQuery, Like, Repository} from 'typeorm';
import {CrudnameEntity} from '../crudname.entity';
import {CrudnameService} from '../crudname.service';
import {Test} from '@nestjs/testing';
import {getRepositoryToken} from '@nestjs/typeorm';
import {CrudnameDTO, ResponseData} from '../crudname.dto';
import {crudnameStub} from './stubs/crudname.stub';

describe('crudname service', () => {

    let filterQuery: FilterQuery<any>;
    let crudnameService: CrudnameService;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                CrudnameService,
                {
                    provide: getRepositoryToken(CrudnameEntity),
                    useClass: Repository,
                },
            ],
        }).compile();

        crudnameService = moduleRef.get<CrudnameService>(CrudnameService);

        filterQuery = {
            id: crudnameStub().id,
        };

        jest.clearAllMocks();
    });

    test('should be defined crudnameService', () => {
        expect(crudnameService).toBeDefined();
    });

    describe('should call records', () => {
        test('called get all api', async () => {

            const queryParams = () => {
                return {
                    page: 1, keyword: '',
                };
            };
            crudnameService.getCrudname(queryParams().page, queryParams().keyword)
                .then(result => {
                    expect(result).not.toBeNull();
                }).catch(err => expect(400));
        });
    });

    describe('should call record by param', () => {
        test('called getById api', async () => {
            crudnameService.getCrudnameByparam(crudnameStub().id)
                .then(result => {
                    expect(result).not.toBeNull();
                }).catch(err => expect(400));
        });
    });

    describe('should call save', () => {
        describe('called post api', () => {
            let responseData: ResponseData;

            beforeEach(async () => {
                responseData = await crudnameService.createCrudname(crudnameStub());
            });

            test(' should be defined data', () => {
                expect(responseData).not.toBeNull();
            });
        });
    });

    describe('should call update', () => {
        test('call update api', async () => {
            let updateCrudnameDTO: Partial<CrudnameDTO>;

            updateCrudnameDTO = {
                id: crudnameStub().id,
                name: crudnameStub().name,
            };
            crudnameService.updateCrudname(crudnameStub().id, updateCrudnameDTO)
                .then(result => {
                    expect(result).not.toBeNull();
                }).catch(err => expect(400));

        });
    });

    describe('should call delete record by param', () => {
        describe('called delete api', () => {
            let responseData: ResponseData;

            beforeEach(async () => {
                responseData = await crudnameService.deleteCrudname(crudnameStub().id);
            });

            test(' should be defined data', () => {
                expect(responseData).not.toBeNull();
            });
        });
    });
});
