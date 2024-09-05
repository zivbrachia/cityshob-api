import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateSensorTypeDto {
  @IsString()
  public name: string;
}
