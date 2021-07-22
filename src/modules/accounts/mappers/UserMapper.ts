import { classToClass } from 'class-transformer';

import { IUserDTO } from '../dtos/IUserDTO';
import { IUserResponseDTO } from '../dtos/IUserResponseDTO';

export class UserMapper {
  static toDTO({
    id,
    name,
    email,
    created_at,
    updated_at,
  }: IUserDTO): IUserResponseDTO {
    return classToClass({
      id,
      name,
      email,
      created_at,
      updated_at,
    });
  }
}
