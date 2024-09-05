import { model, Schema, Document, Types } from 'mongoose';
import { SubType } from '@interfaces/subTypes.interface';

const subTypeSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  }
});

const subTypeModel = model<SubType & Document>('SubType', subTypeSchema);

export default subTypeModel;
