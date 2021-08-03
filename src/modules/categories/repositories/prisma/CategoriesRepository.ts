import { prisma } from '@infra/prisma/client';
import { ICategoryDTO } from '@modules/categories/dtos/ICategoryDTO';
import { ICreateCategoryDTO } from '@modules/categories/dtos/ICreateCategoryDTO';
import { IUpdateCategoryDTO } from '@modules/categories/dtos/IUpdateCategoryDTO';

import { ICategoriesRepository } from '../ICategoriesRepository';

export class CategoriesRepository implements ICategoriesRepository {
  private repository = prisma.category;

  async create({ title, color }: ICreateCategoryDTO): Promise<ICategoryDTO> {
    const category = await this.repository.create({
      data: {
        title,
        color,
      },
    });

    return category;
  }

  async findById(category_id: string): Promise<ICategoryDTO> {
    const category = await this.repository.findUnique({
      where: { id: category_id },
    });

    return category;
  }

  async findByTitle(title: string): Promise<ICategoryDTO> {
    const category = await this.repository.findFirst({
      where: { title },
    });

    return category;
  }

  async listAll(): Promise<ICategoryDTO[]> {
    const categories = await this.repository.findMany();

    return categories;
  }

  async update({
    id,
    title,
    color,
  }: IUpdateCategoryDTO): Promise<ICategoryDTO> {
    const category = await this.repository.update({
      where: { id },
      data: {
        title,
        color,
      },
    });

    return category;
  }

  async delete(category_id: string): Promise<void> {
    await this.repository.delete({
      where: { id: category_id },
    });
  }
}
