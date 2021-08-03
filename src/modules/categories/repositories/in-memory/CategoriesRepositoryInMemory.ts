import { prisma } from '@infra/prisma/client';
import { ICategoryDTO } from '@modules/categories/dtos/ICategoryDTO';
import { ICreateCategoryDTO } from '@modules/categories/dtos/ICreateCategoryDTO';
import { IUpdateCategoryDTO } from '@modules/categories/dtos/IUpdateCategoryDTO';
import { v4 as uuid } from 'uuid';

import { ICategoriesRepository } from '../ICategoriesRepository';

export class CategoriesRepositoryInMemory implements ICategoriesRepository {
  private inMemory: ICategoryDTO[] = [];

  async create({ title, color }: ICreateCategoryDTO): Promise<ICategoryDTO> {
    const category = Object.assign(prisma.category, {
      id: uuid(),
      title,
      color,
      created_at: new Date(),
    });

    this.inMemory.push(category);

    return category;
  }

  async findById(category_id: string): Promise<ICategoryDTO> {
    const category = this.inMemory.find(
      category => category.id === category_id,
    );

    return category;
  }

  async findByIdAndReturnVideos(category_id: string): Promise<ICategoryDTO> {
    const category = this.inMemory.find(
      category => category.id === category_id,
    );

    return category;
  }

  async findByTitle(title: string): Promise<ICategoryDTO> {
    const category = this.inMemory.find(category => category.title === title);

    return category;
  }

  async listAll(): Promise<ICategoryDTO[]> {
    return this.inMemory;
  }

  async update({
    id,
    title,
    color,
  }: IUpdateCategoryDTO): Promise<ICategoryDTO> {
    const category = this.inMemory.find(category => category.id === id);

    category.title = title;
    category.color = color;

    return category;
  }

  async delete(category_id: string): Promise<void> {
    const category = this.inMemory
      .map(category => category.id === category_id)
      .indexOf(true);

    this.inMemory.splice(category, 1);
  }
}
