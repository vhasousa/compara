import { Category } from "@prisma/client";
import { IValidationMessage } from "@modules/product/interfaces/IValidationMessage";

class CreateSubCategoryValidation {
  categoryExists(category: Category): IValidationMessage<Category> {
    if (!category) {
      const message = {
        isSuccess: false,
        error: {
          type: 'category.does.not.exists',
          field: 'name',
          message: 'Informe uma categoria válida vinculada a essa sub categoria.'
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

export { CreateSubCategoryValidation }
