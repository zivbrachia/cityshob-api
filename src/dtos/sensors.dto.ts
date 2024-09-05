import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSensorDto {
  @IsString()
  public name: string;

  @IsMongoId()
  @IsNotEmpty()
  public type: string;

  @IsMongoId()
  @IsNotEmpty()
  public subType: string;

  @IsMongoId()
  @IsNotEmpty()
  @IsOptional()
  connectionState: string;

  @IsMongoId()
  @IsNotEmpty()
  sensorType: string;
}
