import { IResponseProductDTO } from "@modules/product/repositories/IProductsRepository";
import { SubCategory } from "@prisma/client";
import { IValidationMessage } from "errors/IValidationMessage";

class ListSubCategoriesValidation {
	subCategoryExists(subCategory: SubCategory): IValidationMessage<IResponseProductDTO[]> {
		if(!subCategory) {
			const message = {
				isFailure: true,
				isSuccess: false,
				error: {
					type: "subCategory.not.found",
					field: "subCategorySlug",
					message: "Sub categoria não encontrada"
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

export { ListSubCategoriesValidation };
