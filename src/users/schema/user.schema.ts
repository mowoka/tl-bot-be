import {Schema ,Prop, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User{
    @Prop()
    userId: string;

    @Prop()
    nik : number
    
    @Prop()
    name : string

    @Prop()
    idTelegram :string

    @Prop()
    namaMitra : string

    @Prop()
    secktor :string

    @Prop()
    witel : string

    @Prop()
    regional :string

    @Prop()
    point : number

    @Prop()
    password: string
}

export const UserSchema = SchemaFactory.createForClass(User)