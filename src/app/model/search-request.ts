import { AttributeRequest } from "./attribute-request";

export interface SearchRequest {
  text:string,
  categoryId: number,
  priceFrom: number,
  priceTo: number,
  isNew: boolean,
  attributes: AttributeRequest[]
}
