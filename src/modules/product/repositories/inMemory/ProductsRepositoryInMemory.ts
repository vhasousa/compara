import { Brand, Category, MeasurementUnit, Product } from "@prisma/client";
import { v4 as uuidV4 } from 'uuid';
import { ICreateProductDTO, IProductsRepository, IResponseProductDTO } from "../IProductsRepository";

class ProductsRepositoryInMemory implements IProductsRepository {
  brands: Brand[] = [];
  categories: Category[] = [];
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
    brand,
    category
  }: ICreateProductDTO): Promise<Product> {
    this.brands.push(brand);
    this.categories.push(category);
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
      createdAt: new Date(),
      updatedAt: new Date()
    }
    

    this.products.push(product);

    return product;
  }

  async findByBarCode(barCode: string): Promise<Product> {
    const product = this.products.find(product => product.barCode === barCode);

    return product;
  }
}

export { ProductsRepositoryInMemory }
