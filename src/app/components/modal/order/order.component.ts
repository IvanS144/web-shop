import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  constructor(private snackBar: MatSnackBar,private dialogRef: MatDialogRef<OrderComponent>, @Inject(MAT_DIALOG_DATA) public offer: OfferDTO, private formBuilder: FormBuilder, private purchasesService: PurchasesService){}

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
  "quantity": [1,[Validators.required, Validators.min(1), Validators.max(this.offer.quantity)]],
  "userId": [0],
  "card": ['']
})

get quantity(){
  return this.orderForm.get('quantity')
}

selectedPaymentOption?: PaymentOption
cardRequired: boolean = false

onPaymentOptionSelected(paymentOption: PaymentOption){
  this.cardRequired=paymentOption.cardRequired
}

sendPurchaseRequest(){
  this.orderForm.patchValue({"userId": localStorage.getItem("userId")})
  this.purchasesService.purchase(this.orderForm.value)
  .subscribe({
    next: (data: PurchaseDTO) => {this.snackBar.open('Purchase complete', 'OK', {duration: 50000});this.dialogRef.close(data)},
    error: (err: HttpErrorResponse) => {
      console.log(err)
      this.dialogRef.close(null)
    }
  })
}

close(){
    this.dialogRef.close();
  }

}
