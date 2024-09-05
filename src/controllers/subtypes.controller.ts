import { NextFunction, Request, Response } from 'express';
import SubTypeService from '@services/subtypes.service';
import { CreateSubTypeDto } from '@dtos/subtypes.dto';
import { SubType } from '@interfaces/subTypes.interface';
import { Type } from '@interfaces/types.interface';

class SubTypesController {
  public subTypeService = new SubTypeService();

  public getSubTypes = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllSubTypeData: Type[] = await this.subTypeService.findAll();

      res.status(200).json({ data: findAllSubTypeData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };
  public getSubTypeById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const subTypeId: string = req.params.id;
      const findOneTypeData: Type = await this.subTypeService.findById(subTypeId);

      res.status(200).json({ data: findOneTypeData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createSubType = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const subTypeData: CreateSubTypeDto = req.body;
      const createSubTypeData: SubType = await this.subTypeService.create(subTypeData);

      res.status(201).json({ data: createSubTypeData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateSubType = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const subTypeId: string = req.params.id;
      const subTypeData: CreateSubTypeDto = req.body;
      const updateSubTypeData: SubType = await this.subTypeService.update(subTypeId, subTypeData);

      res.status(200).json({ data: updateSubTypeData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteSubType = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const subTypeId: string = req.params.id;
      const deleteSubTypeData: SubType = await this.subTypeService.delete(subTypeId);

      res.status(200).json({ data: deleteSubTypeData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default SubTypesController;
