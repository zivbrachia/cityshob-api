import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateTypeDto } from '@dtos/types.dto';
import TypesController from '@controllers/types.controller';
import { CreateSubTypeDto } from '@dtos/subtypes.dto';
import SubTypesController from '@controllers/subtypes.controller';

class TypesRoute implements Routes {
  public path = '/types';
  public router = Router();
  public typesController = new TypesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.typesController.getTypes);
    this.router.get(`${this.path}/:id`, this.typesController.getTypeById);
    this.router.post(`${this.path}`, validationMiddleware(CreateTypeDto, 'body'), this.typesController.createType);
    this.router.put(`${this.path}/:id`, validationMiddleware(CreateTypeDto, 'body', true), this.typesController.updateType);
    this.router.delete(`${this.path}/:id`, this.typesController.deleteType);
  }
}

export default TypesRoute;
