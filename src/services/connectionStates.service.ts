import { ConnectionState } from '@interfaces/connectionStates.interface';
import connectionStatesModel from '@models/connectionStates.model';
import { isEmpty } from '@utils/util';
import { HttpException } from '@exceptions/HttpException';
import { CreateConnectionTypesDto } from '@dtos/connectionTypes.dto';

class ConnectionStatesService {
  public connectionStates = connectionStatesModel;

  public async findAll(): Promise<ConnectionState[]> {
    return this.connectionStates.find();
  }

  public async create(typeData: CreateConnectionTypesDto): Promise<ConnectionState> {
    if (isEmpty(typeData)) throw new HttpException(400, "typeData is empty");

    const findType: ConnectionState = await this.connectionStates.findOne({ name: typeData.name });
    if (findType) throw new HttpException(409, `This name ${typeData.name} already exists`);

    return this.connectionStates.create(typeData);
  }

  public async update(typeId: string, typeData: CreateConnectionTypesDto): Promise<ConnectionState> {
    if (isEmpty(typeData)) throw new HttpException(400, "typeData is empty");

    const updateTypeById: ConnectionState = await this.connectionStates.findByIdAndUpdate(typeId, typeData);
    if (!updateTypeById) throw new HttpException(409, "Type doesn't exist");

    return updateTypeById;
  }

  public async delete(typeId: string): Promise<ConnectionState> {
    const deleteTypeById: ConnectionState = await this.connectionStates.findByIdAndDelete(typeId);
    if (!deleteTypeById) throw new HttpException(409, "Type doesn't exist");

    return deleteTypeById;
  }
}

export default ConnectionStatesService;
