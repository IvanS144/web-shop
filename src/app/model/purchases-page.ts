import { PurchaseDTO } from "./purchase-dto";

export interface PurchasesPage {
  totalPages: number,
  content: PurchaseDTO[]
}
