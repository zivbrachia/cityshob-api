import { NextFunction, Request, Response } from 'express';
import { ConnectionState } from '@interfaces/connectionStates.interface';
import ConnectionStatesService from '@services/connectionStates.service';
import { CreateTypeDto } from '@dtos/types.dto';
import { Type } from '@interfaces/types.interface';
import { CreateConnectionTypesDto } from '@dtos/connectionTypes.dto';

class ConnectionStatesController {
  public connectionStatesService = new ConnectionStatesService();

  constructor() {
    this.connectionStatesService.create({
      name: 'stable',
      backgroundColor: '#008000',
    }).catch(err => console.error('Error creating connection state:', err));

    this.connectionStatesService.create({
      name: 'unstable',
      backgroundColor: '#FFA500',
    }).catch(err => console.error('Error creating connection state:', err));

    this.connectionStatesService.create({
      name: 'disconnected',
      backgroundColor: '#FF0000',
    }).catch(err => console.error('Error creating connection state:', err));
  }

  public getConnectionStates = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllConnectionStates: ConnectionState[] = await this.connectionStatesService.findAll();

      res.status(200).json({ data: findAllConnectionStates, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public createConnection = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const typeData: CreateConnectionTypesDto = req.body;
      const createTypeData: Type = await this.connectionStatesService.create(typeData);

      res.status(201).json({ data: createTypeData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateConnection = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const typeId: string = req.params.id;
      const typeData: CreateConnectionTypesDto = req.body;
      const updateTypeData: Type = await this.connectionStatesService.update(typeId, typeData);

      res.status(200).json({ data: updateTypeData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteConnection = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const typeId: string = req.params.id;
      const deleteTypeData: Type = await this.connectionStatesService.delete(typeId);

      res.status(200).json({ data: deleteTypeData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default ConnectionStatesController;
