import { AfterInsert, AfterRemove, AfterUpdate, BeforeInsert, BeforeRemove, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
// import * as bcrypt from 'bcrypt';
@Entity('users')
export class User{


    @PrimaryGeneratedColumn()    
    id: number;

    @Column()
    email: string;
    
    @Column()
    password: string;

    @AfterUpdate()
    afterUpdate() {
        console.log(`after update has been called while updating a user: ${this.email}`);
    }

    @AfterRemove()
    afterRemove() {
        console.log(`after remove has been called while removing a user: ${this.email}`);
    }

    @AfterInsert()
    afterInsert() {
        console.log(`after insert has been called while inserting a user: ${this.email}`);
    }
    // async encryptPassword() {
    //     // if(this.id) return;
    //     // this.email = this.email.toLowerCase();
    //     // this.password = await bcrypt.hash(this.password, this.saltOrRounds);
    // }
}