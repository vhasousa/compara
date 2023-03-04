import { Image } from "@prisma/client";
import { ICreateImagesDTO, IImagesRepository } from "../IImagesRepository";
import { v4 as uuidV4 } from "uuid";

class ImagesRepositoryInMemory implements IImagesRepository {
	images: Image[] = [];

	async create({ originalName, key }: ICreateImagesDTO): Promise<Image> {
		const createdImage: Image = {
			id: uuidV4(),
			originalName,
			key
		};

		this.images.push(createdImage);

		return createdImage;
	}

	async findById(id: string): Promise<Image> {
		const image = this.images.find(image => image.id === id);

		return image;
	}

}

export { ImagesRepositoryInMemory };
