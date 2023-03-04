import { Brand } from "@prisma/client";
import { IValidationMessage } from "errors/IValidationMessage";

class CreateBrandsValidation {
	brandExists(name: string): IValidationMessage<Brand> {
		if (name) {
			const message = {
				isFailure: true,
				isSuccess: false,
				error: {
					type: "brand.already.exists",
					field: "name",
					message: "Esse marca já foi cadastrada."
				},
			};

			return message;
		}

		const message = {
			isSuccess: true,
			isFailure: false
		};

		return message;
	}

	nameInformed(name: string): IValidationMessage<Brand> {
		if(!name) {
			const message = {
				isFailure: true,
				isSuccess: false,
				error: {
					type: "name.required",
					field: "name",
					message: "Informe o nome da marca."
				},
			};

			return message;
		}

		const message = {
			isSuccess: true,
			isFailure: false
		};

		return message;
	}
}

export { CreateBrandsValidation };
