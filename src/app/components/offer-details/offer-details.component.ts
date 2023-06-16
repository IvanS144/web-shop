import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfferDTO } from 'src/app/model/offer-dto';
import { OffersService } from 'src/app/services/offers.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.scss']
})
export class OfferDetailsComponent {

  offer!: OfferDTO
  routeSubscibtion?: Subscription

  constructor(private offersService: OffersService, private route: ActivatedRoute){}

  ngOnInit(){
    this.routeSubscibtion = this.route.params.subscribe(params =>
      this.offersService.getById(params['id']).subscribe({
        next: (data: OfferDTO) => this.offer=data,
        error: (err: HttpErrorResponse) => console.log(err)
      })
    )
  }

  buy(){

  }

  ngOnDestroy(){
    this.routeSubscibtion?.unsubscribe()

  }

}
