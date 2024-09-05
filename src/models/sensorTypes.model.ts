import { model, Schema, Document } from 'mongoose';
import { SensorType } from '@interfaces/sensorTypes.interface';

const sensorTypeSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  }
});

const sensorTypeModel = model<SensorType & Document>('SensorType', sensorTypeSchema);


export default sensorTypeModel;
