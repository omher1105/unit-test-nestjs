import {crudnameStub, responseDataStub} from '../test/stubs/crudname.stub';

export const CrudnameService = jest.fn().mockReturnValue({
    getCrudname: jest.fn().mockResolvedValue([crudnameStub]),
    getCrudnameByparam: jest.fn().mockResolvedValue(crudnameStub),
    createCrudname: jest.fn().mockResolvedValue(responseDataStub),
    updateCrudname: jest.fn().mockResolvedValue(crudnameStub),
    deleteCrudname: jest.fn().mockReturnValue(responseDataStub),
});
