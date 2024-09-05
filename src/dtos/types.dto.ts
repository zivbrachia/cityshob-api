import { IsString } from 'class-validator';

export class CreateTypeDto {
  @IsString()
  public name: string;
}
