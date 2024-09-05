import { IsHexColor, IsString } from 'class-validator';

export class CreateConnectionTypesDto {
  @IsString()
  public name: string;

  @IsHexColor()
  public backgroundColor: string;

}
