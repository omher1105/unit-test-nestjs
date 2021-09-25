import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, Like} from 'typeorm';
import {CrudnameEntity} from './crudname.entity';
import {CreateCrudnameDTO, ResponseData} from './crudname.dto';
import * as DATABASE_QUERY from '../../constraints/DATABASE_QUERY.json';
import {UtilityFunctions} from "../../helpers/utility";

@Injectable()
export class CrudnameService {

    responseSend: ResponseData;

    constructor(
        @InjectRepository(CrudnameEntity)
        private getcrudnameRepository: Repository<CrudnameEntity>,
    ) {
    }

    async getCrudname(page: number, keyword: string): Promise<CreateCrudnameDTO[]> {
        const QUERY_LIMIT = DATABASE_QUERY.QUERY.LIMIT_PER_QUERY;
        const skip = UtilityFunctions.calculateDatabaseQueryOffset(page, QUERY_LIMIT);

        const Crudname = await this.getcrudnameRepository.find({
            where: [
                {id: Like('%' + keyword + '%')},
                {name: Like('%' + keyword + '%')},
            ],
            take: QUERY_LIMIT,
            skip,
        });

        return Crudname;
    }

    async getCrudnameByparam(id: number) {
        return await this.getcrudnameRepository.findOne({where: {id}});
    }

    async createCrudname(data: CreateCrudnameDTO): Promise<ResponseData> {

        try {
            const Crudname = await this.getcrudnameRepository.create(data);
            await this.getcrudnameRepository.save(Crudname);
            this.responseSend = {
                response: 'OK',
            };
        } catch (error) {
            this.responseSend = {
                response: 'ERROR',
            };
        }

        return this.responseSend;

    }

    async updateCrudname(id: number, data: Partial<CreateCrudnameDTO>) {
        await this.getcrudnameRepository.update({id}, data);
        return await this.getcrudnameRepository.findOne({where: {id}});
    }

    async deleteCrudname(id: number): Promise<ResponseData> {

        try {
            this.getcrudnameRepository.delete({id});
            this.responseSend = {
                response: 'OK',
            };
        } catch (error) {
            this.responseSend = {
                response: 'ERROR',
            };
        }
        return this.responseSend;
    }
}
