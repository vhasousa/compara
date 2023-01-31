import { Category } from "@prisma/client";
import { IValidationMessage } from "@modules/product/interfaces/IValidationMessage";

class CreateCategoryValidation {
  categoryExists(category: Category): IValidationMessage<Category> {
    if (category.name) {
      const message = {
        isSuccess: false,
        error: {
          type: 'category.already.exists',
          field: 'name',
          message: 'Esse marca já foi cadastrada.'
        },
        value: category
      }

      return message;
    }

    const message = {
      isSuccess: true
    }

    return message
  }
}

export { CreateCategoryValidation }
