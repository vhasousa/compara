import { Image } from "@prisma/client";

interface ICreateImagesDTO {
  originalName: string;
  key: string;
}

interface IImagesRepository {
  create({ originalName, key }: ICreateImagesDTO): Promise<Image>;
  // save(data: ICreateNewsImagesDTO): Promise<NewsImage>;
  // list(newsId: string): Promise<NewsImage[]>;
  // findById(id: string): Promise<NewsImage>;
  // findByIds(ids: string[]): Promise<NewsImage[]>;
  // findByKey(key: string): Promise<NewsImage>;
  // delete(id: string): Promise<void>;
}

export { IImagesRepository, ICreateImagesDTO };
