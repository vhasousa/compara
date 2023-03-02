import { Category, Image } from "@prisma/client"

export interface ISubCategoryDTO {
  id: number
  name: string
  description: string | null
  slug: string
  imageId: string | null
  categoryId: number
  createdAt: Date
  category?: Category | null
  image: Image | null
}
