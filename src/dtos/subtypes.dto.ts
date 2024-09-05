import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateSubTypeDto {
  @IsString()
  public name: string;
}
