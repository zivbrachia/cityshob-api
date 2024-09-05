import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import SensorTypesController from '@controllers/sensorTypes.controller';
import { CreateSensorTypeDto } from '@dtos/sensorTypes.dto';

class SensorTypesRoute implements Routes {
  public path = '/sensorTypes';
  public router = Router();
  public sensorTypesController = new SensorTypesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.sensorTypesController.getSensors);
    this.router.get(`${this.path}/:id`, this.sensorTypesController.getSensorById);
    this.router.post(`${this.path}`, validationMiddleware(CreateSensorTypeDto, 'body'), this.sensorTypesController.createSensor);
    this.router.put(`${this.path}/:id`, validationMiddleware(CreateSensorTypeDto, 'body', true), this.sensorTypesController.updateSensor);
    this.router.delete(`${this.path}/:id`, this.sensorTypesController.deleteSensor);
  }
}

export default SensorTypesRoute;
