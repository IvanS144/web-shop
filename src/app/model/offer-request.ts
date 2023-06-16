import { AttributeRequest } from "./attribute-request";

export interface OfferRequest {
  title: string,
  description: string,
  price: number,
  location: string,
  isNew: boolean,
  userId: number,
  quantity: number,
  categoryIds: number[],
  attributeRequests: AttributeRequest[]
}
