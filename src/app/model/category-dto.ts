import { AttributeDTO } from "./attribute-dto"

export interface CategoryDTO {
  categoryId: number,
  name: string
  attributes: AttributeDTO[]
}
