import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateTypeDto } from '@dtos/types.dto';
import TypesController from '@controllers/types.controller';
import SubTypesController from '@controllers/subtypes.controller';

class SubTypesRoute implements Routes {
  public path = '/subtypes';
  public router = Router();
  public subTypesController = new SubTypesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.subTypesController.getSubTypes);
    this.router.get(`${this.path}/:id`, this.subTypesController.getSubTypeById);
    this.router.post(`${this.path}`, validationMiddleware(CreateTypeDto, 'body'), this.subTypesController.createSubType);
    this.router.put(`${this.path}/:id`, validationMiddleware(CreateTypeDto, 'body', true), this.subTypesController.updateSubType);
    this.router.delete(`${this.path}/:id`, this.subTypesController.deleteSubType);
  }
}

export default SubTypesRoute;
