import { OfferDTO } from "./offer-dto";

export interface PurchaseDTO {
  purchaseId: number,
  offer: OfferDTO,
  quantity: number
}
