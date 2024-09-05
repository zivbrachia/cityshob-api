import { NextFunction, Request, Response } from 'express';
import SensorTypeService from '@services/sensorTypes.service';
import { SensorType } from '@interfaces/sensorTypes.interface';
import { CreateSensorTypeDto } from '@dtos/sensorTypes.dto';

class SensorTypesController {
  public sensorTypesService = new SensorTypeService();

  public getSensors = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllSensors: SensorType[] = await this.sensorTypesService.findAll();

      res.status(200).json({ data: findAllSensors, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getSensorById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const typeId: string = req.params.id;
      const findOneTypeData: SensorType = await this.sensorTypesService.findById(typeId);

      res.status(200).json({ data: findOneTypeData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createSensor = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const typeData: CreateSensorTypeDto = req.body;
      const createTypeData: SensorType = await this.sensorTypesService.create(typeData);

      res.status(201).json({ data: createTypeData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateSensor = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const typeId: string = req.params.id;
      const typeData: CreateSensorTypeDto = req.body;
      const updateTypeData: SensorType = await this.sensorTypesService.update(typeId, typeData);

      res.status(200).json({ data: updateTypeData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteSensor = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const typeId: string = req.params.id;
      const deleteTypeData: SensorType = await this.sensorTypesService.delete(typeId);

      res.status(200).json({ data: deleteTypeData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default SensorTypesController;
