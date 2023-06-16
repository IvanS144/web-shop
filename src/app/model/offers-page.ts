import { OfferDTO } from "./offer-dto";

export interface OffersPage {
  totalPages: number,
  content: OfferDTO[]
}
