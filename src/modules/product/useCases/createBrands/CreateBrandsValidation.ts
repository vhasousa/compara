import { Brand } from "@prisma/client";
import { IValidationMessage } from "@modules/product/interfaces/IValidationMessage";

class CreateBrandsValidation {
  brandExists(brand: Brand): IValidationMessage<Brand> {
    if (brand.name) {
      const message = {
        isSuccess: false,
        error: {
          type: 'brand.already.exists',
          field: 'name',
          message: 'Esse marca já foi cadastrada.'
        },
        value: brand
      }

      return message;
    }

    const message = {
      isSuccess: true
    }

    return message
  }
}

export { CreateBrandsValidation }
