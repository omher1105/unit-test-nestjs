import { Entity, Column, PrimaryGeneratedColumn, BeforeUpdate, PrimaryColumn, Generated } from 'typeorm';

@Entity('crudname')
export class CrudnameEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}