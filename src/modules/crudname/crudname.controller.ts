import {Controller, Get, Post, Put, Delete, Body, Param, Query, Optional} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudnameService } from './crudname.service';
import { GetCrudnameDTO, CreateCrudnameDTO } from './crudname.dto';

@ApiTags('Crudname')
@Controller('crudname')
export class CrudnameController {
    constructor(private crudnameService: CrudnameService) { }

    @Get('/')
    getCrudname(@Query() { page = 1, keyword = '' }: GetCrudnameDTO) {
        return this.crudnameService.getCrudname(page, keyword);
    }

    @Get('/:id')
    getCrudnameByparam(@Param('id') id: number) {
        return this.crudnameService.getCrudnameByparam(id);
    }

    @Post('/')
    createCrudname(@Body() data: CreateCrudnameDTO) {
        return this.crudnameService.createCrudname(data);
    }

    @Put('/:id')
    updateCrudname(@Param('id') id: number, @Body() data: CreateCrudnameDTO) {
        return this.crudnameService.updateCrudname(id, data);
    }

    @Delete('/:id')
    deleteCrudname(@Param('id') id: number) {
        return this.crudnameService.deleteCrudname(id);
    }
}
