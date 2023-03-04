import { ICategoryDTO } from "@modules/product/interfaces/dtos/ICategoryDTO";
import { Category, PrismaClient } from "@prisma/client";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";


class CategoriesRepository implements ICategoriesRepository {
	private prisma = new PrismaClient();

	async list(): Promise<ICategoryDTO[]> {
		const categories = await this.prisma.category.findMany({
			include: {
				image: true
			}
		});

		return categories;
	}

	async create({ name, description, imageId, slug }: ICreateCategoryDTO): Promise<Category> {
		const category = await this.prisma.category.create({
			data: {
				name,
				description,
				imageId,
				slug
			}
		});

		return category;
	}

	async createIfNotExists({ id, name, description, slug }: ICreateCategoryDTO): Promise<Category> {
		const category = await this.prisma.category.upsert({
			where: { id: id || 0 },
			update: {},
			create: {
				name,
				description,
				slug
			}
		});

		return category;
	}

	async createMany(categories: ICreateCategoryDTO[]): Promise<void> {
		await this.prisma.category.createMany({
			data: categories,
			skipDuplicates: true
		});
	}

	async findByName(name: string): Promise<Category> {
		const category = await this.prisma.category.findUnique({
			where: {
				name
			}
		});

		return category;
	}

	async findBySlug(slug: string): Promise<Category> {
		const category = await this.prisma.category.findUnique({
			where: {
				slug
			}
		});

		return category;
	}

	async findById(id: number): Promise<Category> {
		const category = await this.prisma.category.findUnique({
			where: {
				id
			}
		});

		return category;
	}
}

export { CategoriesRepository };
