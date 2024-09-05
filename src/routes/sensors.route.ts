import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateSensorDto } from '@dtos/sensors.dto';
import SensorsController from '@controllers/sensors.controller';

class SensorRoute implements Routes {
  public path = '/sensors';
  public router = Router();
  public sensorsController = new SensorsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.sensorsController.getSensors);
    this.router.get(`${this.path}/:id`, this.sensorsController.getSensorById);
    this.router.post(`${this.path}`, validationMiddleware(CreateSensorDto, 'body'), this.sensorsController.createSensor);
    this.router.put(`${this.path}/:id`, validationMiddleware(CreateSensorDto, 'body', true), this.sensorsController.updateSensor);
    this.router.delete(`${this.path}/:id`, this.sensorsController.deleteSensor);
  }
}

export default SensorRoute;
