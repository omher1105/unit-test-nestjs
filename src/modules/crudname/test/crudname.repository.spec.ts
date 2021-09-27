import {Test} from '@nestjs/testing';
import {CrudnameEntity} from '../crudname.entity';
import {FilterQuery, Like, Repository} from 'typeorm';
import {getRepositoryToken} from '@nestjs/typeorm';
import {crudnameStub, queryFilters, responseDataStub} from './stubs/crudname.stub';
import {CrudnameService} from '../crudname.service';
import {CreateCrudnameDTO, CrudnameDTO, ResponseData} from '../crudname.dto';
import * as DATABASE_QUERY from '../../../constraints/DATABASE_QUERY.json';
import {UtilityFunctions} from '../../../helpers/utility';

describe('crudname repository', () => {

    let crudnameRepository: Repository<CrudnameEntity>;
    let crudnameService: CrudnameService;

    describe('find operations', () => {

        let filterQuery: FilterQuery<any>;

        beforeEach(async () => {
            const moduleRef = await Test.createTestingModule({
                providers: [
                    CrudnameService,
                    {
                        provide: getRepositoryToken(CrudnameEntity),
                        useClass: Repository,
                    },
                ],
            }).compile();

            crudnameRepository = moduleRef.get(getRepositoryToken(CrudnameEntity));
            crudnameService = moduleRef.get<CrudnameService>(CrudnameService);

            filterQuery = {
                id: crudnameStub().id,
            };

            jest.clearAllMocks();
        });

        test(' should be defined repository', () => {
            expect(crudnameRepository).toBeDefined();
        });

        describe('should return for findAll', () => {

            let responseData: CrudnameDTO[];

            beforeEach(async () => {
                const queryParams = () => {
                    return {
                        page: 1, keyword: '',
                    };
                };
                const QUERY_LIMIT = queryFilters().QUERY.LIMIT_PER_QUERY;
                const skip = UtilityFunctions.calculateDatabaseQueryOffset(queryParams().page, QUERY_LIMIT);
                filterQuery = () => {
                    return  {
                        where: [
                            {id: Like('%' + queryParams().keyword + '%')},
                            {name: Like('%' + queryParams().keyword + '%')},
                        ],
                            take: QUERY_LIMIT,
                            skip,
                    };
                };
                jest.spyOn(crudnameRepository, 'find').mockResolvedValueOnce([crudnameStub() as any]);
                responseData = await crudnameRepository.find(filterQuery);
            });

            test('then it should call records', () => {
                expect(crudnameRepository.find).toBeCalled();
            });

            test('then it should return a record', () => {
                expect(responseData).toEqual([crudnameStub()]);
            });

        });

        describe('should return for findOne', () => {

            let responseData: CrudnameDTO;

            beforeEach(async () => {
                jest.spyOn(crudnameRepository, 'findOne').mockResolvedValueOnce(crudnameStub() as any);
                responseData = await crudnameRepository.findOne(filterQuery);
            });

            test('then it should call records', () => {
                expect(crudnameRepository.findOne).toHaveBeenCalledWith(filterQuery);
            });

            test('then it should return a record', () => {
                expect(responseData).toEqual(crudnameStub());
            });

        });
    });

    describe('create operations', () => {
        let filterQuery: FilterQuery<any>;
        beforeEach(async () => {
            const moduleRef = await Test.createTestingModule({
                providers: [
                    CrudnameService,
                    {
                        provide: getRepositoryToken(CrudnameEntity),
                        useClass: Repository,
                    },
                ],
            }).compile();

            crudnameRepository = moduleRef.get(getRepositoryToken(CrudnameEntity));

            filterQuery = {
                id: crudnameStub().id,
            };

            jest.clearAllMocks();
        });

        test(' should be defined repository', () => {
            expect(crudnameRepository).toBeDefined();
        });

        describe('create', () => {
            describe('when create is called', () => {
                let responseData: CrudnameDTO;
                let saveSpy: jest.SpyInstance;
                let constructorSpy: jest.SpyInstance;

                beforeEach(async () => {
                    constructorSpy = jest.spyOn(Repository.prototype, 'create');
                    jest.spyOn(crudnameRepository, 'create').mockReturnValue(crudnameStub() as any);
                    saveSpy = jest.spyOn(Repository.prototype, 'save');
                    jest.spyOn(crudnameRepository, 'save').mockReturnValue(ResponseData as any);
                    await crudnameRepository.create(crudnameStub());
                    responseData = await crudnameRepository.save(crudnameStub());
                });

                test('then it should call the record', () => {
                    expect(saveSpy).toHaveBeenCalledWith(crudnameStub());
                    expect(constructorSpy).toHaveBeenCalledWith(crudnameStub());
                });

                test('then it should return a record', () => {
                    expect(responseData).toEqual(ResponseData);
                });
            });
        });

        describe('update', () => {
            let responseData: CrudnameDTO;
            let updateCrudnameDTO: Partial<CrudnameDTO>;

            beforeEach(async () => {
                updateCrudnameDTO = {
                    id: crudnameStub().id,
                    name: crudnameStub().name,
                };
                jest.spyOn(crudnameRepository, 'update').mockResolvedValueOnce(crudnameStub() as any);
                responseData = await crudnameRepository.update(filterQuery, updateCrudnameDTO) as any;
            });

            test('then it should call records', () => {
                expect(crudnameRepository.update).toHaveBeenCalledWith(filterQuery, updateCrudnameDTO);
            });

            test('then it should return a record', () => {
                expect(responseData).toEqual(crudnameStub());
            });
        });
    });

    describe('delete operations', () => {

        beforeEach(async () => {
            const moduleRef = await Test.createTestingModule({
                providers: [
                    CrudnameService,
                    {
                        provide: getRepositoryToken(CrudnameEntity),
                        useClass: Repository,
                    },
                ],
            }).compile();

            crudnameRepository = moduleRef.get(getRepositoryToken(CrudnameEntity));

            jest.clearAllMocks();
        });

        test(' should be defined repository', () => {
            expect(crudnameRepository).toBeDefined();
        });

        describe('delete', () => {
            let responseData: ResponseData;

            beforeEach(async () => {
                jest.spyOn(crudnameRepository, 'delete').mockResolvedValueOnce(responseDataStub as any);
                responseData = await crudnameRepository.delete(crudnameStub().id) as any;
            });

            test('then it should call records', () => {
                expect(crudnameRepository.delete).toHaveBeenCalledWith(crudnameStub().id);
            });

            test('then it should return a record', () => {
                expect(responseData).toEqual(responseDataStub);
            });
        });

    });

});
