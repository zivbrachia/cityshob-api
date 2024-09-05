import { model, Schema, Document } from 'mongoose';
import { Type } from '@interfaces/types.interface';
import { ConnectionState } from '@interfaces/connectionStates.interface';

const connectionStateSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  backgroundColor: {
    type: String,
    required: true
  }
});

const connectionStatesModel = model<ConnectionState & Document>('connection_states', connectionStateSchema);

export default connectionStatesModel;
