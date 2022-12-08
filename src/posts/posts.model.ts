import {
  Column,
  PrimaryKey,
  Model,
  Table,
  Length,
  Default,
} from 'sequelize-typescript';

@Table
export class Posts extends Model {
  @PrimaryKey
  @Column
  id: number;

  @Column
  @Length({ min: 3, max: 50 })
  title: string;

  @Column
  @Length({ min: 2, max: 20 })
  author: string;

  @Column
  content: string;

  @Column({ defaultValue: '' })
  thumb_url: string;
}
