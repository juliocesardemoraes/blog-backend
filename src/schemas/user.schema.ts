import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

/**
 * Schema for the user
 * @param {string} name
 * @param {string} password
 */
@Schema()
export class User {
  @Prop({ type: String, unique: true })
  name;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
