import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { List } from '../lists/list.entity';
import { User } from '../users/user.entity';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  background: string;

  @ManyToOne(() => User, (user) => user.boards)
  owner: User;

  @OneToMany(() => List, (list) => list.board)
  lists: List[];
}
