import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUnityDto {
  @IsNotEmpty({ message: 'O nome não pode ser vazio.' })
  @IsString({ message: 'O nome não pode ser vazio.' })
  name: string;
}
