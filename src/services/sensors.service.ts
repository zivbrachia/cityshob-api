import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { Sensor } from '@interfaces/sensors.interface';
import { CreateSensorDto } from '@dtos/sensors.dto';
import sensorModel from '@models/sensors.model';

class SensorService {
  public sensors = sensorModel;

  public async findAll(pipeline: any): Promise<Sensor[]> {
    // return this.sensors.find(filter).populate('type subType connectionState sensorType');
    return this.sensors.aggregate(pipeline).exec();
  }

  public async findById(sensorId: string): Promise<Sensor> {
    if (isEmpty(sensorId)) throw new HttpException(400, "sensorId is empty");

    const findType: Sensor = await this.sensors.findOne({ _id: sensorId });
    if (!findType) throw new HttpException(409, "sensor doesn't exist");

    return findType;
  }

  public async create(sensorData: CreateSensorDto): Promise<Sensor> {
    if (isEmpty(sensorData)) throw new HttpException(400, "sensorData is empty");

    return this.sensors.create(sensorData);
  }

  public async update(sensorId: string, sensorData: CreateSensorDto): Promise<Sensor> {
    if (isEmpty(sensorData)) throw new HttpException(400, "typeData is empty");

    const updateTypeById: Sensor = await this.sensors.findByIdAndUpdate(sensorId, sensorData);
    if (!updateTypeById) throw new HttpException(409, "Type doesn't exist");

    return updateTypeById;
  }

  public async delete(sensorId: string): Promise<Sensor> {
    const deleteSensorById: Sensor = await this.sensors.findByIdAndDelete(sensorId);
    if (!deleteSensorById) throw new HttpException(409, "Type doesn't exist");

    return deleteSensorById;
  }
}

export default SensorService;
