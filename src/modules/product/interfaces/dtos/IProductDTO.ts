import { Image } from "@prisma/client"

export interface IProductDTO {
  id: string
  name: string
  volume: string | null
  barCode: string
  description: string
  imageId: string | null
  brandId: string | null
  categoryId: number | null
  subCategoryId: number | null
  measurementUnitId: number | null
  createdAt: Date
  updatedAt: Date
  image: Image
  slug?: string
}