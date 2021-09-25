import { ApiProperty } from '@nestjs/swagger';


export class CrudnameDTO {
    id?: number;
    @ApiProperty({
        description: 'description',
        required: true,
    })
    name: string;
}

export class CreateCrudnameDTO {
    @ApiProperty({
        description: 'description',
        required: true,
    })
    name: string;
}

export class GetCrudnameDTO {
    @ApiProperty({
        description: 'Page number',
        default: 1,
        required: false,
    })
    page: number;

    @ApiProperty({
        description: 'Search Keyword',
        default: '',
        required: false,
    })
    keyword: string;
}

export class ResponseData {
    @ApiProperty()
    response: string;
}

