import { AfterInsert, AfterRemove, AfterUpdate, BeforeInsert, BeforeRemove, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Report } from "src/reports/report.entity";

@Entity('users')
export class User{


    @PrimaryGeneratedColumn()    
    id: number;

    @Column()
    email: string;
    
    @Column()
    password: string;

    @Column({default: false})
    admin: boolean;

    @OneToMany(() => Report, (report) => report.user)
    reports: Report[];
}