import { ICategoryDTO } from '../dtos/ICategoryDTO';
import { ICreateCategoryDTO } from '../dtos/ICreateCategoryDTO';
import { IUpdateCategoryDTO } from '../dtos/IUpdateCategoryDTO';

export interface ICategoriesRepository {
  create(data: ICreateCategoryDTO): Promise<ICategoryDTO>;
  findById(category_id: string): Promise<ICategoryDTO>;
  findByTitle(title: string): Promise<ICategoryDTO>;
  listAll(): Promise<ICategoryDTO[]>;
  update(data: IUpdateCategoryDTO): Promise<ICategoryDTO>;
  delete(category_id: string): Promise<void>;
}
