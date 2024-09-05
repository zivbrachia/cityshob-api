import { model, Schema, Document } from 'mongoose';
import { Type } from '@interfaces/types.interface';

const typeSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  }
});

const typeModel = model<Type & Document>('Type', typeSchema);

export default typeModel;
