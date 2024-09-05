import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import typeModel from '@models/types.model';
import { Type } from '@interfaces/types.interface';
import { CreateTypeDto } from '@dtos/types.dto';

class TypeService {
  public types = typeModel;

  public async findAll(): Promise<Type[]> {
    return this.types.find();
  }

  public async findById(typeId: string): Promise<Type> {
    if (isEmpty(typeId)) throw new HttpException(400, "TypeId is empty");

    const findType: Type = await this.types.findOne({ _id: typeId });
    if (!findType) throw new HttpException(409, "type doesn't exist");

    return findType;
  }

  public async create(typeData: CreateTypeDto): Promise<Type> {
    if (isEmpty(typeData)) throw new HttpException(400, "typeData is empty");

    const findType: Type = await this.types.findOne({ name: typeData.name });
    if (findType) throw new HttpException(409, `This name ${typeData.name} already exists`);

    return this.types.create(typeData);
  }

  public async update(typeId: string, typeData: CreateTypeDto): Promise<Type> {
    if (isEmpty(typeData)) throw new HttpException(400, "typeData is empty");

    const updateTypeById: Type = await this.types.findByIdAndUpdate(typeId, typeData);
    if (!updateTypeById) throw new HttpException(409, "Type doesn't exist");

    return updateTypeById;
  }

  public async delete(typeId: string): Promise<Type> {
    const deleteTypeById: Type = await this.types.findByIdAndDelete(typeId);
    if (!deleteTypeById) throw new HttpException(409, "Type doesn't exist");

    return deleteTypeById;
  }
}

export default TypeService;
