import { IResponseSubCategoryDTO } from "@modules/product/repositories/ISubCategoriesRepository";
import { Category } from "@prisma/client";
import { IValidationMessage } from "errors/IValidationMessage";

class ListSubCategoriesByCategoryValidation {
	categoryExists(category: Category): IValidationMessage<IResponseSubCategoryDTO[]> {
		if(!category) {
			const message = {
				isFailure: true,
				isSuccess: false,
				error: {
					type: "category.not.found",
					field: "categorySlug",
					message: "Categoria não encontrada"
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

export { ListSubCategoriesByCategoryValidation };
