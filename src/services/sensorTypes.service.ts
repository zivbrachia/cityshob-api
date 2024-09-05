import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import sensorTypeModel from '@models/sensorTypes.model';
import { SensorType } from '@interfaces/sensorTypes.interface';
import { CreateSensorTypeDto } from '@dtos/sensorTypes.dto';

class SensorTypeService {
  public sensors = sensorTypeModel;

  public async findAll(): Promise<SensorType[]> {
    return this.sensors.find();
  }

  public async findById(sensorId: string): Promise<SensorType> {
    if (isEmpty(sensorId)) throw new HttpException(400, "sensorId is empty");

    const findType: SensorType = await this.sensors.findOne({ _id: sensorId });
    if (!findType) throw new HttpException(409, "sensor doesn't exist");

    return findType;
  }

  public async create(sensorData: CreateSensorTypeDto): Promise<SensorType> {
    if (isEmpty(sensorData)) throw new HttpException(400, "sensorData is empty");

    const findType: SensorType = await this.sensors.findOne({ name: sensorData.name });
    if (findType) throw new HttpException(409, `This name ${sensorData.name} already exists`);

    return this.sensors.create(sensorData);
  }

  public async update(sensorId: string, sensorData: CreateSensorTypeDto): Promise<SensorType> {
    if (isEmpty(sensorData)) throw new HttpException(400, "typeData is empty");

    const updateTypeById: SensorType = await this.sensors.findByIdAndUpdate(sensorId, sensorData);
    if (!updateTypeById) throw new HttpException(409, "Type doesn't exist");

    return updateTypeById;
  }

  public async delete(sensorId: string): Promise<SensorType> {
    const deleteSensorById: SensorType = await this.sensors.findByIdAndDelete(sensorId);
    if (!deleteSensorById) throw new HttpException(409, "Type doesn't exist");

    return deleteSensorById;
  }
}

export default SensorTypeService;
