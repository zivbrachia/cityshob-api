export interface Sensor {
  _id: string;
  name: string;
  type: string;
  subType: string,
  connectionState?: string,
  sensorType: string;
}
