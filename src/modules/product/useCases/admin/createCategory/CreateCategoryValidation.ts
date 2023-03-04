import { ICategoryDTO } from "@modules/product/interfaces/dtos/ICategoryDTO";
import { IValidationMessage } from "errors/IValidationMessage";
import { Category } from "@prisma/client";

class CreateCategoryValidation {
	categoryExists(category: Category): IValidationMessage<ICategoryDTO> {
		if (category.name) {
			const message = {
				isFailure: true,
				isSuccess: false,
				error: {
					type: "category.already.exists",
					field: "name",
					message: "Esse categoria já foi cadastrada."
				},
			};

			return message;
		}

		const message = {
			isFailure: false,
			isSuccess: true
		};

		return message;
	}

	nameRequired(name: string): IValidationMessage<ICategoryDTO> {
		if(!name) {
			const message = {
				isFailure: true,
				isSuccess: false,
				error: {
					type: "name.required",
					field: "name",
					message: "Nome da categoria é obrigatório"
				},
			};

			return message;
		}

		const message = {
			isFailure: false,
			isSuccess: true
		};

		return message;
	}
}

export { CreateCategoryValidation };
