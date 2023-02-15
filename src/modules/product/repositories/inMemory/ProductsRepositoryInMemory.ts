import { Brand, Category, MeasurementUnit, Product, SubCategory } from "@prisma/client";
import { v4 as uuidV4 } from 'uuid';
import { ICreateProductDTO, IImportProducts, IProductsRepository, IResponseProductDTO } from "../IProductsRepository";

class ProductsRepositoryInMemory implements IProductsRepository {
  brands: Brand[] = [];
  categories: Category[] = [];
  subCategories: SubCategory[] = [];
  measurementUnits: MeasurementUnit[] = [];
  products: Product[] = [];

  async list(): Promise<IResponseProductDTO[]> {
    const listOfProducts = this.products.map(product => {
      const {
        name,
        description,
        measurementUnitId,
        barCode,
        volume,
        brandId,
        categoryId
      } = product

      const formmatedProduct: IResponseProductDTO = {
        name,
        description,
        measurementUnit: this.measurementUnits.find(
          measurementUnit => measurementUnit.id === measurementUnitId),
        barCode,
        volume,
        brand: this.brands.find(brand => brand.id === brandId),
        category: this.categories.find(category => category.id === categoryId)
      }

      return formmatedProduct;
    });

    return listOfProducts;
  }

  async create({
    name,
    description,
    measurementUnitId,
    measurementUnit,
    barCode,
    volume,
    brandId,
    categoryId,
    subCategoryId,
    brand,
    category,
    subCategory
  }: ICreateProductDTO): Promise<Product> {
    this.brands.push(brand);
    this.categories.push(category);
    this.subCategories.push(subCategory);
    this.measurementUnits.push(measurementUnit);

    const product: Product = { 
      id: uuidV4(),
      name,
      barCode,
      description,
      measurementUnitId,
      volume,
      brandId,
      categoryId,
      subCategoryId,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    

    this.products.push(product);

    return product;
  }

  createMany(products: IImportProducts[]): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async findByBarCode(barCode: string): Promise<Product> {
    const product = this.products.find(product => product.barCode === barCode);

    return product;
  }
}

export { ProductsRepositoryInMemory }
