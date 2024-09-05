import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import subTypeModel from '@models/subTypes.model';
import { CreateSubTypeDto } from '@dtos/subtypes.dto';
import { SubType } from '@interfaces/subTypes.interface';

class SubTypeService {
  public subTypes = subTypeModel;

  public async findAll(): Promise<SubType[]> {
    return this.subTypes.find();
  }

  public async findById(subTypeId: string): Promise<SubType> {
    if (isEmpty(subTypeId)) throw new HttpException(400, "SubTypeId is empty");

    const findSubType: SubType = await this.subTypes.findOne({ _id: subTypeId });
    if (!findSubType) throw new HttpException(409, "subType doesn't exist");

    return findSubType;
  }

  public async findAllByTypeId(typeId: string): Promise<SubType[]> {
    return this.subTypes.find({ type: typeId }).populate('type').exec();
  }

  // public async findById(typeId: string): Promise<Type> {
  //   if (isEmpty(typeId)) throw new HttpException(400, "TypeId is empty");
  //
  //   const findType: Type = await this.types.findOne({ _id: typeId });
  //   if (!findType) throw new HttpException(409, "type doesn't exist");
  //
  //   return findType;
  // }
  //
  public async create(subTypeData: CreateSubTypeDto): Promise<SubType> {
    if (isEmpty(subTypeData)) throw new HttpException(400, "subTypeData is empty");

    const findType: SubType = await this.subTypes.findOne({ name: subTypeData.name });
    if (findType) throw new HttpException(409, `This name ${subTypeData.name} already exists`);

    return this.subTypes.create(subTypeData);
  }

  public async update(subTypeId: string, subTypeData: CreateSubTypeDto): Promise<SubType> {
    if (isEmpty(subTypeData)) throw new HttpException(400, "subTypeData is empty");

    const updateSubTypeById: SubType = await this.subTypes.findByIdAndUpdate(subTypeId, subTypeData);
    if (!updateSubTypeById) throw new HttpException(409, "subType doesn't exist");

    return updateSubTypeById;
  }

  public async delete(typeId: string): Promise<SubType> {
    const deleteSubTypeById: SubType = await this.subTypes.findByIdAndDelete(typeId);
    if (!deleteSubTypeById) throw new HttpException(409, "subType doesn't exist");

    return deleteSubTypeById;
  }
}

export default SubTypeService;
