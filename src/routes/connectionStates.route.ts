import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateTypeDto } from '@dtos/types.dto';
import TypesController from '@controllers/types.controller';
import SubTypesController from '@controllers/subtypes.controller';
import ConnectionStatesController from '@controllers/connectionStates.controller';
import { CreateConnectionTypesDto } from '@dtos/connectionTypes.dto';

class ConnectionStates implements Routes {
  public path = '/connectionStates';
  public router = Router();
  public connectionStatesController = new ConnectionStatesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.connectionStatesController.getConnectionStates);
    // this.router.get(`${this.path}/:id`, this.connectionStatesController.getConnectionStatesById);
    this.router.post(`${this.path}`, validationMiddleware(CreateConnectionTypesDto, 'body'), this.connectionStatesController.createConnection);
    this.router.put(`${this.path}/:id`, validationMiddleware(CreateConnectionTypesDto, 'body', true), this.connectionStatesController.updateConnection);
    this.router.delete(`${this.path}/:id`, this.connectionStatesController.deleteConnection);
  }
}

export default ConnectionStates;
