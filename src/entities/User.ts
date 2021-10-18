import { IsEmail, IsPhoneNumber, Length } from "class-validator";
import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity("users")
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column({ type: "varchar", length: 255, unique: true })
  @Index({ unique: true })
  @Length(3, 30, { message: "Username can be 3 to 30 characters" })
  username: string;

  @Field()
  @Column({ type: "varchar", length: 255, unique: true })
  @Index({ unique: true })
  @IsEmail(
    { domain_specific_validation: true },
    { message: "Enter a valid email address" }
  )
  email: string;

  @Field()
  @Column({ type: "varchar", length: 255, unique: true, nullable: true })
  @Index({ unique: true })
  @IsPhoneNumber(undefined, { message: "Enter a valid phone number" })
  phone: string;

  @Column({ type: "varchar", length: 255 })
  password: string;

  @Column({ default: false })
  verified: boolean;

  @Column({ default: false })
  locked: boolean;

  @Field()
  @CreateDateColumn({ name: "created_at", type: "timestamp with time zone" })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: "updated_at", type: "timestamp with time zone" })
  updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at", type: "timestamp with time zone" })
  deletedAt: Date;
}
