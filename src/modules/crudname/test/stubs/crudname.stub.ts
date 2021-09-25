import {CrudnameDTO, ResponseData} from '../../crudname.dto';

export const crudnameStub = (): CrudnameDTO => {
    return {
        id: 1,
        name: 'prueba',
    };
};

export const responseDataStub: ResponseData = {
    response: 'OK',
};
