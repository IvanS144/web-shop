import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { PurchaseDTO } from 'src/app/model/purchase-dto';
import { PurchasesPage } from 'src/app/model/purchases-page';
import { PurchasesService } from 'src/app/services/purchases.service';

@Component({
  selector: 'app-my-purchases',
  templateUrl: './my-purchases.component.html',
  styleUrls: ['./my-purchases.component.scss']
})
export class MyPurchasesComponent {
constructor(private purchasesService: PurchasesService){}
  purchases: PurchaseDTO[] = []
  totalPages: number = 1;
  pageSize: number = 1;
  currentPage: number = 0;
  userId: string | null = localStorage.getItem("userId")

  getPurchases(page: number = 0, pageSize: number = 10) {
    if(this.userId){
    this.purchasesService.getByUserId(this.userId, page, pageSize)
      .subscribe({
        next: (data: PurchasesPage) => {
          console.log(data)
          this.purchases = data.content
          this.totalPages = data.totalPages
          this.currentPage = page
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      })
    }
  }

  ngOnInit(){
    this.getPurchases()
  }
}
