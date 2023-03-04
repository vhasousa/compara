import { Image, PrismaClient } from "@prisma/client";
import { ICreateImagesDTO, IImagesRepository } from "../IImagesRepository";


class ImagesRepository implements IImagesRepository {
	private prisma = new PrismaClient();

	async create({
		originalName,
		key,
	}: ICreateImagesDTO): Promise<Image> {
		const newsImage = this.prisma.image.create({
			data: {
				originalName,
				key
			}
		});

		return newsImage;
	}

	async findById(id: string): Promise<Image> {
		const image = await this.prisma.image.findUnique({
			where: {
				id
			}
		});

		return image;
	}
}

export { ImagesRepository };
