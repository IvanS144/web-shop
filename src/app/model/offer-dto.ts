import { CategoryDTO } from "./category-dto";
import { OfferAttributeDTO } from "./offer-attribute-dto";
import { PictureDTO } from "./picture-dto";
import { QuestionDTO } from "./question-dto";
import { UserDTO } from "./user-dto";

export interface OfferDTO {
  offerId: number
  title: string
  description: string
  price: number
  location: string
  isNew: boolean
  user: UserDTO
  quantity: number
  deleted: boolean
  attributes: OfferAttributeDTO[]
  categories: CategoryDTO[]
  pictures: PictureDTO[]
  questions: QuestionDTO[]
}
