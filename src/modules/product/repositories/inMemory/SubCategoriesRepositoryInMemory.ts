import { ISubCategoryDTO } from "@modules/product/interfaces/dtos/ISubCategoryDTO";
import { Category, Image, SubCategory } from "@prisma/client";
import { v4 as uuidV4 } from 'uuid';
import { ICreateCategoryDTO } from "../ICategoriesRepository";
import { ICreateSubCategoryDTO, IResponseSubCategoryDTO, ISubCategoriesRepository } from "../ISubCategoriesRepository";

class SubCategoriesRepositoryInMemory implements ISubCategoriesRepository {
  subCategories: SubCategory[] = [];
  categories: Category[] = [];
  images: Image[] = [];
  counter = 0;

  async listByCategory(categoryId: number): Promise<ISubCategoryDTO[]> {
    const listOfSubCategories = this.subCategories.map(subCategory => {
      if(subCategory.categoryId === categoryId) {
        const { id, name, description, imageId, slug, createdAt } = subCategory;

        const formmatedProduct: ISubCategoryDTO  = {
          id,
          name,
          description,
          category: this.categories.find(category => category.id === categoryId),
          image: this.images.find(image => image.id === imageId),
          slug,
          imageId,
          categoryId,
          createdAt
        }

        return formmatedProduct;
      }
    });

    return listOfSubCategories;
  }


  async create({ 
    name, 
    description, 
    categoryId, 
    category, 
    image, 
    imageId, 
    slug
  }: ICreateSubCategoryDTO): Promise<ISubCategoryDTO> {
    ++this.counter

    this.categories.push(category);
    this.images.push(image);

    const subCategories: ISubCategoryDTO = {
      id: this.counter,
      name,
      description,
      categoryId,
      createdAt: new Date(),
      imageId,
      slug,
      image,
      category
    }

    this.subCategories.push(subCategories);

    return subCategories;
  }

  createMany(categories: ICreateCategoryDTO[]): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async findByName(name: string): Promise<SubCategory> {
    const brand = this.subCategories.find(brand => brand.name === name);

    return brand;
  }

  async findById(id: number): Promise<SubCategory> {
    const brand = this.subCategories.find(brand => brand.id === id);

    return brand;
  }

  async findBySlug(slug: string): Promise<SubCategory> {
    const subCategory = this.subCategories.find(subCategory => subCategory.slug === slug);

    return subCategory;
  }
}

export { SubCategoriesRepositoryInMemory }
