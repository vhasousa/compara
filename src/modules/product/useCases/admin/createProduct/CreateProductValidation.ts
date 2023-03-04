import { Brand, Category, MeasurementUnit, Product, SubCategory } from "@prisma/client";
import { IValidationMessage } from "errors/IValidationMessage";

class CreateProductValidation {
	brandExists(brand: Brand): IValidationMessage<Product> {
		if (!brand) {
			const message = {
				isSuccess: false,
				error: {
					type: "brand.not.found",
					field: "brandId",
					message: "Esse marca não foi cadastrada."
				},
			};

			return message;
		}

		const message = {
			isSuccess: true
		};

		return message;
	}

	categoryExists(category: Category): IValidationMessage<Product> {
		if (!category) {
			const message = {
				isSuccess: false,
				error: {
					type: "category.not.found",
					field: "categoryId",
					message: "Esse categoria não foi cadastrada."
				},
			};

			return message;
		}

		const message = {
			isSuccess: true
		};

		return message;
	}

	subCategoryExists(subCategory: SubCategory): IValidationMessage<Product> {
		if (!subCategory) {
			const message = {
				isSuccess: false,
				error: {
					type: "subCategory.not.found",
					field: "subCategoryId",
					message: "Esse sub categoria não foi cadastrada."
				},
			};

			return message;
		}

		const message = {
			isSuccess: true
		};

		return message;
	}

	measurementUnitExists(measurementUnit: MeasurementUnit): IValidationMessage<Product> {
		if (!measurementUnit) {
			const message = {
				isFailure: true,
				isSuccess: false,
				error: {
					type: "measurementUnit.not.found",
					field: "measurementUnitId",
					message: "Esse unidade de medida não foi cadastrada."
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

	productExists(product: Product): IValidationMessage<Product> {
		if (product) {
			const message = {
				isSuccess: false,
				error: {
					type: "product.already.exists",
					field: "barCode",
					message: "Produto com esse código de barras já cadastrado."
				},
			};

			return message;
		}

		const message = {
			isSuccess: true
		};

		return message;
	}

	nameRequired(name: string): IValidationMessage<Product> {
		if(!name) {
			const message = {
				isFailure: true,
				isSuccess: false,
				error: {
					type: "name.required",
					field: "name",
					message: "Nome do produto é obrigatório"
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

	volumeValidation(volume: string): IValidationMessage<Product> {
		const hasOnlyNumbers = /^[0-9]+$/.test(volume);
		
		if(!hasOnlyNumbers) {
			const message = {
				isFailure: true,
				isSuccess: false,
				error: {
					type: "volume.not.valid",
					field: "volume",
					message: "Volume deve conter somente números"
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

	barCodeValidation(barCode: string): IValidationMessage<Product> {
		const hasOnlyNumbers = /^[0-9]+$/.test(barCode);
		
		if(!hasOnlyNumbers) {
			const message = {
				isFailure: true,
				isSuccess: false,
				error: {
					type: "barCode.not.valid",
					field: "barCode",
					message: "Código de barras deve conter somente números"
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

export { CreateProductValidation };
