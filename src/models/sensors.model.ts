import { model, Schema, Document } from 'mongoose';
import { Sensor } from '@interfaces/sensors.interface';

const sensorSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: { type: Schema.Types.ObjectId, ref: 'Type', required: true },
  subType: { type: Schema.Types.ObjectId, ref: 'SubType', required: true },
  sensorType: { type: Schema.Types.ObjectId, ref: 'SensorType', required: true },
  connectionState: { type: Schema.Types.ObjectId, ref: 'connection_states', required: false },
});

const sensorModel = model<Sensor & Document>('Sensor', sensorSchema);

export default sensorModel;
