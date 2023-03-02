import { ICategoryDTO } from "@modules/product/interfaces/dtos/ICategoryDTO";
import { IValidationMessage } from "@modules/product/interfaces/IValidationMessage";
import { Category } from "@prisma/client";

class CreateCategoryValidation {
  categoryExists(category: Category): IValidationMessage<ICategoryDTO> {
    if (category.name) {
      const message = {
        isSuccess: false,
        error: {
          type: 'category.already.exists',
          field: 'name',
          message: 'Esse marca já foi cadastrada.'
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

export { CreateCategoryValidation }
