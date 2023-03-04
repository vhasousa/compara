import { Category, SubCategory } from "@prisma/client";
import { IValidationMessage } from "errors/IValidationMessage";

class CreateSubCategoryValidation {
	categoryExists(category: Category): IValidationMessage<Category> {
		if (!category) {
			const message = {
				isFailure: true,
				isSuccess: false,
				error: {
					type: "category.does.not.exists",
					field: "name",
					message: "Informe uma categoria válida vinculada a essa sub categoria."
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

	nameRequired(name: string): IValidationMessage<SubCategory> {
		if(!name) {
			const message = {
				isFailure: true,
				isSuccess: false,
				error: {
					type: "name.required",
					field: "name",
					message: "Nome da sub categoria é obrigatório"
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

	subCategoryExists(subCategory: SubCategory): IValidationMessage<SubCategory> {
		if(subCategory) {
			const message = {
				isFailure: true,
				isSuccess: false,
				error: {
					type: "subCategory.already.exists",
					field: "name",
					message: "Sub categoria já cadastrada"
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

export { CreateSubCategoryValidation };
