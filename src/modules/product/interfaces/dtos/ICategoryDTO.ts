import { Image } from "@prisma/client"

export interface ICategoryDTO {
  id: number
  name: string
  description: string
  imageId: string
  slug: string
  image?: Image
  createdAt: Date
}
