import { NextFunction, Request, Response } from 'express';
import { Sensor } from '@interfaces/sensors.interface';
import SensorService from '@services/sensors.service';
import { CreateSensorDto } from '@dtos/sensors.dto';
import { Types } from 'mongoose';

class SensorsController {
  public sensorsService = new SensorService();

  private setPipeline(req: Request) {
    const { types, freeText } = req.query;

    const typeArray = types ? types.toString().split(',') : [];
    const pipeline = [];
    // type
    pipeline.push({
      $lookup: {
        from: 'types', // The collection name of 'Type'
        localField: 'type',
        foreignField: '_id',
        as: 'type',
      },
    });
    pipeline.push({ $unwind: '$type' });

    // subType
    pipeline.push({
        $lookup: {
          from: 'subtypes', // The collection name of 'SubType'
          localField: 'subType',
          foreignField: '_id',
          as: 'subType',
        },
      });
    pipeline.push({ $unwind: '$subType' });

    // sensorType
    pipeline.push({
        $lookup: {
          from: 'sensortypes', // The collection name of 'SensorType'
          localField: 'sensorType',
          foreignField: '_id',
          as: 'sensorType',
        },
      });
    pipeline.push({ $unwind: '$sensorType' });

    if (typeArray.length) {
      pipeline.push(...[
        {
          $match: {
            'type._id': { $in: typeArray.map(id => new Types.ObjectId(id)) },
          },
        },
      ]);
    }

    if (freeText) {
      const regexPattern = new RegExp(freeText.toString(), 'i'); // Case-insensitive regex pattern
      pipeline.push({
        $match: {
          $or: [
            { 'name': { $regex: regexPattern } },
            { 'type.name': { $regex: regexPattern } },
            { 'subType.name': { $regex: regexPattern } },
            { 'sensorType.name': { $regex: regexPattern } },
          ],
        },
      })
    }




    return pipeline;
  }

  public getSensors = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // const filter = this.setFilter(req);
      const pipeline = this.setPipeline(req);
      const findAllSensors: Sensor[] = await this.sensorsService.findAll(pipeline);

      res.status(200).json({ data: findAllSensors, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getSensorById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const typeId: string = req.params.id;
      const findOneTypeData: Sensor = await this.sensorsService.findById(typeId);

      res.status(200).json({ data: findOneTypeData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createSensor = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sensorData: CreateSensorDto = req.body;
      const createTypeData: Sensor = await this.sensorsService.create(sensorData);

      res.status(201).json({ data: createTypeData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateSensor = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sensorId: string = req.params.id;
      const sensorData: CreateSensorDto = req.body;
      const updateTypeData: Sensor = await this.sensorsService.update(sensorId, sensorData);

      res.status(200).json({ data: updateTypeData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteSensor = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const typeId: string = req.params.id;
      const deleteTypeData: Sensor = await this.sensorsService.delete(typeId);

      res.status(200).json({ data: deleteTypeData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default SensorsController;
