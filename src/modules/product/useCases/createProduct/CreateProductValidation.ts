import { Brand, Category, Product, SubCategory } from "@prisma/client";
import { IValidationMessage } from "@modules/product/interfaces/IValidationMessage";

class CreateProductValidation {
  brandExists(brand: Brand): IValidationMessage<Product> {
    if (!brand) {
      const message = {
        isSuccess: false,
        error: {
          type: 'brand.not.found',
          field: 'brandId',
          message: 'Esse marca não foi cadastrada.'
        },
      }

      return message;
    }

    const message = {
      isSuccess: true
    }

    return message
  }

  categoryExists(category: Category): IValidationMessage<Product> {
    if (!category) {
      const message = {
        isSuccess: false,
        error: {
          type: 'category.not.found',
          field: 'categoryId',
          message: 'Esse categoria não foi cadastrada.'
        },
      }

      return message;
    }

    const message = {
      isSuccess: true
    }

    return message
  }

  subCategoryExists(subCategory: SubCategory): IValidationMessage<Product> {
    if (!subCategory) {
      const message = {
        isSuccess: false,
        error: {
          type: 'subCategory.not.found',
          field: 'subCategoryId',
          message: 'Esse sub categoria não foi cadastrada.'
        },
      }

      return message;
    }

    const message = {
      isSuccess: true
    }

    return message
  }

  productExists(product: Product): IValidationMessage<Product> {
    if (product) {
      const message = {
        isSuccess: false,
        error: {
          type: 'product.already.exists',
          field: 'barCode',
          message: 'Produto com esse código de barras já cadastrado.'
        },
      }

      return message;
    }

    const message = {
      isSuccess: true
    }

    return message
  }
}

export { CreateProductValidation }
