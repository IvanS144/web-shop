import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OfferDTO } from 'src/app/model/offer-dto';
import { PaymentOption } from 'src/app/model/payment-option';
import { PurchaseDTO } from 'src/app/model/purchase-dto';
import { PurchasesService } from 'src/app/services/purchases.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {
  constructor(private dialogRef: MatDialogRef<OrderComponent>, @Inject(MAT_DIALOG_DATA) public offer: OfferDTO, private formBuilder: FormBuilder, private purchasesService: PurchasesService){}

  paymentOptions: PaymentOption[] = [{
    "id": 1,
    "name": "Pay upon delivery",
    "cardRequired": false
  },
  {
    "id": 2,
    "name": "Pay with card",
    "cardRequired": true
  }
]

orderForm: FormGroup = this.formBuilder.group({
  "offerId": this.formBuilder.control(this.offer.offerId),
  "quantity": this.formBuilder.control(0),
  "userId": this.formBuilder.control(0)
})

selectedPaymentOption?: PaymentOption
cardRequired: boolean = false

onPaymentOptionSelected(paymentOption: PaymentOption){
  this.cardRequired=paymentOption.cardRequired
}

sendPurchaseRequest(){
  this.orderForm.patchValue({"userId": localStorage.getItem("userId")})
  this.purchasesService.purchase(this.orderForm.value)
  .subscribe({
    next: (data: PurchaseDTO) => this.dialogRef.close(data),
    error: (err: HttpErrorResponse) => {
      console.log(err)
      this.dialogRef.close(null)
    }
  })
}

}
