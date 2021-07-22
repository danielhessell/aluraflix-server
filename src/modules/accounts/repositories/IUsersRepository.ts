import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { IUserDTO } from '../dtos/IUserDTO';

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<IUserDTO>;
  findByEmail(email: string): Promise<IUserDTO>;
}
