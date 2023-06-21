import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { OfferDTO } from 'src/app/model/offer-dto';
import { OffersPage } from 'src/app/model/offers-page';
import { OffersService } from 'src/app/services/offers.service';

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.scss']
})
export class MyOffersComponent {
  constructor(private offersService: OffersService){}
  offers: OfferDTO[] = []
  totalPages: number = 1;
  pageSize: number = 1;
  currentPage: number = 0;
  userId: string | null = localStorage.getItem("userId")

  getOffers(page: number = 0, pageSize: number = 10) {
    if(this.userId){
    this.offersService.getByUserId(this.userId, page, pageSize)
      .subscribe({
        next: (data: OffersPage) => {
          console.log(data)
          this.offers = data.content
          this.totalPages = data.totalPages
          this.currentPage = page
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      })
    }
  }

  delete(offer: OfferDTO){
    this.offersService.deleteById(offer.offerId)
    .subscribe({
      next: _ => offer.deleted = true,
      error: (err: HttpErrorResponse) => console.log(err)
    })
  }

  undoDeletion(offer: OfferDTO){
    this.offersService.undoDeleteById(offer.offerId)
    .subscribe({
      next: _ => offer.deleted = false,
      error: (err: HttpErrorResponse) => console.log(err)
    })
  }

  ngOnInit(){
    this.getOffers()
  }

}
