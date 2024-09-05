import { NextFunction, Request, Response } from 'express';
import { CreateTypeDto } from '@dtos/types.dto';
import { Type } from '@interfaces/types.interface';
import TypeService from '@services/types.service';

class TypesController {
  public typeService = new TypeService();

  public getTypes = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllTypeData: Type[] = await this.typeService.findAll();

      res.status(200).json({ data: findAllTypeData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getSubTypesByTypeId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const typeId: string = req.params.id;

    } catch (error) {
      next(error);
    }
  }

  public getTypeById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const typeId: string = req.params.id;
      const findOneTypeData: Type = await this.typeService.findById(typeId);

      res.status(200).json({ data: findOneTypeData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createType = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const typeData: CreateTypeDto = req.body;
      const createTypeData: Type = await this.typeService.create(typeData);

      res.status(201).json({ data: createTypeData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateType = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const typeId: string = req.params.id;
      const typeData: CreateTypeDto = req.body;
      const updateTypeData: Type = await this.typeService.update(typeId, typeData);

      res.status(200).json({ data: updateTypeData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteType = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const typeId: string = req.params.id;
      const deleteTypeData: Type = await this.typeService.delete(typeId);

      res.status(200).json({ data: deleteTypeData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default TypesController;
